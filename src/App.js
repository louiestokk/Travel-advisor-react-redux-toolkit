import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import Footer from "./components/Footer/Footer";
import { getPlacesData, getWheaterData } from "./api/index";
import {
  setPlaces,
  getBounds,
  setCoords,
  getTypes,
  setFiltered,
  getRating,
  getPlaces,
  setWeatherData,
  getCoords,
} from "./redux-toolkit/places/placesSlice";
import { useDispatch, useSelector } from "react-redux";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Audio } from "react-loader-spinner";
function App() {
  const dispatch = useDispatch();
  const bounds = useSelector(getBounds);
  const type = useSelector(getTypes);
  const rating = useSelector(getRating);
  const places = useSelector(getPlaces);
  const coords = useSelector(getCoords);
  const [element, setElement] = useState("");
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
    if (bounds.sw && bounds.ne) {
      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        dispatch(
          setPlaces(data?.filter((el) => el.name && el.num_reviews > 0))
        );
      });
      getWheaterData(coords.lat, coords.lng).then((data) => {
        dispatch(setWeatherData(data));
      });
    }
    // eslint-disable-next-line
  }, [type, bounds]);

  useEffect(() => {
    const filteredPlaces = places.filter((el) => el.rating > rating);
    dispatch(setFiltered(filteredPlaces));
    // eslint-disable-next-line
  }, [rating]);
  return (
    <div className="App">
      <Header />
      <Search />
      <div className="list-map-container">
        <List element={element} />
        <Map setElement={setElement} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
