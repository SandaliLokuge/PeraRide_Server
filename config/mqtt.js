const mqtt = require ('mqtt');

var client  = mqtt.connect('mqtts://159.89.238.212',{
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

client.publish('peraride','suck')