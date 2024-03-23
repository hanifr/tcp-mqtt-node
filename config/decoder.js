const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://zr.txio.live:1880");
// const client = mqtt.connect("mqtt://txio.uitm.edu.my:1883");

client.on("connect", () => {
 
  client.subscribe("tcp/data", (err) => {
    // Handle subscription error if needed
  });
});

client.on("message", (topic, message) => {
  console.log('topic:', topic);
  console.log('message:', message.toString());
  
  // Decode message
  const decoded = decodeMessage(message);
  
  // Extract rxInfo for RSSI and SNR
  // Parse the message as JSON
  const parsedMessage = JSON.parse(message.toString());

  const payload = {
    "SID": "test",
    "data": decoded
  };
  console.log('Decoded:', payload);
// console.log('Decoded:', parsedMessage);
});


// FlowMeter FM01
function decodeMessage(message) {
  try {
    const messageObj = JSON.parse(message.toString());
    const base64Data = messageObj.data;
    const bytes = Buffer.from(base64Data, 'base64');
    const decoded = {
    timestamp: bytes.readUInt32LE(11).toString(16),
    longitude: (bytes.readUInt8(20)) << 24 | (bytes.readUInt8(21)) << 16 | (bytes.readUInt8(22)) << 8 | (bytes.readUInt8(23)),
    // latitude = bytes.readUInt32LE(24).toString(16);
    // dataMode = getDatamode(bytes[53]),
    // gsmsignal = getGsmSignal(bytes[56]),
    // battPercentage = getBatteryPercent(bytes[59]),
    // speed = getSpeed(bytes[67]),
    battVolt: ((bytes.readUInt8(71)) << 8 | (bytes.readUInt8(72))) / 1000,
    // battCurrent = getBattCurrent(bytes[75]),
    userId: ((bytes.readUInt8(89)) << 24 | (bytes.readUInt8(90)) << 16 | (bytes.readUInt8(91)) << 8 | (bytes.readUInt8(92)))

    };
    return decoded;
  } catch (error) {
    console.error("Error decoding message:", error);
    return null;
  }
}


/* ******************************************
 * bytes to number
 ********************************************/
function readUInt8LE(bytes) {
  var value = (bytes[0] << 8) + bytes[1];
  return value & 0xffff;
}

function readUInt32LE(bytes) {
  var value = bytes.readUInt32LE(0);
  return value >>> 0;
}

function getMeterType(meterType) {
    switch (meterType) {
        case 0x00:
            return "Water";
        case 0x01:
            return "Gas";
        case 0x02:
            return "Heat";
        case 0x03:
            return "Electric";
        default:
            return "Unknown";
    }
}

function getMeteringMode(meteringMode) {
    switch (meteringMode) {
        case 0x00:
            return "Dual Read";
        case 0x01:
            return "Single Read";
        case 0x02:
            return "Dual Hall";
        default:
            return "Unknown";
    }
}

function getPulseFactor(pulseConstant){
    switch (pulseConstant){
        case 0x00:
            return "Reverse";
        case 0x01:
            return "1 Liter";
        case 0x02:
            return "10 Liters";
        case 0x03:
            return "100 Liters";
        case 0x04:
            return "1000 Liters";
    }
}

function getTriggerSource(triggerSource) {
    switch (triggerSource) {
        case 0x00:
            return "Magnetic";
        case 0x01:
            return "Routine";
        case 0x04:
            return "Roport Success";
        case 0x0B:
            return "Write New Settings Success";
        case 0x0D:
            return "Write New Interval Success";
        case 0x0E:
            return "Interval";
        case 0x11:
            return "Q3 Valve Report";
        default:
            return "Unknown";
    }
}

function extractSID(message) {
  try {
    const parsedMessage = JSON.parse(message.toString());
    const deviceID = parsedMessage.deviceInfo ? parsedMessage.deviceInfo.devEui : null;
    return getDeviceID(deviceID);
  } catch (error) {
    console.error("Error extracting SID:", error);
    return null;
  }
}

function getDeviceID(deviceID) {
  switch (deviceID) {
    case '8254812303000340':
      return 'FM-01';
    case '8254812303000337':
      return 'FM-02';
    default:
      return null; // Return null for unknown device IDs
  }
}

module.exports = client;
