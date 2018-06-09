var _ = require('lodash');
var smscheck = require('../functions/smscheck');
var smsfetchstation = require('../functions/smsFetchStation');
const MessagingResponse = require('twilio').twiml.MessagingResponse;


module.exports = (app)=>{

    app.post('/sms/lock',function(req,res){

        var messageBody="";
        var message=(req.body.Body).trim();
        var number = req.body.From;
        console.log(number);

        // if(!messageBody){
        //     // messageBody = "lock id is not given";
        //     // const twiml = new MessagingResponse();
        //
        //     // twiml.message(messageBody);
        //
        //     // res.writeHead(200, {'Content-Type': 'text/xml'});
        //     res.writeHead(404, {'Content-Type': 'text/xml'});
        //     // res.end(twiml.toString());
        //     res.end();
        // }

        // smscheck.smscheck(message, number).then((response) => {
        //     // messageBody = "Submitted lock will be unlock soon";
        //     // const twiml = new MessagingResponse();
        //
        //     // twiml.message(messageBody);
        //
        //     // res.writeHead(200, {'Content-Type': 'text/xml'});
        //     res.writeHead(404, {'Content-Type': 'text/xml'});
        //     // res.end(twiml.toString());
        //     res.end();
        //     //console.log('successfull found');
        // }).catch((err) => {
        //     // var errmsg = err.response;
        //     // const twiml = new MessagingResponse();
        //
        //     // twiml.message(errmsg);
        //
        //     // res.writeHead(200, {'Content-Type': 'text/xml'});
        //     res.writeHead(404, {'Content-Type': 'text/xml'});
        //     // res.end(twiml.toString());
        //     res.end();
        //     //console.log('Not found');
        // })



        smsfetchstation.smsfetchstation()
        .then((response) => {
            var msg = "";
            if(response.length == 0){
                msg = "no station found";
            }else {
                for (var i = 0; i < response.length; i++) {
                    var str = i.toString() + ". " + (response[i].name).toString() + " --->  empty locks : " + (response[i].noOfEmpty).toString()+",  bikes : "  +(response[i].noOfBikes).toString() + "\n";
                    msg = msg.concat(str);
                }
            }
                const twiml = new MessagingResponse();

                twiml.message(msg);

                res.writeHead(200, {'Content-Type': 'text/xml'});
                // res.writeHead(404, {'Content-Type': 'text/xml'});
                res.end(twiml.toString());
                // res.end();
                //console.log('successfull found');
        }).catch((err) => {
            var errmsg = "error";
            const twiml = new MessagingResponse();

            twiml.message(errmsg);

            res.writeHead(200, {'Content-Type': 'text/xml'});
            // res.writeHead(404, {'Content-Type': 'text/xml'});
            res.end(twiml.toString());
            // res.end();
            //console.log('Not found');
        })

    });

}
