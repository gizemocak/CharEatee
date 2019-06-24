import React, { useState } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

const GoogleMap = props => {
  const [icon, setIcon] = useState("");
  const [showingInfoWindow, updateShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, updateSelectedPlace] = useState({});

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

  // const mapResize = () => {

  // }

  const style = {
    position: "absolute",
    width: "100vw",
    height: "100vh",
    top: "-68px",
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
