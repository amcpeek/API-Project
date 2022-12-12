import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { updateSpotReview, getSpotReviews } from '../../../store/review'
import { useHistory } from 'react-router-dom'

const UpdateReviewForm = () => {
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)
    const history = useHistory()
    const [responseErrors, setResponseErrors] = useState([])

    const { reviewId, spotId } = useParams()
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newReview = { review, stars  }
        const response = await dispatch(updateSpotReview(newReview, reviewId ))
        if(response.errors) {
            setResponseErrors(Object.values(response.errors))
        } else {
            history.goBack()
        }

    }

    useEffect(() => {
        dispatch(getSpotReviews(spotId))
    }, [dispatch])

    const allReviews = useSelector(state => {return Object.values(state.reviews)})
    const currReview = allReviews.find(review => review.id == reviewId)

    useEffect(() => {
        if(currReview) {
            setReview(currReview.review)
            setStars(currReview.stars)
        }

    }, [currReview])




    return (
        <div className='modalOutside'>
            <div className='modalContent'>
            <div className='LogInErrors'>
            <button className="cancelButton"><NavLink to={`/spots/${review.spotId}`}>X</NavLink></button>
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
