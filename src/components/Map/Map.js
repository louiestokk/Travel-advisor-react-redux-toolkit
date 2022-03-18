import React from "react";
import "./Map.scss";
import {
  getCoords,
  setBounds,
  getBounds,
  getPlaces,
  setCoords,
  setChildClick,
  getWeatherData,
} from "../../redux-toolkit/places/placesSlice";
import { useDispatch, useSelector } from "react-redux";
import GoogleMapReact from "google-map-react";
import mapStyles from "../../Styles/mapStyles";
import { Paper, Typography } from "@material-ui/core";
import { LocationOnOutlined } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";

const Map = () => {
  const dispatch = useDispatch();
  const coords = useSelector(getCoords);
  const places = useSelector(getPlaces);
  const weatherData = useSelector(getWeatherData);
  const desktopSize = true;

  const handleClick = (e) => {
    console.log(e.currentTarget);
    const clicked = document.getElementById(e.currentTarget.id);
    console.log(clicked);
  };

  return (
    <div className="map-container">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLEMAPS_API_KEY }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={(e) => {
          dispatch(setCoords({ lat: e.center.lat, lng: e.center.lng }));
          dispatch(setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw }));
        }}
        onChildClick={(child) => dispatch(setChildClick(child))}
      >
        {places?.map((place) => (
          <div
            className="markerContainer"
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={place.loaction_id}
            id={place.location_id}
            onClick={handleClick}
          >
            {!desktopSize ? (
              <LocationOnOutlined color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className="paper">
                <Typography
                  className="typography"
                  variant="subtitle2"
                  gutterBottom
                >
                  {place.name}
                </Typography>
                <img
                  className="pointer"
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                  }
                  alt={place.name}
                />
                <Rating
                  name="read-only"
                  size="small"
                  value={Number(place.rating)}
                  readOnly
                />
              </Paper>
            )}
          </div>
        ))}
        {weatherData?.list?.length &&
          weatherData.list.map((data, i) => (
            <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
              <img
                src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                height="70px"
              />
            </div>
          ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
