// ++++++++++++ Version 3 ++++++++++++ //
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
    const base64EncodedMessage = Buffer.from(message).toString('base64');
    
    console.log(`Received data from TCP client: ${message}`);
    console.log(`Base64 Encoded Data: ${base64EncodedMessage}`);

    // Publish the base64 encoded data to an MQTT topic
    mqttClient.publish('tcp/data', base64EncodedMessage, (err) => {
      if (err) {
        console.error('Error publishing to MQTT:', err);
      } else {
        console.log('Published to MQTT topic: tcp/data');
      }
    });

    // Send back the response '\x01'
    socket.write(Buffer.from('\x01', 'ascii'));
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
// ++++++++++++ Version 3 ++++++++++++ //

// ++++++++++++ Version 2 ++++++++++++ //
// const net = require('net');
// const mqtt = require('mqtt');

// const TCP_PORT = 7554;
// const TCP_IP = '0.0.0.0'; // Replace with your desired IP address
// const MQTT_BROKER = 'mqtt://txio.uitm.edu.my'; // Replace with your MQTT broker's URL

// // Create an MQTT client
// const mqttClient = mqtt.connect(MQTT_BROKER);

// // Create a TCP server
// const tcpServer = net.createServer((socket) => {
//   console.log('TCP Server: Client connected');

//   socket.on('data', (data) => {
//     const message = data.toString('utf8');
//     console.log(`Received data from TCP client: ${message}`);

//     // Publish the received data to an MQTT topic
//     mqttClient.publish('tcp/data', message, (err) => {
//       if (err) {
//         console.error('Error publishing to MQTT:', err);
//       } else {
//         console.log('Published to MQTT topic: tcp/data');
//       }
//     });

//     // Send back the response '\x01'
//     socket.write(Buffer.from('\x01', 'ascii'));
//   });

//   socket.on('end', () => {
//     console.log('TCP Server: Client disconnected');
//   });
// });

// tcpServer.on('error', (err) => {
//   console.error('TCP Server Error:', err);
// });

// // Start the TCP server with the specified IP and port
// tcpServer.listen(TCP_PORT, TCP_IP, () => {
//   console.log(`TCP Server listening on ${TCP_IP}:${TCP_PORT}`);
// });
// ++++++++++++ Version 2 ++++++++++++ //

// ++++++++++++ Version 1 ++++++++++++ //
// const net = require('net');
// const mqtt = require('mqtt');

// const TCP_PORT = 7554;
// const TCP_IP = '0.0.0.0'; // Replace with your desired IP address
// const MQTT_BROKER = 'mqtt://txio.uitm.edu.my'; // Replace with your MQTT broker's URL

// // Create an MQTT client
// const mqttClient = mqtt.connect(MQTT_BROKER);

// // Create a TCP server
// const tcpServer = net.createServer((socket) => {
//   console.log('TCP Server: Client connected');

//   socket.on('data', (data) => {
//     const message = data.toString('utf8');
//     console.log(`Received data from TCP client: ${message}`);

//     // Publish the received data to an MQTT topic
//     mqttClient.publish('tcp/data', message, (err) => {
//       if (err) {
//         console.error('Error publishing to MQTT:', err);
//       } else {
//         console.log('Published to MQTT topic: tcp/data');
//       }
//     });
//   });

//   socket.on('end', () => {
//     console.log('TCP Server: Client disconnected');
//   });
// });

// tcpServer.on('error', (err) => {
//   console.error('TCP Server Error:', err);
// });

// // Start the TCP server with the specified IP and port
// tcpServer.listen(TCP_PORT, TCP_IP, () => {
//   console.log(`TCP Server listening on ${TCP_IP}:${TCP_PORT}`);
// });
// ++++++++++++ Version 1.0 ++++++++++++ //
