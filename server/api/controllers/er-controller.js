import * as ERService from '../services/er-service.js';
import express from 'express';
import {isAuth, setUnauthorizedErrorResponse} from './isAuth.js';

/**
 * Method to set the error response
 * @param {*} error 
 * @param {*} response 
 */

const setErrorResponse = (error, response) => {
    response.status(500);
    response.json(error);
}

/**
 * Method to set the success response
 * @param {*} obj 
 * @param {*} response 
 */
const setSuccessResponse = (obj, response) => {
    response.status(200);
    response.json(obj);
}

/**
 * Creates a new work request in the dispatcher's Work Queue for the incoming call
 * @param {*} request 
 * @param {*} response 
 */
export const post = async (request, response) => {
    try {
        const payload = request.body;
        const userId = isAuth(request);
        // console.log(userId);

        if (userId !== null && userId !== undefined) {
            const wr = await ERService.save(payload);
            setSuccessResponse(wr, response);    
        } else {
            setUnauthorizedErrorResponse(response);
        }
    } catch(error) {
        setErrorResponse(error, response);
    }
}

/**
 * Updates the dispatcher's work request.
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

            let wr;
            if (updated.receiver) {
                wr = await ERService.updateReceivers(updated);
            } else {
                wr = await ERService.update(updated);
            }
            setSuccessResponse(wr, response);
        } else {
            setUnauthorizedErrorResponse(response);
        }
        
    } catch (error) {
        setErrorResponse(error, response);
    }
}

/**
 * Fetches the request from the dispatcher's work queue by requestId 
 * @param {*} request 
 * @param {*} response 
 */
export const findRequest = async (request, response) => {
    try {

        const userId = isAuth(request);
        if (userId !== null && userId !== undefined) {
            const requestId = request.query.requestId;
            const sender = request.query.sender;
            const receiver = request.query.receiver;
    
            const query = {};
    
            if (requestId)
                query.requestId = requestId;
    
            if (sender) {
                query.sender = sender;
            }
    
            if (receiver) {
                query.receiver = JSON.parse(receiver);
            }
    
            const workRequest = await ERService.find(query);
            setSuccessResponse(workRequest, response);
        } else {
            setUnauthorizedErrorResponse(response);
        }

    } catch (error) {
        setErrorResponse(error, response);
    }
}

/**
 * Fetches all the incoming work requests from the dispatcher work queue.
 * @param {*} request 
 * @param {*} response 
 */
export const get = async (request, response) => {
    try {
        const userId = isAuth(request);
        if (userId !== null && userId !== undefined) {
            const id = request.params.id;
            const wr = await ERService.get(id);
            setSuccessResponse(wr, response);
        } else {
            setUnauthorizedErrorResponse(response);
        }
        
    } catch (error) {
        setErrorResponse(error, response);
    }
}