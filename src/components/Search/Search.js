import React from "react";
import "./Search.scss";
import { BiSearch } from "react-icons/bi";
import { getQuery, setQuery } from "../../redux-toolkit/places/placesSlice";
import { useDispatch, useSelector } from "react-redux";
const Search = () => {
  // eslint-disable-next-line
  const dispatch = useDispatch();
  const query = useSelector(getQuery);

  return (
    <div className="root">
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
    </div>
  );
};

export default Search;
