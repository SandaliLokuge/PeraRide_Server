var _ = require('lodash');
var smsHandling = require('../functions/smsHandling');
const MessagingResponse = require('twilio').twiml.MessagingResponse;


module.exports = (app,mqttClient)=>{

    app.post('/sms/lock',function(req,res){

        var messageBody="";
        var message=(req.body.Body).trim();
        var number = req.body.From;


        if(!message){
            messageBody = "Invalid Format";
            const twiml = new MessagingResponse();

            twiml.message(messageBody);

            res.writeHead(200, {'Content-Type': 'text/xml'});

            res.end(twiml.toString());

        }

        smsHandling.smsHandling(message, number).then((found) => {
            if(found.res){
                console.log(found);
                var topic = mqttClient.undockTopic + found.response.docId ;
                mqttClient.client.publish(topic,found.response.lockId);

                messageBody = "Submitted lock will be unlock soon";
                const twiml = new MessagingResponse();

                twiml.message(messageBody);

                res.writeHead(200, {'Content-Type': 'text/xml'});

                res.end(twiml.toString());

                console.log('successfull unlock');
            }else {

                const twiml = new MessagingResponse();

                twiml.message(found.response);

                res.writeHead(200, {'Content-Type': 'text/xml'});

                res.end(twiml.toString());

                console.log('successfull found station information');
            }


        }).catch((err) => {
            console.log(err);
            var errmsg = err.response.response;
            const twiml = new MessagingResponse();
            console.log(errmsg);
            twiml.message(errmsg);

            res.writeHead(200, {'Content-Type': 'text/xml'});

            res.end(twiml.toString());

            console.log('Error was occured: ' + errmsg);
        })

    });

}
