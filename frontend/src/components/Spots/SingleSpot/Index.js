import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Route, Switch, NavLink } from 'react-router-dom';
//import './SingleSpot.css'; stopped the run
// import UpdateSpotForm from '../UpdateSpot/Index';
import { removeSpot } from '../../../store/spot';
import { AddSpotImage } from '../../../store/spotImage';
import AddSpotImageForm from '../AddSpotImage/Index';
import UpdateSpotForm from '../UpdateSpot/Index';

const SingleSpot = ({ spots }) => {
  const { id } = useParams();
  const dispatch = useDispatch()
  // const singleSpot = 0

  const objOfSpots = Object.values(spots)
  console.log('is the single file running', objOfSpots)

  if(!spots) {
    return 0
  }

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
        <h4><NavLink to={`/spots/${id}/edit`}>Edit Spot</NavLink></h4>
        {/* <button onClick={()=> dispatch(UpdateSpotForm(singleSpot))}>Edit Spot</button> */}
        <button onClick={()=> dispatch(removeSpot(singleSpot.id))}>Delete Spot</button>
        {/* to add auto upload the feature is gone would need a handle onclick */}
        {/* <AddSpotImageForm singleSpot={singleSpot}/> */}
        {/* <Switch>
          <Route exact path="/spots/:id/edit">
          <UpdateSpotForm singleSpot={singleSpot}/>
          </Route>
        </Switch> */}

      </div>
    );
  }
  return (

    <div>Waiting - if this shows, then the single spot file is called but no prop passed in</div>
  )

};

export default SingleSpot;
