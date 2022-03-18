import React, { useState } from "react";
import "./Search.scss";
import { Autocomplete } from "@react-google-maps/api";
import { BiSearch } from "react-icons/bi";
import {
  getQuery,
  setQuery,
  setCoords,
} from "../../redux-toolkit/places/placesSlice";
import { useDispatch, useSelector } from "react-redux";
const Search = () => {
  // eslint-disable-next-line
  const dispatch = useDispatch();
  const query = useSelector(getQuery);
  const [autoComplete, setAutoComplete] = useState(null);
  const onLoad = (autoC) => setAutoComplete(autoC);
  const onPlaceChanged = () => {
    const lat = autoComplete.getPlace().geometry.location.lat();
    const lng = autoComplete.getPlace().geometry.location.lng();
    dispatch(setCoords({ lat, lng }));
  };
  return (
    <div className="root">
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        className="auto"
      >
        <div
          className="container"
          style={{
            boxShadow:
              "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          }}
        >
          <BiSearch className="icon" />
          <input
            type="text"
            placeholder="Where do you want to go?"
            value={query}
            onChange={(e) => {
              dispatch(setQuery(e.target.value));
            }}
          />
        </div>
      </Autocomplete>
    </div>
  );
};

export default Search;
