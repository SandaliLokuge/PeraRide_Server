const mqtt = require ('mqtt');
const lockBike = require('../functions/lockBike');
const isnewbike = require('../functions/isNewBike');

var client  = mqtt.connect('m13.cloudmqtt.com',{
    port: 14590,
    username: 'qvpfzszg',
    password: 'lPsmL_FZUtsh',
    clientId: 'peraride_server',
    rejectUnauthorized: false
});

client.on('connect', function() {
    client.subscribe('PeraRide/redock/lock2');
    console.log('mqtt connected');
    
});

client.on('message', function(topic,payload) { // When connected
    console.log('a message has come');
    var body = {
        lock_id: topic.toString().replace('PeraRide/redock/lock',''),
        bike_id: payload.toString()
    }
    isnewbike.isNewBike(body)
    .then(() => {
        return lockBike.lockBike(body);
    }).then((res)=>{
        console.log(res);

    }).catch((err)=>{
        throw err;
    })
});

module.exports = {
    client: client,
    undockTopic: 'PeraRide/unlock/dock'
  };
