import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateSpot, getSpots } from '../../../store/spot'
import { addSpotImage } from '../../../store/spotImage'
//import './AddSpot.css'

const UpdateSpotForm = ({spots}) => {
    const { id } = useParams()
    const dispatch = useDispatch()

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

   useEffect(() => {
    dispatch(getSpots())
   }, [dispatch])

   let spot
   useEffect(() => {
    spot = spots.find(spot => spot.id.toString() === id);
    console.log('checking spots here', spots,id)
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
   }, [spots])

   console.log('just spot', spots)





// const spot = spots.find(spot => spot.id.toString() === id);
//     const [address, setAddress] = useState(spot.address)
//     const [city, setCity] = useState(spot.city)
//     const [state, setState] = useState(spot.state)
//     const [country, setCountry] = useState(spot.country)
//     const [lat, setLat] = useState(spot.lat)
//     const [lng, setLng] = useState(spot.lng)
//     const [name, setName] = useState(spot.name)
//     const [description, setDescription] = useState(spot.description)
//     const [price, setPrice] = useState(spot.price)
//     const [url, setUrl] = useState('https://img.freepik.com/free-photo/fireplace-with-red-socks-hanging-christmas-tree_1252-402.jpg')
//     const [preview, setPreview] = useState(false)




//    if(!spots) {
//     return 0
//   }

//    if(spot) {
//        // setAddress(spot.address)
//        console.log('this is the spot 11/23',spot)
//    }






    // useEffect(() => {
    //     dispatch(getSpots())
    //     console.log('when does the useEffect run')
    // }, [spot])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            id,
            address, city, state, country,
            lat, lng, //might need a way to leave out lat and lng
            name, description, price
        }
       // console.log('what is payload', payload)

        await dispatch(updateSpot(payload))
       // await dispatch(getSpots())
        //  if(updatedSpot) {
        //     await dispatch(getSpots())
        //   //  hideForm()
        // }
        const imagePayload = {
            spotId: id,
            url, preview
        }
        console.log('what is the image payload ', imagePayload)

        await dispatch(addSpotImage(imagePayload))

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
                {/* <input
                 type='text'
                 value={image}
                 onChange={() => dispatch(addSpotImage(spot.id, image))}
                 placeholder='Image URL'
                 name='image'
                >
                </input> */}
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

export default UpdateSpotForm
