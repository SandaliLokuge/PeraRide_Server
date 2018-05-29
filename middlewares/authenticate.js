const jwt = require('jsonwebtoken');
const configdb = require('../config/db');
const mongoOp_admin = require('../models/admin');
const mongoOp_rider = require('../models/Rider');


var UserAuthenticate = (req, res, next) => {
  var token = req.body.token;

  try {
    decoded = jwt.verify(token, configdb.secret);
    req.body.rider_regNo = decoded.rider_regNo;
    mongoOp_rider.findOne({'rider_regNo' : decoded.rider_regNo, 'logged' : true})
    .then((user)=>{
        if(user){
            next();
        }else {
            res.json({'response':"User not logged in", 'res':false});
        }
    })

  } catch (e) {
     var body = jwt.decode(token);
     if(!body){
         res.json({'response':"problem with token", 'res':false});
     }else{
         mongoOp_rider.findOne({'rider_regNo' : body.rider_regNo})
         .then((user) => {
             user.logged = false;
             return user.save()
         }).then(() => {
             res.json({'response':"Token Expired", 'res':false});
         }).catch(()=>{res.json({'response':"problem with token", 'res':false});})
     }

  }

};

var AdminAuthenticate = (req, res, next) => {
    var token = req.body.token;
    jwt.verify(token, configdb.secret,function(err, decoded){
        if(err){
            res.json({'response':"Token Expired", 'res':false});
        }else{
            var admin_username = decoded.admin_username;
            mongoOp_admin.find({'admin_username' : admin_username})
                .then((doc) => {
                    if(doc.length){
                        next();
                    }else{
                        res.json({'response':"Token Expired", 'res':false});
                    }
                }).catch((err) => {
                res.json({'response':"Token Expired", 'res':false});
            });
        }

    });

}



module.exports = {UserAuthenticate, AdminAuthenticate};
