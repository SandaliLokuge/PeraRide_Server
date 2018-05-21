'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const configdb = require('../config/db');
const mongoOp_admin = require('../models/admin');



var adminLogin = (body,callback) => {
    var username = body.admin_username;
    var password = body.admin_password;
    mongoOp_admin.findOne({ admin_username: username }, (err, user) => {

        if (err) throw err;

        if (!user) {
            callback({'response':"Admin does not exist",'res':false});
        }else{

            bcrypt.compare(password,user.admin_password, function(err, isMatch) {
                if (err) throw err;

                if (isMatch) {

                    const token = jwt.sign(user.toJSON(), configdb.secret, {
                        expiresIn: 604800 // 1 week
                    });

                    callback({'response':"Login Success",'res':true,'token': token});
                }
                else {
                    callback({'response':"Invalid Password",'res':false});
                }
            });
        }

    });
};

module.exports.adminLogin = adminLogin;