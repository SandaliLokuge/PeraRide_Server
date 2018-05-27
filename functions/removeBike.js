const mongoOp_bikes = require('../models/bikes');
const mongoOp_bikeIssue = require('../models/bike_issued');

var removeBike = (bike_id) =>{

    return new Promise((resolve, reject) => {
        mongoOp_bikeIssue.findOne({'bike_id' : bike_id})
        .then((doc) => {
            if(doc){
                reject({'response': "bike is already at a user", 'res': false});
            }else {
                mongoOp_bikes.findOneAndRemove({'bike_id' : bike_id},function (err,doc) {
                    if(err){
                        reject({'response': "unsuccess", 'res': false});
                    }
                    if(doc){
                        resolve({'response': "success", 'res': true});
                    }else {
                        reject({'response': "unsuccess", 'res': false});
                    }
                });
            }
        }).catch((err) => {
            reject({'response': "unsuccess", 'res': false});
        })

    });

};

module.exports.removeBike = removeBike;
