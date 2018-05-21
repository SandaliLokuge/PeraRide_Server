var _ = require('lodash');
var smscheck = require('../functions/smscheck');
const MessagingResponse = require('twilio').twiml.MessagingResponse;


module.exports = (app)=>{

    app.post('/sms/lock',function(req,res){

        var messageBody="";
        //var message=(req.body.Body).trim();
        var number = req.body.From;
        console.log(number);

        if(!messageBody){
            // messageBody = "lock id is not given";
            // const twiml = new MessagingResponse();

            // twiml.message(messageBody);

            // res.writeHead(200, {'Content-Type': 'text/xml'});
            res.writeHead(404, {'Content-Type': 'text/xml'});
            // res.end(twiml.toString());
            res.end();
        }

        // smscheck.smscheck(number,(response) => {
        //     if(response.res == true){
        //         // messageBody = "Submitted lock will be unlock soon";
        //         // const twiml = new MessagingResponse();
        //
        //         // twiml.message(messageBody);
        //
        //         // res.writeHead(200, {'Content-Type': 'text/xml'});
        //         res.writeHead(404, {'Content-Type': 'text/xml'});
        //         // res.end(twiml.toString());
        //         res.end();
        //         console.log('successfull found');
        //
        //     }else{
        //         // messageBody = response.response;
        //         // const twiml = new MessagingResponse();
        //
        //         // twiml.message(messageBody);
        //
        //         // res.writeHead(200, {'Content-Type': 'text/xml'});
        //         res.writeHead(404, {'Content-Type': 'text/xml'});
        //         // res.end(twiml.toString());
        //         res.end();
        //         console.log('Not found');
        //     }
        // })

        smscheck.smscheck(message, number).then((response) => {
            // messageBody = "Submitted lock will be unlock soon";
            // const twiml = new MessagingResponse();

            // twiml.message(messageBody);

            // res.writeHead(200, {'Content-Type': 'text/xml'});
            res.writeHead(404, {'Content-Type': 'text/xml'});
            // res.end(twiml.toString());
            res.end();
            //console.log('successfull found');
        }).catch((err) => {
            // var errmsg = err.response;
            // const twiml = new MessagingResponse();

            // twiml.message(errmsg);

            // res.writeHead(200, {'Content-Type': 'text/xml'});
            res.writeHead(404, {'Content-Type': 'text/xml'});
            // res.end(twiml.toString());
            res.end();
            //console.log('Not found');
        })

    });

}
