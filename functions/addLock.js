const mongoOp_station = require('../models/stations');

var addLock = (body) => {
    var station_id = body.station_id;
    var lock_id = body.lock_id;
    return new Promise((resolve, reject) => {
        mongoOp_station.findOne({ 'station_id': station_id },function (err, doc){
            if(err){
                reject({'response' : "Unsuccessful", 'res' : false});
            }
            doc.locks.push({
                lock_id : lock_id,
                bike_id : 'null',
                empty : true
            });
            doc.noOfEmpty++;
            doc.save(function (err) {
                if (!err) {
                    resolve({'response' : "Successful", 'res' : true});
                } else {
                    console.log(err);
                    reject({'response' : "Unsuccessful", 'res' : false});
                }
            });
        });
    })

};

module.exports.addLock = addLock;