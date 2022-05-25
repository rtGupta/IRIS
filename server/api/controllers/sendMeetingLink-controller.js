import * as UserService from './../services/user-service.js';
import nodemailer from 'nodemailer';


/**
 * This will configure the email account from which the meeting link will be sent
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

/**
 * This function will be used to get the user to retreive the email-ID, which will be used to send the meeting link
 * @param {*} request 
 * @param {*} response 
 */
export const get = async (request, response) => {
    try {
        const id = request.params.id;
        const meetingLink = request.query.meetingLink;
        const userInfo = await UserService.get(id);
        setSuccessResponse(userInfo, response);
        var name = userInfo.firstName;
        var email = userInfo.emailID;
        var mailOptions = {
            from: 'irisnortheastern@gmail.com',
            to: email,
            subject: 'Account Configuration - IRIS Application',
            html: "<h4>Hello "+name+",</h4><p>This is a system generated email, do not reply!<br><p>You have been ivited to a meeting with the first responders. Please click on below to join the meeting.<br><a href="+meetingLink+">"+meetingLink+"</a></p><p>Regards,<br>Team IRIS</p>"
        };
        transportor.sendMail(mailOptions, function(error, info){
            if (error){
                console.log(error);
            } else {
                console.log('Email sent: '+ info.response);                
            }
        });
    } catch (error) {
        setErrorResponse(error, response);
    }
}