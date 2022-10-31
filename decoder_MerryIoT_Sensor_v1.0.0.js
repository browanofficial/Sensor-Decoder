
// *** Browan Communications Inc. ***
//
// *** MerryIoT sensor decoder for JavaScript ***
// support parser type: MerryIoT Motion Detection(wsms-156), MerryIoT Air Quality CO2(wsms-157)
// MerryIoT Open/Close(wsms-158),MerryIoT Leak Detection(wsms-159)
//
// Author: Brian.Jiang
// Version v1.0.0
//

//sample test data
var test_payload = '000f3246a402'; 
var test_deveui = '00161600000023CC';
var test_fport = '127';

//hex to binary function
function hex2bin(hex){
  return (parseInt(hex, 16).toString(2)).padStart(8, '0');
}
//CO2 ppm calculate
const changeEndianness = (string) => {
  const result = [];
  let len = string.length - 2;
  while (len >= 0) {
    result.push(string.substr(len, 2));
    len -= 2;
  }
  return result.join('');
}
//decoder function
function decodepayload(input) {
    // create the object to collect the data for returning the decoded payload
    console.log('Fport: '+input.fport);
    if(input.fport==122){ // MerryIoT Motion Sensor
      var a = input.payload;
      var b = a.toString('base64');
      var motion_hex = b.toString("hex").substring(0, 2); // Sensor Status
      var motion_binary = hex2bin(motion_hex);
      var motion_st = motion_binary.substring(7, 8); // Motion status
      var button_st = motion_binary.substring(6, 7); // Button pressed
      var Tamper_st = motion_binary.substring(5, 6); // Tamper detected
      var battry_hex = b.toString("hex").substring(2, 4);// battery calculate
      var battry_int = parseInt(battry_hex, 16);
      battry_volt = (21+battry_int)/10;
      var temperature_hex = b.toString("hex").substring(4, 6);///temperature calculate
      var temperature_int = parseInt(temperature_hex, 16);
      var humi_hex = b.toString("hex").substring(6, 8);//Humidity calculate
      var humi_int = parseInt(humi_hex, 16);
      var time_hex = (b.toString('hex').substring(10, 12))+(b.toString('hex').substring(8, 10)); //Time elapsed since last event trigger
      var time_int = parseInt(time_hex, 16);
      var count_hex = (b.toString('hex').substring(16, 18))+(b.toString('hex').substring(14, 16))+(b.toString('hex').substring(12, 14)); //Total count of event triggers
      var count_int = parseInt(count_hex, 16);

      console.log('Sensor Type: Motion Sensor');
      console.log('DeviceEUI: '+input.deveui);
      console.log('Motion occupied: '+motion_st); //1 – occupied, 0 – free
      console.log('Button pressed: '+button_st); //1 – Button pressed, 0 - Button released
      console.log('Tamper detected: '+Tamper_st); //1 – Tamper detected, 0 - No tamper detected
      console.log('Battery: '+battry_volt+' v');
      console.log('Temperature: '+temperature_int+' oC');
      console.log('Humidity: '+humi_int+' %RH');
      console.log('Time: '+time_int);
      console.log('Count: '+count_int);
    }
    else if(input.fport==127){// MerryIoT CO2 Sensor
      var a = input.payload;
      var b = a.toString('base64');
      var status_hex = b.toString("hex").substring(0, 2); // Sensor Status
      var status_binary = hex2bin(status_hex);
      var trigger_st = status_binary.substring(7, 8); // Trigger Event
      var button_st = status_binary.substring(6, 7); // Button pressed
      var co2threshold_st = status_binary.substring(3, 4); // CO2 is over the threshold 
      var co2calibration_st = status_binary.substring(2, 3); // CO2 Calibration flag
      var battry_hex = b.toString("hex").substring(2, 4);// battery calculate
      var battry_int = parseInt(battry_hex, 16);
      battry_volt = (21+battry_int)/10;
      var temperature_hex = b.toString("hex").substring(4, 6);///temperature calculate
      var temperature_int = parseInt(temperature_hex, 16);
      var humi_hex = b.toString("hex").substring(6, 8);//Humidity calculate
      var humi_int = parseInt(humi_hex, 16);
      var co2_hex = b.toString("hex").substring(8, 12); // CO2 calculate
      var co2_total = changeEndianness(co2_hex);
      co2_int = parseInt(co2_total, 16);

      console.log('Sensor Type: CO2 Sensor');
      console.log('DeviceEUI: '+input.deveui);
      console.log('Trigger Event: '+trigger_st); //1 – Trigger Event, 0 – Keepalive
      console.log('Button pressed: '+button_st); //1 – Button pressed, 0 - Button released
      console.log('CO2 over threshold: '+co2threshold_st); //1 - CO2 is over the threshold (CO2 > 1000 ppm)
      console.log('CO2 Calibration flag: '+co2calibration_st); //1 - CO2 Calibration flag
      console.log('Battery: '+battry_volt+' v');
      console.log('Temperature: '+temperature_int+' oC');
      console.log('Humidity: '+humi_int+' %RH');
      console.log('CO2: '+co2_int+' ppm');
    }
    else if(input.fport==120){// MerryIoT door/window Sensor
      var a = input.payload;
      var b = a.toString('base64');
      var door_hex = b.toString("hex").substring(0, 2); // Sensor Status
      var door_binary = hex2bin(door_hex);
      var open_st = door_binary.substring(7, 8); // Door status
      var button_st = door_binary.substring(6, 7); // Button pressed
      var tamper_st = door_binary.substring(5, 6); // Tamper detected
      var tilt_st = door_binary.substring(4, 5); // Tilt detected
      var battry_hex = b.toString("hex").substring(2, 4);// battery calculate
      var battry_int = parseInt(battry_hex, 16);
      battry_volt = (21+battry_int)/10;
      var temperature_hex = b.toString("hex").substring(4, 6);///temperature calculate
      var temperature_int = parseInt(temperature_hex, 16);
      var humi_hex = b.toString("hex").substring(6, 8);//Humidity calculate
      var humi_int = parseInt(humi_hex, 16);
      var time_hex = (b.toString('hex').substring(10, 12))+(b.toString('hex').substring(8, 10)); //Time elapsed since last event trigger
      var time_int = parseInt(time_hex, 16);
      var count_hex = (b.toString('hex').substring(16, 18))+(b.toString('hex').substring(14, 16))+(b.toString('hex').substring(12, 14)); //Total count of event triggers
      var count_int = parseInt(count_hex, 16);

      console.log('Sensor Type: Door/window Sensor');
      console.log('DeviceEUI: '+input.deveui);
      console.log('Door open: '+open_st); //1 - open, 0 - closed
      console.log('Button pressed: '+button_st); //1 - Button pressed, 0 - Button released
      console.log('Tamper detected: '+tamper_st); //1 – Tamper detected, 0 - No tamper detected
      console.log('Tilt detected: '+tilt_st); //1 - Tilt detected, 0 - No Tilt detected
      console.log('Battery: '+battry_volt+' v');
      console.log('Temperature: '+temperature_int+' oC');
      console.log('Humidity: '+humi_int+' %RH');
      console.log('Time: '+time_int);
      console.log('Count: '+count_int);
    }
    else if(input.fport==126){// MerryIoT WaterLeak Sensor
      var a = input.payload;
      var b = a.toString('base64');
      var water_hex = b.toString("hex").substring(0, 2); // Sensor Status
      var water_binary = hex2bin(water_hex);
      var waterDT_st = water_binary.substring(7, 8); // water status
      var button_st = water_binary.substring(6, 7); // Button pressed
      var tamper_st = water_binary.substring(5, 6); // Tamper detected
      var battry_hex = b.toString("hex").substring(2, 4);// battery calculate
      var battry_int = parseInt(battry_hex, 16);
      battry_volt = (21+battry_int)/10;
      var temperature_hex = b.toString("hex").substring(4, 6);///temperature calculate
      var temperature_int = parseInt(temperature_hex, 16);
      var humi_hex = b.toString("hex").substring(6, 8);//Humidity calculate
      var humi_int = parseInt(humi_hex, 16);

      console.log('Sensor Type: WaterLeak Sensor');
      console.log('DeviceEUI: '+input.deveui);
      console.log('Water detected: '+waterDT_st); //1 – Water leakage detected, 0 – Dry
      console.log('Button pressed: '+button_st); // 1 – Button pressed, 0 - Button released
      console.log('Tamper detected: '+tamper_st); //1 – Tamper detected, 0 - No tamper detected
      console.log('Battery: '+battry_volt+' v');
      console.log('Temperature: '+temperature_int+' oC');
      console.log('Humidity: '+humi_int+' %RH');
    }

}

var sensor_origin = {
  "fport" : test_fport,  // lorawan port
  "deveui": test_deveui, // device eui
  "payload": test_payload, // original payload
};

//Test function output
decodepayload(sensor_origin);

