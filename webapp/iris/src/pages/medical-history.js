import React, { Component } from "react";
import { withRouter } from "../utils/withRouter";
import { connect } from "react-redux";
import { Formik } from "formik";
import { MenuItem, Select } from "@mui/material";
import APIHelper from "../apis/APIHelper";
import { Navigate } from "react-router-dom";

/**
 * Function to retreive data from redux
 * @param {*} state
 * @returns
 */
const mapStateToProps = (state) => ({
  request: state.dispatcherReducer,
  user: state.userReducer,
});

class MedicalHistory extends Component {
  physicians = [];

  constructor(props) {
    super(props);

    this.state = {
      vitals: {},
      medicalHistory: [],
      physicians: [],
      isVitalsAbnormal: false,
    };
    this.getPhysicians();
  }

  getPhysicians() {
    APIHelper.fetchPhysicians(this.props.user.state.accessToken).then(
      (data) => {
        this.setState({ physicians: data });
      }
    );
  }

  checkVitals(vitalsigns) {
    if (
      vitalsigns !== {} &&
      (vitalsigns.temperature >= 99 ||
        vitalsigns.temperature < 95 ||
        vitalsigns.heartRate < 60 ||
        vitalsigns.heartRate > 100 ||
        vitalsigns.systolic > 120 ||
        vitalsigns.diastolic > 80)
    ) {
      this.setState({ isVitalsAbnormal: true });
    } else {
      this.setState({ isVitalsAbnormal: false });
    }
  }

