import express from 'express';
import * as callerController from './../controllers/caller-controller.js';

const router = express.Router();

// Code to fetch all the registered caller's information
router.route('/caller')
    .post(callerController.post);

// Code to fetch caller details by id
router.route('/caller/:id') 
    .put(callerController.update)
    .get(callerController.get);

export default router;