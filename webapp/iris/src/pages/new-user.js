import React, { Component } from 'react';
import APIHelper from './../apis/APIHelper.js';
import { connect } from 'react-redux';
import { Field, Formik, Form } from 'formik';
import { withRouter } from '../utils/withRouter.js';
import { signUpSchema } from "../utils/validationSchema"

/**
 * Page to Add a new user or update details of a current user 
 */
/**
 * Function to retreive data from redux
 * @param {*} state 
 * @returns 
 */
// const mapStateToProps = (state) => ({ userObj: state.userReducer });

function refreshPage() {
    window.location.reload(false);
}

class NewUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditable: false
        };
    }    
     goBack = () => {
        this.props.navigate("/systemAdmin"); 
    }

    render() {
        // if (this.props.userObj?.state !== undefined) {
        //     this.state.isEditable = true;
        // } else {
        //     this.state.isEditable = false;
        // }

        return (
            <Formik
                initialValues={this.props.userObj?.state !== undefined ? this.props.userObj?.state : {}}
                /**
                 * Function to handle if the user should be updated when is in edit mode or add a new user while signing up.
                 */
                validationSchema={signUpSchema}
                onSubmit={(values) => {
                    console.log(values);
                    this.setState({ userDetails: values });
                    // console.log("isEditable : "+isEditable);
                    if (this.state.isEditable === true) {
                        APIHelper.updateUser(values, this.props.userObj.state.accessToken).then((data => {
                            console.log(data);
                        }));
                        this.goBack();
                    } else {
                        APIHelper.newUser(values).then((data) => {
                            console.log(data);
                        });
                        this.goBack();
                    }
                }}
            >
                {({ values, handleChange, handleSubmit, errors, touched }) => {
                    return (
                        <div className="signUpContainer">
                            <img src="../assets/Add User-cuate.svg" />
                            <div className="signUpFormContainer">
                                <h2>USER REGISTRATION</h2>
                                
                                <Form className="signUpForm" onSubmit={handleSubmit}>
                                    <div className='form-control'>
                                    First Name : <Field name="firstName"
                                    placeholder="Enter legal First Name"
                                    /></div>
                                    {errors.firstName && touched.firstName ? (
                                        <div className='errormsg'>{errors.firstName}</div>
                                    ): null}
                                    <div className='form-control'>
                                    Last Name : <Field name="lastName" 
                                    placeholder="Enter last Name"
                                    /></div>
                                    {errors.lastName && touched.lastName ? (
                                        <div className='errormsg'>{errors.lastName}</div>
                                    ): null}
                                    <div className='form-control'>
                                    Address : <Field name="address" 
                                    placeholder="Enter Address"
                                    /></div>
                                    {errors.address && touched.address ? (
                                        <div className='errormsg'>{errors.address}</div>
                                    ): null}
                                    <div className='form-control'>
                                    Phone Number : <Field name="phoneNumber" 
                                    placeholder="Enter Phone Number"
                                    /></div>
                                    {errors.phoneNumber && touched.phoneNumber ? (
                                        <div className='errormsg'>{errors.phoneNumber}</div>
                                    ): null}
                                    <div className='form-control'>
                                    Email-ID : <Field name="emailID" 
                                    placeholder="Enter Email-ID"
                                    /></div>
                                    {errors.emailID && touched.emailID ? (
                                        <div className='errormsg'>{errors.emailID}</div>
                                    ): null}
                                    <div className='form-control'>
                                    Role :
                                    <Field as="select" className="drop-dwn" name="role" placeholder="Role" onChange={handleChange}>
                                        <option value=""></option>
                                        <option value="Dispatcher">Dispatcher</option>
                                        <option value="Fire">Fire</option>
                                        <option value="Police">Police</option>
                                        <option value="Paramedic">Paramedic</option>
                                        <option value="Hospital">Hospital</option>
                                        <option value="Physician">Physician</option>
                                        <option value="Clinician">Clinician</option>
                                        <option value="Driver">Driver</option>
                                    </Field>
                                    </div>
                                    <div className='form-control'>
                                    ZipCode Min : <Field name="zipCodeMin" 
                                    placeholder="Enter Minimum ZipCode"
                                    /></div>
                                    {errors.zipCodeMin && touched.zipCodeMin ? (
                                        <div className='errormsg'>{errors.zipCodeMin}</div>
                                    ): null}
                                    <div className='form-control'>
                                    ZipCode Max : <Field name="zipCodeMax" 
                                    placeholder="Enter Maximum ZipCode"
                                    /></div>
                                    {errors.zipCodeMax && touched.zipCodeMax ? (
                                        <div className='errormsg'>{errors.zipCodeMin}</div>
                                    ): null}
                                    <button type="submit">Submit</button>
                                </Form>
                            </div>
                        </div>
                    )
                }}
            </Formik>
        );
    }
}

export default (withRouter(NewUser));