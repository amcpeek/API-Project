import { useParams } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import {  NavLink } from 'react-router-dom';
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


  useEffect(() => {
     dispatch(getSpotReviews(id))
     return dispatch(clearSpotReviewsStoreAction())
  }, [dispatch])

  useEffect(() => {
    dispatch(getOneSpot(id))
    return dispatch(clearOneSpotAction())
 }, [dispatch])

  const oneSpot = useSelector(state=>{return state.oneSpot[id]})
  const allReviews = useSelector(state => {  return Object.values(state.reviews)})


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
    newSpot.SpotImages.push({id: nanoid(), url: 'https://media.istockphoto.com/id/1267541412/photo/happy-puppy-dog-celebrating-christmas-with-a-red-santa-claus-hat-and-smiling-expression.jpg?s=612x612&w=0&k=20&c=-wBVGzelUHlNcqgHo6deincDocteKEI6UbkyEonP9jc='})
  }
  if(oneSpot && !oneSpot.SpotImages[2]) { let newSpot = oneSpot
    newSpot.SpotImages.push({id: nanoid(), url: 'https://nypost.com/wp-content/uploads/sites/2/2019/12/christmas-cat-costume.jpg?quality=75&strip=all' })
  }
  if(oneSpot && !oneSpot.SpotImages[3]) { let newSpot = oneSpot
    newSpot.SpotImages.push({id: nanoid(), url: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/hedgehog-wearing-red-christmas-santa-hat-john-daniels.jpg' })
  }
  if(oneSpot && !oneSpot.SpotImages[4]) { let newSpot = oneSpot
    newSpot.SpotImages.push({id: nanoid(), url: 'https://res.cloudinary.com/fleetnation/image/private/c_fit,w_1120/g_south,l_text:style_gothic2:%C2%A9%20Natasha%20Delaney,o_20,y_10/g_center,l_watermark4,o_25,y_50/v1510636701/o1kxriotfpvzuyptnofz.jpg'})
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
  useEffect(() => {
    if(allReviews) {
    //  setMatchingReviewer(allReviews)
    //if currentUserId ===
    //currentReview.

    }
  })

  useEffect(() => {
    if(!oneSpot) {
      return (
      <PageNotFound/>
      )}
  }, [oneSpot])




    if(oneSpot) {
      const singleSpot = oneSpot

    return (
      <div className='SingleSpot'>
        <h2>{singleSpot.name}</h2>
        <div id='SingleSpotTopLinks'>
        <div >
        <i className="material-symbols-outlined">star </i>
        {singleSpot.avgStarRating} ·  {singleSpot.numReviews} reviews   ·
        <i className="material-symbols-outlined"> military_tech</i>
        Superhost  ·  {singleSpot.city}, {singleSpot.state}, {singleSpot.country}
        </div>

        <div>
        <i className="material-symbols-outlined">upload</i>Share
        <i className="material-symbols-outlined">favorite</i>
        Save
        </div>
        </div>

        <div className='SingleSpotAllImages'>
        <div className='SingleSpotMainImage'>
        <img
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
                  {currentUserId && !allReviews.find(rev => rev.userId === currentUserId)  && <AddReviewModal/> }
                  {/* <button id="addReviewButton"><NavLink to={`/spots/${id}/reviews`}>Add A Review</NavLink> </button> */}

                    {allReviews.map((review) => (
                      <div key={review.id}>
                              <div className="SingleSpotReviewBox" key={review.id}>
                              <div><i className="material-symbols-outlined">star </i> {review.stars} stars</div>
                              <div> <i className="material-symbols-outlined">face</i> {review.User.firstName} </div>
                              <p>Review: {review.review}</p>
                              {/* <p>ReviewId: {review.id} SpotId: {id} AuthorId: {review.userId} ViewerId: {currentUserId}</p> */}
                              {/* <NavLink to={`/reviews/${review.id}/${id}`}>Edit Review</NavLink> */}
                              {review.userId === currentUserId &&  <h4 className="underlined"><UpdateReviewModal/></h4>}
                              {review.userId === currentUserId && <button className='deleteButton' onClick={()=> handleRemoveReview(review.id) }>Delete</button>}
                          </div>
                      </div>
                    ))}
              </div>







          </div>
          <div>

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
              {////////////}
    }

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
              {////////////}
    }
              {/* <div className="dropdown">

                <button  className="dropButton JCSpaceBetween dropdownContent">
                  <div >
                    <div>
                      GUESTS
                    </div>
                    <div>
                      1 guest???
                    </div>
                  </div>
                  <i className="material-symbols-outlined">arrow_drop_down</i>
                  </button>
                <div className="dropdownContent">
                  <a> 1 guest </a>
                  <a> 2 guests </a>
                  <a> 3 guests </a>
                  <a> 4 guests </a>
                </div>
              </div> */}

            </div>
            <button onClick={nonFunctional} id="checkAvailabilityButton"> Check availability</button>
           </div>

           {/* {currentUserId && matchingOwner&&<h4 className="underlined"><NavLink to={`/spots/${id}/edit`}>Edit Home Listing</NavLink></h4>} */}
           <div className="editDeleteButtons">
           {currentUserId && matchingOwner&&<h4 className="underlined"><UpdateSpotModal showModal={showModal} setShowModal={setShowModal}/></h4>}
           {currentUserId && matchingOwner&& <button  className='deleteButton' onClick={()=> {dispatch(removeSpot(singleSpot.id)); history.push('/') }}>Delete Home</button>}
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
