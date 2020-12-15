'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const Users = require('../models/user-model');
const base64 = require('base-64');

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// using validator 
const validator = require('./auth/middleware/validator');

router.post('/signup', signUpHandler);
router.post('/signin', validator, signInHandler);

async function signUpHandler (req, res) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = new Users(req.body);
        const record = await user.save(req.body);
        res.status(200).json(record);
      } catch (e) { res.status(403).send("Error Creating User"); }
}

function signInHandler (req, res) {
  let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
  let encodedString = basicHeaderParts.pop();  // sdkjdsljd=
  let decodedString = base64.decode(encodedString); // "username:password"
  let [username, password] = decodedString.split(':'); // username, password
}

module.exports = router;