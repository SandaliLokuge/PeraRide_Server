let mongoose = require('mongoose');


// create schema

var userSchema  = new mongoose.Schema({
    admin_username :{
        type : String,
        require : true,
        trim : true,
        unique : true
    },
    admin_password : {
        type : String,
        require : true
    }
});

// create model if not exists.
mongoose.Promise = global.Promise;
module.exports = mongoose.model('Admin',userSchema);