import React, { Component } from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class GoogleMap extends Component {  
  render() {
    console.log('this.props', this.props)
    return (
      <Map google={this.props.google} zoom={14} >
      
      <Marker onClick={this.onMarkerClick}
              name={'Current location'} />

      <InfoWindow onClose={this.onInfoWindowClose}>
      </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper( props =>({
  apiKey: (props.apiKey),
  LoadingContainer: () => <div>loading...</div>
}))(GoogleMap)