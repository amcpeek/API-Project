import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//import './SingleSpot.css'; stopped the run
import UpdateSpotForm from '../UpdateSpot/Index';
import { removeSpot } from '../../../store/spot';
import { AddSpotImage } from '../../../store/spotImage';
import AddSpotImageForm from '../AddSpotImage/Index';

const SingleSpot = ({ spots }) => {
  const { id } = useParams();
  const dispatch = useDispatch()
  // const singleSpot = 0

  const singleSpot = spots.find(spot => spot.id.toString() === id);
  if(singleSpot) {
    return (
      <div >
      {/* className='singleSpot' this doesn't exist yet ^ */}
        <h1>{singleSpot.name}</h1>
        <img
          src={singleSpot.previewImage}
          alt={singleSpot.name}
        />
        <p>
          {singleSpot.description}
        </p>
        <h4>{singleSpot.price}</h4>
        <h4>{singleSpot.address}</h4>
        <h4>{singleSpot.city}</h4>
        <h4>{singleSpot.state}</h4>
        <h4>{singleSpot.country}</h4>
        <button onClick={()=> dispatch(removeSpot(singleSpot.id))}>Delete Spot</button>
        {/* to add auto upload the feature is gone would need a handle onclick */}
        <AddSpotImageForm singleSpot={singleSpot}/>

        <UpdateSpotForm singleSpot={singleSpot}/>
      </div>
    );
  }
  return (

    <div>Waiting</div>
  )

};

export default SingleSpot;
