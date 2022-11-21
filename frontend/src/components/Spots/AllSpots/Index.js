import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, NavLink } from 'react-router-dom';
import SingleSpot from '../SingleSpot/Index'
import { getSpots } from '../../../store/spot'
import './AllSpots.css'
import AddSpotForm from '../AddSpot/Index';
import CurrentOwnersSpots from '../CurrentOwnersSpots';

const AllSpots = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state=> {
   // console.log('what is state', state)
    return Object.values(state.spots)});
  //console.log('All spots', spots)

  // const ownerId = useSelector(state=> {
  //   return state.session.user.id
  // })

  //  const ownersSpots = spots.filter((spot) => ownerId === spot.ownerId)
  //   console.log('does ownersSpots work', ownersSpots)

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  return (
    <div>
      <h1>All Spots</h1>


      <ol>
        {spots.map(({ id, name }) => (
          <li key={id}><NavLink to={`/spots/${id}`}>{name}</NavLink></li>
        ))}
      </ol>
      <AddSpotForm/>
      {/* <CurrentOwnersSpots/> */}

      <Switch>
        <Route exact path='/spots/:id'>
          <SingleSpot spots={spots} />
        </Route>
      </Switch>
      <CurrentOwnersSpots/>
    </div>
  );
};

export default AllSpots;
