import React, { Component } from "react";
import DataTable from "../components/datatable";
import CustomizedDialogs from "../components/dialog-content";
import APIHelper from "./../apis/APIHelper.js";
import { withRouter } from "../utils/withRouter";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const mapStateToProps = (state) => ({ user: state.userReducer });

class PhysicianHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      physicianRequests: [],
      selectedRow: {},
      callerMedicalHistory: {},
      openVitalsDialog: false,
    };
  }

  /**
   * Function to fetch request logged by a receiver
   */
  async componentDidMount() {
    await this.fetchRequestsByReceiver();
  }

  async fetchRequestsByReceiver() {
    APIHelper.fetchRequestsByReceiver(
      this.props.user.state._id,
      this.props.user.state.role.toLowerCase(),
      this.props.user.state.accessToken
    ).then((data) => {
      console.log(data);
      this.setState({ physicianRequests: data });
    });
  }

  /**
   * Function to get details about a selected row
   * @param {*} ids
   */
  getSelectedRow(ids) {
    const selectedRow = this.state.physicianRequests.find((row) =>
      ids.includes(row._id.toString())
    );
    this.setState({ selectedRow });
    APIHelper.fetchCallerDetails(
      selectedRow.caller.callerId,
      this.props.user.state.accessToken
    ).then((data) => {
      this.setState({ callerMedicalHistory: data });
      this.openVitalsDialog();
    });
  }

  /**
   * Function to open Vitals Dialog
   */
  openVitalsDialog() {
    this.setState({ openVitalsDialog: true });
  }

  /**
   * Function to close Vitals Dialog
   */
  async closeVitalsDialog() {
    this.setState({ openVitalsDialog: false });
    // const payload = {
    //   status: "Resolved",
    // };

    // const updatedRequest = await APIHelper.updateRequest(
    //   this.state.selectedRow._id,
    //   payload, this.props.user?.state?.accessToken
    // );
    // this.setState({
    //   physicianRequests: this.state.physicianRequests.map((request) =>
    //     request._id === this.state.selectedRow._id ? updatedRequest.data : request
    //   )
    // });
  }

  render() {
    if (this.props.user.state === null || this.props.user.state === undefined) {
      return <Navigate to={"/login"} />;
    }
    return (
      <div className="firstResponderContainer">
        <div className="historyFRTable">
          <DataTable
            currentUser={this.props.user.state}
            data={this.state.physicianRequests}
            getSelectedRow={this.getSelectedRow.bind(this)}
          />
        </div>
        <div className="form-map-container">
          <div className="emergencyForm">
            <CustomizedDialogs
              open={this.state.openVitalsDialog}
              closeHandle={this.closeVitalsDialog.bind(this)}
              content={this.state.callerMedicalHistory}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(withRouter(PhysicianHome));
