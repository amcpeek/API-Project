import { csrfFetch } from './csrf';
//import { useDispatch } from 'react-redux'


const GET_SPOTS = 'spots/GET_SPOTS' //#6
const GET_CURRENT_OWNERS_SPOTS = 'spots/GET_CURRENT_OWNERS_SPOTS' //#7
//#8  one spot is in the oneSpot store, eventually move it here
const ADD_SPOT = 'spots/ADD_SPOT' // #9
const ADD_SPOT_IMAGE = 'spot/ADD_SPOT_IMAGE'// #10
const UPDATE_SPOT = 'spots/UPDATE_SPOT' //#11
const REMOVE_SPOT = 'spots/REMOVE_SPOT' //#12
const CLEAR_SPOTS = './spots/CLEAR_SPOTS'



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

//10 post /:spotId/images
export const addSpotImageAction = (image) => { //example doesn't have spotImageId
    return {
        type: ADD_SPOT_IMAGE,
        image
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

export const clearOneSpotAction = () => {
    return {
        type: CLEAR_SPOTS
    }
}

/* -- thunk action creators */
//add in here you pass in the region optionally
export const getSpots = (category, filter) => async dispatch => { //
   // const response = await fetch(`/api/spots`)
   const response = await fetch(`/api/spots?${category}=${filter}`)
   // console.log('is this coming through', selectedRegion)
//
    if(response.ok) {
        const spots = await response.json()
        console.log('are we getting it back', spots.Spots)

        dispatch(getSpotsAction(spots.Spots))
    }
}

//NOTE: used .then .catch
export const addSpot = (spot) => async dispatch => {
    const response = await csrfFetch(`/api/spots`, {
        //the response is not set to the return of the fetch until after all .then and .catch are completed
        method: 'POST',
       body: JSON.stringify(spot)

    }).then(async (res) => {  //above 400, that thing is a res, send it
        return await res.json()
    } ).catch( async error => { //below 400, that thing is an error, send it
       // console.log('123456789',error.json())
         return await error.json()
    })
    return response
}

//NOTE: used try/catch
export const updateSpot = (spot) => async dispatch => {
    try{
        let response = await csrfFetch(`/api/spots/${spot.id}`, {
            method: 'PUT',
            body: JSON.stringify(spot)
        })
        console.log('1234321', response)
        //this whole if statement is unnecessary bc I don't use it for update
        if(response.ok) { // as written, will not have errors you can read, it says 'readable stream"

            const newSpot =  await response.json()
            dispatch(updateSpotAction(newSpot)) //not needed if updating state from loadSpots

        }
    } catch(error) {
       // console.log('987654321', error.json())
        return  await error.json()
    }

}

export const removeSpot = (spotId) => async dispatch => {
    const response =  await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })
    if(response.ok) {
         dispatch(removeSpotAction(spotId))
     

    }

}

export const getCurrentOwnersSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots/current')
    //
    if(response.ok) {
        const spots = await response.json()
        dispatch(getCurrentOwnersSpotsAction(spots))
    }

}


export const addSpotImage = (spotImage) => async dispatch => {
    await csrfFetch(`/api/spots/${spotImage.spotId}/images`, {
       method: 'POST',
       body: JSON.stringify(spotImage)
   })
   // if (response.ok) {
   //     const item = await response.json()
   //     dispatch()
   // }
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
               // ...state,
                ...allSpots
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
        case CLEAR_SPOTS:
            return {}
        // case ADD_SPOT_IMAGE: //not in use, just retrieved from the backend

        default:
            return state
    }
}
