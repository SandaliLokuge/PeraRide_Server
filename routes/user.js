var register = require('../functions/register');
var login = require('../functions/login');

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
    
}