// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/Spots/AllSpots/Index";
import AddSpotForm from "./components/Spots/AddSpot/Index";
import CurrentOwnersSpots from "./components/Spots/CurrentOwnersSpots";
import SingleSpot from "./components/Spots/SingleSpot/Index";
import UpdateSpotForm from "./components/Spots/UpdateSpot/Index";
import { getSpots } from "./store/spot";
import AddReviewForm from "./components/Reviews/AddReview/Index";
import UpdateReviewForm from "./components/Reviews/UpdateReview/Index";
import PageNotFound from "./components/PageNotFound/Index";
import Footer from "./components/Navigation/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    //don't show the sign up page until it is loaded and
    //confirmed if the sign up page is needed bc the person isn't logged in
    //gives it some time to load
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(getSpots());
  }, [dispatch]);
  const spots = useSelector((state) => Object.values(state.spots));

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <Footer />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path={["/", "/spots"]}>
            <AllSpots />
          </Route>
          <Route path="/spots/create">
            <AddSpotForm spots={spots} />
          </Route>
          <Route path="/spots/current">
            <CurrentOwnersSpots />
          </Route>
          <Route path="/spots/:id/reviews">
            <AddReviewForm spots={spots} />
          </Route>
          <Route path="/spots/:id/edit">
            <UpdateSpotForm spots={spots} />
          </Route>
          <Route path="/spots/:id">
            <SingleSpot spots={spots} />
          </Route>
          <Route path="/reviews/:reviewId/:spotId">
            <UpdateReviewForm />
          </Route>
          <Route path="/page-not-found">
            <PageNotFound />
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
