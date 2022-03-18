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
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const bounds = useSelector(getBounds);
  const type = useSelector(getTypes);
  const rating = useSelector(getRating);
  const places = useSelector(getPlaces);
  const coords = useSelector(getCoords);

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
      getWheaterData(coords.lat, coords.lng).then((data) => {
        dispatch(setWeatherData(data));
      });

      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        dispatch(
          setPlaces(data?.filter((el) => el.name && el.num_reviews > 0))
        );
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
        {loading ? (
          <Audio height="100" width="100" color="grey" ariaLabel="loading" />
        ) : (
          <>
            <List />
            <Map />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
