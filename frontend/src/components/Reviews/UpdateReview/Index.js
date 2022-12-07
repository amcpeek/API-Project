import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { updateSpotReview, getSpotReviews } from '../../../store/review'
import { useHistory } from 'react-router-dom'

const UpdateReviewForm = () => {
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)
    const history = useHistory()

    const { reviewId, spotId } = useParams()
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newReview = { review, stars  }
        const response = await dispatch(updateSpotReview(newReview, reviewId ))
        history.goBack()
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
                <form onSubmit={handleSubmit} className="CreateSpotForm">
                    <h1>Review</h1>
                <div>
                    <div>Description:</div>
                <textarea
                    type='text'
                    onChange={(e) => setReview(e.target.value)}
                    value={review}
                    placeholder='Please write about your stay here...'
                    name='review'
                    rows='2'
                ></textarea>
                </div>
                <div>
                    <div> Stars: </div>
                <input
                 type='number'
                 placeholder='Stars'
                 min='1'
                 max='5'
                 value={stars}
                 onChange={(e) => setStars(e.target.value)}
                />
                </div>
                <button type='submit' className="createButton" >Submit</button>
                <button className="createButton"><NavLink to={`/`}>Cancel</NavLink></button>

                </form>
            </div>

        </div>
    )

}

export default UpdateReviewForm
