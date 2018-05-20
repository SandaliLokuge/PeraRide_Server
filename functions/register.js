'use strict';
const express    = require('express');
const auth = require('basic-auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const router 	   = express.Router();
const config = require('../config/config.json');
const mongoOp_rider=require('../models/Rider');
const configdb = require('../config/db');
const mongoOp_admin=require('../models/Admin');



exports.registerRider = function(req,callback) {

	var rider_regNo = req.body.rider_regNo;
	var rider_phoneNo = req.body.rider_phoneNo;
	var rider_name = req.body.rider_name;
	var rider_email = req.body.rider_email;
	
	
	var hashPassword;
	var newRider;

	bcrypt.hash(rider_regNo, null, null, function(err, hash) {
		newRider = new mongoOp_rider({
			rider_regNo:rider_regNo,
			rider_password:hash,
			rider_phoneNo:rider_phoneNo,
			rider_email:rider_email,
			rider_name:rider_name			
		});
	});

	mongoOp_rider.find({rider_regNo: rider_regNo},function(err,users){

		var len = users.length;

		if(len == 0){
 			newRider.save(function (err) {
				callback({'response':"Sucessfully Registered", 'res': true});
			});
		}else{

			callback({'response':"User already Registered", 'res': false});

		}
	});
}

exports.registerAdmin = function(regNo,password,callback) {

	var hashPassword;
	var newAdmin;
	bcrypt.hash(password, null, null, function(err, hash) {
		newAdmin = new mongoOp_admin({
			admin_username:regNo,
			admin_password:hash
		});
	});

	mongoOp_admin.find({admin_username: regNo},function(err,users){

		var len = users.length;

		if(len == 0){
			newAdmin.save(function (err) {
				callback({'response':"Sucessfully Registered"});
			});
		}else{

			callback({'response':"User already Registered"});

		}
	});
}
