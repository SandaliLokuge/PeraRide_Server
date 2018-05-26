const mqtt = require ('mqtt');
const lockBike = require('../functions/lockBike');

var client  = mqtt.connect('mqtt://159.89.238.212',{
    port: 8883,
    username: 'server',
    password: 'perarideserver',
    clientId: 'peraride_server',
    rejectUnauthorized: false
});

client.on('connect', function() {
    client.subscribe('PeraRide/redock/lock2');
});

client.on('message', function(topic,payload) { // When connected

    var body = {
        lock_id: topic.toString().replace('PeraRide/redock/lock',''),
        bike_id: payload.toString()
    }

    lockBike.lockBike(body).then((res)=>{
        console.log(res);

    }).catch((err)=>{
        throw err;
    })
});

module.exports = {
    client: client,
    undockTopic: 'PeraRide/unlock/dock'
  };
