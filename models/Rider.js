'use strict';
const mongoose=require('mongoose');
mongoose.connect('mongodb://mongo/SmartRide');

// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var userSchema  = {
    "rider_regNo" : String,
    "rider_password" : String
};
// create model if not exists.
mongoose.Promise = global.Promise;
module.exports = mongoose.model('Rider',userSchema);
