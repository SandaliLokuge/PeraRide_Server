const mongoOp_rider=require('../models/Rider');

var logout = (rider_regNo) =>{
    return new Promise((resolve,reject) => {

        mongoOp_rider.findOne({'rider_regNo' : rider_regNo})
        .then((user) => {
            user.logged = false;
            return user.save();
        }).then(() => {
            resolve({'response' : "Successfully logout", 'res' : true});
        }).catch(() => {reject({'response' : "logout fail", 'res' : false});})
    })
}

module.exports.logout = logout;
