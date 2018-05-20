const mongoose=require('mongoose');
mongoose.connect('mongodb://mongo/SmartRide');

module.exports = mongoose;