import { configureStore } from "@reduxjs/toolkit";
import placesReducer from "./places/placesSlice";
const store = configureStore({
  reducer: {
    places: placesReducer,
  },
});
export default store;
