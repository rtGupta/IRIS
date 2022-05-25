import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import routes from './routes/index.js';

const app = express();

/**
 * Database connection link
 */
mongoose.connect('mongodb://localhost:27017/iris');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

routes(app);

export default app;