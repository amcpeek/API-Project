import { csrfFetch } from './csrf';

const GET_CURRENT_USERS_REVIEWS = 'reviews/GET_CURRENT_USERS_REVIEWS' //#13
const GET_SPOT_REVIEWS = 'reviews/GET_SPOT_REVIEWS' //#14
const ADD_REVIEW = 'reviews/ADD_REVIEW' //#15
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


/* -- thunk action creators -- */
export const getSpotReviews = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}/reviews`)
    if(response.ok) {
        const spotReviews = await response.json()
        dispatch(getSpotReviewsAction(spotReviews))
    } else {
        const spotReviews = {Reviews: []}
        dispatch(getSpotReviewsAction(spotReviews))
    }
}


/* -- reducer -- */
export default function reviewsReducer (state = {}, action) {
    switch(action.type) {
        case GET_SPOT_REVIEWS:
           // console.log('yepyep', action.spotReviews)
            const allSpotReviews = {}
            action.spotReviews.Reviews.forEach(review => {
                allSpotReviews[review.id] = review
            })
            return {
                ...allSpotReviews
            }

        default:
            return state
    }
}
