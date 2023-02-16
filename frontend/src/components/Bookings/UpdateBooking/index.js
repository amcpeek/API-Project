import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateSpotBooking, getSpotBookings } from '../../../store/booking'
import { getOneSpot } from '../../../store/oneSpot'


const UpdateBookingForm = ({showModal, setShowModal}) => {
    // const [booking, setBooking] = useState('')
    // const [stars, setStars] = useState(0)
    const [spotName, setSpotName] = useState('')
    const [responseErrors, setResponseErrors] = useState([])

    const { id } = useParams() //cant do this anymore, only getting spot id, but can get user id
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpotBookings(id))
    }, [dispatch, id])

    const oneSpot = useSelector(state=>{return state.oneSpot[id]})
    const allBookings = useSelector(state => {return Object.values(state.bookings.currentUsersBookings)}) //not best practice to put ob.values inside, shoudl be outside

    const currentUserId = useSelector(state=>{
        if(state.session.user) {return state.session.user.id}
        else {return ''}
      })
    const currBooking = allBookings.find(booking => booking.userId === currentUserId)

    useEffect(() => {
        if(currBooking) {
            // setBooking(currBooking.booking)
            // setStars(currBooking.stars)
        }
        // console.log('ghjkjhghjkjhjkjhjkjhjkjhjh', oneSpot)
        if(oneSpot) {
            // console.log('what is oneSpot', oneSpot)
            setSpotName(oneSpot.name)
        }

    }, [currBooking, oneSpot])



    const handleSubmit = async (e) => {
        e.preventDefault()
        const newBooking = { booking, stars  }
        const response = await dispatch(updateSpotBooking(newBooking, currBooking.id, id ))
        if(response.errors) {

            setResponseErrors(Object.values(response.errors))
        } else {
         //   getOneSpot(id)
            setShowModal(false)

          //this line of code does nothing anyway
          //  dispatch(getSpotBookings(spotId)).then(setShowModal(false))
        }
    }

    //the add handle submit
    //  const handleSubmit = async (e) => {
    //     console.log('current frontend format', start, end)
    //     e.preventDefault()
    //     let startDate = start
    //     let endDate = end
    //     const newBooking = {
    //         startDate, endDate
    //     }
    //    // console.log('is the new booking part working', newBooking)
    //     const response = await dispatch(addSpotBooking(newBooking, id ))
    //     console.log('is it getting to the add booking form?', response)

    //     if(response.errors) {

    //         setResponseErrors(Object.values(response.errors))
    //     } else {
    //         dispatch(getSpotBookings(id)).then(setShowModal(false))
    //         history.push(`/spots/current`)
    //     }
    // }





    return (
        <div className='realModalOutside'>
            <div className='realModalContent'>
            <div className='outerFormTop'>
            <div className='formTop'>
            {/* <button className="cancelButton"><NavLink to={`/spots/${booking.spotId}`}>X</NavLink></button> */}
            <button className="cancelButton" onClick={() => setShowModal(false)}>X</button>
            <h3 className='nowrapBookings'>Edit Your Booking of '{spotName}' </h3>
            <div className='LogInErrors'>


                <ul className='ulNoBullets'>
                {responseErrors.map(err => (
                    <li key={err}>{err}</li>
                ))}
                </ul>
            </div>
            </div>
             </div>
                <form onSubmit={handleSubmit} className="CreateSpotForm">
                <div>
                <textarea
                    className="CreateSpotDescriptionBox roundTopFields"
                    type='text'
                    onChange={(e) => setBooking(e.target.value)}
                    value={booking}
                    placeholder='Please write about your stay here...'
                    name='booking'
                    rows='2'
                ></textarea>
                </div>
                <div>
                <input
                className='roundBottomFields'
                 type='number'
                 placeholder='Stars'
                 min='1'
                 max='5'
                 value={stars}
                 onChange={(e) => setStars(e.target.value)}
                />
                </div>
                <button type='submit' className="createButton" >Update Booking</button>
                {/* <button className="createButton"><NavLink to={`/`}>Cancel</NavLink></button> */}

                </form>
            </div>

        </div>
    )

}

export default UpdateBookingForm
