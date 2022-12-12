import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { addSpotReview } from '../../../store/review'
import { useHistory } from 'react-router-dom'

const AddReviewForm = ({spots}) => {
    const [review, setReview] = useState('')
    const [stars, setStars] = useState('')
    const [spotName, setSpotName] = useState('')
    const history = useHistory()
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
            history.push(`/spots/${id}`)
        }
    }
    let spot
    useEffect(() => {
        spot = spots.find(spot => spot.id.toString() === id);

        if(spot) {
            setSpotName(spot.name)
        }
    }, [spots])

    return (
        <div className='modalOutside'>
            <div className='modalContent'>

            <div className='LogInErrors'>
                <ul className='ulNoBullets'>
                {responseErrors.map(err => (
                    <li key={err}>{err}</li>
                ))}
                </ul>
            </div>
            <button className="cancelButton"><NavLink to={`/spots/${id}`}>X</NavLink></button>
            <h3>Add Your Review </h3>
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
