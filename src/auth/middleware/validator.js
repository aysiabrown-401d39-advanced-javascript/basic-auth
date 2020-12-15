'use strict';
const bcrypt = require('bcrypt');
const base64 = require('base-64');

async function validator (req, res, next) {
  let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
  let encodedString = basicHeaderParts.pop();  // sdkjdsljd=
  let decodedString = base64.decode(encodedString); // "username:password"
  let [username, password] = decodedString.split(':'); // username, password
  req.body.username = username;
  req.body.password = password;
  next();
}

module.exports = validator;