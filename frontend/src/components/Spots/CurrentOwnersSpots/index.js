import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  NavLink } from 'react-router-dom';
import { getSpots, getCurrentOwnersSpots } from '../../../store/spot'
import './CurrentOwnersSpots.css'
import { getUsersReviews, removeReview } from '../../../store/review';
import UpdateReviewModal from '../../Reviews/UpdateReview/UpdateReviewModal'
import { useHistory } from 'react-router-dom';

const CurrentOwnersSpots = () => {
    const dispatch = useDispatch();
    const history = useHistory()

    useEffect(() => {
      dispatch(getCurrentOwnersSpots());
    }, []);

    useEffect(() => {
      dispatch(getUsersReviews());
    }, []);




    const ownersSpots = useSelector(state => {
      if(state.spots.currentOwnersSpots) {
        return Object.values(state.spots.currentOwnersSpots)
      } else {
        return []
      }
    })


    const usersReviews = useSelector(state => {
      if(state.reviews.currentUsersReviews) {
        return Object.values(state.reviews.currentUsersReviews)
      } else {
        return []
      }
    })

    usersReviews.map((review) => {
      console.log('can I see a single review', review.avgRating)

    })

    const handleRemoveReview = (reviewId) => {
      console.log('what is review id', reviewId)
      dispatch(removeReview(reviewId))
      history.go(0)
    }


    return (
      <div className='CurrentOwnersPage'>
        <h2 className='currentOwnersTitle'>Your Listed Homes</h2>
        <div className="CurrentHomeList">
                {ownersSpots.map(({ id, name, previewImage, city, state, description, price, avgRating }) => (
                  <div className="AllSpotsImages" key={id}>
                    <NavLink to={`/spots/${id}`}>
                                <div>
                                <img
                            src={previewImage}
                            alt={name}/>
                                </div >
                                <div className='SpaceBetween'>
                                <div className='greyText' id="CityState">{city}, {state}</div>
                                <div>
                                <i className="material-symbols-outlined">star </i>
                                {avgRating}
                                </div>

                                </div>
                      <div className='greyText'>{name}</div>
                      <div className='greyText'>Apr 3-8</div>
                      <div className='justNextToEachOther'> <div className='bold'>${price}</div>  night</div>
                    </NavLink>
                  </div>
                ))}
        </div>

        <h2 className='currentOwnersTitle'>Your Reviews</h2>



             <div className="CurrentOwnersReviews">


                    {usersReviews && usersReviews.map((review) => (
                      <div  key={review.id}>
                              <div className="SingleSpotReviewBox" key={review.id}>
                                    <div><i className="material-symbols-outlined">star </i> {review.stars} stars</div>
                                    <div> <i className="material-symbols-outlined">face</i> </div>
                                    <p>{review.review}</p>

                                    {<><UpdateReviewModal/></>}
                                    {<button onClick={()=> handleRemoveReview(review.id) }>
                                      <i className="material-symbols-outlined">
                                        delete
                                        </i></button>}
                              </div>
                      </div>
                    ))}
              </div>
      </div>
    );
}

export default CurrentOwnersSpots
