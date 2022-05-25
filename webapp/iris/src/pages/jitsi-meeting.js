import React, { Component } from "react";
import { connect } from "react-redux";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { withRouter } from "../utils/withRouter";
import APIHelper from "../apis/APIHelper";

const mapStateToProps = (state) => ({
  request: state.dispatcherReducer,
  user: state.userReducer,
});

class Video extends Component {
  domain = "meet.jit.si";
  api = {};

  constructor(props) {
    super(props);

    this.state = {
      room: "SampleRoom",
      user: {
        userId: this.props.user.state._id,
        name: this.props.user.state.emailID,
        role: this.props.user.state.role,
      },
    };
  }

  /**
   * Below function is used to prep up the jitsi to close the screen once the meeting has been completed
   * Upon ending the meeting the user will be re-directed back to the Paramedics screen
   */
  handleClose() {
    const payload = {
      status: "Transport Care Required",
    };

    APIHelper.updateRequest(
      this.props.request?.state?._id,
      payload,
      this.props.user?.state?.accessToken
    ).then(() => this.props.navigate("/firstResponder"));
  }

  render() {
    return (
      <div className="video-screen">
        <JitsiMeeting
          roomName={this.state.room}
          getIFrameRef={(iframe) => {
            iframe.style.height = "628px";
          }}
          configOverwrite={{
            SHOW_PROMOTIONAL_CLOSE_PAGE: false,
            userInfo: {
              displayName: this.state.user.name,
            },
          }}
          onReadyToClose={this.handleClose.bind(this)}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(withRouter(Video));
