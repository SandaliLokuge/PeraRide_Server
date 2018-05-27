const mongoOp_station = require('../models/stations');

var fetchstations = () => {
    return new Promise((resolve, reject) => {
        mongoOp_station.find(
            {},
           'name location noOfBikes noOfEmpty',
        ).then((res) => {
           resolve(res);
       }).catch((err) => {
           reject(err);
       })
    })

}


module.exports.fetchstations = fetchstations;
