// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/Spots/AllSpots/Index";
// import AddSpotForm from "./components/Spots/AddSpot/Index";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => { //don't show the sign up page until it is loaded and
    //confirmed if the sign up page is needed bc the person isn't logged in
    //gives it some time to load
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />

      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}

      <Switch>
         <Route path="/spots">
            <AllSpots/>
            {/* <AddSpotForm/> */}
          </Route>
          {/* <h2>I think this would show on all pages</h2> */}
      </Switch>

    </>
  );
}

export default App;
