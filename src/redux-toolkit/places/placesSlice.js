import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  places: [],
  coords: {},
  bounds: "",
  type: "restaurants",
  rating: "",
  childClick: null,
  filtered: [],
  weatherData: [],
};

const PlacesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    setQuery: (state = initialState, { payload }) => {
      state.query = payload;
    },
    setPlaces: (state = initialState, { payload }) => {
      state.places = payload;
    },
    setCoords: (state = initialState, { payload }) => {
      state.coords = payload;
    },
    setBounds: (state = initialState, { payload }) => {
      state.bounds = payload;
    },
    setType: (state = initialState, { payload }) => {
      state.type = payload;
    },
    setRating: (state = initialState, { payload }) => {
      state.rating = payload;
    },
    setChildClick: (state = initialState, { payload }) => {
      state.childClick = payload;
    },
    setFiltered: (state = initialState, { payload }) => {
      state.filtered = payload;
    },
    setWeatherData: (state = initialState, { payload }) => {
      state.weatherData = payload;
    },
  },
});
export const {
  setQuery,
  setPlaces,
  setCoords,
  setBounds,
  setType,
  setRating,
  setChildClick,
  setFiltered,
  setWeatherData,
} = PlacesSlice.actions;
export const getQuery = (state) => state.places.query;
export const getPlaces = (state) => state.places.places;
export const getCoords = (state) => state.places.coords;
export const getBounds = (state) => state.places.bounds;
export const getTypes = (state) => state.places.type;
export const getRating = (state) => state.places.rating;
export const getChildClick = (state) => state.places.childClick;
export const getFiltered = (state) => state.places.filtered;
export const getWeatherData = (state) => state.places.weatherData;
export default PlacesSlice.reducer;
