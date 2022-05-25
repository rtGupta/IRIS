import { Field, Formik, Form } from "formik";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "../utils/withRouter";
import APIHelper from "./../apis/APIHelper.js";
import { loginUser as loginUserAction } from "../redux/actions/user-actions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginSchema } from "../utils/validationSchema";

/**
 * Function to dispatch the current variables from the page to redux
 * @param {*} dispatch
 * @returns
 */
const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => dispatch(loginUserAction(user)),
  };
};

const mapStateToProps = (state) => ({ user: state.userReducer });

class Login extends Component {

  notify(message) {
    toast.error(message, {
      toastId: "login-error"
    });
  }

  render() {
    return (
      <Formik
        initialValues={{
          emailID: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          APIHelper.loginUser(values)
            .then((res) => {
              if (res.response.status !== 200) {
                this.props.loginUser({});
                this.notify(res.data.message);
              } else {
                this.props.loginUser(res.data);
                switch (res.data.role) {
                  case "Dispatcher":
                    this.props.navigate("/dispatcherIncomingCalls");
                    break;
                  case "Paramedic":
                    this.props.navigate("/firstResponder");
                    break;
                  case "Fire":
                    this.props.navigate("/firstResponder");
                    break;
                  case "Police":
                    this.props.navigate("/firstResponder");
                    break;
                  case "Hospital":
                    this.props.navigate("/hospital");
                    break;
                  case "Physician":
                    this.props.navigate("/physician");
                    break;
                  case "Admin":
                    this.props.navigate("/systemAdmin");
                    break;
                  default: this.props.navigate("/"); break;
                }
              }
            })
            .catch((err) => {
              this.props.loginUser({});
            });
        }}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => {
          return (
            <div>
              <ToastContainer />
              <div className="loginContainer">
                <div className="loginFormContainer">
                  <div className="loginTitle">
                    <h1>LOGIN</h1>
                    <img src="../assets/Icon_64px.gif" alt="Logo" />
                    <i>Instant Response Immediate Support</i>
                  </div>
                  <Form className="loginForm" onSubmit={handleSubmit}>
                    <Field
                      name="emailID"
                      placeholder="Enter Email-ID for login"
                    />
                    {errors.emailID && touched.emailID ? (
                      <div className="errormsg">{errors.emailID}</div>
                    ) : null}
                    <Field type="password" name="password" placeholder="Enter password" />
                    {errors.password && touched.password ? (
                      <div className="errormsg">{errors.password}</div>
                    ) : null}
                  <button type="submit">Submit</button>
                  </Form>
                </div>
              </div>
            </div>
          );
        }}
      </Formik>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
