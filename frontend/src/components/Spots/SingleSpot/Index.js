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
      <div >
      {/* className='singleSpot' this doesn't exist yet ^ */}
        <h1>{singleSpot.name}</h1>
        <div ClassName='SingleSpot'>
        <img
          src={singleSpot.SpotImages[0].url}
          alt={singleSpot.name}
        />
        </div>
        <p>
          {singleSpot.description}
        </p>
        <h4>{singleSpot.price}</h4>
        <h4>{singleSpot.address}</h4>
        <h4>{singleSpot.city}</h4>
        <h4>{singleSpot.state}</h4>
        <h4>{singleSpot.country}</h4>
        <h4><NavLink to={`/spots/${id}/edit`}>Edit Spot</NavLink></h4>
        <button onClick={()=> dispatch(removeSpot(singleSpot.id))}>Delete Spot</button>
        <div >
        {singleSpot.SpotImages.slice(1).map(({url, id}) => (
          <div>
          <img
          src={url}
          alt={singleSpot.name}
          />
          </div>
         ))}
         </div>


      </div>
    );
  }
  return (

    <div>Waiting - if this shows, then the single spot file is called but no prop passed in</div>
  )

};

export default SingleSpot;
