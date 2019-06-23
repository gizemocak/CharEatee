import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

class GoogleMap extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        initialCenter={this.props.geoLocation}
      >
        <Marker onClick={this.onMarkerClick} name={"Current location"} />

        <Marker
          title={"Charity"}
          name={"Canadian Foundation for Health and Prosperity"}
          position={{ lat: 43.663788, lng: -79.3782 }}
        />
        <Marker
          name={"CanadaHelps"}
          position={{ lat: 43.65325, lng: -79.3983 }}
        />

        <InfoWindow onClose={this.onInfoWindowClose} />
      </Map>
    );
  }
}

export default GoogleApiWrapper(props => ({
  apiKey: props.apiKey,
  LoadingContainer: () => <div>loading...</div>
}))(GoogleMap);
