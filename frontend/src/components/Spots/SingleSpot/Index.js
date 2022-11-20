import { useParams } from 'react-router-dom';
//import './SingleSpot.css'; stopped the run

const SingleSpot = ({ spots }) => {
  const { id } = useParams();
  // const singleSpot = 0

  const singleSpot = spots.find(spot => spot.id.toString() === id);
  if(singleSpot) {
    return (
      <div >
      {/* className='singleSpot' this doesn't exist yet ^ */}
        <h1>{singleSpot.name}</h1>
        <img
          src={singleSpot.previewImage}
          alt={singleSpot.name}
        />
        <p>
          {singleSpot.description}
        </p>
        <h4>{singleSpot.price}</h4>
        <h4>{singleSpot.address}</h4>
        <h4>{singleSpot.city}</h4>
        <h4>{singleSpot.state}</h4>
        <h4>{singleSpot.country}</h4>
      </div>
    );
  }
  return (

    <div>Waiting</div>
  )

};

export default SingleSpot;
