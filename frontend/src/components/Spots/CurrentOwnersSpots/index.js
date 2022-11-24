import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  NavLink } from 'react-router-dom';
import { getSpots, getCurrentOwnersSpots } from '../../../store/spot'

const CurrentOwnersSpots = () => {
    const dispatch = useDispatch();

///new way
    useEffect(() => {
      dispatch(getCurrentOwnersSpots());
    }, []);


    // const [ownersSpots, setOwnersSpots] = useState([])
    // const fromState = useSelector(state => {
    //   if(state.spots.currentOwnersSpots) {
    //     console.log('something', state)
    //     const againHere = Object.values(state.spots.currentOwnersSpots)
    //   } else {
    //     console.log('from state doesnt work')
    //   }
    // })
    // const anotherThing = (e) => setOwnersSpots(againHere)

    // console.log('from mmm state',fromState)

    const ownersSpotz = useSelector(state => {
      if(state.spots.currentOwnersSpots) {
        return Object.values(state.spots.currentOwnersSpots)
      } else {
        return []
      }
    })

    console.log('ownerSpotz', ownersSpotz)


///previous way
  //   const spots = useSelector(state=> {
  //     // console.log('what is state', state)
  //      return Object.values(state.spots)});
  //    //console.log('current owner spots', spots)
  //   const ownerId = useSelector(state=> {
  //     // console.log('what is state',state)
  //     if(!state.session.user) {
  //      return null //could also pass is loading as a prop
  //     }
  //    return state.session.user.id
  //  })
  //    const ownersSpots = spots.filter((spot) => ownerId === spot.ownerId)
  //    // console.log('does ownersSpots work', ownersSpots)


     ///for BOTH METHODS
    return (
      <div>
        <h1>Current Owners Spots</h1>
        <ol>
          {ownersSpotz.map(({ id, name }) => (
            <li key={id}><NavLink to={`/spots/${id}`}>{name}</NavLink></li>
          ))}
        </ol>
      </div>
    );
}

export default CurrentOwnersSpots
