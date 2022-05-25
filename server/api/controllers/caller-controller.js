import * as callerService from '../services/caller-service.js'
import {isAuth, setUnauthorizedErrorResponse} from './isAuth.js';

/**
 * Function to set error response with code
 * @param {*} error 
 * @param {*} response 
 */ 
const setErrorResponse = (error, response) => {
    response.status(500);
    response.json(error);

}

/**
 * Function to set success response with code
 * @param {*} obj 
 * @param {*} response 
 */
const setSuccessResponse = (obj, response) => {
    response.status(200);
    response.json(obj);

}

/**
 * Add caller api call function
 * @param {*} request 
 * @param {*} response 
 */
export const post = async(request, response) => {
    try{
        const userId = isAuth(request);

        if (userId !== null && userId !== undefined) {
            const payload =  request.body;
            const caller = await callerService.save(payload);
            setSuccessResponse(caller, response);
        } else {
            setUnauthorizedErrorResponse(response);
        }
    } catch(error){
        setErrorResponse(error, response);
    }

}

/**
 * Get caller api call function
 * @param {*} request 
 * @param {*} response 
 */
export const get = async (request, response) => {
    try{
        const userId = isAuth(request);

        if (userId !== null && userId !== undefined) {
            const id = request.params.id;
            const caller = await callerService.get(id);
            setSuccessResponse(caller, response);
        } else {
            setUnauthorizedErrorResponse(response);
        }

    }catch(error){
        setErrorResponse(error, response);
    }
}

/**
 * Update Caller API function
 * @param {*} request 
 * @param {*} response 
 */
export const update = async (request, response) => {
    try {
        const userId = isAuth(request);

        if (userId !== null && userId !== undefined) {
            const id = request.params.id;
            const updated = { ...request.body };
            updated.id = id;
            const caller = await callerService.update(updated);
            setSuccessResponse(caller, response);
        } else {
            setUnauthorizedErrorResponse(response);
        }
    } catch (error) {
        setErrorResponse(error, response);
    }
}
