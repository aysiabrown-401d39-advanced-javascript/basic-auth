'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const Users = require('../models/user-model');
const base64 = require('base-64');

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// using validator 
const validator = require('../middleware/validator');

// routes 
router.post('/signup', signUpHandler);
router.post('/signin', validator, signInHandler);

async function signUpHandler (req, res) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        console.log('hash password: ', req.body.password);
        const user = new Users(req.body);
        const record = await user.save(req.body);
        res.status(200).json(record);
      } catch (e) { 
        res.status(403).send("Error Creating User"); 
      }
}

async function signInHandler (req, res) {
  try {
    let {username, password} = req.body;
    console.log('object username ', {username: username})
    const user = await Users.findOne({ username: username })
    console.log('user ', user);
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      res.status(200).json(user);
    }
    else {
      throw new Error('Invalid User')
    }
  } catch (error) { res.status(403).send("Invalid Login"); }  
}

module.exports = router;