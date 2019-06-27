import React, { useState, useEffect } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

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

  // useEffect(() => {
  //   handleFetchStore()
  // },[])


  // const handleFetchStore = () => {
  //   fetch('http://localhost:8080/api/stores', {
  //     method: 'get',
  //     headers: {'Content-Type':'application/json'},
  //    })
  //    .then(res => res.json())
  //    .then(res => {
  //     setPins(res)
  //     }
  //   )
  // }

  const style = {
    position: "absolute",
    width: "100vw",
    height: "100vh",
    top: "-10px",
    left: "-40px"
  };


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
        return (
              <Marker
              key={item.email}
              title={"Grocer/Restaurant"}
              name={item.username}
              position={{ lat: item.latitude, lng: item.longitude }}
              onClick={onMarkerClick}
            />
             )
      })}

      <InfoWindow
        marker={activeMarker}
        visible={showingInfoWindow}
        onClose={onClose}
      >
        <div>
          <h1>{selectedPlace.name}</h1>
        </div>
      </InfoWindow>
    </Map>

  );
};

export default GoogleApiWrapper(props => ({
  apiKey: props.apiKey,
  LoadingContainer: () => <div>loading...</div>
}))(GoogleMap);
