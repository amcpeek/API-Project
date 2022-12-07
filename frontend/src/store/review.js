import { csrfFetch } from './csrf';

const GET_CURRENT_USERS_REVIEWS = 'reviews/GET_CURRENT_USERS_REVIEWS' //#13
const GET_SPOT_REVIEWS = 'reviews/GET_SPOT_REVIEWS' //#14
const ADD_SPOT_REVIEW = 'reviews/ADD_REVIEW' //#15
const ADD_REVIEW_IMAGE ='reviews/ADD_REVIEW_IMAGE' //#16 maybe in a different reducer?
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW' //#17
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW' //#18

/* -- actions -- */

//#14 get spot reviews
export const getSpotReviewsAction = (spotReviews) => {
    return {
        type: GET_SPOT_REVIEWS,
        spotReviews
    }
}

export const addSpotReviewAction = (spotReview) => {
   return {
    type: ADD_SPOT_REVIEW,
    spotReview
   }
}


/* -- thunk action creators -- */
export const getSpotReviews = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}/reviews`)
    if(response.ok) {
        const spotReviews = await response.json()
        dispatch(getSpotReviewsAction(spotReviews))
    // } else {
    //     const spotReviews = {Reviews: []}
    //     dispatch(getSpotReviewsAction(spotReviews))
    }
}

export const addSpotReview = (spotReview, id) => async dispatch => {
    console.log('is it getting to the reducer', spotReview, id)
    await csrfFetch(`/api/spots/${id}/reviews`, {
        method: 'POST',
        body: JSON.stringify(spotReview)
    })
}



/* -- reducer -- */
export default function reviewsReducer (state = {}, action) {
    switch(action.type) {
        case GET_SPOT_REVIEWS:
            //console.log('yepyep', action.spotReviews)
            const allSpotReviews = {}
            action.spotReviews.Reviews.forEach(review => {
                allSpotReviews[review.id] = review
            })
            return {
                ...allSpotReviews
            }
        case ADD_SPOT_REVIEW:


        default:
            return state
    }
}
