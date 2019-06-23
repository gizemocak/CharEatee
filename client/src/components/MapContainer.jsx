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
    updateShowingInfoWindow(true);
    setActiveMarker(marker);
  };

  const onMapClicked = props => {
    if (showingInfoWindow) {
      updateShowingInfoWindow(false);
      setActiveMarker(null);
    }
  };

  return (
    <Map
      google={props.google}
      zoom={14}
      initialCenter={props.geoLocation}
      onReady={changeIconColor}
    >
      <Marker
        name={"Current location"}
        icon={{
          path: icon,
          strokeColor: "#467DFE",
          scale: 6.5
        }}
      />

      <Marker
        title={"Charity"}
        name={"Canadian Foundation for Health and Prosperity"}
        position={{ lat: 43.663788, lng: -79.3782 }}
      />
      <Marker
        name={"CanadaHelps"}
        position={{ lat: 43.65325, lng: -79.3983 }}
      />
    </Map>
  );
};

export default GoogleApiWrapper(props => ({
  apiKey: props.apiKey,
  LoadingContainer: () => <div>loading...</div>
}))(GoogleMap);
