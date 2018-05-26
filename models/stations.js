'use strict';
let mongoose = require('mongoose');

var lockSchema = new mongoose.Schema({
    lock_id : {
        type : String,
        require : true,
        trim : true,
        unique : true
    },

    bike_id : {
        type : String
    },

    empty : {
        type : Boolean
    }
});

var stationSchema = new mongoose.Schema({
	station_id : {
		type : String,
		require : true,
		trim : true,
		unique : true
	},

	full : {
		type : Boolean,
        default : false
	},

    noOfEmpty : {
        type : Number,
        default : 1
    },

    locks : [lockSchema]

});

mongoose.Promise = global.Promise;
module.exports = mongoose.model('stations',stationSchema);
