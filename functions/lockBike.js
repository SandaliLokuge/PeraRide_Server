const mongoOp_bike = require('../models/bike_issued');
const mongoOp_station = require('../models/stations');

var lockBike = (body) => {
    var lockId = body.lock_id;
    var bikeId = body.bike_id;
    return new Promise((resolve, reject) => {
        mongoOp_bike.findOneAndUpdate(
            {"bike_id": bikeId},
            {$set: {"bike_id": null, "date_time": null}},
            {new: true}
        ).then(() => {
            return mongoOp_station.findOneAndUpdate(
                {"locks.lock_id": lockId},
                {$set: {"locks.$.bike_id": bikeId, "locks.$.empty": false}, $inc: {'noOfEmpty': -1}},
            )
        }).then(() => {
            resolve({'response': "Successful", 'res': true})
        }).catch(() => {
            reject({'response': "unsuccess", 'res': false})
        });
    });
};


module.exports.lockBike = lockBike;