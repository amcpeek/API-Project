import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateSpot, getSpots } from '../../../store/spot'
import { getOneSpot } from '../../../store/oneSpot'
import { addSpotImage } from '../../../store/spot'
//import './AddSpot.css'

const UpdateSpotForm = ({showModal, setShowModal}) => {
    const { id } = useParams()
    const dispatch = useDispatch()
   const [address, setAddress] = useState('')
   const [city, setCity] = useState('')
   const [state, setState] = useState('')
   const [country, setCountry] = useState('')
//    const [lat, setLat] = useState(0)
//    const [lng, setLng] = useState(0)
   const [name, setName] = useState('')
   const [description, setDescription] = useState('')
   const [price, setPrice] = useState(0)
   const [url, setUrl] = useState('')
//    const [preview, setPreview] = useState(false)
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
        // setLat(spot.lat)
        // setLng(spot.lng)
        setName(spot.name)
        setDescription(spot.description)
        setPrice(spot.price)
        setUrl(spot.url || 'https://i.pinimg.com/originals/2a/43/d6/2a43d625d02deb3c0b1179eac7f2256e.jpg')
        // setPreview(false)
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
                url,
                preview: true
            }
            await dispatch(addSpotImage(imagePayload))
            const oneSpotHopefully = await dispatch(getOneSpot(id))
            console.log('oneSpotHopefully',oneSpotHopefully)
            setShowModal(false)

        }
    }
    if(!spot) { return <div>This form is not available</div>
    }
    return (
        <div className="realModalOutside">
        <div className="realModalContent">
        <div className='outerFormTop'>
        <div className='formTop'>
        <button className="cancelButton" onClick={() => setShowModal(false)}>X</button>
        {/* <button className="cancelButton"><NavLink to={`/spots/${id}`}>X</NavLink></button> */}
        <h3>Edit Your Listing of '{spot.name}'</h3>
        <div className='LogInErrors'>
                <ul className='ulNoBullets'>
                {responseErrors.map(err => (
                    <li key={err}>{err}</li>
                ))}
                </ul>
            </div>
            </div>
            </div>
            <form onSubmit={handleSubmit} className="CreateSpotForm roundAllFields">
                    <div className='labelForForm'>
                    Name
                    </div>
            <div>

                 <input
                 type='text'
                 onChange={(e)=>setName(e.target.value)}
                 value={name}
                 placeholder='Name'
                 name='name'
                />
                </div>
                <div className='labelForForm'>
                    Address
                    </div>
                <div>

                <input
                 type='text'
                 onChange={(e)=>setAddress(e.target.value)}
                 value={address}
                 placeholder='Address'
                 name='address'
                />
                </div>
                <div className='labelForForm'>
                    City
                    </div>
                <div>

                 <input
                 type='text'
                 onChange={(e)=>setCity(e.target.value)}
                 value={city}
                 placeholder='City'
                 name='city'
                />
                </div>
                <div className='labelForForm'>
                    State
                    </div>
                <div>

                 <input
                 type='text'
                 onChange={(e)=>setState(e.target.value)}
                 value={state}
                 placeholder='State'
                 name='state'
                />
                </div>
                <div className='labelForForm'>
                    Country
                    </div>
                <div>

                 <input
                 type='text'
                 onChange={(e)=>setCountry(e.target.value)}
                 value={country}
                 placeholder='Country'
                 name='country'
                />
                </div>
                <div className='labelForForm'>
                    Description
                </div>
                <div >
                <textarea
                    className="CreateSpotDescriptionBox2"

                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    name='description'
                    placeholder='Description'
                    rows='5'
                ></textarea>
                </div>
                <div className='labelForForm'>
                    Price
                    </div>
                <div>

                <input
                 type='number'
                 placeholder='Price'
                 min='1'
                 value={price}
                 onChange={(e) => setPrice(e.target.value)}
                />
                </div>
                <div className='labelForForm'>
                You can use the suggested image url or paste your own below.
                </div>
                <div>
                 <input
                 type='text'
                 onChange={(e)=>setUrl(e.target.value)}
                 value={url}
                 placeholder='ImageUrl'
                 name='imageUrl'
                 required
                />
                </div>
                {/* <div className="wholePreviewImage">
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
                 </div> */}
                <button type='submit' className="createButton" >List Your Home</button>
            </form>
        </div>
        </div>
    )
}

export default UpdateSpotForm
