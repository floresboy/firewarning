const express = require('express');
const http = require('http');
const mqtt = require('mqtt');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// --- CONFIG ---
const PORT = 3000;
const MQTT_BROKER = 'mqtt://broker.hivemq.com';
const TOPIC = 'fawaz/location/updates'; 

const mqttClient = mqtt.connect(MQTT_BROKER, {
    clientId: 'mqtt_map_node_' + Math.random().toString(16).slice(2, 8)
});

mqttClient.on('connect', () => {
    console.log('✅ Connected to HiveMQ Broker');
    mqttClient.subscribe(TOPIC);
});

// Logic when MQTT message arrives from the broker
mqttClient.on('message', (topic, message) => {
    try {
        const data = JSON.parse(message.toString());
        if (data.id && data.status) {
            console.log(`📩 MQTT In: ${data.id} is ${data.status}`);
            io.emit('locationUpdate', data); // Send to all connected browsers
        }
    } catch (e) {
        console.error('❌ Invalid MQTT JSON received');
    }
});

// Logic when a user CLICKS on the web map sidebar
io.on('connection', (socket) => {
    console.log(`👤 User connected: ${socket.id}`);

    socket.on('clientUpdateStatus', (update) => {
        console.log(`🖱️ UI Click: ${update.id} set to ${update.status}`);
        
        // 1. Sync all other browsers
        io.emit('locationUpdate', update);

        // 2. Publish back to MQTT broker so external devices are updated
        mqttClient.publish(TOPIC, JSON.stringify(update));
    });
});

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

server.listen(PORT, () => {
    console.log(`🚀 Server: http://localhost:${PORT}`);
    console.log(`📡 Topic: ${TOPIC}`);
});