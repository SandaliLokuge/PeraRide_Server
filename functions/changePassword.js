const bcrypt = require('bcrypt-nodejs');
const mongoOp_rider = require('../models/Rider');

var changePassword = (body) =>{
    var currentPass = body.currentPass;
    var newPass = body.newPass;
    var regNo = body.rider_regNo;



    return new Promise((resolve, reject) => {
        mongoOp_rider.findOne({'rider_regNo' : regNo})
            .then((user) => {
                if(!user){
                    reject({'response' : "User not exist", 'res':false});
                }else{
                    bcrypt.compare(currentPass,user.rider_password, function(err, isMatch) {
                        if (err){
                            reject({'response':"Something Wrong",'res':false});
                        }

                        if (isMatch) {
                            bcrypt.hash(newPass, null, null, function(err, hash) {
                                if(err){
                                    reject({'response':"Something Wrong",'res':false});
                                }else {
                                    user.rider_password = hash;
                                }
                            });

                            user.save().then(() => {
                                resolve({'response':"Password change",'res':true});
                            });
                        }
                        else {
                            reject({'response':"Invalid Password",'res':false});
                        }
                    });
                }
            })
    })

};

module.exports.changePassword = changePassword;