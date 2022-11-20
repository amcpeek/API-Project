const GET_SPOTS = 'spots/GET_SPOTS'
const ADD_SPOT = 'spots/ADD_SPOT'
const UPDATE_SPOT = 'spots/UPDATE_SPOT'
const REMOVE_SPOT = 'spots/REMOVE_SPOT'

/* -- actions -- */
//6 get all /spots
//7 get all by current user /spots/current
//8 get one spot /spots/:spotId
export const getSpotsAction = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    }
}
//9 post /spots
//10 post /:spotId/images
export const addSpotAction = (spot) => {
    return {
        type: ADD_SPOT,
        spot
    }
}
//11 put /:spotId
export const updateSpotAction = (spot) => {
    return {
        type: UPDATE_SPOT,
        spot
    }
}
//12 delete /:spotId
export const removeSpotAction = (spotId) => {
    return {
        type: REMOVE_SPOT,
        spotId
    }
}

/* -- thunk action creators */

export const getSpots = () => async dispatch => {
    const response = await fetch(`/api/spots`)

    if(response.ok) {
        const spots = await response.json()
        console.log('are there spots in here', spots) // works
        dispatch(getSpotsAction(spots.Spots))
    }
}

export const addSpot = (spot) => async dispatch => {
     await fetch(`/api/spots`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(spot)
    })
}

export const updateSpot = (spot) => async dispatch => {
    const response = await fetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spot)
    })
    if(response.ok) {
        const spot = await response.json()
        dispatch(updateSpotAction(spot))
        return spot
    }
}

export const removeSpot = (spotId) => async dispatch => {
     await fetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })
}

/* -- selectors */ //not sure if this is needed with thunk action creators?
// export const getAllSpots = (state) => {
//     return Object.values(state.spots)
// }

/* -- reducer -- */


export default function spotsReducer (state = {}, action) {
    switch(action.type) {
        case GET_SPOTS:
            const allSpots = {}
            console.log('what is action',action)
            action.spots.forEach(spot => { //wont work if spots isn't an array
                allSpots[spot.id] = spot
            })
            return {
                ...allSpots,
                ...state
            }
        case ADD_SPOT:
        if(!state[action.spot.id]) {
            return {
                ...state,
                [action.spot.id]: action.spot
            }
        }
        return state //not sure about this line
        case UPDATE_SPOT:
            return {
                ...state,
                [action.spot.id]: action.spot
            }
        case REMOVE_SPOT:
            const newState = {...state}
            delete newState[action.spotId]
            return newState
        default:
            return state
    }
}
