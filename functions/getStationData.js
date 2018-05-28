const mongoOp_station = require('../models/stations');

var stationdata = (name) => {
    return new Promise((resolve, reject) => {
        mongoOp_station.find(
            {'name' : name},
            {_id:0, station_id:0, __v:0, locks:0, location:0, name:0}
        ).then((res) => {
            resolve(res);
       }).catch((err) => {
           reject(err);
       })
    })

}


module.exports.stationdata = stationdata;
