'use strict';

const mongoOp_rider = require('../models/Rider');
var unlockQR = require('./unlockQR');


// var smscheck = (message,phone) => {
// 	var phoneNo = phone;
//
// 	mongoOp_rider.findOne({ rider_phone: phoneNo }, (err, user) => {
//
// 	    if (err){
// 				//throw err;
// 			callback({'response':"Something Wrong",'res':false});
// 		}
//
// 	    if (!user) {
// 	    	callback({'response':"User not exist",'res':false});
// 	    }else{
// 	    	callback({'response':"Successful",'res':true});
// 	    }
//
//
//
// 	});
// };

var smscheck = (message,phone) => {
    var phoneNo = phone;
    console.log(phoneNo)
    return new Promise((resolve, reject) => {
        mongoOp_rider.findOne({rider_phone: phoneNo})
            .then((user) => {

                if (!user){
                    reject({'response':"User not exist",'res':false});
                }
                var body = {'rider_regNo': user.rider_regNo, 'lock_id': message };

                unlockQR.unlockQR(body).then((response) => {
                    resolve(response);
                }).catch((err) => {
                    reject(err);
                });
            }).catch(() => {
                reject({'response':"Something Wrong",'res':false});
            });
    });
};

module.exports.smscheck = smscheck;


