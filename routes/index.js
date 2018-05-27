const user = require('./user');
const phone = require('./phone');
const admin = require('./admin');


module.exports = function(app,mqttClient) {

	app.get('/', (req, res) => res.end('Welcome to Smart_Ride !'));


  //user routes
  user(app,mqttClient);
  phone(app,mqttClient);
  admin(app,mqttClient);
	
};
