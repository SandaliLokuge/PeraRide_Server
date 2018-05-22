
const express    = require('express');
const auth = require('basic-auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const router 	   = express.Router();
const config = require('../config/config.json');
const mongoOp_rider=require('../models/Rider');
const configdb = require('../config/db');



var editprof = (body,callback) => {
    var regNo = body.rider_regNo;
    var email = body.rider_email;
    var firstName = body.rider_firstName;
    var lastName = body.rider_lastName;
    var phone = body.rider_phone;

    if (!email || !firstName || !lastName || !phone) {
            callback({'response':"One or more fields are empty", 'res':false});
    }

    mongoOp_rider.findOneAndUpdate({ rider_regNo: regNo },{
        $set:{
            rider_email : email,
            rider_firstName : firstName,
            rider_lastName : lastName,
            rider_phone : phone
        }
    },{new : true}, function (err, doc){
        if(err){
            callback({'response':"Something Wrong", 'res':false});
        }
        callback({'response':"Update Successfully", 'res':true});
    });
}


module.exports.editprof = editprof;
