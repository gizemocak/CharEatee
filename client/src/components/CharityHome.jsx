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

  const stores = useStoreState(state => state.stores);
  const googleMapsAPIKey = useStoreState(state => state.googleMapsAPIKey);
  const fetchStores = useStoreActions(actions => actions.fetchStores);

  console.log("her id", props.match.params.id);

  console.log("ppp", stores);
  useEffect(() => {
    getGeoLocation();
    fetchStores();
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

  const onChange = e => {
    console.log(e.target.value);
    setSearchValue(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    setSearchList(true);
  };

  return (
    <>
      <NavBar id={props.match.params.id} />
      
      {!searchList && googleMapsAPIKey && stores.length > 0 && geoLoc && <MapContainer apiKey={googleMapsAPIKey} geoLocation={geoLoc} pins={stores}/>}
    
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
      {searchList &&
        stores.length > 0 &&
        stores.map(item => {
          return (
            <>
              <li>
                from {item.username}
              </li>
              <li>
                from{" "}
                <Link to="/grocer/profile">{item.username}</Link>
              </li>
            </>
          );
        })}
    </>
  );
}
