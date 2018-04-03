'use strict';
const mongoose = require('mongoose');
const validator = require('validator');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/myride');

var UserSchema = new mongoose.Schema({
	rider_regNo : {
		type : String,
		require : true,
		trim : true,
		unique : true
	},
	rider_password : {
		type : String,
		require : true
	},

	// token : {
	// 	type : String,
	// 	required : true
	// },

	rider_email : {
		type : String,
		default : '',
		trim : true
		// validate : {
		// 	validator : validator.isEmail,
		// 	message : '{VALUE} is not valid email'
		// }
	},

	rider_phone : {
		type : String,
		default : '',
		trim : true
	},

	rider_firstName: {
		type : String,
		default : '',
		trim : true
	},

	rider_lastName: {
		type : String,
		default : '',
		trim : true
	}

});

mongoose.Promise = global.Promise;
module.exports = mongoose.model('Rider',UserSchema);
