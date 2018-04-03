const user = require('./user');


module.exports = function(app) {

	app.get('/', (req, res) => res.end('Welcome to Smart_Ride !'));

  //user routes
  user(app);
  phone(app);

};
