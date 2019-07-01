import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import MapContainer from "./MapContainer";
import NavBar from "./NavBar";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";

export default function CharityHome(props) {
  console.log("props", props);
  const [geoLoc, setGeoLoc] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [searchList, setSearchList] = useState(false);

  const filteredStores = useStoreState(state => state.filteredStores);
  const googleMapsAPIKey = useStoreState(state => state.googleMapsAPIKey);
  const fetchStores = useStoreActions(actions => actions.fetchStores);
  const [displayedStores, setDisplayedStores] = useState([]);

  console.log("her id", props.match.params.id);

  console.log("ppp", filteredStores);
  useEffect(() => {
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
    /* let productNameArr = filteredStores.map(item => item.name);
    console.log("productNameArr", productNameArr);
    let searchValue = productNameArr.filter(item => {
      return item.toLowerCase().search(e.target.value.toLowerCase());
    });
    setSearchValue(searchValue); */
    console.log("e.target.value", e.target.value);
    setSearchValue(e.target.value);
    if (e.target.value.length === 0) {
      setDisplayedStores(filteredStores);
    } else {
      let newDisplayedStores = filteredStores.filter(store =>
        store.products.find(
          product => product.name === e.target.value.toLowerCase()
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
      {searchList &&
        displayedStores.length > 0 &&
        displayedStores.map(item => {
          return (
            <>
              <li>from {item.username}</li>
              <li>
                from <Link to="/grocer/profile">{item.username}</Link>
              </li>
            </>
          );
        })}
    </>
  );
}
