import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    // this.geocodeAddress = this.geocodeAddress.bind(this);

    // this.state = { formData: {} };
    if (this.props.showCallerLocation) {
      if (this.props.data.callerLocation) {
        this.geocodeAddress();
      }
    }
    console.log(this.props.data.mapLaunchOption);
  }

  componentDidUpdate(prevProps) {
    if (this.props.data.callerLocation !== prevProps.data.callerLocation) {
      this.geocodeAddress();
    } else {

    }
  }

  state = {
    center: {
      lat: 42.361145,
      lng: -71.057083
    },
    markers: [],
    callerLocation: "",
  };

  geocodeAddress() {
    const address = this.props.data.callerLocation;
    if (!address || address.length < 3) {
      console.log("The address string is too short. Enter at least three symbols");
      return;
    }
  
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyDdTUtR2uKi6Ww_GZvIUTzeiCudWm0PrNg`;
    let coordinates = []
    // call Geocoding API - https://www.geoapify.com/geocoding-api/
    fetch(geocodingUrl).then(result => result.json())
      .then(featureCollection => {
        // console.log(featureCollection.results[0].geometry.location);
        featureCollection.results[0].markerType = "caller";
        
        const index = this.state.markers.findIndex( x => x.markerType === "caller" );
        if (index < 0) {
          this.state.markers.push(featureCollection.results[0])
        } else {
          this.state.markers[index] = featureCollection.results[0];
        }
        
        // this.state.markers.push(featureCollection.results[0])
        this.setState({ markers: this.state.markers });
      });
  }

  policeLocationRequest(policeRequest, google, service) {
    let coordinates = [];
    service.textSearch(policeRequest, (results, status) => {
      const count = Math.min(5, results.length);
      
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < count; i++) {
          this.state.markers.push(results[i]);
        }
        this.setState({ markers: this.state.markers });
      }
    });
  }

  hospitalLocationRequest(hospitalRequest, google, service) {
    let coordinates = [];
    service.textSearch(hospitalRequest, (results, status) => {
      const count = Math.min(5, results.length);

      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < count; i++) {
          this.state.markers.push(results[i]);
        }
        this.setState({ markers: this.state.markers });
      }
    });
  }

  fireStationLocationRequest(fireStationRequest, google, service) {
    let coordinates = [];
    service.textSearch(fireStationRequest, (results, status) => {
      const count = Math.min(5, results.length);

      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < count; i++) {
          this.state.markers.push(results[i]);
        }
        this.setState({ markers: this.state.markers });
      }
    });
  }

  fetchPlaces = async (mapProps, map) => {
    let coordinates = [];
    const { google } = mapProps;
    const service = new google.maps.places.PlacesService(map);
    var policeRequest = {
      location: this.state.center,
      radius: "500",
      type: ['police']
    };
    var fireStationRequest = {
      location: this.state.center,
      radius: "500",
      type: ['fire_station']
    };
    var hospitalRequest = {
      location: this.state.center,
      radius: "500",
      type: ['hospital']
    };
    
    if (this.props.data.mapLaunchOption == 1) {
      this.hospitalLocationRequest(hospitalRequest, google, service);
      this.policeLocationRequest(policeRequest, google, service);
      this.fireStationLocationRequest(fireStationRequest, google, service);

    } else if (this.props.data.mapLaunchOption == 2) {
        if (this.props.data.emergencyLevel != "E" || this.props.showCallerLocation == false) {
          this.hospitalLocationRequest(hospitalRequest, google, service);
    
          if (this.props.data.emergencyLevel == "A" || this.props.showCallerLocation == false) {
            this.policeLocationRequest(policeRequest, google, service);
            this.fireStationLocationRequest(fireStationRequest, google, service);
          }
        } 
    } else {
      if (this.props.showHospitalLocation) {
        this.hospitalLocationRequest(hospitalRequest, google, service);
      }
    }
  };

  clickMarker = (location) => {
    const clickMarkerHandler = this.props.clickMarkerHandler;
    clickMarkerHandler(location);
  };

  render() {

    console.log(this.props.data.callerLocation);
    // if (!this.props.loaded) return <div>Loading...</div>;
    let incomingCallMarker = new window.google.maps.MarkerImage(
      "../assets/incoming_call.png",
      null, /* size is determined at runtime */
      null, /* origin is 0,0 */
      null, /* anchor is bottom center of the scaled image */
      new window.google.maps.Size(30, 30)
  );

    let fireMarker = new window.google.maps.MarkerImage(
      "../assets/fire_station_marker.png",
      null, /* size is determined at runtime */
      null, /* origin is 0,0 */
      null, /* anchor is bottom center of the scaled image */
      new window.google.maps.Size(30, 30)
  );

  let policeMarker = new window.google.maps.MarkerImage(
      "../assets/police_marker.png",
      null, /* size is determined at runtime */
      null, /* origin is 0,0 */
      null, /* anchor is bottom center of the scaled image */
      new window.google.maps.Size(30, 30)
  );

  let hospitalMarker = new window.google.maps.MarkerImage(
    "../assets/ambulance_marker.png",
    null, /* size is determined at runtime */
    null, /* origin is 0,0 */
    null, /* anchor is bottom center of the scaled image */
    new window.google.maps.Size(30, 30)
  );
    return (
        <Map
          className="map"
          google={this.props.google}
          center={{
            lat: this.state.center.lat,
            lng: this.state.center.lng
          }}
          onReady={this.fetchPlaces}
          zoom={15}
        >
          {this.state.markers != null &&
            this.state.markers.map(coords => (
              <Marker
                icon={ coords.types.includes('fire_station') ? fireMarker 
                : coords.types.includes('police') ? policeMarker 
                : coords.types.includes('hospital') ? hospitalMarker : incomingCallMarker }

                key={coords.place_id}
                position={coords.geometry.location}
                onClick={() => this.clickMarker(coords)}
              />
            ))}
        </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(MapContainer);