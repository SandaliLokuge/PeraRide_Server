'use strict';
const mongoose=require('../config/dbConnect');

// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var userSchema  = {
    "admin_username" : String,
    "admin_password" : String
};
// create model if not exists.
mongoose.Promise = global.Promise;
module.exports = mongoose.model('Admin',userSchema);
