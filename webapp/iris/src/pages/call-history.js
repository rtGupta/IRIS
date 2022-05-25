import React, { Component } from 'react';
import { connect } from "react-redux";
import DataTable from '../components/datatable';
import APIHelper from './../apis/APIHelper.js';
import { Navigate } from 'react-router-dom';

const mapStateToProps = (state) => ({ request: state.dispatcherReducer, user: state.userReducer });

class CallHistory extends Component {
    constructor(props) {
        super(props);

        this.state = { dispatcherRequests: [] };
    }

    /**
     * Function to fetch Dispatcher Requests
     */
    componentDidMount() {
        this.fetchDispatcherRequests();
    }

    fetchDispatcherRequests() {
        APIHelper.fetchRequestsBySender(this.props.user.state._id, this.props.user.state.accessToken).then((data) => this.setState({ dispatcherRequests: data}));
    }

    /**
     * Above fetched data will be rendered in the datatable
     * @returns 
     */
    render() {
        if (this.props.user.state === null || this.props.user.state === undefined) {
            return <Navigate to={'/login'} />;
        }
        return (
            <div className="historyTable">
               <DataTable currentUser={this.props.user.state} data={this.state.dispatcherRequests}/> 
            </div>
        );
    }
}

export default connect(mapStateToProps)(CallHistory);
