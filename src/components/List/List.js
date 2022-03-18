import React, { useEffect } from "react";
import "./List.scss";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import {
  getPlaces,
  getTypes,
  setType,
  getRating,
  setRating,
  getFiltered,
} from "../../redux-toolkit/places/placesSlice";
import { useDispatch, useSelector } from "react-redux";
const List = ({ element }) => {
  const dispatch = useDispatch();
  const places = useSelector(getPlaces);
  const type = useSelector(getTypes);
  const rating = useSelector(getRating);
  const filteredPlaces = useSelector(getFiltered);
  useEffect(() => {
    if (element) {
      document.getElementById(element).scrollIntoView({ behavior: "smooth" });
    }
  }, [element]);
  return (
    <div className="list-root">
      <h4 style={{ marginTop: "1rem" }}>Restaurants, Hotels & Attractions</h4>
      <div className="form-control">
        <div className="form-input">
          <p>Type</p>
          <select
            value={type}
            onChange={(e) => {
              dispatch(setType(e.target.value));
            }}
          >
            <option value="restaurants">Restaurants</option>
            <option value="hotels">Hotels</option>
            <option value="attractions">Attractions</option>
          </select>
        </div>
        <div className="form-input">
          <p>Rating</p>
          <select
            value={rating}
            onChange={(e) => {
              dispatch(setRating(e.target.value));
            }}
          >
            <option value={0}>All</option>
            <option value={3}>Above 3.0</option>
            <option value={4}>Above 4.0</option>
            <option value={4.5}>Above 4.5</option>
          </select>
        </div>
      </div>
      <div className="places-root">
        {filteredPlaces.length ? (
          <div>
            {filteredPlaces?.map((place, ind) => {
              return (
                <div
                  key={ind}
                  className="places-container"
                  id={place.location_id}
                >
                  <PlaceDetails place={place} />
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            {places?.map((place, ind) => {
              return (
                <div key={ind} className="places-container">
                  <PlaceDetails place={place} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
