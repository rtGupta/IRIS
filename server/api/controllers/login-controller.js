import * as loginService from "./../services/login-service.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.js";

/**
 * This function will create an access token for user login which will be valid for 15 minutes
 * @param {*} userId 
 * @returns 
 */
const createAccessToken = (userId) => {
  return jwt.sign(
    { userId },
    "e67f01c4e0f093db97550b5bcaea35af833512315b1876f652cfdb579118bb4ab241872fbcf6e4ead155b4ee7dc1aa62bb7971d00ce66ebe2c8215493e8b57fb",
    {
      expiresIn: "50m",
    }
  );
};

// const createRefreshToken = userId => {
//     return jwt.sign({userId}, "8f1714551b9f7189af01edf2bf581e11d62c781f0312a4ba2b1e71537a1a5dc6b6da2952ce79d605723fcd824546eb4df6de1e24dcd9a0a3613da1753036c1e1", {
//         expiresIn: '7d',
//     })
// };

/**
 * This function will send the generated access token
 * @param {*} user 
 * @param {*} response 
 * @param {*} accessToken 
 */
const sendAccessToken = (user, response, accessToken) => {
  response.status(200).json({
    _id: user._id,
    emailID: user.emailID,
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    phoneNumber: user.phoneNumber,
    role: user.role,
    zipCodeMin: user.zipCodeMin,
    zipCodeMax: user.zipCodeMax,
    userCreatedDate: user.userCreatedDate,
    accessToken,
  });
};

const setErrorResponse = (error, response) => {
  response.status(500);
  response.json(error);
};

const setSuccessResponse = (obj, response) => {
  response.status(200);
  response.json(obj);
};

/**
 * This function will check if the email-ID and password entered on screen are valid and will help in logging in the user.
 * @param {*} request 
 * @param {*} response 
 */

export const post = async (request, response) => {
  try {
    const payload = request.body;
    const emailID = payload.emailID;
    const password = payload.password;

    User.findOne({ emailID: emailID }).then((user) => {
      //if user not exist than return status 400
      if (!user) {
        response.status(400).json({ message: "User not found" });
        return;
      }

      //if user exist than compare password
      //password comes from the user
      //user.password comes from the database
      bcrypt.compare(password, user.password, (err, data) => {
        //if error than throw error
        if (err) {
          response.status(500);
          return;
        }

        //if both match than you can do anything
        if (data) {
          const accessToken = createAccessToken(user._id);
          sendAccessToken(user, response, accessToken);

        } else {
          response.status(401).json({ message: "Invalid credentials" });
        }
        // return;
      });
    });
  } catch (error) {
    setErrorResponse(error, response);
  }
};

/**
 * This function will log the user out of the application and will end the token validity
 */

export const logout = async (request, response) => {
  response.clearCookie("refreshToken");
  return response.send({
    message: "User logged out successfully",
  });
};
