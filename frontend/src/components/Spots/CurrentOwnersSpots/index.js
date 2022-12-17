import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  NavLink } from 'react-router-dom';
import {  getCurrentOwnersSpots } from '../../../store/spot'
import './CurrentOwnersSpots.css'
import { getUsersReviews, removeReview } from '../../../store/review';
import UpdateReviewModal from '../../Reviews/UpdateReview/UpdateReviewModal'
import { useHistory } from 'react-router-dom';
let otherSrc = 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-21426276/original/7cceab2c-f3f2-4ed6-86b4-79bb32746dc0.jpeg?im_w=1200'

const CurrentOwnersSpots = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const [newSrc, setNewSrc] = useState('')

    useEffect(() => {
      dispatch(getCurrentOwnersSpots());
    }, [dispatch]);

    useEffect(() => {
      dispatch(getUsersReviews());
    }, [dispatch]);

    const ownersSpots = useSelector(state => {
      if(state.spots.currentOwnersSpots) {
        return Object.values(state.spots.currentOwnersSpots)
      } else {
        return []
      }
    })

   const userFirstName = useSelector(state => {
    if(state.session.user.firstName) {
      return  state.session.user.firstName
    }
   })


    const usersReviews = useSelector(state => {
      if(state.reviews.currentUsersReviews) {
        return Object.values(state.reviews.currentUsersReviews)
      } else {
        return []
      }
    })

    // usersReviews.map((review) => {
    //   console.log('can I see a single review', review.avgRating)

    // })

    const handleRemoveReview = (reviewId) => {
     // console.log('what is review id', reviewId)
      dispatch(removeReview(reviewId))
      history.go(0)
    }

    //usersReviews && usersReviews[0].User.firstName


    return (
      <div className='CurrentOwnersPage'>
        <h2 className='currentOwnersTitle'>{userFirstName}'s Homes</h2>
        <div className="CurrentHomeList">
                {ownersSpots.map(({ id, name, previewImage, city, state, description, price, avgRating }) => (
                  <div className="AllSpotsImages" key={id}>
                    <NavLink to={`/spots/${id}`}>
                                <div>
                                <img
                            src={previewImage}
                            alt={name}
                            // onError={(e)=>{
                            //   if(e.target.src !== otherSrc) {
                            //     setNewSrc(otherSrc)
                            //     e.target.src = otherSrc
                            //   }
                            //   }}

                            />
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


        <h2 className='currentOwnersTitle'>{userFirstName}'s Reviews</h2>



             <div className="CurrentOwnersReviews">


                    {usersReviews && usersReviews.map((review) => (
                       <NavLink to={`/spots/${review.spotId}`}>
                      <div  key={review.id} className='insideCurrentOwner'>
                              <div className="SingleSpotReviewBox" key={review.id}>
                                <h4 className='underlined'>{review.Spot.name}</h4>
                                <h5>{review.Spot.city}, {review.Spot.state}</h5>
                                    <div><i className="material-symbols-outlined">star </i> {review.stars} stars</div>
                                    <p>{review.review}</p>

                                    {/* {<><UpdateReviewModal/></>}
                                    {<button onClick={()=> handleRemoveReview(review.id) }>
                                      <i className="material-symbols-outlined">
                                        delete
                                        </i></button>} */}
                              </div>
                      </div>
                      </NavLink>
                    ))}
              </div>
      </div>
    );
}

export default CurrentOwnersSpots
