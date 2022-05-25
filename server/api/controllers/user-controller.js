import * as UserService from '../services/user-service.js';
import nodemailer from 'nodemailer';
import User from '../models/user.js';
import {isAuth, setUnauthorizedErrorResponse} from './isAuth.js';

/**
 * Config for sending an email when a user has been added to the application
 */
var transportor = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'irisnortheastern@gmail.com',
        pass: 'Iris@12345'
    }
});

 const setErrorResponse = (error, response) => {
    response.status(500);
    response.json(error);
}

const setSuccessResponse = (obj, response) => {
    response.status(200);
    response.json(obj);
}

const setUserAlreadyExistsResponse = (obj, response) => {
    response.status(409);
    response.json(obj);
}

/**
 * Code to add user in the system
 * @param {*} request 
 * @param {*} response 
 */
export const post = async (request, response) => {
    try {
        const payload = request.body;

        User.findOne({ emailID: payload.emailID })
        .then(async user => {

            if (user) { 
                const obj = { 
                    message: "User already exists"
                };
                setUserAlreadyExistsResponse(obj, response);
            } else {

                const userInfo = await UserService.save(payload);
                const obj = {
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    address: userInfo.address,
                    phoneNumber: userInfo.phoneNumber,
                    emailID: userInfo.emailID,
                    role: userInfo.role,
                    zipCodeMin: userInfo.zipCodeMin,
                    zipCodeMax: userInfo.zipCodeMax,
                    userCreatedDate: userInfo.userCreatedDate,
                    // userInfo,
                    message: "User created successfully"
                }
                setSuccessResponse(obj, response);
                var email = payload.emailID;
                var firstName = payload.firstName;
                var mailOptions = {
                    from: 'irisnortheastern@gmail.com',
                    to: email,
                    subject: 'Account Configuration - IRIS Application',
                    html: "<h4>Hello,</h4><p>This is a system generated email, do not reply!<br> You have been added as a "+userInfo.role+" in the application. UserName is same as the email-ID you provided us, and the password is Hello@Iris. <br>You will have to change the password after the first login.</p><p>Regards,<br>Team IRIS</p>"
                };
        
                transportor.sendMail(mailOptions,function(error, info){
                    if (error){
                        console.log(error);
                    } else {
                        console.log('Email sent: '+ info.response);                
                    }
                });
            }



        })
        // console.log(db.collection('userinfos'));

        // Create token
        // const token = jwt.sign (
        //     { user_id: payload._id, emailId },
        //     process.env.TOKEN_KEY,
        //     {
        //     expiresIn: "2h",
        //     }
        // );
        // // save user token
        // payload.token = token;


        // })

    } catch (error) {
        setErrorResponse(error, response);
    }
}
/**
 * Code to find user as per firstName, LastName and Email-ID
 * @param {} request 
 * @param {*} response 
 */
export const find = async (request, response) => {
    try {
        const userId = isAuth(request);
        if (userId !== null && userId !== undefined) {
            const firstName = request.query.firstName;
            const lastName = request.query.lastName;
            const role = request.query.role;

            const query = {};
            if(firstName) {
                query.firstName = firstName;
            }
            if (lastName) {
                query.lastName = lastName;
            }

            if (role) {
                query.role = role;
            }
            
            const userInfo = await UserService.search(query);
            setSuccessResponse(userInfo, response);
        } else {
            setUnauthorizedErrorResponse(response);
        }
        
    } catch (error) {
        setErrorResponse(error,response);
    }
}

/**
 * Code to get the userDetails which can either be fetched by id or all users can be fetched at the same time
 * @param {} request 
 * @param {*} response 
 */
export const get = async (request, response) => {
    try {
        const userId = isAuth(request);
        if (userId !== null && userId !== undefined) {
            const id = request.params.id;
            const userInfo = await UserService.get(id);
            setSuccessResponse(userInfo, response);
        } else {
            setUnauthorizedErrorResponse(response);
        }
        
    } catch (error) {
        setErrorResponse(error, response);
    }
}

/**
 * Code to Update User-Details when system-Admin tries to edit existing user details
 */
export const update = async (request, response) => {
    try {
        const userId = isAuth(request);
        if (userId !== null && userId !== undefined) {
            const id = request.params.id;
            const updated = {...request.body};
            updated.id = id;
            const userInfo = await UserService.update(updated);
            setSuccessResponse(userInfo, response);
        } else {
            setUnauthorizedErrorResponse(response);
        }
    } catch (error) {
        setErrorResponse(error, response);
    }
}

/**
 * Code to delete the user from the database
 * @param {*} request 
 * @param {*} response 
 */
export const remove = async (request, response) => {
    try {
        const id = request.params.id;
        const userInfo = await UserService.remove(id);
        setSuccessResponse({message: `Successfully Removed ${id}`}, response);
    } catch (error) {
        setErrorResponse(error, response);
    }
}
