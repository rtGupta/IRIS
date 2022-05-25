import Request from '../models/request.js';

/**
 * Creates a new incoming call work request.
 * @param {*} wr - workRequest object
 * @returns - request object saved in the database.
 */
export const save = (wr) => {
    const dispatcherRequest = new Request(wr);
    return dispatcherRequest.save();
}

/**
 * Updates the work request in dispatcher work queue.
 * @param {*} updatedWR 
 * @returns 
 */
export const update = (updatedWR) => {
    updatedWR.lastModifiedDate = new Date();
    const workRequest = Request.findByIdAndUpdate(updatedWR.id, updatedWR, {new: true}).exec();
    return workRequest;
}

export const updateReceivers = (updatedWR) => {
    updatedWR.lastModifiedDate = new Date();
    const workRequest = Request.findByIdAndUpdate(updatedWR.id, {$push: {receiver: updatedWR.receiver}}, {new: true}).exec();
    return workRequest;
}

/**
 * Retrieves a specific work request by requestId.
 * @param {*} query 
 * @returns 
 */
export const find = (query) => {
    const params = { ...query };
    return Request.find(params).exec();
}

/**
 * Retrieves all the incoming work requests from the dispatcher work queue.
 * @param {*} id 
 * @returns 
 */
export const get = (id) => {
    const workRequest = Request.findById(id).exec();
    return workRequest;
}