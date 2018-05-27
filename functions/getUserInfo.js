const mongoOp_rider = require('../models/Rider');

var userInfo = (regNo) => {
    return new Promise((resolve, reject) => {
        mongoOp_rider.findOne(
            {'rider_regNo' : regNo},
           {_id:0, rider_password:0, __v:0, logged:0}
        ).then((res) => {
           resolve(res);
       }).catch((err) => {
           reject(err);
       })
    })

}


module.exports.userInfo = userInfo;
