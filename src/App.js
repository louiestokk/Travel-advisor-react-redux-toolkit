import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import Footer from "./components/Footer/Footer";
import { getPlacesData } from "./api/index";
import {
  setPlaces,
  getBounds,
  setCoords,
  getTypes,
  setFiltered,
  getRating,
  getPlaces,
  setLoading,
  getLoading,
} from "./redux-toolkit/places/placesSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const bounds = useSelector(getBounds);
  const type = useSelector(getTypes);
  const rating = useSelector(getRating);
  const places = useSelector(getPlaces);
  const loading = useSelector(getLoading);
  useEffect(() => {
    // eslint-disable-next-line
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        dispatch(setCoords({ lat: latitude, lng: longitude }));
      }
    );
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    dispatch(setLoading(true));
    if (bounds.sw && bounds.ne) {
      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        dispatch(
          setPlaces(data?.filter((el) => el.name && el.num_reviews > 0))
        );
      });
      dispatch(setLoading(false));
    }
    // eslint-disable-next-line
  }, [type, bounds]);

  useEffect(() => {
    dispatch(setLoading(true));
    const filteredPlaces = places.filter((el) => el.rating > rating);
    dispatch(setFiltered(filteredPlaces));
    // eslint-disable-next-line
    dispatch(setLoading(false));
  }, [rating]);
  return (
    <div className="App">
      <Header />
      <Search />
      <div className="list-map-container">
        <List />
        <Map />
      </div>
      <Footer />
    </div>
  );
}

export default App;
