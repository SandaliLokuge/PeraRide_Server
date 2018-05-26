'use strict';
const express    = require('express');
const auth = require('basic-auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const router 	   = express.Router();
const config = require('../config/config.json');
const mongoOp_rider=require('../models/Rider');
const configdb = require('../config/db');

exports.unlock = function(jwt_token,bike_id,callback) {

  if (jwt_token) {

  		// verifies secret and checks exp
  		jwt.verify(jwt_token, configdb.secret, function(err, decoded) {
  			if (err) {
          callback({'response':"Failed to authenticate token",'res':false});
  			} else {
  				// if everything is good,check for bike_id
          callback({'response':"Checking for bike"});
  			}
  		});

  	} else {

  		// if there is no token
  		// return an error
  		callback({'response':"No token provided",'res':false});
  	}

}
