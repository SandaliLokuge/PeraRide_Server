var register = require('../functions/register');
var login = require('../functions/login');
var editprof = require('../functions/editprof');
var _ = require('lodash');
var {authenticate} = require('./../middlewares/authenticate');

module.exports = (app)=>{

    app.post('/user/login',function(req,res){
        var body = _.pick(req.body,['rider_regNo','rider_password']);

        login.login(body, (found) => {
            if(found.res){
                var token = found.token
                found = _.pick(found,['response','res'])
                res.header('x-auth',token).json(found);
            }else{
                res.json(found);
            }
        });
    });


    app.post('/user/register',function(req,res){
        var body = _.pick(req.body,['rider_regNo','rider_password']);

        register.register(body, (found) => {
            res.json(found);
        });
    });

}
