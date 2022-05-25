import User from './../models/user.js';
import bcrypt from 'bcrypt';

/**
 * Code to find the user by id and then update the password of that user
 * @param {*} updatedUser 
 * @returns 
 */
export const update = async (updatedUser) => {
    // Encrypt user password
    const encryptedPassword = await bcrypt.hash(updatedUser.password, 10);
    const user = User.findByIdAndUpdate(updatedUser.id, encryptedPassword, {new: true}).exec();
    // user.password = encryptedPassword;
    return user;
}