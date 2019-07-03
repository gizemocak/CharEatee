import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import MapContainer from "./MapContainer";
import NavBar from "./NavBar";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";

export default function CharityHome(props) {
  const [geoLoc, setGeoLoc] = useState({ lat: 43.6478476, lng: -79.3912643 });
  const [searchValue, setSearchValue] = useState("");
  const [searchList, setSearchList] = useState(false);

  const filteredStores = useStoreState(state => state.filteredStores);
  const googleMapsAPIKey = useStoreState(state => state.googleMapsAPIKey);
  const fetchStores = useStoreActions(actions => actions.fetchStores);
  const [displayedStores, setDisplayedStores] = useState([]);

  useEffect(() => {
      window.scrollTo(0, 0)

    getGeoLocation();
    fetchStores();
  }, []);

  useEffect(() => {
    setDisplayedStores(filteredStores);
  }, [filteredStores]);

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

  const onChange = e => {

    setSearchValue(e.target.value);
    if (e.target.value.length === 0) {
      setDisplayedStores(filteredStores);
    } else {
      let newDisplayedStores = filteredStores.filter(store =>
        store.products.find(
          product => product.name.toLowerCase() === e.target.value.toLowerCase()
        )
      );
      setDisplayedStores(newDisplayedStores);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    setSearchList(true);
  };

  return (
    <>
      <NavBar id={props.match.params.id} />

      {googleMapsAPIKey && filteredStores.length > 0 && geoLoc && (
        <MapContainer
          apiKey={googleMapsAPIKey}
          geoLocation={geoLoc}
          pins={displayedStores}
        />
      )}

      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="search an item"
            value={searchValue}
            onChange={onChange}
            className="search-input"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="search-button">
          Search
        </Button>
      </Form>
      
    </>
  );
}
