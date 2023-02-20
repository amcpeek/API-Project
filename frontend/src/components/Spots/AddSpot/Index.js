import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addSpot } from '../../../store/spot'
import { addSpotImage } from '../../../store/spot'
import { getOneSpot } from '../../../store/oneSpot'
import './AddSpot.css'
import { useHistory } from 'react-router-dom'

const AddSpotForm = ({showModal, setShowModal}) => {
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('Alabama')
    const [country, setCountry] = useState('')
    // const [lat, setLat] = useState(0)
    // const [lng, setLng] = useState(0)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [url, setUrl] = useState('https://i.pinimg.com/originals/4f/c8/78/4fc8780a9aa5873b3593cfb9abc4ffb9.jpg')
    // const [preview, setPreview] = useState(false)
    const history = useHistory()
    const [responseErrors, setResponseErrors] = useState([])
       const allStates =
    ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
    "D. C.","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky",
    "Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri",
    "Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota",
    ,"Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina",
    "South Dakota","Tennessee","Texas", "U.S. Territories","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming", "International"]
   // "U.S. Virgin Islands", "Guam", "Minor Outlying Islands", "Puerto Rico", "American Samoa", "Northern Mariana Islands"


    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const newSpot = {
            address, city, state, country,
          //  lat, lng, //might need a way to leave out lat and lng
            name, description, price
        }
        const response = await dispatch(addSpot(newSpot))
        if(response.errors) {
            setResponseErrors(Object.values(response.errors))
        } else  {
            const payload = {
                spotId: response.id,
                url,
                preview : true
            }
            await dispatch(addSpotImage(payload))
            history.push(`/spots/${response.id}`)
            dispatch(getOneSpot(response.id)).then(setShowModal(false))
        }
    }

    return (

        <>
        {showModal && (
            <div className="realModalOutside">
            <div className="realModalContent">
            <>
            <div className='outerFormTop'>
            <div className='formTop'>
              <button className="cancelButton" onClick={() => setShowModal(false)}>X</button>
              <h3>Describe Your Home</h3>
             <div className='LogInErrors'>
             <ul className='ulNoBullets'>
             {responseErrors.map(err => (
                 <li key={err}>{err}</li>
             ))}
             </ul>
             </div>
             </div>
         </div>

         <form onSubmit={handleSubmit} className="CreateSpotForm" >
             <div>
              <input className='roundTopFields'
              type='text'
              onChange={(e)=>setName(e.target.value)}
              value={name}
              placeholder='Name'
              name='name'
             />
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
             <div>
              <input
              type='text'
              onChange={(e)=>setCity(e.target.value)}
              value={city}
              placeholder='City'
              name='city'
             />
             </div>

             {/* <div>
              <input
              type='text'
              onChange={(e)=>setState(e.target.value)}
              value={state}
              placeholder='State'
              name='state'
             />
             </div> */}
              <div className='StateDropDownSection'>
                <div className='labelForForm'>
                    State
                </div>
                      <label>
                        <select
                        placeholder='State'
                        onChange={(e) => setState(e.target.value)}
                        value={state}
                        >
                            {allStates.map(state => (
                                <option key={state} value={state}> {state}</option>
                            ))}
                        </select>
                      </label>

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
             <div id="why">
                 <div></div>
             <textarea className="CreateSpotDescriptionBox"
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
                 name='description'
                 placeholder='Description'
                 rows='5'
             ></textarea>
             <div></div>
             </div>
             <div>
             <input
              className='roundBottomFields'
              type='number'
              placeholder='Price'
              min='1'
              max='500'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
             />
             </div>
             <div className='flexStart'>
             <div className='labelForForm'>
                 You can use the suggested image url or paste your own below.
             </div>
             </div>
             <div>
              <input
              className='roundTopFields roundBottomFields'
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
         </>
            </div>
            </div>


        )}
        </>


    )
}

export default AddSpotForm
