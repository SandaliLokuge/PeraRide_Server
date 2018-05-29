
const bcrypt = require('bcrypt-nodejs');
const mongoOp_rider = require('../models/Rider');
const mongoOp_bike = require('../models/bike_issued');



var register = (body,callback) => {

		var regNo = body.rider_regNo;
		var password = body.rider_password;
        var mail = body.rider_email;
        var fName = body.rider_firstName;
        var lName = body.rider_lastName;
        var phone = body.rider_phone;
		var nic = body.nic;

		var newRider;

		bcrypt.hash(password, null, null, function(err, hash) {
			newRider = new mongoOp_rider({

				rider_regNo:regNo,
				rider_password:hash,
                rider_email:mail,
                rider_firstName:fName,
                rider_lastName:lName,
                rider_phone:phone,
				nic : nic
			});

		});

		mongoOp_bike.findOne({rider_regNo:regNo}).then((doc) => {
		    if(doc){
                callback({'response':"User already Registered", 'res' : false});
            }else {
                mongoOp_rider.find({rider_regNo: regNo},function(err,users){

                    let len = users.length;

                    if(len === 0){
                        newRider.save().then(()=>{
                            var newBike = new mongoOp_bike({
                                rider_regNo:regNo
                            });
                            newBike.save(function (err) {
                                if(err){
                                    callback({'response':err, 'res' : false});
                                }
                                callback({'response':"Successfully Registered", 'res' : true});
                            })
                        });
                    }else{

                        callback({'response':"User already Registered", 'res' : false});

                    }
                });
            }
        })

};


module.exports.register = register;
