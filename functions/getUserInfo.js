const mongoOp_rider = require('../models/Rider');

var userInfo = (regNo) => {
    return new Promise((resolve, reject) => {
        mongoOp_rider.findOne(
            {'rider_regNo' : regNo},
           'rider_email rider_phone rider_firstName rider_lastName',
        ).then((res) => {
           resolve(res);
       }).catch((err) => {
           reject(err);
       })
    })

}


module.exports.userInfo = userInfo;
