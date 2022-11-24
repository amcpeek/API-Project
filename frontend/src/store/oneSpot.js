// import { csrfFetch } from './csrf';

const GET_ONE_SPOT = 'spots/GET_ONE_SPOT'

//8 get one spot /spots/:spotId
export const getOneSpotAction = (spot) => {
    return {
        type: GET_ONE_SPOT,
        spot
    }
}

export const getOneSpot = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}`)

    if(response.ok) {
        const oneSpot = await response.json()
      //  console.log('are there spots in here', spots) // works
      //console.log('is it an array from the backend', oneSpot)
        dispatch(getOneSpotAction(oneSpot))
    }
}

export default function oneSpotReducer (state = {}, action) {
    switch(action.type) {
        case GET_ONE_SPOT:
            const newSpot = {}
            //console.log('put the action here',action)
            newSpot[action.spot.id] = action.spot
            //console.log('newSpot', newSpot)
             return {
                ...newSpot,
                 ...state
             }
        default:
            return state
    }
}
