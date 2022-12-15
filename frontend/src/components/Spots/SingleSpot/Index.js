import { Redirect, useParams } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import {  NavLink, Route } from 'react-router-dom';
import './SingleSpot.css'
import { removeSpot } from '../../../store/spot';
import { getOneSpot, clearOneSpotAction } from '../../../store/oneSpot';
import { useEffect, useState } from 'react';
import { getSpotReviews, clearSpotReviewsStoreAction, removeReview, updateSpotReview } from '../../../store/review'
import { useHistory } from 'react-router-dom';
import { nanoid } from 'nanoid'
import PageNotFound from '../../PageNotFound/Index';
import UpdateSpotModal from '../UpdateSpot/UpdateSpotModal';
import AddReviewModal from '../../Reviews/AddReview/AddReviewModal';
import UpdateReviewModal from '../../Reviews/UpdateReview/UpdateReviewModal';

const SingleSpot = () => {
  const { id } = useParams();
  const dispatch = useDispatch()
  const history = useHistory()
  const [ guestNum, setGuestsNum] = useState(1)
  const [showModal, setShowModal] = useState(false);

  const oneSpot = useSelector(state=>{return state.oneSpot[id]})
   const allReviews = useSelector(state => { return Object.values(state.reviews)})

  const findSpotTest = async (e) => {
    const returnSpot = await dispatch(getOneSpot(id))
    if(!returnSpot) {
      history.push('/page-not-found')
    }
  }

  useEffect(() => {
    findSpotTest()
    return  () => dispatch(clearOneSpotAction())
 }, [dispatch])

  useEffect(() => {
     dispatch(getSpotReviews(id))
     return () => dispatch(clearSpotReviewsStoreAction())
  }, [oneSpot])

  const handleRemoveReview = (reviewId) => {
    console.log('what is review id', reviewId)
    dispatch(removeReview(reviewId))
    history.go(0)
  }

  const nonFunctional = async (e) => {
    e.preventDefault()
    alert('This feature is not yet developed')
  }

  if(oneSpot && !oneSpot.SpotImages[1]) { let newSpot = oneSpot
    newSpot.SpotImages.push({id: nanoid(), url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-21426276/original/e73091e9-7ee0-4fa1-8d63-021be82b43b8.jpeg?im_w=720'})
  }
  if(oneSpot && !oneSpot.SpotImages[2]) { let newSpot = oneSpot
    newSpot.SpotImages.push({id: nanoid(), url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-21426276/original/8455fd1e-a54a-4b05-b9c7-d72850b129e3.jpeg?im_w=1200' })
  }
  if(oneSpot && !oneSpot.SpotImages[3]) { let newSpot = oneSpot
    newSpot.SpotImages.push({id: nanoid(), url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-21426276/original/e5867a71-540f-4964-bff1-0582a3734552.jpeg?im_w=720' })
  }
  if(oneSpot && !oneSpot.SpotImages[4]) { let newSpot = oneSpot
    newSpot.SpotImages.push({id: nanoid(), url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-21426276/original/72707598-ec65-4e39-9b06-6ef4e0bb4e3e.jpeg?im_w=720'})
  }

  const currentUserId = useSelector(state=>{
    if(state.session.user) {return state.session.user.id}
    else {return ''}
  })

  const [ matchingOwner, setMatchingOwner ] = useState(false)


  useEffect(() => {
    if(currentUserId && oneSpot) {
    //  console.log('one spot', oneSpot)
      setMatchingOwner(currentUserId === oneSpot.ownerId)
    }
  },[oneSpot])

  //for matching owner of review
  const [ matchingReviewer, setMatchingReviewer ] = useState(false)
  // useEffect(() => {
  //   if(allReviews) {
  //   //  setMatchingReviewer(allReviews)
  //   //if currentUserId ===
  //   //currentReview.
  //   const newThing = allReviews[0]
  //   console.log('WHAT IS ALL REVIEWS', newThing)

  //   }
  // }, [allReviews[0]])
  // review.User.firstName
  //allReviews[0].User.firstName

  const [newSrc, setNewSrc] = useState()
  //'https://a0.muscache.com/im/pictures/prohost-api/Hosting-21426276/original/7cceab2c-f3f2-4ed6-86b4-79bb32746dc0.jpeg?im_w=1200'




    if(oneSpot) {
      const singleSpot = oneSpot

    return (
      <div className='SingleSpot'>
        <div className='LeftTitle'>
        <h2>{singleSpot.name}</h2>
        </div>

        <div id='SingleSpotTopLinks'>
        <div className='underlined' onClick={nonFunctional} >
        <i className="material-symbols-outlined">star </i>
        {singleSpot.avgStarRating} ·  {singleSpot.numReviews} reviews   ·
        <i className="material-symbols-outlined"> military_tech</i>
        Superhost  ·  {singleSpot.city}, {singleSpot.state}, {singleSpot.country}
        </div>

        <div className='underlined' onClick={nonFunctional} >
        <i className="material-symbols-outlined">upload</i>Share
        <i className="material-symbols-outlined">favorite</i>
        Save
        </div>
        </div>

        <div className='SingleSpotAllImages'>
        <div className='SingleSpotMainImage'>
        <img
          // onError={()=>setSrc=()}
          src={singleSpot.SpotImages[0].url}
          alt={singleSpot.name}
        />
        </div>
        <div className='SingleSpotFourImages'>
        {singleSpot.SpotImages.slice(1, 5).map(({url, id}) => (
          <div className='SingleSpotFourImagesOne' key={id}>
          <img
          src={url}
          alt={singleSpot.name}
          />
          </div>
         ))}
         </div>
        </div>

        <div id="SingleSpotBottomSection">
          <div id="SingleSpotDetails">
            <h2>{singleSpot.description}</h2>
            <p> 4 guests  ·  2 bedrooms  ·  2 beds  ·  1 bathroom</p>
            <h3><i className="material-symbols-outlined"> military_tech</i>Annika is a Superhost</h3>
            <p>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
            <h3><i className="material-symbols-outlined"> key</i>  Great check-in experience</h3>
            <p>100% of recent guests gave the check-in process a 5-star rating.</p>
            <h3><i className="material-symbols-outlined">calendar_month</i>  Free cancellation for 48 hours.</h3>
            <div id="AirCover">
            <div>am</div><div>cover</div>
            </div>
            <p>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</p>

            <div id="SingleSpotReviews">
              <h3>Reviews</h3>
                  {currentUserId && !allReviews.find(rev => rev.userId === currentUserId)  && <AddReviewModal/> }
                  {/* <button id="addReviewButton"><NavLink to={`/spots/${id}/reviews`}>Add A Review</NavLink> </button> */}

                    {allReviews.map((review) => (
                      <div key={review.id}>
                              <div className="SingleSpotReviewBox" key={review.id}>
                                    <div><i className="material-symbols-outlined">star </i> {review.stars} stars</div>
                                    <div> <i className="material-symbols-outlined">face</i>
                                    {/* {review.User && review.User.firstName} */}
                                    Colleen
                                    </div>
                                    <p>{review.review}</p>
                                    {/* <p>ReviewId: {review.id} SpotId: {id} AuthorId: {review.userId} ViewerId: {currentUserId}</p> */}
                                    {/* <NavLink to={`/reviews/${review.id}/${id}`}>Edit Review</NavLink> */}
                                    {review.userId === currentUserId &&  <><UpdateReviewModal/></>}
                                    {review.userId === currentUserId && <button onClick={()=> handleRemoveReview(review.id) }>
                                      <i className="material-symbols-outlined">
                                        delete
                                        </i></button>}
                              </div>
                      </div>
                    ))}
              </div>
          </div>

          <div className="rightDiv">
          <div id="SingleSpotBooking">
              <div className='JCSpaceBetween'>
                <div>
                ${singleSpot.price} night
                </div>
                <div>
                <i className="material-symbols-outlined">star </i>
                {singleSpot.avgStarRating}  ·  {singleSpot.numReviews} reviews
                </div>
               </div>
                <div id="checkInOutBox">
                  <div id="checkInOutDates">
                      <div>check-in
                        <input type="date"></input>
                      </div>
                      <div>check-out
                        <input type="date"></input>
                      </div>
                </div>

                <div id="guestBox">
                  <div>guest</div>
                      <label>
                        <select
                        onChange={(e) => setGuestsNum(e.target.value)}
                        value={guestNum}
                        >
                            <option key='1 guest'  value='1 guest'> 1 guest</option>
                            <option key='2 guests' value='2 guests'> 2 guests</option>
                            <option key='3 guests' value='3 guests'> 3 guests</option>
                            <option key='4 guests' value='4 guests'> 4 guests</option>
                            <option key='5 guests' value='5 guests'> 5 guests</option>
                        </select>
                      </label>

                </div>

               </div>
               <button onClick={nonFunctional} id="checkAvailabilityButton"> Check availability</button>

               {currentUserId && matchingOwner&& (
                 <div className="editDeleteButtons">
                 <><UpdateSpotModal showModal={showModal} setShowModal={setShowModal}/></>
                 <button onClick={()=> {dispatch(removeSpot(singleSpot.id)); history.push('/') }}>Delete Home</button>
                </div>   )}


          </div>
          </div>





        </div>


      </div>
    );
  }
  return (
    <div>Waiting - if this shows, then the single spot file is called but no prop passed in</div>
  )
};

export default SingleSpot;
