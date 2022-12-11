import { useState, useEffect } from 'react'
import { useParams, NavLink, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateSpot, getSpots } from '../../../store/spot'
import { addSpotImage } from '../../../store/spot'
import { useHistory } from 'react-router-dom'
//import './AddSpot.css'

const UpdateSpotForm = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

   const [address, setAddress] = useState('')
   const [city, setCity] = useState('')
   const [state, setState] = useState('')
   const [country, setCountry] = useState('')
   const [lat, setLat] = useState(0)
   const [lng, setLng] = useState(0)
   const [name, setName] = useState('')
   const [description, setDescription] = useState('')
   const [price, setPrice] = useState(0)
   const [url, setUrl] = useState('')
   const [preview, setPreview] = useState(false)
   const [responseErrors, setResponseErrors] = useState([])

   useEffect(() => {
    dispatch(getSpots())
   }, [dispatch])




   let  spot = useSelector(state=>{return state.oneSpot[id]})
   useEffect(() => {

    //spots.find(spot => spot.id.toString() === id);
    if(spot) {
        setAddress(spot.address)
        setCity(spot.city)
        setState(spot.state)
        setCountry(spot.country)
        setLat(spot.lat)
        setLng(spot.lng)
        setName(spot.name)
        setDescription(spot.description)
        setPrice(spot.price)
        setUrl(spot.url || 'https://jweekly.com/wp-content/uploads/2021/12/Christmas-Tree-Snow-drawing-1080x675-1.jpeg')
        setPreview(false)
    }
   }, [spot]) //not sure if this is the right place to listen to, if the spot level isn't changing

    const handleSubmit = async (e) => {
        console.log('if this runs, then the NavLink is not breaking the button')
        e.preventDefault()
        const payload = {
            id,
            address, city, state, country,
            //lat, lng, //might need a way to leave out lat and lng
            name, description, price
        }
        //dont need to check for errors separately
        //bc only returning if there are errors
        const returnOfSpot = await dispatch(updateSpot(payload))
        if(returnOfSpot) {
            setResponseErrors(Object.values(returnOfSpot.errors))
        } else {
            const imagePayload = {
                spotId: id,
                url, preview
            }
            await dispatch(addSpotImage(imagePayload))
            history.push(`/spots/${id}`)
        }
    }
    if(!spot) { return <div>Nothing in here</div>
    }
    return (
        <div className="modalOutside">
        <div className="modalContent">
        <button className="cancelButton"><NavLink to={`/spots/${id}`}>X</NavLink></button>
        <div className='LogInErrors'>
                <ul>
                {responseErrors.map(err => (
                    <li key={err}>{err}</li>
                ))}
                </ul>
            </div>
            <form onSubmit={handleSubmit} className="CreateSpotForm">
            <div>
                    <div>
                    Name
                    </div>
                 <input
                 type='text'
                 onChange={(e)=>setName(e.target.value)}
                 value={name}
                 placeholder='Name'
                 name='name'
                />
                </div>
                <div>
                    <div>
                    Address
                    </div>
                <input
                 type='text'
                 onChange={(e)=>setAddress(e.target.value)}
                 value={address}
                 placeholder='Address'
                 name='address'
                />
                </div>
                <div>
                    <div>
                    City
                    </div>
                 <input
                 type='text'
                 onChange={(e)=>setCity(e.target.value)}
                 value={city}
                 placeholder='City'
                 name='city'
                />
                </div>
                <div>
                    <div>
                    State
                    </div>
                 <input
                 type='text'
                 onChange={(e)=>setState(e.target.value)}
                 value={state}
                 placeholder='State'
                 name='state'
                />
                </div>
                <div>
                    <div>
                    Country
                    </div>
                 <input
                 type='text'
                 onChange={(e)=>setCountry(e.target.value)}
                 value={country}
                 placeholder='Country'
                 name='country'
                />
                </div>
                 {/* <input
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
                /> */}
                <div>
                    Description
                </div>
                <div id="why">
                    <div></div>
                <textarea className="CreateSpotDescriptionBox"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    name='description'
                    placeholder='Please write about your home here...'
                    rows='5'
                ></textarea>
                <div></div>
                </div>
                <div>
                    <div>
                    Price
                    </div>
                <input
                 type='number'
                 placeholder='Price'
                 min='1'
                 value={price}
                 onChange={(e) => setPrice(e.target.value)}
                />
                </div>
                <div id='suggestedImageUrl'>
                    Suggested Image Url
                </div>
                <div>
                 <input
                 type='text'
                 onChange={(e)=>setUrl(e.target.value)}
                 value={url}
                 placeholder='ImageUrl'
                 name='imageUrl'
                />
                </div>
                <div className="wholePreviewImage">
                    <div className="prevImageTextBox">
                        Preview Image
                    </div>
                    <div className="prevImageButton">
                    <input
                    className="checkbox"
                    type="checkbox"
                    onChange={(e) => setPreview(e.currentTarget.checked)}
                    />
                    </div>
                 </div>
                <button type='submit' className="createButton" >List Your Home</button>
            </form>
        </div>
        </div>
    )
}

export default UpdateSpotForm
