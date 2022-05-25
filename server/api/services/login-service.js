import User from './../models/user.js';

/**
 * Will find the user by id and will help in login
 * @param {*} query 
 * @returns 
 */
export const search = (query) => {
    const params = {...query};
    return User.find(params).exec();
}