  render() {
    if (this.props.user.state === null || this.props.user.state === undefined) {
      return <Navigate to={"/login"} />;
    }
    return (
      <Formik
        initialValues={{
          vitals: this.state.vitals,
          medicalHistory: this.state.medicalHistory,
        }}
        /**
         * Function to update the Vitals of the caller when Submit button has been clicked
         */
        onSubmit={(values) => {
          console.log(values);
          APIHelper.updateCallerVitals(
            this.props.request.state.caller.callerId,
            values,
            this.props.user.state.accessToken
          )
            .then((data) => {
              return data;
            })
            .then((data) => {
              console.log(data);
              if (this.state.isVitalsAbnormal) {
                const payload = {
                receiver: { physician: values.assignedPhysician._id },
              };
              // API call to add physician in the request's receivers list.
              APIHelper.updateRequest(
                this.props.request.state._id,
                payload,
                this.props.user.state.accessToken
              )
                .then((response) => {
                  return response.data;
                })
                .then((data) => {
                  console.log(data);
                  const payload = {
                    status: "Awaiting Physician's Review",
                    isIRISeligible: true
                  };
                  // API call to update the status of the request to Awaiting Physician's Review
                  APIHelper.updateRequest(
                    data._id,
                    payload,
                    this.props.user.state.accessToken
                  )
                    .then((response) => {
                      console.log(response.data);
                      return response.data;
                    })
                    .then((data) => {
                      console.log(data);
                      const meetingURL = "https://meet.jit.si/SampleRoom";
                      // send the meeting link to physician via email.
                      APIHelper.sendMeetingLink(
                        values.assignedPhysician._id,
                        meetingURL
                      ).then((data) => this.props.navigate("/meeting"));
                    });
                });
              } else {
                // save paramedic's comments and update request status when not IRIS eligible.
              }
            });
        }}
      >
        {({ values, handleChange, handleSubmit }) => {
          return (
            <div className="medicalHistoryContainer">
              <div className="medical-History-Form">
                <div className="form-section iris-eligible">
                  <h2>CALLER: {this.props.request.state?.caller.callerName}</h2>
                  <div className="section-control">
                    <input
                      type="checkbox"
                      name="isIRISeligible"
                      checked={this.state.isVitalsAbnormal}
                      onChange={handleChange}
                    />
                    <label>
                      <h3>IRIS Eligible </h3>
                    </label>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-section">
                    <div className="section-label">
                      <h3>Personal Information</h3>
                    </div>
                    <div className="section-control">
                      <div className="form-control">
                        <label>Blood Group:</label>
                        <Select
                          sx={{ m: 1, minWidth: 120 }}
                          defaultValue={"O+"}
                          size="small"
                          id="bg-select"
                          name="bloodGroup"
                          placeholder="Select BloodGroup"
                          onChange={handleChange}
                        >
                          <MenuItem value="O+">O+</MenuItem>
                          <MenuItem value="O-">O-</MenuItem>
                          <MenuItem value="A+">A+</MenuItem>
                          <MenuItem value="A-">A-</MenuItem>
                          <MenuItem value="B+">B+</MenuItem>
                          <MenuItem value="B-">B-</MenuItem>
                          <MenuItem value="AB+">AB+</MenuItem>
                          <MenuItem value="AB-">AB-</MenuItem>
                        </Select>
                      </div>
                      <div className="form-control">
                        <label>Height (in cms): </label>
                        <input
                          type="text"
                          name="height"
                          placeholder="Enter Height"
                          value={values?.height}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-control">
                        <label>Weight (in kgs): </label>
                        <input
                          type="text"
                          name="weight"
                          placeholder="Enter Weight"
                          value={values?.weight}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-section">
                    <div className="section-label">
                      <h3>Vitals Check: </h3>
                    </div>
                    <div className="section-control">
                      <div className="form-control">
                        <label>Oxygen Level (%): </label>
                        <input
                          type="text"
                          name="vitals.oxygenLevel"
                          placeholder="Enter Oxygen Level"
                          value={values?.oxygenLevel}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-control">
                        <label>Temperature (°F): </label>
                        <input
                          type="text"
                          name="vitals.temperature"
                          placeholder="Enter body temperature"
                          value={values?.temperature}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-control">
                        <label>Heart Rate (bpm): </label>
                        <input
                          type="text"
                          name="vitals.heartRate"
                          placeholder="Enter Heart Rate"
                          value={values?.heartRate}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-control">
                        <label>Systolic (mmHg): </label>
                        <input
                          type="text"
                          name="vitals.systolic"
                          placeholder="Enter Systolic"
                          value={values?.systolic}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-control">
                        <label>Diastolic (mmHg): </label>
                        <input
                          type="text"
                          name="vitals.diastolic"
                          placeholder="Enter Diastolic"
                          value={values?.diastolic}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-control">
                        <button
                          type="button"
                          className="btn-check-vitals"
                          onClick={() => this.checkVitals(values.vitals)}
                        >
                          Check
                        </button>
                      </div>
                    </div>
                  </div>
                  {this.state.isVitalsAbnormal ? (
                    <div className="section-control">
                      <label>Assign Physician: </label>
                      <div className="form-control">
                        <Select
                          sx={{ m: 1, minWidth: 200 }}
                          size="small"
                          id="physician-select"
                          name="assignedPhysician"
                          onChange={handleChange}
                        >
                          {this.state.physicians.map((physician) => (
                            <MenuItem value={physician}>
                              {physician.firstName} {physician.lastName}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                    </div>
                  ) : (
                    <div className="section-control">
                      <label>Paramedic's Comments: </label>
                      <div className="form-control">
                        <textarea
                          type="text"
                          name="comments"
                          id="comments"
                          value={values.emtComment}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  )}
                  <div className="form-section">
                    <div className="section-label">
                      <h4>
                        Please check all the ailments that are applicable:{" "}
                      </h4>
                    </div>
                    <div className="section-control">
                      <input
                        type="checkbox"
                        name="medicalHistory"
                        value="Diabetes"
                        onChange={handleChange}
                      />
                      <label>Diabetes</label>
                      <input
                        type="checkbox"
                        name="medicalHistory"
                        value="HIV Infection"
                        onChange={handleChange}
                      />
                      <label>HIV Infection</label>
                      <input
                        type="checkbox"
                        name="medicalHistory"
                        value="Chronic Kidney Disease"
                        onChange={handleChange}
                      />
                      <label>Chronic Kidney Disease</label>
                      <input
                        type="checkbox"
                        name="medicalHistory"
                        value="Cancer"
                        onChange={handleChange}
                      />
                      <label>Cancer</label>
                      <input
                        type="checkbox"
                        name="medicalHistory"
                        value="Smoking current or former"
                        onChange={handleChange}
                      />
                      <label>Smoking current or former</label>
                      <input
                        type="checkbox"
                        name="medicalHistory"
                        value="Pregnancy"
                        onChange={handleChange}
                      />
                      <label>Pregnancy</label>
                    </div>
                    <div className="section-control">
                      <input
                        type="checkbox"
                        name="medicalHistory"
                        value="Dementia"
                        onChange={handleChange}
                      />
                      <label>Dementia</label>
                      <br />
                      <input
                        type="checkbox"
                        name="medicalHistory"
                        value="Tuberculosis"
                        onChange={handleChange}
                      />
                      <label>Tuberculosis</label>
                      <br />
                      <input
                        type="checkbox"
                        name="medicalHistory"
                        value="Heart Conditions"
                        onChange={handleChange}
                      />
                      <label>Heart Conditions</label>
                      <br />
                    </div>
                  </div>
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
          );
        }}
      </Formik>
    );
  }
}

export default connect(mapStateToProps)(withRouter(MedicalHistory));
