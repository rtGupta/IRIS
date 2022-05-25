import React, { Component } from "react";
import DataTable from "../components/datatable";
import APIHelper from "./../apis/APIHelper.js";
import { withRouter } from "../utils/withRouter";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const mapStateToProps = (state) => ({ user: state.userReducer });

class HospitalHome extends Component {
  constructor(props) {
    super(props);

    this.state = { hospitalRequests: [], selectedRow: {} };
  }

  /**
   * Function to fetch all the Hospital requests
   */
  componentDidMount() {
    this.fetchHospitalRequests();
  }

  fetchHospitalRequests() {
    APIHelper.fetchRequestsByReceiver(
      this.props.user.state._id,
      this.props.user.state.role.toLowerCase(),
      this.props.user.state.accessToken
    ).then((data) => this.setState({ hospitalRequests: data }));
  }

  updateTable() {
    this.fetchHospitalRequests();
  }

  /**
   * Function to get data about selected row
   * @param {*} ids
   */
  getSelectedRow(ids) {
    const selectedRow = this.state.hospitalRequests.find((row) =>
      ids.includes(row._id.toString())
    );
    this.setState({ selectedRow });
  }

  /**
   * Render fields
   * @returns
   */
  render() {
    if (this.props.user.state === null || this.props.user.state === undefined) {
      return <Navigate to={"/login"} />;
    }
    return (
      <div className="hospital-history">
        <ToastContainer />
        <div className="historyTable">
          <DataTable
            reload={this.updateTable.bind(this)}
            currentUser={this.props.user.state}
            data={this.state.hospitalRequests}
            getSelectedRow={this.getSelectedRow.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(withRouter(HospitalHome));
