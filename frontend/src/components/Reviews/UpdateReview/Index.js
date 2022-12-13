import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { updateSpotReview, getSpotReviews } from '../../../store/review'
import { useHistory } from 'react-router-dom'

const UpdateReviewForm = ({showModal, setShowModal}) => {
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)
    //const history = useHistory()
    const [responseErrors, setResponseErrors] = useState([])

    const { spotId } = useParams() //cant do this anymore, only getting spot id, but can get user id
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getSpotReviews(spotId))
    }, [dispatch])

    const oneSpot = useSelector(state=>{return state.oneSpot[spotId]})
    const allReviews = useSelector(state => {return Object.values(state.reviews)}) //not best practice to put ob.values inside, shoudl be outside

    const currentUserId = useSelector(state=>{
        if(state.session.user) {return state.session.user.id}
        else {return ''}
      })
    const currReview = allReviews.find(review => review.userId == currentUserId)

    useEffect(() => {
        if(currReview) {
            setReview(currReview.review)
            setStars(currReview.stars)
        }

    }, [currReview])


    const handleSubmit = async (e) => {
        e.preventDefault()
        const newReview = { review, stars  }
        const response = await dispatch(updateSpotReview(newReview, currReview.id ))
        if(response.errors) {

            setResponseErrors(Object.values(response.errors))
        } else {
            setShowModal(false)
          //this line of code does nothing anyway
          //  dispatch(getSpotReviews(spotId)).then(setShowModal(false))
        }
    }





    return (
        <div className='realModalOutside'>
            <div className='realModalContent'>
            <button className="cancelButton"><NavLink to={`/spots/${review.spotId}`}>X</NavLink></button>
            <h3>Edit Your Review</h3>
            <div className='LogInErrors'>


                <ul className='ulNoBullets'>
                {responseErrors.map(err => (
                    <li key={err}>{err}</li>
                ))}
                </ul>
            </div>
                <form onSubmit={handleSubmit} className="CreateSpotForm">
                <div>
                <textarea
                    className="CreateSpotDescriptionBox"
                    type='text'
                    onChange={(e) => setReview(e.target.value)}
                    value={review}
                    placeholder='Please write about your stay here...'
                    name='review'
                    rows='2'
                ></textarea>
                </div>
                <div>
                <input
                 type='number'
                 placeholder='Stars'
                 min='1'
                 max='5'
                 value={stars}
                 onChange={(e) => setStars(e.target.value)}
                />
                </div>
                <button type='submit' className="createButton" >Update Review</button>
                {/* <button className="createButton"><NavLink to={`/`}>Cancel</NavLink></button> */}

                </form>
            </div>

        </div>
    )

}

export default UpdateReviewForm
