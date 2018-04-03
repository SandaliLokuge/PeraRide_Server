
const express    = require('express');
const auth = require('basic-auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const router 	   = express.Router();
const config = require('../config/config.json');
const mongoOp_rider=require('../models/Rider');
const configdb = require('../config/db');



var register = (body,callback) => {

		var regNo = body.rider_regNo;
		var password = body.rider_password;

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
					if(err){
						callback({'response':err});
					}
					callback({'response':"Sucessfully Registered"});
				});
			}else{

				callback({'response':"User already Registered"});

			}
		});
}


module.exports.register = register;
