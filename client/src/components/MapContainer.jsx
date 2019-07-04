import React from "react";
import ReactDOM from "react-dom";
import { withRouter } from "react-router";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import "../style/MapContainer.scss";

const style = {
  position: "relative",
  width: "100vw",
  height: "100vh",
  left: '-30px',
  right: '-30px'
};
class GoogleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: "",
      showingInfoWindow: false,
      activeMarker: null,
      selectedPlace: null,
      mapElementFound: null
    };
    // console.log('props', props)
  }
  /*   const [icon, setIcon] = useState("");
  const [showingInfoWindow, updateShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, updateSelectedPlace] = useState({}); */
  // const [pins, setPins] = useState([]);

  changeIconColor = (mapProps, map) => {
    // console.log("ready", mapProps, map);
    const { google } = mapProps;
    // setIcon(google.maps.SymbolPath.CIRCLE);
    this.setState({ icon: google.maps.SymbolPath.CIRCLE });
  };

  onMarkerClick = (props, marker, e) => {
    /* updateSelectedPlace(props);
    setActiveMarker(marker);
    updateShowingInfoWindow(true); */
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
    //window.location = '/profile/'+ marker.id
  };

  onClose = props => {
    if (this.state.showingInfoWindow) {
      //updateShowingInfoWindow(false);
      //setActiveMarker(null);
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
    }
  };

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      /*       updateShowingInfoWindow(false);
      setActiveMarker(null); */
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
    }
  };

  onInfoWindowOpen = (selectedPlace, e) => {
    const button = (
      <div className="popup">
        <a id="go"
          onClick={e => {
            this.props.history.push(`/profile/${selectedPlace.id}`);
          }}
        >
          <h6 className="store-name">{selectedPlace.name}</h6>
        </a>

          {selectedPlace.products &&
            selectedPlace.products.filter(item => !item.deleted_at).map(item => {
              console.log('yoyoyyoyoyoyo',item)
              return <div className="store-items">
                {item.name}: {item.quantity} {item.unit}
                <br/>
                <span className="exp">Expires: {item.expiry}</span>
              </div>;
            })}

      </div>
    );
    ReactDOM.render(
      React.Children.only(button),
      document.getElementById("iwc")
    );
  };

  render() {
    return (
      <div id="map_canvas">
        <Map
          google={this.props.google}
          zoom={14}
          initialCenter={this.props.geoLocation}
          onReady={this.changeIconColor}
          onClick={this.onMapClicked}
          style={style}
        >
          <Marker
            name={"Current location"}
            icon={{
              path: this.state.icon,
              strokeColor: "#467DFE",
              scale: 6.5
            }}
            onClick={this.onMarkerClick}
          />

          {this.props.pins.length > 0 &&
            this.props.pins.map(item => {
              return (
                <Marker
                  key={item.email + "" + item.id}
                  title={"Grocer/Restaurant"}
                  name={item.username}
                  position={{ lat: item.latitude, lng: item.longitude }}
                  onClick={this.onMarkerClick}
                  id={item.id}
                  products={item.products}
                />
              );
            })}

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
            onOpen={e => {
              this.onInfoWindowOpen(this.state.selectedPlace, e);
            }}
          >
            <div id="iwc" />
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper(props => {
  return {
    apiKey: props.apiKey,
    LoadingContainer: () => <div>loading...</div>
  };
})(withRouter(GoogleMap));
