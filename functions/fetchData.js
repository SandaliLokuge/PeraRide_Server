'use strict';
const mongoOp_rider=require('../models/Rider');

exports.fetchRiders = function(req,callback) {

		  mongoOp_rider.find({},{_id:0, rider_password:0,__v:0},(err, result) => {

		    if (err) throw err;			
            
            callback({'riders':result});
		   
		  });

}

