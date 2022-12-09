import { csrfFetch } from './csrf';

const GET_CURRENT_USERS_REVIEWS = 'reviews/GET_CURRENT_USERS_REVIEWS' //#13
const GET_SPOT_REVIEWS = 'reviews/GET_SPOT_REVIEWS' //#14
const ADD_SPOT_REVIEW = 'reviews/ADD_REVIEW' //#15
const ADD_REVIEW_IMAGE ='reviews/ADD_REVIEW_IMAGE' //#16 maybe in a different reducer?
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW' //#17
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW' //#18
const CLEAR_REVIEWS = 'reviews/CLEAR_REVIEWS'

/* -- actions -- */

//#14 get spot reviews
export const getSpotReviewsAction = (spotReviews) => {
    return {
        type: GET_SPOT_REVIEWS,
        spotReviews
    }
}

//#15
export const addSpotReviewAction = (spotReview) => {
   return {
    type: ADD_SPOT_REVIEW,
    spotReview
   }
}

//#17
export const updateSpotReviewAction = (review) => {
    return {
        type: UPDATE_REVIEW,
        review
    }
}

//#18
export const removeSpotReviewAction = (reviewId) => {
    return {
        type: REMOVE_REVIEW,
        reviewId
    }
}

export const clearSpotReviewsStoreAction = () => {
    return {
        type: CLEAR_REVIEWS
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
    //not getting anything back, so not recieving any errors
}

export const updateSpotReview = (review, reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        body: JSON.stringify(review)
    })
    if(response.ok) {
        const review = await response.json()
        dispatch(updateSpotReviewAction(review))
    }
}

export const removeReview = (reviewId) => async dispatch => {
    await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
    })
    // if(response.ok) {
    //     const reviews = await response.json()
    //     dispatch(removeSpotReviewAction(reviewId))
    // }
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
        case ADD_SPOT_REVIEW: //NOT NEEDED bc the getReviews
        //goes to the backend and gets it there
        case CLEAR_REVIEWS: //just for clearing the useEffect
            return {}
        case UPDATE_REVIEW:
            return {
                ...state,
                [action.review.id]: action.review
            }
        case REMOVE_REVIEW:
            const newState = {...state}
            delete newState[action.reviewId]
            return newState



        default:
            return state
    }
}
