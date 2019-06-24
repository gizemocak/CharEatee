import React, { useState, useEffect } from "react";
import MapContainer from "./MapContainer";
import NavBar from "./NavBar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function CharityHome() {
  const [apiKey, setApiKey] = useState(null);
  const [geoLoc, setGeoLoc] = useState({});

  useEffect(() => {
    getGeoLocation();
    fetch("/api/getApiKey")
      .then(res => res.json())
      .then(data => setApiKey(data.apiKey))
      .catch(error => {
        console.log(error);
      });
  }, []);

  const getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setGeoLoc(pos);
      });
    }
  };

  return (
    <>
      <NavBar />
      {apiKey && <MapContainer apiKey={apiKey} geoLocation={geoLoc} />}
      <Link to={"/map/search"}>
        <Button variant="outline-success" className="search-button">Search</Button>
      </Link>
    </>
  );
}
