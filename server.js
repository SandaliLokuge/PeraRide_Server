

'use strict';

const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const router 	   = express.Router();
const port 	   = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/PeraRide/v1', router);
//routing paths
require('./routes/index')(router);

app.listen(port);

console.log(`App Runs on ${port}`);
