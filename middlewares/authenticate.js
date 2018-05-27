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

var UserGetInfoAuthenticate = (req, res, next) => {
  var token = req.query.token;
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



module.exports = {UserAuthenticate, AdminAuthenticate,UserGetInfoAuthenticate};
