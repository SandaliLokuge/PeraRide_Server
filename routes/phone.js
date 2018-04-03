var _ = require('lodash');
var smscheck = require('../functions/smscheck');
const MessagingResponse = require('twilio').twiml.MessagingResponse;


module.exports = (app)=>{

    app.post('/sms/lock',function(req,res){

        var messageBody="";
        var number = req.body.From;
        console.log(number);

        smscheck.smscheck(number,(response) => {
            if(response.res == true){
                // messageBody = "Submitted lock will be unlock soon";
                // const twiml = new MessagingResponse();

                // twiml.message(messageBody);

                // res.writeHead(200, {'Content-Type': 'text/xml'});
                // res.end(twiml.toString());
                console.log('successfull found');

            }else{
                // messageBody = response.response;
                // const twiml = new MessagingResponse();

                // twiml.message(messageBody);

                // res.writeHead(200, {'Content-Type': 'text/xml'});
                // res.end(twiml.toString());
                console.log('Not found');
            }
        })

    });

}
