const mongoOp_station = require('../models/stations');




var addStation = (body) => {
    var station_id = body.station_id;
    var lock_id = body.lock_id;
    return new Promise((resolve, reject) => {
        var station = new mongoOp_station({
            station_id: station_id,
            noOfEmpty: 1,
            locks: {
                lock_id: lock_id,
                bike_id: null,
                empty: true
            }
        });

        station.save(function (err) {
            if (!err) {
                console.log('Success!');
                resolve({'response' : "Successful", 'res' : true});
            } else {
                console.log(err);
                reject({'response' : "Unsuccessful", 'res' : false});
            }
        });
    })

};

module.exports.addStation = addStation;