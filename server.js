'use strict';

const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const router 	   = express.Router();
const port 	   = process.env.PORT || 8080;
const config = require('config');
var mqttClient = require('./config/mqtt');
let mongoose = require('mongoose');
let morgan = require('morgan')

  mongoose.connect(config.DBHost);
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));

  //don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req, res) => {
  res.sendFile(__dirname + '/home/index.html')
})
app.use('/PeraRide/v1', router);
//routing paths
require('./routes/index')(router,mqttClient);

app.listen(port);

console.log(`App Runs on ${port}`);

module.exports = app;