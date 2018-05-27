
var login = require('../functions/login');
var editprof = require('../functions/editprof');
var unlockQR = require('../functions/unlockQR');
var changePassword = require('../functions/changePassword');
var fetchstations = require('../functions/fetchStations');
var getUserInfo = require('../functions/getUserInfo');
var logout = require('../functions/userLogOut');
var getstationdata = require('../functions/getStationData');
var _ = require('lodash');
var {UserAuthenticate} = require('./../middlewares/authenticate');
var {UserGetInfoAuthenticate} = require('./../middlewares/authenticate');


module.exports = (app,mqttClient)=>{

    app.post('/user/login',function(req,res){
        var body = _.pick(req.body,['rider_regNo','rider_password']);

        login.login(body, (found) => {
            if(found.res){
                res.json(found);
            }else{
                res.json(found);
            }
        });
    });


    app.post('/user/editprof', UserAuthenticate,function(req, res){
        if (!req.body.rider_email || !req.body.rider_firstName || !req.body.rider_lastName || !req.body.rider_phone) { // simplified: '' is a falsey
            res.json({'response':"One or more fields are empty", 'res':false});
        }else{
            var body = _.pick(req.body,['rider_regNo','rider_email','rider_lastName','rider_firstName','rider_phone']);
            editprof.editprof(body, (found) => {
                res.json(found);
            });
        }

    });

    app.post('/user/unlock',UserAuthenticate,function(req,res){

        var body = _.pick(req.body,['rider_regNo','lock_id']);

        unlockQR.unlockQR(body).then((found) => {
            if(found.res){
                var topic = mqttClient.undockTopic + found.docId ;                
                mqttClient.client.publish(topic,found.lockId)      
            }
            res.json(found);
        }).catch((found)=>{
            res.json(found);
        });
    });

    app.post('/user/changePass',UserAuthenticate,function(req,res){

        var body = _.pick(req.body,['currentPass','newPass','rider_regNo']);

        changePassword.changePassword(body).then((found) => {
            res.json(found);
        }).catch((found)=>{
            res.json(found);
        });
    });

    app.post('/user/fetchstations',UserAuthenticate,function(req,res){

        fetchstations.fetchstations().then((found) => {
            res.json(found);
        }).catch((found)=>{
            res.json(found);
        });
    });

    app.get('/user/getinfo',UserGetInfoAuthenticate,function(req,res){

        getUserInfo.userInfo(req.body.rider_regNo).then((found) => {
            res.json(found);
        }).catch((found)=>{
            res.json(found);
        });
    });

    app.post('/user/logout',UserAuthenticate,function(req,res){

        logout.logout(req.body.rider_regNo).then((found) => {
            res.json(found);
        }).catch((found)=>{
            res.json(found);
        });
    });

    app.post('/user/stationdata',UserAuthenticate,function(req,res){
        var name = (req.body.name).trim();
        
        getstationdata.stationdata(name).then((found) => {
            res.json(found);
        }).catch((found)=>{
            res.json(found);
        });
    });


}
