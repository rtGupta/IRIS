import React, { Component } from "react";
import Form from "../components/form";
import { withRouter } from '../utils/withRouter';
import { initiateRequest as initiateRequestAction } from "../redux/actions/dispatcher-actions";
import MapContainer from '../components/map';
import { connect } from "react-redux";
import { MapLaunchOption } from '../utils/constants.js'
import { Navigate } from 'react-router-dom';

const mapStateToProps = (state) => ({ user: state.userReducer });

/**
 * Function to dispatch the current variables from the page to redux
 * @param {*} dispatch 
 * @returns 
 */
const mapDispatchToProps = (dispatch) => {
  return {
    initiateRequest: (request) => dispatch(initiateRequestAction(request))
  };
}

class DispatcherIncomingCalls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      callerLocation: ""
    }
  }

  /**
   * Function to initiate a work request
   * @param {*} workRequest 
   */
  initiateWorkRequest(workRequest) {
    this.props.initiateRequest(workRequest);
  };

  /**
   * Function to navigate from this page to /dispatchRequest page
   */
  dispatchRequest() {
    this.props.navigate('/dispatchRequest');
  }
  
  locationHandler(location) {
    this.setState({callerLocation: location});
  };

  handleClick() {
    // handle reset 
  }

  render() {
    if (this.props.user.state === null || this.props.user.state === undefined) {
      return <Navigate to={'/login'} />;
    } 
    return (
      <div className="incomingCall">
        <div className="emergencyForm">
          <Form isFromDispatcher={true} showButton={true} data={{}} locationHandler={this.locationHandler.bind(this)} formDataHandler={this.initiateWorkRequest.bind(this)} onNext={this.dispatchRequest.bind(this)} disableButton={false}/>
        </div>
        <div className="mapContainer">
          <div className="map"><MapContainer showCallerLocation={false} data={{callerLocation: this.state.callerLocation, mapLaunchOption: MapLaunchOption.DispatcherIncomingCalls}} /></div>
          <div className="resetBtn"><button id="reset-btn" onClick={this.handleClick.bind(this)}>
            Reset
          </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(DispatcherIncomingCalls));
