const net = require('net');
const mqtt = require('mqtt');

const TCP_PORT = 7554;
const TCP_IP = '0.0.0.0'; // Replace with your desired IP address
const MQTT_BROKER = 'mqtt://txio.uitm.edu.my'; // Replace with your MQTT broker's URL

// Create an MQTT client
const mqttClient = mqtt.connect(MQTT_BROKER);

// Create a TCP server
const tcpServer = net.createServer((socket) => {
  console.log('TCP Server: Client connected');

  socket.on('data', (data) => {
    const message = data.toString('utf8');
    console.log(`Received data from TCP client: ${message}`);

    // Publish the received data to an MQTT topic
    mqttClient.publish('tcp/data', message, (err) => {
      if (err) {
        console.error('Error publishing to MQTT:', err);
      } else {
        console.log('Published to MQTT topic: tcp/data');
      }
    });
  });

  socket.on('end', () => {
    console.log('TCP Server: Client disconnected');
  });
});

tcpServer.on('error', (err) => {
  console.error('TCP Server Error:', err);
});

// Start the TCP server with the specified IP and port
tcpServer.listen(TCP_PORT, TCP_IP, () => {
  console.log(`TCP Server listening on ${TCP_IP}:${TCP_PORT}`);
});

