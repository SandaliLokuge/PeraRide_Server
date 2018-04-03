'use strict';
const express    = require('express');
const auth = require('basic-auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const router 	   = express.Router();
const config = require('../config/config.json');
const mongoOp_rider=require('../models/Rider');
const configdb = require('../config/db');

var login = (body,callback) => {
	var regNo = body.rider_regNo;
	var password = body.rider_password;

	mongoOp_rider.findOne({ rider_regNo: regNo }, (err, user) => {

	    if (err){
				//throw err;
				callback({'response':"Something Wrong",'res':false});
			}

	    if (!user) {
	      callback({'response':"User not exist",'res':false});
	    }

	    bcrypt.compare(password,user.rider_password, function(err, isMatch) {
	      	if (err){
						//throw err;
						callback({'response':"Something Wrong",'res':false});
					}

	      	if (isMatch) {

						const token = jwt.sign(user.toJSON(), configdb.secret, {
							expiresIn: 604800 // 1 week
						});

						callback({'response':"Login Success",'res':true,'token':token});
 	        }
	      	else {
	        	callback({'response':"Invalid Password",'res':false});
	      	}
	    });
	});
}

module.exports.login = login;
