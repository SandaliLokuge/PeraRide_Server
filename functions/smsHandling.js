var smsfetchstation = require('./smsFetchStation');
var smscheck = require('./smscheck');

var smsHandling = (messagebody, number) => {
    var result;
    return new Promise((resolve, reject) => {
        result = messagebody.split("-",2);
        console.log(result);
        if(result[0].toString().trim() == "PERA"){
            if(result[1].toString().trim() == "DI"){
                smsfetchstation.smsfetchstation()
                .then((response) => {
                    var msg = "";
                    for (var i = 0; i < response.length; i++) {
                        var str = (response[i].name).toString() + " station has " + (response[i].noOfEmpty).toString() + " empty locks and " +(response[i].noOfBikes).toString() + " bikes\n";
                        msg = msg.concat(str);
                    }
                    resolve({'response' : msg , 'res' : false});
                }).catch((err)=>{
                    reject({'response' : err , 'res' : false});
                })
            }else {
                smscheck.smscheck(result[1].toString(), number).then((response) => {
                    resolve({'response' : response, 'res' : true});
                }).catch((err) => {
                    reject({'response' : err , 'res' : false});;
                })

            }
        }else{
            reject({'response' : {'response' : "invalid format" , 'res' : false}});
        }
    })

}


module.exports.smsHandling = smsHandling;
