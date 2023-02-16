import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  NavLink } from 'react-router-dom';
import {  getCurrentOwnersSpots } from '../../../store/spot'
import './CurrentOwnersSpots.css'
import { getUsersReviews, removeReview, getReviewsAboutCurrent } from '../../../store/review';
import UpdateReviewModal from '../../Reviews/UpdateReview/UpdateReviewModal'
import { useHistory } from 'react-router-dom';
import { restoreUser } from '../../../store/session'
import { getUsersBookings, getOwnersBookings } from '../../../store/booking';

let otherSrc = 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-21426276/original/7cceab2c-f3f2-4ed6-86b4-79bb32746dc0.jpeg?im_w=1200'

const CurrentOwnersSpots = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const [newSrc, setNewSrc] = useState('')

    useEffect(() => {
      dispatch(getCurrentOwnersSpots());
      dispatch(getUsersReviews());
      dispatch(restoreUser())
      dispatch(getUsersBookings())
      dispatch(getOwnersBookings())
      dispatch(getReviewsAboutCurrent())
    }, [dispatch])

    const usersBookings = useSelector(state => {
      if(state.bookings.currentUsersBookings) {
        return Object.values(state.bookings.currentUsersBookings)
      }
    })

    const ownersBookings = useSelector(state => {
      if(state.bookings.ownersBookings) {
        return Object.values(state.bookings.ownersBookings)
      }
    })


    //future trips
    let futureBookings = []
    if(usersBookings) {
      futureBookings = usersBookings.filter(book => new Date(book.startDate) >= new Date())
    }
    //past trips
    let pastBookings = []
    if(usersBookings) {
      pastBookings = usersBookings.filter(book => new Date(book.startDate) < new Date())
    }

    //future guests
    let futureGuests = []
    if(ownersBookings) {
      futureGuests = ownersBookings.filter(book => new Date(book.startDate) >= new Date())
    }
    //past guests
    let pastGuests = []
    if(ownersBookings) {
      pastGuests = ownersBookings.filter(book => new Date(book.startDate) < new Date())
    }




    const ownersSpots = useSelector(state => {
      if(state.spots.currentOwnersSpots) {
        return Object.values(state.spots.currentOwnersSpots)
      // } else {
      //   return []
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
      }
    })

    const reviewsAboutCurrent = useSelector(state => {
      if(state.reviews.reviewsAboutCurrent) {
        return Object.values(state.reviews.reviewsAboutCurrent)
      }
    })


    const handleRemoveReview = (reviewId) => {
      dispatch(removeReview(reviewId))
      history.go(0)
    }



    return (
      <div className='CurrentOwnersPage'>

        {userFirstName && <h2 className='currentOwnersTitle'>{userFirstName}'s Profile</h2>}
        <h2 className='yourTripTitle'>Future Trips</h2>
        <div className='outerYourTrips'>
        <div className='yourTrips'>
        {futureBookings?.map(({id, spotId, userId, startDate, endDate, Spot}) => (
          <div key={id} className='oneTrip'>

            <img className='smallImg'
                            src={Spot.previewImage}
                            alt={Spot.name}
                            onError={(e)=>{
                              if(e.target.src !== otherSrc) {
                                setNewSrc(otherSrc)
                                e.target.src = otherSrc
                              }
                              }}
                            />
            <div className='tripDetails'>
            {/* <div>{Spot.name}</div> */}
            <div>{Spot.city}, {Spot.state}</div>
            <div>Host: {Spot.owner.username}</div>
            {usersBookings && <div>
          {(new Date(startDate)).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
          &nbsp;-&nbsp;
          {(new Date(endDate)).toLocaleDateString('en-US', {month: 'short',year:'numeric',day: 'numeric'})}
          </div>}
          <div>Total: ${  (((new Date(endDate)) - (new Date(startDate)))/(1000 * 60 * 60 * 24))*Spot.price }</div>
          <div>Edit Delete</div>


            </div>

          </div>
        ))}
        </div>
        </div>
        <h2 className='yourTripTitle'>Past Trips</h2>
        <div className='outerYourTrips'>
        <div className='yourTrips'>
        {pastBookings?.map(({id, spotId, userId, startDate, endDate, Spot}) => (
          <div key={id} className='oneTrip'>

            <img className='smallImg'
                            src={Spot.previewImage}
                            alt={Spot.name}
                            onError={(e)=>{
                              if(e.target.src !== otherSrc) {
                                setNewSrc(otherSrc)
                                e.target.src = otherSrc
                              }
                              }}
                            />
            <div className='tripDetails'>
            {/* <div>{Spot.name}</div> */}
            <div>{Spot.city}, {Spot.state}</div>
            <div>Host: {Spot.owner.username}</div>
            {usersBookings && <div>
          {(new Date(startDate)).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
          &nbsp;-&nbsp;
          {(new Date(endDate)).toLocaleDateString('en-US', {month: 'short',year:'numeric',day: 'numeric'})}
          </div>}
          <div>Total: ${  (((new Date(endDate)) - (new Date(startDate)))/(1000 * 60 * 60 * 24))*Spot.price }</div>
            </div>

          </div>
        ))}
        </div>
        </div>

        {/* /////////// */}

        <h2 className='yourTripTitle'>Future Guests</h2>
        <div className='outerYourTrips'>
        <div className='yourTrips'>
        {futureGuests?.map(({id, spotId, userId, startDate, endDate, Spot, Guest}) => (
          <div key={id} className='oneTrip'>

            <img className='smallImg'
                            src={Spot.previewImage}
                            alt={Spot.name}
                            onError={(e)=>{
                              if(e.target.src !== otherSrc) {
                                setNewSrc(otherSrc)
                                e.target.src = otherSrc
                              }
                              }}
                            />
            <div className='tripDetails'>
            {/* <div>{Spot.name}</div> */}
            <div>{Spot.city}, {Spot.state}</div>
            {futureGuests && <div>
              <div>Guest: {Guest.username}</div>
          {(new Date(startDate)).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
          &nbsp;-&nbsp;
          {(new Date(endDate)).toLocaleDateString('en-US', {month: 'short',year:'numeric',day: 'numeric'})}
          </div>}
          <div>Total: ${  (((new Date(endDate)) - (new Date(startDate)))/(1000 * 60 * 60 * 24))*Spot.price }</div>
          <div>Edit Delete</div>


            </div>

          </div>
        ))}
        </div>
        </div>
        <h2 className='yourTripTitle'>Past Guests</h2>
        <div className='outerYourTrips'>
        <div className='yourTrips'>
        {pastGuests?.map(({id, spotId, userId, startDate, endDate, Spot, Guest}) => (
          <div key={id} className='oneTrip'>

            <img className='smallImg'
                            src={Spot.previewImage}
                            alt={Spot.name}
                            onError={(e)=>{
                              if(e.target.src !== otherSrc) {
                                setNewSrc(otherSrc)
                                e.target.src = otherSrc
                              }
                              }}
                            />
            <div className='tripDetails'>
            {/* <div>{Spot.name}</div> */}
            <div>{Spot.city}, {Spot.state}</div>
            {pastGuests && <div>
              <div>Guest: {Guest.username}</div>
          {(new Date(startDate)).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
          &nbsp;-&nbsp;
          {(new Date(endDate)).toLocaleDateString('en-US', {month: 'short',year:'numeric',day: 'numeric'})}
          </div>}
          <div>Total: ${  (((new Date(endDate)) - (new Date(startDate)))/(1000 * 60 * 60 * 24))*Spot.price }</div>
            </div>

          </div>
        ))}
        </div>
        </div>




        <h2 className='yourTripTitle'>Your Properties</h2>
        <div className="CurrentHomeList">

                {ownersSpots?.map(({ id, name, previewImage, city, state, description, price, avgRating }) => (
                  <div className="AllSpotsImages" key={id}>
                    <NavLink to={`/spots/${id}`}>
                                <div>
                                <img
                            src={previewImage}
                            alt={name}
                            onError={(e)=>{
                              if(e.target.src !== otherSrc) {
                                setNewSrc(otherSrc)
                                e.target.src = otherSrc
                              }
                              }}

                            />
                                </div >
                                <div className='SpaceBetween'>
                                <div className='greyText nowrapAllSpots' id="CityState">{city}, {state}</div>
                                <div>
                                <i className="material-symbols-outlined">star </i>
                                {avgRating}
                                </div>

                                </div>
                      <div className='greyText nowrapAllSpots'>{name}</div>
                      <div className='greyText'>Apr 3-8</div>
                      <div className='justNextToEachOther'> <div className='bold'>${price}</div>  night</div>
                    </NavLink>
                  </div>
                ))}
        </div>


        {userFirstName && <h2 className='yourTripTitle'>Reviews by you</h2>}



             <div className="CurrentOwnersReviews">


                    {usersReviews && usersReviews?.map((review) => (
                       <NavLink to={`/spots/${review.spotId}`}>
                      <div  key={review.id} className='insideCurrentOwner'>
                              <div className="SingleSpotReviewBox" key={review.id}>
                                <h4 className='underlined shouldWrap'>{review.Spot.name}</h4>

                                <h5 className='shouldWrap'>{review.Spot.city}, {review.Spot.state}</h5>
                                <h4>Host: {review.Spot.owner.username}</h4>
                                    <div><i className="material-symbols-outlined">star </i> {review.stars} stars</div>
                                    <p className='shouldWrap'>{review.review}</p>

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

              {userFirstName && <h2 className='yourTripTitle'>Reviews about you</h2>}

              <div className="CurrentOwnersReviews">


                    {reviewsAboutCurrent && reviewsAboutCurrent?.map((review) => (
                       <NavLink to={`/spots/${review.spotId}`}>
                      <div  key={review.id} className='insideCurrentOwner'>
                              <div className="SingleSpotReviewBox" key={review.id}>
                                <div>{review.id}</div>
                                <h4 className='underlined shouldWrap'>{review.Spot.name}</h4>
                                <h5 className='shouldWrap'>{review.Spot.city}, {review.Spot.state}</h5>
                                <h4>Guest: {review.User.firstName}</h4>

                                    <div><i className="material-symbols-outlined">star </i> {review.stars} stars</div>
                                    <p className='shouldWrap'>{review.review}</p>

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
