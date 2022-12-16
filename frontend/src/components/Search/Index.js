import './Search.css'
import { useState } from 'react'

//pass in prop of which one is clicked on
function SearchForm({showSearchModal, setShowSearchModal, searchContent, setSearchContent }) {
    const [ guestNum, setGuestsNum] = useState(1)
    const [ kidsNum, setKidsNum] = useState(1)
    const [ petsNum, setPetsNum] = useState(1)
    // const allStates =
    // ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
    // "D. C.","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky",
    // "Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri",
    // "Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota",
    // ,"Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina",
    // "South Dakota","Tennessee","Texas", "U.S. Territories","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming", "ElseWhere"]
    //"U.S. Virgin Islands", "Guam", "Minor Outlying Islands", "Puerto Rico", "American Samoa", "Northern Mariana Islands"
    const Regions = ['West', 'Midwest', 'South', 'Northeast', 'Pacific', 'International']
if(searchContent === 'states') {
    return (
        <div className='center'>
        <div>
            <h2 className='center'>Which region would you like to visit?</h2>
        <div className='allStates'>
                {Regions.map( region =>
                    <button key={region}>{region}</button>
                )}
        </div>


        </div>
        <button className='inDevelopment center'>This feature is in development</button>

        </div>
    )
}

if(searchContent === 'calendar') {
    return (
        <div>

             <div className='justSize'>
             <h2 className='center'>When would you like to visit?</h2>
                <div className="checkInOutBox moreCheckIn">
                  <div className="checkInOutDates">
                      <div>check-in
                        <input type="date"></input>
                      </div>
                      <div>check-out
                        <input type="date"></input>
                      </div>
                    </div>
                </div>
                <button className='inDevelopment'>This feature is in development</button>
            </div>
        </div>

    )
}

if(searchContent === 'guests') {
    return (
        <div  className='justSize'>
        <h2 className='center'>How many guests are joining you?</h2>
        <div className='chooseGuests'>
             <label>
              <select
              onChange={(e) => setGuestsNum(e.target.value)}
              value={guestNum}
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
              >
                  <option key='1 guest'  value='1 guest'> 1 pet</option>
                  <option key='2 guests' value='2 guests'> 2 pets</option>
                  <option key='3 guests' value='3 guests'> 3 pets</option>
                  <option key='4 guests' value='4 guests'> 4 pets</option>
                  <option key='5 guests' value='5 guests'> 5 pets</option>
              </select>
            </label>
            </div>
            <button className='inDevelopment'>This feature is in development</button>
      </div>

    )

}

}

export default SearchForm
