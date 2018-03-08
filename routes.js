
var register = require('./functions/register');
var login = require('./functions/login');


module.exports = function(app) {

	app.get('/', (req, res) => res.end('Welcome to Smart_Ride !'));

	app.post('/login',function(req,res){
    var rider_regNo = req.body.rider_regNo;
    var rider_password = req.body.rider_password;

    login.login(rider_regNo,rider_password,function (found) {
         res.json(found);
    });
	});


	app.post('/register',function(req,res){
    var rider_regNo = req.body.rider_regNo;
    var rider_password = req.body.rider_password;

    register.register(rider_regNo,rider_password,function (found) {
    	res.json(found);
    });
	});

};
