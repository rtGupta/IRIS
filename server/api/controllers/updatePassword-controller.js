import * as updatePasswordService from './../services/updatePassword-service.js';

const setErrorResponse = (error, response) => {
    response.status(500);
    response.json(error);
}

const setSuccessResponse = (obj, response) => {
    response.status(200);
    response.json(obj);
}

/**
 * This function will be used to update the password that the user has provided after first login
 * @param {*} request 
 * @param {*} response 
 */

export const update = async (request, response) => {
    try {
        const id = request.params.id;
        const updated = {...request.body};
        updated.id = id;
        const userInfo = await updatePasswordService.update(updated);
        setSuccessResponse(userInfo, response);
    } catch (error) {
        setErrorResponse(error, response);
    }
}