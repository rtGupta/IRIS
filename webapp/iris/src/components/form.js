import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = { formData: {} };
  }

  onChangeHandler(e) {
    if (!this.props.isFromDispatcher) {
      this.props.hospitalLocation = e.target.value;
    }
    this.setState({
      formData: { ...this.state.formData, [e.target.name]: e.target.value },
    });
  }

  locateHandler(e) {
    const locationHandler = this.props.locationHandler;
    locationHandler(this.state.formData.location);
  }

  handleClick(e) {
    e.preventDefault();
    if (this.props.isFromDispatcher) {
      const formDataHandler = this.props.formDataHandler;
      if (Object.keys(this.state.formData).length === 0) {
        alert('Invalid Input');
        return;
      }

      formDataHandler(this.state.formData);
    }
    this.props.onNext();
  }

  render() {
    return (
      <div id="add-task-card" className="add-task">
        <h2>Emergency: </h2>
        <label htmlFor="callerName">Caller Name: </label>
        <input
          type="text"
          name="callerName"
          id="callerName"
          value={this.props.data.caller?.callerName }
          onChange={this.onChangeHandler.bind(this)}
        />
        <label htmlFor="location">Caller Location:</label>
        <input
          type="text"
          name="location"
          id="location"
          value={this.props.data.caller?.callerAddress }
          onChange={this.onChangeHandler.bind(this)}
        />{this.props.isFromDispatcher ? <button type="button" onClick={(e) => this.locateHandler(e)}>Locate</button> : null }
        <label htmlFor="contact">Contact:</label>
        <input
          type="number"
          name="contact"
          id="contact"
          value={this.props.data.caller?.callerContact }
          onChange={this.onChangeHandler.bind(this)}
        />
        <label htmlFor="message">Message:</label>
        <textarea
          type="text"
          name="message"
          id="message"
          value={this.props.data.message }
          onChange={this.onChangeHandler.bind(this)}
        />
        {this.props.isFromDispatcher ? (
          <div>
            <label htmlFor="emergencyLevel">Emergency Level:</label>
            <div className="radio-group">
              <input
                type="radio"
                name="emergencyLevel"
                id="A"
                value="A"
                onChange={this.onChangeHandler.bind(this)}
              />
              <label htmlFor="A">A</label>
              <input
                type="radio"
                name="emergencyLevel"
                id="C"
                value="C"
                onChange={this.onChangeHandler.bind(this)}
              />
              <label htmlFor="C">C</label>
              <input
                type="radio"
                name="emergencyLevel"
                id="E"
                value="E"
                onChange={this.onChangeHandler.bind(this)}
              />
              <label htmlFor="E">E</label>
            </div>
          </div>
        ) : null}
        {this.props.requestAction === "Transfer To Hospital" ? (
          <div className="hospital-control">
            <label htmlFor="hospital">Hospital:</label>
            <input
              type="text"
              name="hospital"
              id="hospital"
              value={this.props.hospitalLocation}
              onChange={this.onChangeHandler.bind(this)}
            />
          </div>
        ) : null}
        {this.props.showButton ? <div className="add-button-group">
          <button id="save-btn" onClick={(e) => this.handleClick(e)} disabled={this.props.disableButton}>
            {this.props.isFromDispatcher ? "Next" : this.props.requestAction}
          </button>
        </div> : null }
      </div>
    );
  }
}

export default Form;
