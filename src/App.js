import React, { useEffect } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import Footer from "./components/Footer/Footer";
import { getPlacesData } from "./api/index";
import {
  getPlaces,
  setPlaces,
  getBounds,
  setBounds,
  setFiltered,
  getCoords,
  setCoords,
  getTypes,
} from "./redux-toolkit/places/placesSlice";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const dispatch = useDispatch();
  const coords = useSelector(getCoords);
  const bounds = useSelector(getBounds);
  const type = useSelector(getTypes);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        dispatch(setCoords({ lat: latitude, lng: longitude }));
      }
    );
  }, []);
  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        console.log(data);
        dispatch(
          setPlaces(data?.filter((el) => el.name && el.num_reviews > 0))
        );
      });
    }
  }, [type, bounds]);

  useEffect(() => {}, []);
  return (
    <div className="App">
      <Header />
      <Search />
      <div>
        <List />
        <Map />
      </div>
      <Footer />
    </div>
  );
}

export default App;
