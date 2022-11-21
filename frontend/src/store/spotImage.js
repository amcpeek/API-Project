import { csrfFetch } from './csrf';

const ADD_SPOT_IMAGE = 'spot/ADD_SPOT_IMAGE'

/* -- actions -- */
//10 post /:spotId/images
export const addSpotImageAction = (image) => { //example doesn't have spotImageId
    return {
        type: ADD_SPOT_IMAGE,
        image
    }
}

/* -- thunk action creators */

export const addSpotImage = (spotImage) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotImage.spotId}/images`, {
        method: 'POST',
        body: JSON.stringify(spotImage)
    })
    // if (response.ok) {
    //     const item = await response.json()
    //     dispatch()
    // }
}

/* -- reducer -- */

export default function spotImagesReducer (state = {}, action) {
    switch(action.type) {
        case ADD_SPOT_IMAGE:
            // ...state,
            // [action.spot.spotId]: {
            //     ...state[action.spot.spotId],
            // }
            default:
                return state
     }
}
