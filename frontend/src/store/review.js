import { csrfFetch } from './csrf';
 import { getOneSpot } from './oneSpot.js'


const GET_CURRENT_USERS_REVIEWS = 'reviews/GET_CURRENT_USERS_REVIEWS' //#13
const GET_SPOT_REVIEWS = 'reviews/GET_SPOT_REVIEWS' //#14
const ADD_SPOT_REVIEW = 'reviews/ADD_REVIEW' //#15
// const ADD_REVIEW_IMAGE ='reviews/ADD_REVIEW_IMAGE' //#16 will not be using
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
export const updateSpotReviewAction = (review, reviewId) => {
    return {
        type: UPDATE_REVIEW,
        review,
        reviewId
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

export const getUsersReviewsAction = (userReviews) => {
    return {
        type: GET_CURRENT_USERS_REVIEWS,
        userReviews
    }

}

/* -- thunk action creators -- */
export const getSpotReviews = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}/reviews`)
   // console.log('is there something wrong with spot id', spotId)
    if(response.ok) {
        const spotReviews = await response.json()
        dispatch(getSpotReviewsAction(spotReviews))
    // } else {
    //     const spotReviews = {Reviews: []}
    //     dispatch(getSpotReviewsAction(spotReviews))
    }
}

export const addSpotReview = (spotReview, id) => async dispatch => {
   // console.log('is it getting to the reducer', spotReview, id)
    const response = await csrfFetch(`/api/spots/${id}/reviews`, {
        method: 'POST',
        body: JSON.stringify(spotReview)
    }).then(async (res) => {
        dispatch(getOneSpot(id))
        return await res.json()
    }).catch( async error => {
        return await error.json()
    })
    return response
}

export const updateSpotReview = (review, reviewId, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        body: JSON.stringify(review)
    }).then(async (res) => {
        // if(response.ok) {
        //     const review = await response.json()
            dispatch(updateSpotReviewAction(review, reviewId)) //im not sure this is needed?
            dispatch(getOneSpot(spotId))

       // }
        return await res.json()
    }).catch( async error => {
        return await error.json()
    })
    return response
}


export const getUsersReviews = (userId) => async dispatch => {
    const response = await fetch(`/api/reviews/current`)
    if(response.ok) {
        const allUserReviews = await response.json()
        dispatch(getUsersReviewsAction(allUserReviews))
    }
}


export const removeReview = (reviewId, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
    })
    if(response.ok) {
        const reviews = await response.json()
        dispatch(removeSpotReviewAction(reviewId))
        dispatch(getOneSpot(spotId))
    }
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
            /* - NOT IN USE */
      //  case ADD_SPOT_REVIEW: //not currently being used, get reviews does this from the backend, not ideal practice

        case CLEAR_REVIEWS: //just for clearing the useEffect
            return {}
        case UPDATE_REVIEW:
            // console.log('BECHTOLD',action.review, action.reviewId)
            // console.log('currentState', state)
          //  const newReviewParts = { 'review': action.review.review, 'stars':action.review.stars}
             const copyState =  {...state}
            // newStateReviews.reviewId.review = action.review.review
            //newStateReviews.reviewId.stars = action.review.stars
            return {
               // ...state,
              //  [action.reviewId]:review = [action.review]


              //  ...state, //not proven to work
               // [action.reviewId]: ...newReviewParts
               ...copyState,
               [action.reviewId] : {...copyState[action.reviewId], ...action.review}

            //    ...newStateReviews

            }
        case REMOVE_REVIEW:
            const newState = {...state}
            delete newState[action.reviewId]
            return newState
        case GET_CURRENT_USERS_REVIEWS:
            // console.log('aksdhjf alksdjfalkshdjfghfjghnrfiunjk re4rvdfiuhrnejkviu')
            const usersReviews = {}
            action.userReviews.Reviews.forEach(review => {
                usersReviews[review.id] = review
            })
            return {
                ...state,
                ['currentUsersReviews']:usersReviews
            }



        default:
            return state
    }
}
