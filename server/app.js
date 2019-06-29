import express from 'express';
const app = express();

import morgan from 'morgan';

/** Configs */
require('dotenv').config();
require('./database');

/** Middleware */
app.use(express.json());
app.use(morgan('dev'));

/** Routes */
app.use('/api/v1/tours', require('./routes/tourRoutes'));
app.use('/api/v1/users', require('./routes/userRoutes'));

module.exports = app;