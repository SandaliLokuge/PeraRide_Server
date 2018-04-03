const jwt = require('jsonwebtoken');
const configdb = require('../config/db');
var {User} = require('./../models/Rider');

var authenticate = (req, res, next) => {
  var token = req.header('x-auth');

  try {
    decoded = jwt.verify(token, configdb.secret);
    req.body.rider_regNo = decoded.rider_regNo;
    next();
  } catch (e) {
    res.status(401).send();
  }

};

module.exports = {authenticate};
