'use strict';

require('dotenv').config();
const server = require('./src/server');
const PORT = process.env.PORT || 3000;


// mongo set up 
const MONGO_URI = process.env.MONGO_URI;
const mongoose = require('mongoose');
const options = {useNewUrlParser: true, userUnifiedTopology: true};
mongoose.connect(MONGO_URI, options);


server.start(PORT);