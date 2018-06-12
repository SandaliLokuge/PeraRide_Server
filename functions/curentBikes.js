const mongoOp_bike = require('../models/bikes');


var bikes = () => {
    return new Promise((resolve,reject) => {
        mongoOp_bike.find({bike_id : { $nin : null}},{_id:0, __v:0})
        .then((bikes) => {
           resolve(bikes);
        }).catch((err) => {
           reject(err);
        })
    })
}

module.exports.bikes = bikes;
