import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import spotsReducer from "./spot";
//import spotImagesReducer from "./spotImage";
import oneSpotReducer from "./oneSpot";
import reviewsReducer from "./review";
import bookingsReducer from "./booking";

const rootReducer = combineReducers({
  // add reducer functions here
  session: sessionReducer,
  spots: spotsReducer,
  // spotImages: spotImagesReducer,
  oneSpot: oneSpotReducer,
  reviews: reviewsReducer,
  bookings: bookingsReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
