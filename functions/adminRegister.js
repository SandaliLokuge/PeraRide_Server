
const bcrypt = require('bcrypt-nodejs');
const mongoOp_admin = require('../models/admin');

var adminRegister = (body,callback) => {

    var regNo = body.admin_username;
    var password = body.admin_password;
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
};

module.exports.adminRegister = adminRegister;