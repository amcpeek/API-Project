import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getSpots, addSpot } from '../../../store/spot'
import { addSpotImage } from '../../../store/spotImage'
//import './AddSpot.css'
import { Redirect } from 'react-router-dom'

const AddSpotForm = () => {
    const [address, setAddress] = useState('testAddress')
    const [city, setCity] = useState('testCity')
    const [state, setState] = useState('testState')
    const [country, setCountry] = useState('testCountry')
    const [lat, setLat] = useState(30)
    const [lng, setLng] = useState(30)
    const [name, setName] = useState('testName')
    const [description, setDescription] = useState('testDescription')
    const [price, setPrice] = useState(100)
    const [url, setUrl] = useState('https://jweekly.com/wp-content/uploads/2021/12/Christmas-Tree-Snow-drawing-1080x675-1.jpeg')
    const [preview, setPreview] = useState(false)

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newSpot = {
            address, city, state, country,
            lat, lng, //might need a way to leave out lat and lng
            name, description, price
        }

        const response = await dispatch(addSpot(newSpot))
     //  await dispatch(getSpots())
       //await reset()
       console.log('can I get the response.id', response)
       e.preventDefault()
        const payload = {
            spotId: response.id,
            url, preview
        }
        let spotImage
        spotImage = await dispatch(addSpotImage(payload))


    }

    const reset = () => {
        setAddress('')
        setCity('')
        setState('')
        setCountry('')
        setLat(0)
        setLng(0)
        setName('')
        setDescription('')
        setPrice(0)
    }

    return (
        <div>
            {/* can later put in className in the div */}
            <h1>Create Spot</h1>
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
                 <input
                 type='text'
                 onChange={(e)=>setUrl(e.target.value)}
                 value={url}
                 placeholder='ImageUrl'
                 name='imageUrl'
                />
                <label><input
                type="checkbox"
                onChange={(e) => setPreview(e.currentTarget.checked)}
                 />Do you want this to be your preview image?</label>
                <button type='submit'>Submit</button>
            </form>

        </div>
    )
}

export default AddSpotForm
