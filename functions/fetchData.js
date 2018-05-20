'use strict';
const express    = require('express');
const auth = require('basic-auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const router 	   = express.Router();
const config = require('../config/config.json');
const mongoOp_rider=require('../models/Rider');
const mongoOp_admin=require('../models/Admin');
const configdb = require('../config/db');

exports.fetchRiders = function(req,callback) {

		  mongoOp_rider.find({},{_id:0, rider_regNo:1, rider_phoneNo:1, rider_name: 1,rider_email: 1},(err, result) => {

		    if (err) throw err;

            
            callback({'riders':result});
		   
		  });

}

