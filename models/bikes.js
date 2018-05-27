'use strict';
const mongoose=require('../config/dbConnect');

// create schema

var userSchema  = new mongoose.Schema({
    bike_id :{
        type : String,
        trim : true,
        unique : true
    }
});

// create model if not exists.
mongoose.Promise = global.Promise;
module.exports = mongoose.model('Bikes',userSchema);
