'use strict';
const express    = require('express');
const config = require('../config/config.json');
const mongoOp_rider=require('../models/Rider');
const configdb = require('../config/db');

var smscheck = (phone,callback) => {
	var phoneNo = phone;

	mongoOp_rider.findOne({ rider_phone: phoneNo }, (err, user) => {

	    if (err){
				//throw err;
			callback({'response':"Something Wrong",'res':false});
		}

	    if (!user) {
	    	callback({'response':"User not exist",'res':false});
	    }else{
	    	callback({'response':"Succesful",'res':true});
	    }



	});
}

module.exports.smscheck = smscheck;
