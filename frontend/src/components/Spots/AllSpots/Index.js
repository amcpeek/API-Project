import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getSpots} from '../../../store/spot'
import './AllSpots.css'


const AllSpots = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state=> {
   // console.log('what is state', state)
    return Object.values(state.spots)});
 // console.log('All spotszzz', spots)

  // const ownerId = useSelector(state=> {
  //   return state.session.user.id
  // })

  //  const ownersSpots = spots.filter((spot) => ownerId === spot.ownerId)
  //   console.log('does ownersSpots work', ownersSpots)

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  const nonFunctional = async (e) => {
    e.preventDefault()
    alert('This feature is not yet developed')
  }

  return (
    <div className="HomePage">
      {/* <div>
        <h1 className="Crazy">. </h1>
      </div> */}
      <div className="HomeNavBar">
            <button onClick={nonFunctional}>
            <i className="material-symbols-outlined">key</i>New</button>
            <button onClick={nonFunctional}>
            <i className="material-symbols-outlined">landscape</i>Top of the world</button>
            <button onClick={nonFunctional}>
            <i className="material-symbols-outlined">local_fire_department</i>Trending</button>
            <button onClick={nonFunctional}>
            <i className="material-symbols-outlined">sports_tennis</i>Play</button>


            <button onClick={nonFunctional}>
            <i className="material-symbols-outlined">beach_access</i>Beachfront</button>
            <button onClick={nonFunctional}>
            <i className="material-symbols-outlined">downhill_skiing</i>Skiing</button>
            <button onClick={nonFunctional}>
            <i className="material-symbols-outlined">bed</i>Private rooms</button>
            <button onClick={nonFunctional}>
            <i className="material-symbols-outlined">houseboat</i>Houseboats</button>
            <button onClick={nonFunctional}>
            <i className="material-symbols-outlined">cottage</i>Cabins</button>
            <button onClick={nonFunctional}>
            <i className="material-symbols-outlined">castle</i>Castles</button>
            <button onClick={nonFunctional}>
            <i className="material-symbols-outlined">accessible_forward</i>Adapted</button>


            <button onClick={nonFunctional}>
            <i className="material-symbols-outlined">forest</i>Treehouses</button>
            <button onClick={nonFunctional}>
            <i className="material-symbols-outlined">tune</i>Filters</button>
        </div>

        <div className="HomeList">
                {spots.map(({ id, name, previewImage, city, state, description, price, avgRating }) => (
                  <div className="AllSpotsImages" key={id}>
                    <NavLink to={`/spots/${id}`}>
                                <div>
                                <img
                            src={previewImage}
                            alt={name}/>
                                </div >
                                <div className='SpaceBetween'>
                                <div className='greyText' id="CityState">{city}, {state}</div>
                                <div>
                                <i className="material-symbols-outlined">star </i>
                                {avgRating}
                                </div>

                                </div>
                      <div className='greyText'>{name}</div>
                      <div className='greyText'>Apr 3-8</div>
                      <div className='justNextToEachOther'> <div className='bold'>${price}</div>  night</div>
                    </NavLink>
                  </div>
                ))}

        </div>

    </div>
  );
};

export default AllSpots;
