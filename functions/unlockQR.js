const mongoOp_bike = require('../models/bike_issued');
const mongoOp_station = require('../models/stations');


var unlockQR = (body) => {
    var lockId = body.lockId;
    var regNo = body.rider_regNo;

    return new Promise((resolve, reject) => {
        mongoOp_bike.findOne(
            {"rider_regNo" : regNo}
        ).then((doc) => {
            if(doc){
                if(!doc.bike_id){
                    mongoOp_station.findOne(
                        {"locks.lock_id" : lockId},
                        {"locks.$.bike_id" : true}
                    ).then((doc) => {
                        if(doc.locks[0].empty){
                            reject({'response' : "unsuccess lock is already empty", 'res' : false});
                        }else{
                            mongoOp_station.findOneAndUpdate(
                                {"locks.lock_id" : lockId},
                                {$set : {"locks.$.bike_id" : null , "locks.$.empty" : true }, $inc:{'noOfEmpty' : 1, 'noOfBikes' : -1}},
                                {upsert : true , fields : {"locks.$.bike_id" : 1, "station_id" : 1}}
                            ).then((doc) => {
                                mongoOp_bike.findOneAndUpdate(
                                    {"rider_regNo" : regNo},
                                    {$set : {"bike_id" : doc.locks[0].bike_id }, $currentDate : {"date_time" : true}},
                                    {new : true}
                                ).then((ele)=>{
                                    if(ele){
                                        resolve({'response' : "success", 'res' : true});
                                    }else {
                                        reject({'response' : "unsuccess not found rider", 'res' : false});
                                    }
                                }).catch(()=>{reject({'response' : "unsuccess not found rider", 'res' : false})});
                            }).catch(() => {reject({'response' : "unsuccess", 'res' : false})});
                        }
                    }).catch(() => {reject({'response' :"unsuccess not found lock", 'res' : false})});
                }else {
                    reject({'response' :"You already have a bike", 'res' : false});
                }
            }else {
                reject({'response' :"unsuccess not found user", 'res' : false});
            }

        }).catch(() => {
            reject({'response' :"error", 'res' : false});
        })
    });

};



module.exports.unlockQR = unlockQR;
