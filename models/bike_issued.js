'use strict';
let mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
	rider_regNo : {
		type : String,
		require : true,
		trim : true,
		unique : true
	},
	bike_id : {
		type : String,
		trim : true,
		default : null
	},

    date_time : {
        type : Date,
        default : null
    },

});

mongoose.Promise = global.Promise;
module.exports = mongoose.model('bike_issued',UserSchema);
