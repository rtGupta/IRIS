import express from "express";
import * as UserController from './../controllers/user-controller.js';
import * as SendMeetingController from '../controllers/sendMeetingLink-controller.js';

const router = express.Router();

// Code to get all the users and add a new user by a post request
router.route('/user')
    .post(UserController.post)
    .get(UserController.find);

// Code to get, put and delete user by id
router.route('/user/:id')
    .get(UserController.get)
    .put(UserController.update)
    .delete(UserController.remove)
    
router.route('/user/sendMeetingLink/:id')
    .get(SendMeetingController.get)

export default router;
