var addStation = require('../functions/addStation');
var addLock = require('../functions/addLock');
var _ = require('lodash');
var {AdminAuthenticate} = require('./../middlewares/authenticate');
var adminRegister = require('../functions/adminRegister');
var register = require('../functions/register');
var adminLogin = require('../functions/adminLogin');
var fetchData = require('../functions/fetchData');



module.exports = (app,mqttClient)=>{

    app.post('/user/register',function(req,res){
        const body = _.pick(req.body, ['rider_regNo', 'rider_password','rider_email',
    'rider_firstName','rider_lastName','rider_phone']);

        register.register(body, (found) => {
            res.json(found);
        });
    });

    app.post('/register/admin',function(req,res){
        const body = _.pick(req.body, ['admin_username', 'admin_password']);

        adminRegister.adminRegister(body, (found) => {
            res.json(found);
        });
    });

    app.post('/login/admin',function(req,res){
        var body = _.pick(req.body,['admin_username','admin_password']);

        adminLogin.adminLogin(body, (found) => {
            if(found.res){
                res.json(found);
            }else{
                res.json(found);
            }
        });
    });

    app.post('/admin/addlock',AdminAuthenticate,function(req,res){

        var body = _.pick(req.body,['station_id','lock_id']);

        addLock.addLock(body).then((found) => {
            res.json(found);
        }).catch((found)=>{
            res.json(found);
        });
    });

    app.post('/admin/addstation',AdminAuthenticate,function(req,res){

        var body = _.pick(req.body,['station_id','lock_id']);

        addStation.addStation(body).then((found) => {
            res.json(found);
        }).catch((found)=>{
            res.json(found);
        });
    });

    
    app.get('/users',function(req,res){
        fetchData.fetchRiders(req,function (found) {             
            res.json(found); 
       }); 

    });

}