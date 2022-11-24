//this file is now never used and should probably be deleted
// import { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { addSpotImage } from '../../../store/spotImage'

// const AddSpotImageForm = ({singleSpot}) => {
//     const [url, setUrl] = useState('testImageUrl')
//     const [preview, setPreview] = useState(false)

//     const dispatch = useDispatch()

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         const payload = {
//             spotId: singleSpot.id,
//             url, preview
//         }
//         let spotImage
//         spotImage = await dispatch(addSpotImage(payload))
//     }

//     return (
//         <div>
//            <h1>Add Spot Image</h1>
//            <form onSubmit={handleSubmit}>
//            <input
//                  type='text'
//                  onChange={(e)=>setUrl(e.target.value)}
//                  value={url}
//                  placeholder='ImageUrl'
//                  name='imageUrl'
//                 />
//              <label><input
//                 type="checkbox"
//                 onChange={(e) => setPreview(e.currentTarget.checked)}
//             />Do you want this to be your preview image?</label>
//             <button type='submit'>Submit</button>


//            </form>
//         </div>
//     )
// }

// export default AddSpotImageForm
