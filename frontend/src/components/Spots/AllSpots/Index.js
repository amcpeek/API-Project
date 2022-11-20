import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, NavLink } from 'react-router-dom';
import SingleSpot from '../SingleSpot/Index'
import { getSpots } from '../../../store/spot'
import './AllSpots.css'

const AllSpots = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state=> {
    console.log('what is state', state)
    return Object.values(state.spots)});
  //console.log('All spots', spots)

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

      <Switch>
        <Route path='/spots/:id'>
          <SingleSpot spots={spots} />
        </Route>
      </Switch>
    </div>
  );
};

export default AllSpots;
