import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import APIHelper from "../apis/APIHelper";

/**
 * Function to create a page for the user so that they can update their password
 * @returns 
 */
const ChangePassword = () => {
    // const initialState = {
    //     currentPassword: "",
    //     newPassword: "",
    //     confirmPassword: "",
    // };

    // const navigate = useNavigate();

    /**
     * userdetail denotes the initialstate of the fields used for this page
     * setUserDetail will be used to set the updated state of the fields
     */
    const [userdetail, setUserDetail] = useState({
        id: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    // function refreshPage() {
    //     window.location.reload(false);
    // }

    return (
        // Formik is used for form
        <Formik initialValues={userdetail}
            // Method to handle updating the password
            onSubmit={(values) => {
                console.log(values);
                var scenario = 0;
                if (values.currentPassword === "") {
                    scenario = 1;
                } else if (values.newPassword === "") {
                    scenario = 2;
                } else if (values.currentPassword === values.newPassword) {
                    scenario = 3;
                } else if (values.newPassword !== values.confirmPassword) {
                    scenario = 4;
                }

                /**
                 * Error handling
                 */
                switch (scenario) {
                    case 1:
                        alert('Current Password Field cannot be blank.');
                        break;
                    case 2:
                        alert('New Password Field cannot be blank.');
                        break;
                    case 3:
                        alert('Current Password and New Password cannot be same.')
                        break;
                    case 4:
                        alert('Password do not match.')
                        break;
                    default:
                        setUserDetail(values);
                        APIHelper.updatePassword(values).then((data) => {
                            alert('Password has been updated.')
                        });
                }

            }}
        >
            {({ values, handleChange, handleSubmit }) => {
                return (
                    <div className="changePasswordContainer">
                        <div className="changePasswordForm">
                            <h2>UPDATE PASSWORD</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-control">
                                Current Password : <input type="password"
                                    name="currentPassword"
                                    placeholder="Enter Current Password"
                                    value={values.currentPassword}
                                    onChange={handleChange}
                                /><br></br></div>
                                <div className="form-control">
                                New Password : <input type="password"
                                    name="newPassword"
                                    placeholder="Enter New Password"
                                    value={values.newPassword}
                                    onChange={handleChange}
                                /><br></br></div>
                                <div className="form-control">
                                Confirm Password : <input type="password"
                                    name="confirmPassword"
                                    placeholder="Enter New Password to Confirm"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                /><br></br></div>
                                <div className="form-control">
                                <button type="submit">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                );
            }}
        </Formik>
    );
};

export default ChangePassword;