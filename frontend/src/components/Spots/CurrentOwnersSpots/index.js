import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  NavLink } from 'react-router-dom';
import { getSpots, getCurrentOwnersSpots } from '../../../store/spot'
import './CurrentOwnersSpots.css'

const CurrentOwnersSpots = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getCurrentOwnersSpots());
    }, []);


    const ownersSpots = useSelector(state => {
      if(state.spots.currentOwnersSpots) {
        return Object.values(state.spots.currentOwnersSpots)
      } else {
        return []
      }
    })



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

             {/* <div className="CurrentOwnersReviews">
                      <h3>Reviews</h3>
                    {allReviews.map((review) => (
                      <div key={review.id}>
                              <div className="SingleSpotReviewBox" key={review.id}>
                                    <div><i className="material-symbols-outlined">star </i> {review.stars} stars</div>
                                    <div> <i className="material-symbols-outlined">face</i> {review.User.firstName} </div>
                                    <p>{review.review}</p>
                                    {review.userId === currentUserId &&  <><UpdateReviewModal/></>}
                                    {review.userId === currentUserId && <button onClick={()=> handleRemoveReview(review.id) }>
                                      <i className="material-symbols-outlined">
                                        delete
                                        </i></button>}
                              </div>
                      </div>
                    ))}
              </div> */}
      </div>
    );
}

export default CurrentOwnersSpots
