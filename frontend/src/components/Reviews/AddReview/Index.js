import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
//import addReview

const AddReviewForm = ({spots}) => {
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)
    const [spotName, setSpotName] = useState('')

    const { id } = useParams()
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newReview = {
            review, stars
        }
        //const response = await dispatch(addReview(newReview))
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
                <form onSubmit={handleSubmit} className="CreateSpotForm">
                    <h1>{spotName} Review</h1>
                    {/* <div>
                    Description
                </div> */}
                <div>
                    <div>Description:</div>
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    name='review'
                    placeholder='Please write about your stay here...'
                    rows='2'
                ></textarea>
                {/* <div></div> */}
                </div>
                <div>
                    <div>
                    Stars:
                    </div>
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
                <button className="createButton"><NavLink to={'/'}>Cancel</NavLink></button>

                </form>
            </div>

        </div>
    )

}

export default AddReviewForm
