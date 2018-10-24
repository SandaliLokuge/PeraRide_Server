const mongoOp_station = require('../models/stations');

var fetchstations = () => {
    return new Promise((resolve, reject) => {
        mongoOp_station.find(
            {},
            {_id:0, station_id:0, __v:0, locks:0}
        ).then((res) => {
            if(res){
                resolve({'response' : res, 'res':true});
            }else {
                reject({'response' : "No stations found", 'res':false});
            }           
       }).catch((err) => {
           reject({'response' : err, 'res':false});
       })
    })

}


module.exports.fetchstations = fetchstations;
