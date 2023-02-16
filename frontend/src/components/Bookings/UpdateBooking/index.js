import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateSpotBooking, getUsersBookings, } from '../../../store/booking'
import { getOneSpot } from '../../../store/oneSpot'
import { useHistory } from 'react-router-dom'


const UpdateBookingForm = ({showModal, setShowModal, sendBookingId}) => {
    const [responseErrors, setResponseErrors] = useState([])
    const dispatch = useDispatch()
    const history = useHistory()

    const currentUserId = useSelector(state=>{
        if(state.session.user) {return state.session.user.id}
        else {return ''}
      })

    useEffect(() => {
        dispatch(getUsersBookings(currentUserId))
    }, [dispatch, currentUserId])
    const allBookings = useSelector(state => {return Object.values(state.bookings.currentUsersBookings)})
    let currentBooking=''

    if(allBookings) {
        currentBooking = allBookings.find(booking => booking.id == sendBookingId.bookingId)
    }





      const newToday = new Date()

      const todayFormatted =  (new Intl.DateTimeFormat('default', { dateStyle: 'full' }).format(newToday))
      const options = {
          year: 'numeric', month: 'numeric', day: 'numeric',
          timeZone: 'America/Los_Angeles'
        };
      const fullDay = (new Intl.DateTimeFormat('default', options).format(newToday))
      let arrayDay = fullDay.split('/')
      if (arrayDay[1].length == 1) {  arrayDay[1] = `0${arrayDay[1]}` }
      if (arrayDay[0].length == 1) { arrayDay[0] = `0${arrayDay[0]}` }
      let today = `${arrayDay[2]}-${arrayDay[0]}-${arrayDay[1]}`

      let fullTom = new Date(fullDay)
      fullTom.setDate(fullTom.getDate() + 2)
      fullTom = (new Intl.DateTimeFormat('default', options).format(fullTom))
      console.log('fullTom', fullTom, 'fullDay', fullDay)

      let arrayTom = fullTom.split('/')
      if (arrayTom[1].length == 1) {  arrayTom[1] = `0${arrayTom[1]}` }
      if (arrayTom[0].length == 1) { arrayTom[0] = `0${arrayTom[0]}` }
      let dayAfterTomorrow = `${arrayTom[2]}-${arrayTom[0]}-${arrayTom[1]}`

      const [start, setStart] = useState(today) //maybe default is tomorrow
      const [end, setEnd] = useState(dayAfterTomorrow) //maybe default is 2 days after tomorrow

      useEffect(() => {
        if(currentBooking) {
            setStart(currentBooking.startDate)
            setEnd(currentBooking.endDate)
        }
      }, [currentBooking])



    // the add handle submit
     const handleSubmit = async (e) => {
        console.log('current frontend format', start, end)
        e.preventDefault()
        let startDate = start
        let endDate = end
        const newBooking = {
            startDate, endDate
        }
       // console.log('is the new booking part working', newBooking)
        const response = await dispatch(updateSpotBooking(newBooking, sendBookingId.bookingId ))
        // console.log('is it getting to the add booking form?', response)
        if(response.errors) {
            setResponseErrors(Object.values(response.errors))
        } else {
            dispatch(getUsersBookings(sendBookingId)).then(setShowModal(false))
            history.push(`/spots/current`)
        }
    }


    return (
        <div className='realModalOutside'>
        <div className='realModalContent'>
        <div className='outerFormTop'>
        <div className='formTop'>
             <button className="cancelButton" onClick={() => setShowModal(false)}>X</button>
             {currentBooking && (
 <h3 className='nowrapBookings'>Update Dates for "{currentBooking.Spot.name}"</h3>
             )}



        <div className='LogInErrors'>
            <ul className='ulNoBullets'>
            {responseErrors.map(err => (
                <li key={err}>{err}</li>
            ))}
            </ul>
        </div>
        </div>
         </div>
        {/* <button className="cancelButton"><NavLink to={`/spots/${id}`}>X</NavLink></button> */}

            <form onSubmit={handleSubmit} className="CreateSpotForm">

            <div>
            <input
             className='roundBottomFields'
             type='date'
             placeholder='2023-03-01' //tomorrow
             min={today} //tomorrow
            //  max='2030-01-01' //5 years out
             value={start}
             onChange={(e) => setStart(e.target.value)}
            />
            </div>
            <div>
            <input
             className='roundBottomFields'
             type='date'
             placeholder='2023-03-01' //tomorrow
             min={dayAfterTomorrow} //tomorrow
            //  max='2030-01-01' //5 years out
             value={end}
             onChange={(e) => setEnd(e.target.value)}
            />
            </div>
            <button type='submit' className="createButton" >Update Booking</button>


            </form>
        </div>

    </div>
    )

}

export default UpdateBookingForm
