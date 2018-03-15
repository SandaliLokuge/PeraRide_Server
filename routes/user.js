var register = require('../functions/register');
var login = require('../functions/login');

module.exports = (app)=>{

    app.post('/user/login/rider',function(req,res){
        var rider_regNo = req.body.rider_regNo;
        var rider_password = req.body.rider_password;
    
        login.riderLogin(rider_regNo,rider_password,function (found) {
             res.json(found);
        });
    });
    
    
    app.post('/user/register/rider',function(req,res){
        var rider_regNo = req.body.rider_regNo;
        var rider_password = req.body.rider_password;
    
        register.register(rider_regNo,rider_password,function (found) {
            res.json(found);
        });
    });

    app.post('/user/login/admin',function(req,res){
    
        login.adminLogin(req,function (found) {
            res.json(found);
       });
               
    });
    
}