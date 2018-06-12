const mongoOp_bike = require('../models/bike_issued');


var bikeusers = () => {
    return new Promise((resolve,reject) => {
        mongoOp_bike.find({},{_id:0, __v:0})
        .then((users) => {
           resolve(users);
        }).catch((err) => {
           reject(err);
        })
    })
}

module.exports.bikeusers = bikeusers;
