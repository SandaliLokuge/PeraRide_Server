const jwt = require('jsonwebtoken');
const configdb = require('../config/db');
const mongoOp_admin = require('../models/admin');


var UserAuthenticate = (req, res, next) => {
  var token = req.body.token;

  try {
    decoded = jwt.verify(token, configdb.secret);
    req.body.rider_regNo = decoded.rider_regNo;
    next();
  } catch (e) {
    res.json({'response':"Token Expired", 'res':false});
  }

};

var AdminAuthenticate = (req, res, next) => {
    var token = req.body.token;        
    jwt.verify(token, configdb.secret,function(err, decoded){
        if(err){
            res.status(401).send();
        }else{
            
            var admin_username = decoded.admin_username;
            mongoOp_admin.find({'admin_username' : admin_username})
                .then((doc) => {
                    if(doc.length){
                        next();
                    }else{
                        res.status(401).send();
                    }
                }).catch((err) => {
                res.status(401).send();
            });
        }

    });

}



module.exports = {UserAuthenticate, AdminAuthenticate};
