import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "../utils/withRouter";
import MapContainer from "../components/map";
import APIHelper from "./../apis/APIHelper.js";
import { MapLaunchOption } from './../utils/constants.js'
import { Navigate } from 'react-router-dom'

/**
 * Function to map current state of the page so that it can be used in redux
 * @param {*} state 
 * @returns 
 */
const mapStateToProps = (state) => ({ request: state.dispatcherReducer, user: state.userReducer });

class DispatchRequest extends Component {
  users = [];

  constructor(props) {
    super(props);
    
    this.getAllUsers().then((data) => this.users = data);
  }

  /**
   * Function to fetch a;; the users
   * @returns 
   */
  async getAllUsers() {
    return await APIHelper.fetchFirstResponders(this.props.user.state.accessToken);
  }

  /**
   * Function to mark the address entered on the page on the map
   * @param {*} locDetails 
   */
  onClickMarker = (locDetails) => {
    console.log(locDetails);
    if (locDetails.types.includes("fire_station")) {
      document.getElementById("fire").value = locDetails.formatted_address;
    } else if (locDetails.types.includes("police")) {
      document.getElementById("police").value = locDetails.formatted_address;
    } else {
      document.getElementById("paramedics").value =
        locDetails.formatted_address;
    }
  };

  /**
   * Function to get the receiver based on the zipcode
   * @param {*} zip 
   * @returns 
   */
  getReceiver(role, zip) {
    return this.users?.filter((user) => user.role.toLowerCase() === role).find((user) => {
      if (parseInt(zip) >= parseInt(user.zipCodeMin) && parseInt(zip) <= parseInt(user.zipCodeMax)) {
        return user;
      }
      return null;
    });
  }

  createRequestObject(caller) {
    // set caller info in request object.
    const callerDetails = {
      callerId: caller._id,
      callerName: caller.name,
      callerAddress: caller.address,
      callerContact: caller.contact,
    };

    // create receiver's array based on PIN
    const receivers = [];
    if (document.getElementById("paramedics").value !== "") {
      const paramedicZIP = document
        .getElementById("paramedics")
        .value.split(" ")
        .at(-1);
      receivers.push({ paramedic: this.getReceiver('paramedic', paramedicZIP)._id });
    }
    if (document.getElementById("police") !== null && document.getElementById("police").value !== "") {
      const policeZIP = document
        .getElementById("police")
        .value.split(" ")
        .at(-1);
      receivers.push({ police: this.getReceiver('police', policeZIP)._id });
    }
    if (document.getElementById("fire") !== null && document.getElementById("fire").value !== "") {
      const fireZIP = document.getElementById("fire").value.split(" ").at(-1);
      receivers.push({ fire: this.getReceiver('fire', fireZIP)._id });
    }
    console.log(receivers);
    // message, status, emergencyLevel, sender (userId of the logged dispatcher)
    const workRequest = {
      caller: callerDetails,
      message: this.props.request.state.message,
      status: "Open",
      emergencyLevel: this.props.request.state.emergencyLevel,
      sender: this.props.user.state._id,
      receiver: receivers,
    };

    // return request object
    return workRequest;
  }

  // Call create request api
  async createRequest(e) {
    e.preventDefault();

    const workRequest = this.props.request.state;
    const callerDetails = {
      name: workRequest.callerName,
      contact: workRequest.contact.toString(),
      address: workRequest.location,
    };

    // call POST request to save caller info.
    const caller = await APIHelper.saveCallerDetails(callerDetails, this.props.user.state.accessToken);
    console.log(caller);

    // create request object with with caller Id and other properties.
    const request = this.createRequestObject(caller);
    // call POST request to save request.
    APIHelper.initiateRequest(request, this.props.user.state.accessToken).then((data) => {
      console.log(data);
      this.props.navigate("/callHistory");
    });
  }

  handleChange() {
    console.log("handleChange");
  }

  render() {
    if (this.props.user.state === null || this.props.user.state === undefined) {
      return <Navigate to={'/login'} />;
    } 
    console.log(this.props.user.state);
    return (
      <div className="dispatchContainer">
        <div className="mapContainer">
        <MapContainer showCallerLocation={true} data={{callerLocation: this.props.request.state.location, emergencyLevel: this.props.request.state.emergencyLevel, mapLaunchOption: MapLaunchOption.DispatcherRequest}} clickMarkerHandler = {this.onClickMarker.bind(this)} />
        </div>
        <div className="dropdownContainer">
          <div className="form-control">
            <label htmlFor="paramedics">Paramedics: </label>
            <input
              type="text"
              name="paramedics"
              id="paramedics"
              value=""
              readOnly
            />
          </div>
          {this.props.request.state.emergencyLevel === "A" ? (
            <div>
              <div className="form-control">
                <label htmlFor="fire">Fire: </label>
                <input type="text" name="fire" id="fire" value="" readOnly />
              </div>
              <div className="form-control">
                <label htmlFor="police">Police: </label>
                <input
                  type="text"
                  name="police"
                  id="police"
                  value=""
                  readOnly
                />
              </div>
            </div>
          ) : null}
          <button id="dispatch-btn" onClick={this.createRequest.bind(this)}>
            Dispatch
          </button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(withRouter(DispatchRequest));
