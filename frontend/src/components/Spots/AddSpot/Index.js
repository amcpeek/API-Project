import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addSpot } from '../../../store/spot'
import { addSpotImage } from '../../../store/spotImage'
import './AddSpot.css'
import { NavLink, Redirect } from 'react-router-dom'
import { useHistory } from 'react-router-dom'


const AddSpotForm = () => {
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [url, setUrl] = useState('https://jweekly.com/wp-content/uploads/2021/12/Christmas-Tree-Snow-drawing-1080x675-1.jpeg')
    const [preview, setPreview] = useState(false)
    const history = useHistory()

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
       //console.log('can I get the response.id', response)

        const payload = {
            spotId: response.id,
            url, preview
        }

        await dispatch(addSpotImage(payload))
       //if (newSpot) return <Redirect to="/"/> this line didn't work
       history.push(`/spots/${response.id}`)


    }

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
        <div className="modalOutside">
        <div className="modalContent">
            {/* can later put in className in the div */}

            <form onSubmit={handleSubmit} className="CreateSpotForm">
                <h1>List Your Home</h1>
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
                <textarea id="CreateSpotDescriptionBox"
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
                <div>
                    <div>
                    Image Url
                    </div>
                 <input
                 type='text'
                 onChange={(e)=>setUrl(e.target.value)}
                 value={url}
                 placeholder='ImageUrl'
                 name='imageUrl'
                />
                </div>

                <div>
                    <div>
                    Preview image?
                    </div>
                    <input
                type="checkbox"
                onChange={(e) => setPreview(e.currentTarget.checked)}
                 /></div>
                 <div>

                <button type='submit' className="createButton" >Submit</button>
                {/* <button >Cancel
                   <NavLink exact to="/"></NavLink>
                </button> */}
                <button className="createButton"><NavLink to={'/'}>Cancel</NavLink></button>
                </div>
            </form>

        </div>
        </div>
    )
}

export default AddSpotForm
