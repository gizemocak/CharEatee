import React, { useState, useEffect } from "react";
import MapContainer from "./MapContainer";
import NavBar from "./NavBar";

function CharityHome() {
  const [apiKey, setApiKey] = useState(null);

  useEffect(() => {
    fetch("/api/getApiKey")
      .then(res => res.json())
      .then(data => setApiKey(data.apiKey))
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div>Charity Home page</div>
      <NavBar />
      {apiKey && <MapContainer apiKey={apiKey} />}
    </>
  );
}

export default CharityHome;
