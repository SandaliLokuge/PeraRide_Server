
const mongoOp_rider = require('../models/Rider');
const mongoOp_bike = require('../models/bike_issued');

var removeUser = (rider_regNo) =>{

    return new Promise((resolve, reject) => {
        mongoOp_bike.findOne({'rider_regNo' : rider_regNo},function (err,doc){
            if (doc) {
                if(doc.bike_id){
                    reject({'response': "user already has a bike", 'res': false});
                }else {
                    mongoOp_rider.findOneAndRemove({'rider_regNo' : rider_regNo},function (err,doc) {
                        if(err){
                            reject({'response': "unsuccess", 'res': false});
                        }else{
                            mongoOp_bike.findOneAndRemove({'rider_regNo' : rider_regNo},function (err,doc){
                                resolve({'response': "success", 'res': true});
                            });
                        }
                    });
                }
            }else {
                reject({'response': "user already removed", 'res': false});
            }

        });

    });

};

module.exports.removeUser = removeUser;
