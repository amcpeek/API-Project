import { csrfFetch } from './csrf';
import { getOneSpot } from './oneSpot.js'

const GET_CURRENT_USERS_BOOKINGS = 'bookings/GET_USERS_OWNERS_BOOKINGS' //#19
const GET_BOOKINGS_BY_SPOT_ID = 'bookings/GET_BOOKINGS_BY_SPOT_ID' //#20
const ADD_BOOKING = 'bookings/ADD_BOOKING' // #21
const UPDATE_BOOKING = 'bookings/UPDATE_BOOKING' //#22
const REMOVE_BOOKING = 'bookings/REMOVE_BOOKING' //#23

/* -- actions -- */

//#19
export const getUsersBookingsAction = (userBookings) => {
    return {
        type: GET_CURRENT_USERS_BOOKINGS,
        userBookings
    }
}

//#20
export const getSpotBookingsAction = (spotBookings) => { //spot id?
    return {
        type: GET_BOOKINGS_BY_SPOT_ID,
        spotBookings
    }
}

//#21
export const addSpotBookingAction = (spotBooking) => {
    return {
     type: ADD_BOOKING,
     spotBooking
    }
 }

//#22
export const updateSpotBookingAction = (booking, bookingId) => {
    return {
        type: UPDATE_BOOKING,
        booking,
        bookingId
    }
}

//#23
export const removeSpotBookingAction = (bookingId) => {
    return {
        type: REMOVE_BOOKING,
        bookingId
    }
}

/* -- thunk action creators -- */

//#19
export const getUsersBookings = (userId) => async dispatch => {
    const response = await fetch(`/api/bookings/current`)
    if(response.ok) {
        const allUserBookings = await response.json()
        dispatch(getUsersBookingsAction(allUserBookings))
    }
}

//#20
export const getSpotBookings = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}/bookings`)
   // console.log('is there something wrong with spot id', spotId)
    if(response.ok) {
        const spotBookings = await response.json()
        dispatch(getSpotBookingsAction(spotBookings))
    // } else {
    //     const spotBookings = {Bookings: []}
    //     dispatch(getSpotBookingsAction(spotBookings))
    }
}

//#21
export const addSpotBooking = (spotBooking, id) => async dispatch => { //booking info + spotId
    // console.log('is it getting to the reducer', spotBooking, id)
     const response = await csrfFetch(`/api/spots/${id}/bookings`, {
         method: 'POST',
         body: JSON.stringify(spotBooking)
     }).then(async (res) => {
        console.log('are we getting to the then?')
         dispatch(getOneSpot(id))
         return await res.json()
     }).catch( async error => {
        let newVar = await error.json()
        console.log('are we getting to the catch?', newVar)
         return newVar
     })
     return response
 }


//#22

export const updateSpotBooking = (booking, bookingId, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        body: JSON.stringify(booking)
    }).then(async (res) => {
        // if(response.ok) {
        //     const booking = await response.json()
            dispatch(updateSpotBookingAction(booking, bookingId)) //im not sure this is needed?
            dispatch(getOneSpot(spotId))

       // }
        return await res.json()
    }).catch( async error => {
        return await error.json()
    })
    return response
}

//#23

export const removeBooking = (bookingId, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: 'DELETE'
    })
    if(response.ok) {
        const bookings = await response.json()
        dispatch(removeSpotBookingAction(bookingId))
        dispatch(getOneSpot(spotId))
    }
}


/* -- reducer -- */
export default function bookingsReducer (state = {}, action) {
    switch(action.type) {
        //#19
        case GET_CURRENT_USERS_BOOKINGS:
            const usersBookings = {}
            action.userBookings.Bookings.forEach(booking => {
                usersBookings[booking.id] = booking
            })
            return {
                ...state,
                ['currentUsersBookings']:usersBookings
            }
        //#20
        case GET_BOOKINGS_BY_SPOT_ID:
            //console.log('yepyep', action.spotBookings)
            const allSpotBookings = {}
            action.spotBookings.Bookings.forEach(booking => {
                allSpotBookings[booking.id] = booking
            })
            return {
                ...allSpotBookings
            }
        //#21
        case ADD_BOOKING:
            const copyState2 =  {...state}
            return {
                //I think it can just be ...action.booking, but I don't think it hurts to do it this way
                ...copyState,
               [action.bookingId] : {...copyState[action.bookingId], ...action.booking}
            }
        //#22
        case UPDATE_BOOKING:
             const copyState =  {...state}
            return {
               ...copyState,
               [action.bookingId] : {...copyState[action.bookingId], ...action.booking}
            }
        //#23
        case REMOVE_BOOKING:
            const newState = {...state}
            delete newState[action.bookingId]
            return newState
        default:
            return state
    }
}
