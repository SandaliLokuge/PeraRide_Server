var register = require('../functions/register');
var login = require('../functions/login');
var fetchData = require('../functions/fetchData');

module.exports = (app)=>{

    
    app.post('/user/register/rider',function(req,res){
        
        register.registerRider(req,function (found) {
            res.json(found);
        });
    });
    
    app.post('/user/register/admin',function(req,res){
        var admin_username = req.body.admin_username;
        var admin_password = req.body.admin_password;
        
        register.registerAdmin(admin_username,admin_password,function (found) {
            res.json(found);
        });
    });
    
    app.post('/user/login/rider',function(req,res){
        var rider_regNo = req.body.rider_regNo;
        var rider_password = req.body.rider_password;
    
        login.riderLogin(rider_regNo,rider_password,function (found) {
             res.json(found);
        });
    });
    
    app.post('/user/login/admin',function(req,res){
        var admin_username = req.body.admin_username;
        var admin_password = req.body.admin_password;
        
        login.adminLogin(admin_username,admin_password,function (found) {
            res.json(found);
       });
               
    });
    
    app.get('/users/rider',function(req,res){
        
        fetchData.fetchRiders(req,function (found) {            
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
