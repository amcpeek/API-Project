import { csrfFetch } from './csrf';

const GET_SPOTS = 'spots/GET_SPOTS' //#6
const GET_CURRENT_OWNERS_SPOTS = 'spots/GET_CURRENT_OWNERS_SPOTS' //#7
//#8  one spot is in the oneSpot store, eventually move it here
const ADD_SPOT = 'spots/ADD_SPOT' // #9
// #10 add image by spot id is in the spotImage reducer
const UPDATE_SPOT = 'spots/UPDATE_SPOT' //#11
const REMOVE_SPOT = 'spots/REMOVE_SPOT' //#12



/* -- actions -- */
//6 get all /spots
export const getSpotsAction = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    }
}

//9 post /spots

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

//7 get all by current user /spots/current
export const getCurrentOwnersSpotsAction = (spots) => {
    return {
        type: GET_CURRENT_OWNERS_SPOTS,
        spots
    }
}


/* -- thunk action creators */

export const getSpots = () => async dispatch => {
    const response = await fetch(`/api/spots`)
    if(response.ok) {
        const spots = await response.json()
        dispatch(getSpotsAction(spots.Spots))
    }
}

export const addSpot = (spot) => async dispatch => {
    const response = await csrfFetch(`/api/spots`, {
        method: 'POST',
       body: JSON.stringify(spot)
    })
    return await response.json()
}

export const updateSpot = (spot) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        body: JSON.stringify(spot)
    })
    if(response.ok) {
        const spot = await response.json()
        dispatch(updateSpotAction(spot))
    }
}

export const removeSpot = (spotId) => async dispatch => {
     await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })
}

export const getCurrentOwnersSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots/current')
    if(response.ok) {
        const spots = await response.json()
        dispatch(getCurrentOwnersSpotsAction(spots))
    }

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
           // console.log('what is action',action)
            action.spots.forEach(spot => { //wont work if spots isn't an array
                allSpots[spot.id] = spot
            })
            return {
                ...state,
                ...allSpots,
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
        case GET_CURRENT_OWNERS_SPOTS:
            const nextLevel = {}

            //const currentOwnersSpots = {}
            //console.log('action', action)
            action.spots.forEach(spot => {
                nextLevel[spot.id] = spot
            })
            //console.log('does next level run', nextLevel)
            return {
                ...state,
                ['currentOwnersSpots']: nextLevel
            }
        default:
            return state
    }
}
