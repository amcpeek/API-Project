import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { addSpotReview, getSpotReviews } from '../../../store/review'
import { useHistory } from 'react-router-dom'
import { getOneSpot } from '../../../store/oneSpot'

const AddReviewForm = ({spots, showModal, setShowModal}) => {
    const [review, setReview] = useState('')
    const [stars, setStars] = useState('')
    const [spotName, setSpotName] = useState('')
    //const history = useHistory()
    const [responseErrors, setResponseErrors] = useState([])

    const { id } = useParams()
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newReview = {
            review, stars
        }
       // console.log('is the new review part working', newReview)
        const response = await dispatch(addSpotReview(newReview, id ))

        if(response.errors) {
            setResponseErrors(Object.values(response.errors))
        } else {
            dispatch(getSpotReviews(id)).then(setShowModal(false))
            // history.push(`/spots/${id}`)
        }
    }
    const oneSpot = useSelector(state=>{return state.oneSpot[id]})
      // let spot = dispatch(getOneSpot(id))

        // if(oneSpot) {
        //     setSpotName(oneSpot.name)
        // }


    return (
        <div className='realModalOutside'>
            <div className='realModalContent'>
                 <button className="cancelButton" onClick={() => setShowModal(false)}>X</button>
                 <h3>{oneSpot.name} Review </h3>

            <div className='LogInErrors'>
                <ul className='ulNoBullets'>
                {responseErrors.map(err => (
                    <li key={err}>{err}</li>
                ))}
                </ul>
            </div>
            {/* <button className="cancelButton"><NavLink to={`/spots/${id}`}>X</NavLink></button> */}

                <form onSubmit={handleSubmit} className="CreateSpotForm">
                <div>
                <textarea
                    className="CreateSpotDescriptionBox"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    name='review'
                    placeholder='Please write about your stay here...'
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
                <button type='submit' className="createButton" >{spotName} Review</button>


                </form>
            </div>

        </div>
    )

}

export default AddReviewForm
