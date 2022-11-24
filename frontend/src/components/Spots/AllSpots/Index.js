import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getSpots } from '../../../store/spot'
import './AllSpots.css'


const AllSpots = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state=> {
   // console.log('what is state', state)
    return Object.values(state.spots)});
  console.log('All spotszzz', spots)

  // const ownerId = useSelector(state=> {
  //   return state.session.user.id
  // })

  //  const ownersSpots = spots.filter((spot) => ownerId === spot.ownerId)
  //   console.log('does ownersSpots work', ownersSpots)

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  return (
    <div className="HomePage">
      <div>
        <h1> </h1>
      </div>
      <div className="HomeNavBar">
          <div>
            <button>
            <i className="material-symbols-outlined">key</i></button>
            <h5>New</h5>
          </div>

          <div>
            <button>
            <i className="material-symbols-outlined">landscape</i></button>
            <h5>Top of the world</h5>
          </div>
          <div>
            <button>
            <i className="material-symbols-outlined">local_fire_department</i></button>
            <h5>Trending</h5>
          </div>
          <div>
            <button>
            <i className="material-symbols-outlined">accessible_forward</i></button>
            <h5>Adapted</h5>
          </div>
          <div>
            <button>
            <i className="material-symbols-outlined">sports_tennis</i></button>
            <h5>Play</h5>
          </div>
          <div>
            <button>
            <i className="material-symbols-outlined">downhill_skiing</i></button>
            <h5>Skiing</h5>
          </div>
          <div>
            <button>
            <i className="material-symbols-outlined">bed</i></button>
            <h5>Private rooms</h5>
          </div>
          <div>
            <button>
            <i className="material-symbols-outlined">houseboat</i></button>
            <h5>Houseboats</h5>
          </div>
          <div>
            <button>
            <i className="material-symbols-outlined">cottage</i></button>
            <h5>Cabins</h5>
          </div>
          <div>
            <button>
            <i className="material-symbols-outlined">castle</i></button>
            <h5>Castles</h5>
          </div>
          <div>
            <button>
            <i className="material-symbols-outlined">beach_access</i></button>
            <h5>Beachfront</h5>
          </div>
          <div>
            <button>
            <i className="material-symbols-outlined">key</i></button>
            <h5>Treehouses</h5>
          </div>
          <div>
            <button>
            <i className="material-symbols-outlined">key</i></button>
            <h5>Filters</h5>
          </div>
        </div>

        <div className="HomeList">
                {spots.map(({ id, name, previewImage }) => (
                  <div class="AllSpotsImages">
                  <img
                  src={previewImage}
                  alt={name}
                  />
                  <h2 key={id}><NavLink to={`/spots/${id}`}>{name}</NavLink></h2>
                  </div>
                ))}

        </div>

    </div>
  );
};

export default AllSpots;
