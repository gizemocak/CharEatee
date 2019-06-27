import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import MapContainer from "./MapContainer";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';

export default function CharityHome() {
  const [apiKey, setApiKey] = useState(null);
  const [geoLoc, setGeoLoc] = useState({});
  const [pins, setPins] = useState([]);
  const [searchValue, setSearchValue] = useState("")
  const [searchList, setSearchList] = useState(false)


  useEffect(() => {
    getGeoLocation();
    fetch("/api/getApiKey")
      .then(res => res.json())
      .then(data => setApiKey(data.apiKey))
      .catch(error => {
        console.log(error);
      });
      handleFetchStore()
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


  const handleFetchStore = () => {
    fetch('http://localhost:8080/api/stores', {
      method: 'get',
      headers: {'Content-Type':'application/json'},
     })
     .then(res => res.json())
     .then(res => {
      setPins(res)
      }
    )
  }

const onChange = (e) => {
   console.log(e.target.value)
   setSearchValue(e.target.value)
}

const onSubmit = (e) => {
e.preventDefault()
setSearchList(true)
}
  

  return (
    <>
      <NavBar />
      {!searchList && apiKey && <MapContainer apiKey={apiKey} geoLocation={geoLoc} pins={pins}/>}
         <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Control 
        type="text"
        placeholder="search an item" 
        value={searchValue}
        onChange={onChange}
        className="search-button"
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="search-button">
       Search
      </Button>
    </Form>
    {searchList && pins.length > 0 && 
        pins.map(item => {
          return (
          <li>{item.name}    {item.username}</li>
          )
        })
    }
    </>
  );
}
