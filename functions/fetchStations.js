const mongoOp_station = require('../models/stations');

var fetchstations = () => {
    return new Promise((resolve, reject) => {
        mongoOp_station.find(
            {},
            {_id:0, station_id:0, __v:0, noOfEmpty:0, noOfBikes:0, locks:0}
        ).then((res) => {
           resolve(res);
       }).catch((err) => {
           reject(err);
       })
    })

}


module.exports.fetchstations = fetchstations;
