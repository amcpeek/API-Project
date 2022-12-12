import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  NavLink } from 'react-router-dom';
import { getSpots, getCurrentOwnersSpots } from '../../../store/spot'
import './CurrentOwnersSpots.css'

const CurrentOwnersSpots = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getCurrentOwnersSpots());
    }, []);


    const ownersSpots = useSelector(state => {
      if(state.spots.currentOwnersSpots) {
        return Object.values(state.spots.currentOwnersSpots)
      } else {
        return []
      }
    })



    return (
      <div >
        <div className="CurrentOwnersPage">Your Listed Homes</div>
        <div className="CurrentOwnersList">
          {ownersSpots.map(({ id, name, previewImage, city, state, description, price }) => (
            // <div key={id}><NavLink to={`/spots/${id}`}>{name}</NavLink></div>

            <div className="AllSpotsImages" key={id}>
                    <NavLink to={`/spots/${id}`}>
                                <div>
                                <img
                            src={previewImage}
                            alt={name}/>
                                </div >

                      <div className='greyText' id="CityState">{city}, {state}</div>
                      <div className='greyText'>{name}</div>
                      <div className='greyText'>Apr 3-8</div>
                      <div className='greyText'>${price} night</div>
                    </NavLink>
                  </div>


          ))}
        </div>
      </div>
    );
}

export default CurrentOwnersSpots
