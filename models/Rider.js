'use strict';
const mongoose=require('../config/dbConnect');

// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var userSchema  = {
    "rider_regNo" : String,
    "rider_password" : String,
    "rider_phoneNo" : String
};
// create model if not exists.
mongoose.Promise = global.Promise;
module.exports = mongoose.model('Rider',userSchema);
