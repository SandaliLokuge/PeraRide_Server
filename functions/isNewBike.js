const mongoOp_bikes = require('../models/bikes');
const mongoOp_station = require('../models/stations');

var isNewBike = (body) => {
    var lockId = body.lock_id;
    var bikeId = body.bike_id;
    return new Promise((resolve,reject) => {
        mongoOp_bikes.findOne({'bike_id' : bikeId})
        .then((doc) => {
            if(doc){
                resolve({'response': "Successful", 'res': true});
            }else {
                return mongoOp_station.findOneAndUpdate(
                    {"locks.lock_id": lockId},
                    {$set: {"locks.$.bike_id": bikeId, "locks.$.empty": false}, $inc: {'noOfEmpty': -1, 'noOfBikes' : 1}}
                )
            }
        }).then(() => {
            return new mongoOp_bikes({
                bike_id: bikeId
            }).save();

        }).then(() => {
            reject({'response': "new bike saved", 'res': true});
        })
        .catch(() => {
            reject({'response': "Error", 'res': false});
        })
    })
}

module.exports.isNewBike = isNewBike;
