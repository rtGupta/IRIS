import React, { Component } from "react";
import DataTable from "../components/datatable";
import Form from "../components/form";
import MapContainer from "../components/map";
import { withRouter } from "../utils/withRouter";
import { connect } from "react-redux";
import APIHelper from "./../apis/APIHelper.js";
import { recordMedicalHistory as recordMedicalHistoryAction } from "../redux/actions/dispatcher-actions";
import { MapLaunchOption } from "./../utils/constants.js";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Function to dispatch the current variables from the page to redux
 * @param {*} dispatch
 * @returns
 */
const mapDispatchToProps = (dispatch) => {
  return {
    recordMedicalHistory: (request) =>
      dispatch(recordMedicalHistoryAction(request)),
  };
};

const mapStateToProps = (state) => ({
  request: state.dispatcherReducer,
  user: state.userReducer,
});

class FirstResponderHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      frRequests: [],
      users: [],
      selectedRow: {},
      requestAction: "Acknowledge",
      hospitalLocation: "",
      callerLocation: "",
      disableButton: true,
    };
    this.getAllUsers();
  }

  /**
   * Code to get all Hospitals from the API
   */
  getAllUsers() {
    APIHelper.fetchHospitals(this.props.user?.state?.accessToken).then((data) =>
      this.setState({ users: data })
    );
  }

  /**
   * Code to get Hospitals from a particular zipCode
   * @param {*} zip
   * @returns
   */
  getHospitalReceiver(zip) {
    if (zip !== null && zip !== undefined) {
      return this.state.users?.find((user) => {
        if (
          parseInt(zip) >= parseInt(user.zipCodeMin) &&
          parseInt(zip) <= parseInt(user.zipCodeMax)
        ) {
          return user;
        }
        return null;
      });
    }
  }

  /**
   * Code to fetch requests by a receiver's id
   */
  async componentDidMount() {
    await this.fetchRequestsByReceiver();
  }

  notify(message) {
    toast.info(message, {
      toastId: "request-action",
    });
  }

  async fetchRequestsByReceiver() {
    APIHelper.fetchRequestsByReceiver(
      this.props.user.state._id,
      this.props.user.state.role.toLowerCase(),
      this.props.user?.state?.accessToken
    ).then((data) => this.setState({ frRequests: data }));
  }

  /**
   * Code to get data from selected row
   * @param {*} ids
   */
  getSelectedRow(ids) {
    const selectedRow = this.state.frRequests.find((row) =>
      ids.includes(row._id.toString())
    );
    this.setState({ selectedRow });
    if (
      selectedRow.status === "Scene Assessment in progress" &&
      (this.props.user.state.role === "Fire" ||
        this.props.user.state.role === "Police")
    ) {
      console.log("here");
      this.setState({ disableButton: true });
    } else {
      this.setState({ disableButton: false });
      if ((selectedRow.emergencyLevel !== 'C' && selectedRow.status === "Scene Assessment in progress") || selectedRow.status === "Transport Care Required") {
        this.setState({ requestAction: "Transfer To Hospital" });
      } else {
        this.setState({ requestAction: "Acknowledge" });
      }
    }
    this.locationHandler(selectedRow.caller.callerAddress);
  }

  /**
   * Function to update the status of the request
   */
  async acknowledgeRequest() {
    const payload = {
      status: "Scene Assessment in progress",
    };

    const updatedRequest = await APIHelper.updateRequest(
      this.state.selectedRow._id,
      payload,
      this.props.user?.state?.accessToken
    );
    this.notify("The scene assessment is in progress.");
    this.setState({
      frRequests: this.state.frRequests.map((request) =>
        request._id === this.state.selectedRow._id
          ? updatedRequest.data
          : request
      ),
    });

    if (this.state.selectedRow.emergencyLevel === "C") {
      console.log(this.state.selectedRow);
      this.props.recordMedicalHistory(this.state.selectedRow);
      this.props.navigate("/medical-history");
    }
    this.setState({ selectedRow: {} });
    this.state.disableButton = true;
  }

  locationHandler(location) {
    this.setState({ callerLocation: location });
  }

  showHideButton() {
    switch (this.props.user.state.role) {
      case "Paramedic":
        if (
          this.state.selectedRow.status === "Transferred to Hospital" ||
          this.state.selectedRow.status === "Awaiting Physician's Review" ||
          this.state.selectedRow.status === "Resolved"
        ) {
          return false;
        } else {
          return true;
        }
      case ("Police", "Fire"):
        if (this.state.selectedRow.status === "Scene Assessment in progress") {
          return false;
        } else {
          return true;
        }
      default: break;
    }
    return true;
  }

  onClickMarker = (locDetails) => {
    console.log(locDetails);
    if (locDetails.types.includes("hospital")) {
      this.setState({ hospitalLocation: locDetails.formatted_address });
    }
  };

  /**
   * Function to update the status about the caller when they have been transferred to the hospital
   */
  async transferToHospital() {
    const hospitalZIP = this.state.hospitalLocation.split(" ").at(-1);
    const payload = {
      receiver: { hospital: this.getHospitalReceiver(hospitalZIP)?._id },
    };

    const result = await APIHelper.updateRequest(
      this.state.selectedRow._id,
      payload,
      this.props.user?.state?.accessToken
    );

    if (result.response.status === 200) {
      const payload = {
        status: "Transferred to Hospital",
      };
      const updatedRequest = await APIHelper.updateRequest(
        this.state.selectedRow._id,
        payload,
        this.props.user?.state?.accessToken
      );
      this.notify("The patient is transferred to the hospital.");
      this.setState({
        frRequests: this.state.frRequests.map((request) =>
          request._id === this.state.selectedRow._id
            ? updatedRequest.data
            : request
        ),
      });
      this.setState({ selectedRow: {} });
      this.state.disableButton = true;
    }
  }

  render() {
    if (this.props.user.state === null || this.props.user.state === undefined) {
      return <Navigate to={"/login"} />;
    }
    return (
      <div className="firstResponderContainer">
        <ToastContainer />
        <div className="historyFRTable">
          <DataTable
            currentUser={this.props.user.state}
            data={this.state.frRequests}
            getSelectedRow={this.getSelectedRow.bind(this)}
          />
        </div>
        <div className="form-map-container">
          <div className="emergencyForm">
            <Form
              data={this.state.selectedRow}
              isFromDispatcher={false}
              requestAction={this.state.requestAction}
              hospitalLocation={this.state.hospitalLocation}
              onNext={
                this.state.requestAction === "Acknowledge"
                  ? this.acknowledgeRequest.bind(this)
                  : this.transferToHospital.bind(this)
              }
              showButton={this.showHideButton()}
              disableButton={this.state.disableButton}
            />
          </div>
          <div className="mapContainer">
            <div className="map">
              <MapContainer
                showHospitalLocation={
                  this.state.requestAction === "Acknowledge" ? true : false
                }
                data={{
                  callerLocation: this.state.callerLocation,
                  mapLaunchOption: MapLaunchOption.FirstResponder,
                }}
                clickMarkerHandler={this.onClickMarker.bind(this)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FirstResponderHome));
