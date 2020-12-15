'use strict';

// server dependencies 
require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRoutes = require('./auth/routes/user-route');
app.use(userRoutes);

module.exports = {
    server: app,
    start: port => {
        if(!port) {
            throw new Error('missing port');
        }
        app.listen(port, () => { console.log('listening on: ', port)});
    }
}