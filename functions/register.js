'use strict';
const express    = require('express');
const auth = require('basic-auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const router 	   = express.Router();
const config = require('../config/config.json');
const mongoOp_rider=require('../models/Rider');
const configdb = require('../config/db');


exports.register = function(regNo,password,callback) {

	var hashPassword;
	var newRider;
	bcrypt.hash(password, null, null, function(err, hash) {
		newRider = new mongoOp_rider({
			rider_regNo:regNo,
			rider_password:hash
		});
	});

	mongoOp_rider.find({rider_regNo: regNo},function(err,users){

		var len = users.length;

		if(len == 0){
 			newRider.save(function (err) {
				callback({'response':"Sucessfully Registered"});
			});
		}else{

			callback({'response':"User already Registered"});

		}
	});
}
