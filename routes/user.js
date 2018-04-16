var register = require('../functions/register');
var login = require('../functions/login');

module.exports = (app)=>{

    app.post('/user/login',function(req,res){
        var rider_regNo = req.body.rider_regNo;
        var rider_password = req.body.rider_password;
    
        login.login(rider_regNo,rider_password,function (found) {
             res.json(found);
        });
    });
    
    
    app.post('/user/register',function(req,res){
        var rider_regNo = req.body.rider_regNo;
        var rider_password = req.body.rider_password;
    
        register.register(rider_regNo,rider_password,function (found) {
            res.json(found);
        });
    });
    
    app.get('/user/unlock',function(req,res){
      var jwt_token = req.body.token;
      var bike_id=req.body.bike_id;

      unlock.unlock(jwt_token,bike_id,function(found){
        res.json(found);
      });
    });
    
}
