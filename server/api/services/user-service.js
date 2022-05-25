import User from '../models/user.js';
import bcrypt from 'bcrypt';

/**
 * Function to add a new user in the system
 * @param {*} newUser 
 * @returns 
 */
export const save = async (newUser) => {
    const user = new User(newUser);
    
    // Encrypt user password
    const encryptedPassword = await bcrypt.hash(user.password, 10);
    user.password = encryptedPassword;
    
    return user.save();
}

/**
 * Function to get all the users or get a user by id
 * @param {*} id 
 * @returns 
 */

export const get = (id) => {
    const user = User.findById(id).exec();
    return user;
}

/**
 * Function to find the user by id and update the details
 * @param {*} updatedUser 
 * @returns 
 */
export const update = (updatedUser) => {
    const user = User.findByIdAndUpdate(updatedUser.id, updatedUser, {new: true}).exec();
    return user;
}

/**
 * Function to delete the user from the database
 * @param {*} id 
 * @returns 
 */
export const remove = (id) => {
    const user = User.findByIdAndDelete(id).exec();
    return user;
}

/**
 * Function to search a particular user by firstName, lastName or emailID
 * @param {*} query 
 * @returns 
 */
export const search = (query) => {
    const params = {...query};
    return User.find(params).exec();
}