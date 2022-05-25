// import {isAuth, setUnauthorizedErrorResponse} from './isAuth.js';

const BASE_API_URL = "http://localhost:5000/requests";
const BASE_CALLER_API_URL = "http://localhost:5000/caller";
const BASE_USER_API_URL = "http://localhost:5000/user";

/**
 * Function to get requests by senders userid
 * @param {*} userId
 * @returns
 */
const fetchRequestsBySender = async (userId, token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };
  const path = BASE_API_URL + `?sender=${userId}`;
  const response = await fetch(path, options);
  const data = await response.json();
  return data;
};

/**
 * Function to send emailID and password to the API and check if a user can be logged in
 * @param {*} payload
 * @returns
 */
const loginUser = async (payload) => {
  const requestParameters = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };

  const response = await fetch(
    "http://localhost:5000/login",
    requestParameters
  );
  const data = await response.json();
  return {
    response,
    data,
  };
};

const logoutUser = async () => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch("http://localhost:5000/logout", options);
  const data = await response.json();
  return {
    response,
    data,
  };
};

/**
 * Function to call the API and add a new User in the system
 * @param {*} payload
 */
const newUser = async (payload) => {
  const requestParameters = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName: payload.firstName,
      lastName: payload.lastName,
      address: payload.address,
      phoneNumber: payload.phoneNumber,
      emailID: payload.emailID,
      role: payload.role,
      zipCodeMin: payload.zipCodeMin,
      zipCodeMax: payload.zipCodeMax,
    }),
  };
  if (
    payload.firstName === "" ||
    payload.lastName === "" ||
    payload.address === "" ||
    payload.phoneNumber === "" ||
    payload.emailID === "" ||
    payload.role === ""
  ) {
    alert(
      "One or more Required fields that is ID, First Name, Last Name, Address, Phone Number, Email-ID or Role is/are Empty"
    );
  }
  fetch("http://localhost:5000/userInfo", requestParameters)
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "User already exists") {
        alert("User already Exists");
      } else {
        console.log(data);
        alert("New User has been added");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Function to update the password of the user
 * @param {*} payload
 */
const updatePassword = async (payload) => {
  const requestParameters = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: payload.newPassword }),
  };
  const path = BASE_USER_API_URL + `/${payload.id}`;
  fetch(path, requestParameters)
    .then((response) => response.json())
    .then((data) => {
      if (payload.currentPassword === "") {
        alert("Please enter your current password to continue");
      } else if (payload.newPassword === "" || payload.confirmPassword === "") {
        alert("Please enter and confirm new password to continue");
      } else {
        console.log(data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Function to update the User-Details
 * @param {*} payload
 */
const updateUser = async (payload, token) => {
  const requestParameters = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      firstName: payload.firstName,
      lastName: payload.lastName,
      address: payload.address,
      phoneNumber: payload.phoneNumber,
      emailID: payload.emailID,
      role: payload.role,
      zipCodeMin: payload.zipCodeMin,
      zipCodeMax: payload.zipCodeMax,
    }),
  };
  const path = BASE_USER_API_URL + `/${payload._id}`;
  const response = await fetch(path, requestParameters);
  const data = await response.json();

  return {
    response,
    data,
  };
};

/**
 * Function to delete the user from the application
 * @param {*} payload
 */
const deleteUser = async (payload) => {
  console.log(payload);
  const requestParameters = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  fetch(`http://localhost:5000/userInfo/${payload._id}`, requestParameters)
    .then((response) => response.json())
    .then((data) => {
      alert("User Deleted");
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Function to fetch Request's assigned to a particular receiver
 * @param {*} userId
 * @param {*} role
 * @returns
 */

const fetchRequestsByReceiver = async (userId, role, token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };
  const path = BASE_API_URL + `?receiver={"${role}":"${userId}"}`;
  const response = await fetch(path, options);
  const data = await response.json();
  return data;
};

/**
 * Function to save the caller details entered on the screen
 * @param {*} caller
 * @returns
 */
const saveCallerDetails = async (caller, token) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(caller),
  };

  const response = await fetch(BASE_CALLER_API_URL, options);
  const data = await response.json();
  return data;
};

/**
 * API call to create a new request
 * @param {*} request
 * @returns
 */
const initiateRequest = async (request, token) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  };

  const response = await fetch(BASE_API_URL, options);
  const data = await response.json();
  return data;
};

/**
 * Function to fetch all the first responders that are Fire, Police and Paramedic
 * @returns
 */
const fetchFirstResponders = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };
  const path = BASE_USER_API_URL + "?role=Paramedic&role=Police&role=Fire";
  const response = await fetch(path, options);
  const data = await response.json();
  return data;
};

/**
 * Function to fetch all the Hospitals
 * @returns
 */
const fetchHospitals = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };
  const path = BASE_USER_API_URL + "?role=Hospital";
  const response = await fetch(path, options);
  const data = await response.json();
  return data;
};

/**
 * Function to fetch all the Hospitals
 * @returns
 */
const fetchPhysicians = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };
  const path = BASE_USER_API_URL + "?role=Physician";
  const response = await fetch(path, options);
  const data = await response.json();
  return data;
};

/**
 * Function to update a current request
 * @param {*} id
 * @param {*} payload
 * @returns
 */
const updateRequest = async (id, payload, token) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(`${BASE_API_URL}/${id}`, options);
  const data = await response.json();
  return {
    response,
    data,
  };
};

/**
 * Function to update the vitals of the caller in the application
 * @param {*} id
 * @param {*} payload
 * @returns
 */
const updateCallerVitals = async (id, payload, token) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(`${BASE_CALLER_API_URL}/${id}`, options);
  const data = await response.json();
  return data;
};

/**
 * Function to get the caller details by id
 * @param {*} id
 * @returns
 */
const fetchCallerDetails = async (id, token) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(`${BASE_CALLER_API_URL}/${id}`, options);
  const data = await response.json();
  return data;
};

/**
 * Function to send the video conferencing link to the physician
 * @param {*} id
 * @param {*} meetingLink
 * @returns
 */
const sendMeetingLink = async (id, meetingLink) => {
  const path =
    BASE_API_URL + `/sendMeetingLink/${id}?meetingLink=${meetingLink}`;
  const response = await fetch(path);
  const data = await response.json();
  return data;
};

export default {
  fetchRequestsBySender,
  fetchRequestsByReceiver,
  saveCallerDetails,
  initiateRequest,
  fetchFirstResponders,
  fetchHospitals,
  fetchPhysicians,
  loginUser,
  newUser,
  updatePassword,
  updateRequest,
  updateCallerVitals,
  updateUser,
  deleteUser,
  fetchCallerDetails,
  sendMeetingLink,
  logoutUser,
};
