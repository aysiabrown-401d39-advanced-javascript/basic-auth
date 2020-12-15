'use strict';
const bcrypt = require('bcrypt');

async function validator (req, res, next) {
  try {
    const user = await Users.findOne({ username: username })
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      res.status(200).json(user);
    }
    else {
      throw new Error('Invalid User')
    }
  } catch (error) { res.status(403).send("Invalid Login"); }  
  
  next();
}

module.exports = validator;