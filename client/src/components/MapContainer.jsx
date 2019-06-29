import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { withRouter } from "react-router";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import {Link} from 'react-router-dom'

const GoogleMap = props => {
  const [icon, setIcon] = useState("");
  const [showingInfoWindow, updateShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, updateSelectedPlace] = useState({});
  // const [pins, setPins] = useState([]);

  const changeIconColor = (mapProps, map) => {
    const { google } = mapProps;
    setIcon(google.maps.SymbolPath.CIRCLE);
  };

  const onMarkerClick = (props, marker, e) => {
    updateSelectedPlace(props);
    setActiveMarker(marker);
    updateShowingInfoWindow(true);
    console.log(marker)
    //window.location = '/profile/'+ marker.id
  };

  const onClose = props => {
    if (showingInfoWindow) {
      updateShowingInfoWindow(false);
      setActiveMarker(null);
    }
  };

  const onMapClicked = props => {
    if (showingInfoWindow) {
      updateShowingInfoWindow(false);
      setActiveMarker(null);
    }
  };


  const style = {
    position: "absolute",
    width: "100vw",
    height: "100vh",
    top: "-10px",
    left: "-40px"
  };

  const onInfoWindowOpen = (selectedPlace, e) => {
    console.log(selectedPlace, props)
    const button = (
    <div>
      <a onClick={e => {props.history.push(`/profile/${selectedPlace.id}`);}}>{selectedPlace.name}</a>
      </div>
      );
    ReactDOM.render(React.Children.only(button), document.getElementById("iwc"));
  }


  return (
    <Map
      google={props.google}
      zoom={14}
      initialCenter={props.geoLocation}
      onReady={changeIconColor}
      onClick={onMapClicked}
      style={style}
    >
      <Marker
        name={"Current location"}
        icon={{
          path: icon,
          strokeColor: "#467DFE",
          scale: 6.5
        }}
        onClick={onMarkerClick}
      />

      <Marker
        title={"grocery store"}
        name={"Fresh & Wild Food Market"}
        position={{ lat: 43.6457, lng: -79.39477 }}
        onClick={onMarkerClick}
      />
      <Marker
        name={"Loblaws"}
        position={{ lat: 43.64756, lng: -79.40159 }}
        onClick={onMarkerClick}
      />

      {props.pins.length > 0  && props.pins.map(item => {
        // console.log(item)
        return (
              <Marker
              key={item.email + "" + item.id}
              title={"Grocer/Restaurant"}
              name={item.username}
              position={{ lat: item.latitude, lng: item.longitude }}
              onClick={onMarkerClick}
              id={item.id}
            />
             )
      })}

      <InfoWindow
        marker={activeMarker}
        visible={showingInfoWindow}
        onClose={onClose}
        onOpen={(e) => {
          onInfoWindowOpen(selectedPlace,e)
        }}
      >
        <div id="iwc" />
      </InfoWindow>
    </Map>

  );
};

export default GoogleApiWrapper(props =>{ 
  console.log('props', props)
  return ({
  apiKey: props.apiKey,
  LoadingContainer: () => <div>loading...</div>
})})(withRouter(GoogleMap));
