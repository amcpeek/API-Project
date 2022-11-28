import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  NavLink } from 'react-router-dom';
import './SingleSpot.css'
// import UpdateSpotForm from '../UpdateSpot/Index';
import { removeSpot } from '../../../store/spot';
//import { AddSpotImage } from '../../../store/spotImage';
//import AddSpotImageForm from '../AddSpotImage/Index';
//import UpdateSpotForm from '../UpdateSpot/Index';
import { getOneSpot } from '../../../store/oneSpot';
import { useEffect } from 'react';

const SingleSpot = ({ spots }) => {
  const { id } = useParams();
  const numId = parseInt(id)
  const dispatch = useDispatch()
  // const singleSpot = 0
  useEffect(() => {
     dispatch(getOneSpot(id))
  }, [dispatch])


  const oneSpot = useSelector(state=>{
    return state.oneSpot[id]
  })

  console.log(id,'one Spot????', oneSpot)

  //const objOfSpots = Object.values(spots)
  //console.log('is the single file running', objOfSpots)

  if(!spots) {
    return 0
  }

  // const singleSpot = spots.find(spot => spot.id.toString() === id);
  // if(singleSpot) {
    if(oneSpot) {
      const singleSpot = oneSpot
    return (
      <div className='SingleSpot'>
      {/* className='singleSpot' this doesn't exist yet ^ */}
        <h2>{singleSpot.name}</h2>
        <div id='SingleSpotTopLinks'>
        <div >
        <i className="material-symbols-outlined">star </i>
        {singleSpot.avgStarRating}.0  ·  {singleSpot.numReviews} reviews   ·
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
          <div className='SingleSpotFourImagesOne'>
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
            <h2>ai</h2><h2>cover</h2>
            </div>
            <p>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</p>
          </div>

          <div id="SingleSpotBooking">
            <div className='JCSpaceBetween'>
              <div>
               ${singleSpot.price} night
               </div>
              <div>
              <i className="material-symbols-outlined">star </i>
              {singleSpot.avgStarRating}.0  ·  {singleSpot.numReviews} reviews
              </div>
           </div>
            <div id="checkInOutBox">
              <div id="checkInOutDates">
                  <div>CHECK-IN
                    <input type="date"></input>
                  </div>
                  <div>CHECK-OUT
                    <input type="date"></input>
                  </div>
              </div>
              <div className="dropdown">
                <button  className="dropButton JCSpaceBetween">
                  <div >
                    <div>
                      GUESTS
                    </div>
                    <div>
                      1 guest
                    </div>


                  </div>

                  <i className="material-symbols-outlined">arrow_drop_down</i>
                  </button>
                <div className="dropdown-content">
                  <a> 1 guest </a>
                  <a> 2 guests </a>
                  <a> 3 guests </a>
                  <a> 4 guests </a>
                </div>

              </div>

            </div>
            <button id="checkAvailabilityButton"> Check availability</button>
          </div>

        </div>


        <h4><NavLink to={`/spots/${id}/edit`}>Edit Spot</NavLink></h4>
        <button onClick={()=> dispatch(removeSpot(singleSpot.id))}>Delete Spot</button>



      </div>
    );
  }
  return (

    <div>Waiting - if this shows, then the single spot file is called but no prop passed in</div>
  )

};

export default SingleSpot;
