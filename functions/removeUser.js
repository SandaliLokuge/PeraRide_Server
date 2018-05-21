
const mongoOp_rider = require('../models/Rider');
const mongoOp_bike = require('../models/bike_issued');

var removeUser = (rider_regNo) =>{

    return new Promise((resolve, reject) => {
        mongoOp_rider.findOneAndRemove({'rider_regNo' : rider_regNo},function (err,doc) {
            if(err){
                reject({'response': "unsuccess", 'res': false});
            }else {
                mongoOp_bike.findOneAndRemove({'rider_regNo' : rider_regNo},function (err,doc){
                    resolve({'response': "success", 'res': true});
                });
            }
        });
    });

};

module.exports.removeUser = removeUser;