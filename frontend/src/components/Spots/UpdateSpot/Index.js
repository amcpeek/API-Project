import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSpots, updateSpot } from '../../../store/spot'
//import './AddSpot.css'

const UpdateSpotForm = ({singleSpot}) => {
    //they also passed in hideForm
    //let spot = useSelector(state => state.spots[spotId])
    //console.log('is spot info accessible form updatedSpotForm', singleSpot)
    let spot = singleSpot
    const [address, setAddress] = useState(spot.address)
    const [city, setCity] = useState(spot.city)
    const [state, setState] = useState(spot.state)
    const [country, setCountry] = useState(spot.country)
    const [lat, setLat] = useState(spot.lat)
    const [lng, setLng] = useState(spot.lng)
    const [name, setName] = useState(spot.name)
    const [description, setDescription] = useState(spot.description)
    const [price, setPrice] = useState(spot.price)

    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(getSpots())
    //     console.log('when does the useEffect run')
    // }, [spot])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            id: spot.id,
            address, city, state, country,
            lat, lng, //might need a way to leave out lat and lng
            name, description, price
        }
        console.log('what is payload', payload)

        let updatedSpot

        updatedSpot = await dispatch(updateSpot(payload))
       // await dispatch(getSpots())
        //  if(updatedSpot) {
        //     await dispatch(getSpots())
        //   //  hideForm()
        // }

    }




       //await reset()

    // const handleCancelClick = (e) => {
    //     e.preventDefault()
    //     //hideForm()
    // }

    // const reset = () => {
    //     setAddress('')
    //     setCity('')
    //     setState('')
    //     setCountry('')
    //     setLat(0)
    //     setLng(0)
    //     setName('')
    //     setDescription('')
    //     setPrice(0)
    // }

    return (
        <div>
            {/* can later put in className in the div */}
            <h1>Update Spot</h1>
            <form onSubmit={handleSubmit}>
                <input
                 type='text'
                 onChange={(e)=>setAddress(e.target.value)}
                 value={address}
                 placeholder='Address'
                 name='address'
                />
                 <input
                 type='text'
                 onChange={(e)=>setCity(e.target.value)}
                 value={city}
                 placeholder='City'
                 name='city'
                />
                 <input
                 type='text'
                 onChange={(e)=>setState(e.target.value)}
                 value={state}
                 placeholder='State'
                 name='state'
                />
                 <input
                 type='text'
                 onChange={(e)=>setCountry(e.target.value)}
                 value={country}
                 placeholder='Country'
                 name='country'
                />
                 <input
                 type='number'
                 placeholder='Latitude'
                 value={lat}
                 onChange={(e) => setLat(e.target.value)}
                />
                 <input
                 type='number'
                 placeholder='Longitude'
                 value={lng}
                 onChange={(e) => setLng(e.target.value)}
                />
                 <input
                 type='text'
                 onChange={(e)=>setName(e.target.value)}
                 value={name}
                 placeholder='Name'
                 name='name'
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    name='description'
                    placeholder='Add your description'
                    rows='10'
                ></textarea>
                <input
                 type='number'
                 placeholder='Price'
                 min='1'
                 value={price}
                 onChange={(e) => setPrice(e.target.value)}
                />
                <button type='submit'>Submit</button>
            </form>

        </div>
    )
}

export default UpdateSpotForm
