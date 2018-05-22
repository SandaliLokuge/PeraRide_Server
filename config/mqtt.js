const mqtt = require ('mqtt');

var client  = mqtt.connect('mqtt://159.89.238.212',{
    port: 8883,
    username: 'test_dock',
    password: 'perarideadmin',
    clientId: 'peraride_server',
    rejectUnauthorized: false
});


client.subscribe("peraride");

client.on('message', function(topic,payload) { // When connected
    console.log(topic.toString()+' '+payload.toString());
    
});

module.exports = {
    client: client,
    undockTopic: 'PeraRide/unlock/'
  };