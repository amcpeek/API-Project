import './Search.css'
import { useState } from 'react'
import { getSpots } from '../../store/spot'
import { useDispatch } from 'react-redux'
// import { Redirect } from 'react-router-dom'
// import { useHistory } from 'react-router-dom'
import AllSpots from '../Spots/AllSpots/Index'

//pass in prop of which one is clicked on
function SearchForm({showSearchModal, setShowSearchModal, searchContent, setSearchContent }) {
    const dispatch = useDispatch()
    const [ guestNum, setGuestsNum] = useState(1)
    const [ kidsNum, setKidsNum] = useState(1)
    const [ petsNum, setPetsNum] = useState(1)
    // const history = useHistory()
    // const [ minPrice, setMinPrice ] = useState(1)
    const [ maxPrice, setMaxPrice ] = useState(5000)
    const Regions = ['west', 'midwest', 'south', 'northeast', 'pacific', 'anywhere']

    const handleSubmit = async (region) => {
        console.log('is selected region in the handle submit',region)
        const response = await dispatch(getSpots('region', region))
        // .then(<AllSpots/>)
        .then(setShowSearchModal(false))

    }

    const handleSubmitPrice = async (e) => {
      e.preventDefault()
      const response = await dispatch(getSpots('maxPrice', maxPrice))
      .then(setShowSearchModal(false))
      // .then(<Redirect to='/'/>)
    }

if(searchContent === 'states') {
    return (
        <div className='center'>
        <div>
            <h2 className='center'>Which region would you like to visit?</h2>
        <div className='allStates'>
                {Regions.map( region =>
                    <button key={region}
                    value={region}
                    onClick={(e) => handleSubmit(e.target.value)}
                     >
                      {region}</button>

                )}
        </div>
        </div>
        {/* <button className='inDevelopment center' onClick={() => setShowSearchModal(false)}>This feature is in development</button> */}

        </div>
    )
}

if(searchContent === 'price') {
    return (

        <div>

             <div className='justSize'>
             <h2 className='center'>What is your max price?</h2>
                <div className="checkInOutBox moreCheckIn">
                  <div className="checkInOutDates">
                      {/* <div>min price
                        <input type="number"
                        min='0'
                        max='10000'
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        >

                        </input>
                      </div> */}
                      <div>
                        <form onSubmit={handleSubmitPrice} className='centerDiv'>
                        <input type="number"
                        className='makeBigger'
                        min='0'
                        max='5000'
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        required
                        ></input>
                        <button type='submit' className='inDevelopment'>Search</button>
                        </form>
                      </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

if(searchContent === 'guests') {
    return (
        <div  className='justSize'>
        <h2 className='center'>How many guests are joining you?</h2>
        <div className="chooseGuests">
             <label

             >
              <select
              onChange={(e) => setGuestsNum(e.target.value)}
              value={guestNum}
              className='makeBigger'
              >
                  <option key='1 guest'  value='1 guest'> 1 adult</option>
                  <option key='2 guests' value='2 guests'> 2 adults</option>
                  <option key='3 guests' value='3 guests'> 3 adults</option>
                  <option key='4 guests' value='4 guests'> 4 adults</option>
                  <option key='5 guests' value='5 guests'> 5 adults</option>
              </select>
            </label>
            <label>
              <select
              onChange={(e) => setKidsNum(e.target.value)}
              value={kidsNum}
              className='makeBigger'
              >
                  <option key='1 guest'  value='1 guest'> 1 child</option>
                  <option key='2 guests' value='2 guests'> 2 children</option>
                  <option key='3 guests' value='3 guests'> 3 children</option>
                  <option key='4 guests' value='4 guests'> 4 children</option>
                  <option key='5 guests' value='5 guests'> 5 children</option>
              </select>
            </label>
            <label>
              <select
              onChange={(e) => setPetsNum(e.target.value)}
              value={petsNum}
              className='makeBigger'
              >
                  <option key='1 guest'  value='1 guest'> 1 pet</option>
                  <option key='2 guests' value='2 guests'> 2 pets</option>
                  <option key='3 guests' value='3 guests'> 3 pets</option>
                  <option key='4 guests' value='4 guests'> 4 pets</option>
                  <option key='5 guests' value='5 guests'> 5 pets</option>
              </select>
            </label>
            </div>
            <button className='inDevelopment' onClick={() => setShowSearchModal(false)}>This feature is in development</button>
      </div>

    )

}

}

export default SearchForm
