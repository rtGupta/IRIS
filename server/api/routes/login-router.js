import express from "express";
import * as loginController from './../controllers/login-controller.js';

const router = express.Router();

// Code to post login request
router.route('/login')
    .post(loginController.post)

// Code to post logout request
router.route('/logout')
    .post(loginController.logout)

// router.route('/refresh_token')
//     .post(loginController.refreshTokenPost)

export default router;