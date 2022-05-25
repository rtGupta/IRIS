import express from "express";
import * as updatePasswordController from './../controllers/updatePassword-controller.js';

const router = express.Router();

// Code to send a put request and update the password
router.route('/userInfo/updatePassword/:id')
    .put(updatePasswordController.update)

export default router;