// *** Browan Communications Inc. ***
//
// *** MerryIoT sensor JavaScript Decoder for TTN server ***
// support parser type: MerryIoT Motion Detection(wsms-156), MerryIoT Air Quality CO2(wsms-157)
// MerryIoT Open/Close(wsms-158),MerryIoT Leak Detection(wsms-159)
//
// Author: Brian.Jiang
// Version v1.0.0
//


//////*MerryIot Motion sensor*//////

//hex to binary function
function hex2bin(hex){
  return (parseInt(hex, 16).toString(2)).padStart(8, '0');
}
//MerryIot Motion sensor
function decodeUplink(input) {
  var intput_list = input.bytes;
  var battery_int=intput_list[1];// battery calculate
  battery_volt = (21+battery_int)/10;
  temperature= intput_list[2]; //temperature calculate
  humi =  intput_list[3]; //Humidity calculate
  var motion_hex = intput_list[0].toString(16); // Sensor Status calculate
  var motion_binary = hex2bin(motion_hex);
  var motion_st = motion_binary.substring(7, 8);
  var button_st = motion_binary.substring(6, 7);
  var Tamper_st = motion_binary.substring(5, 6); 
  motion = parseInt(motion_st); // Motion status
  button = parseInt(button_st); // Button pressed
  tamper = parseInt(Tamper_st); // Tamper detected
  
  var time_hex = (intput_list[5].toString(16))+(intput_list[4].toString(16));
  time = parseInt(time_hex, 16);   //Time elapsed since last event trigger
  var count_hex = (intput_list[8].toString(16))+(intput_list[7].toString(16))+(intput_list[6].toString(16));
  count = parseInt(count_hex, 16);  //Total count of event triggers
      
  return {
    data: {
      battery_volt,
      temperature,
      humi,
      motion,
      button,
      tamper,
      time,
      count
    },
  };
}

//////* MerryIot Motion sensor End !!*//////


//////*MerryIot CO2 sensor*//////

//hex to binary function
function hex2bin(hex){
  return (parseInt(hex, 16).toString(2)).padStart(8, '0');
}

//MerryIot CO2 sensor
function decodeUplink(input) {
	var intput_list = input.bytes;
	
	var battery_int=intput_list[1];// battery calculate
	battery_volt = (21+battery_int)/10;
	temperature= intput_list[2]; //temperature calculate
	humi =  intput_list[3]; //Humidity calculate
	var co2_hex = intput_list[0].toString(16); // Sensor Status calculate
	var co2_binary = hex2bin(co2_hex);
	var trigger_st = co2_binary.substring(7, 8); 
	var button_st = co2_binary.substring(6, 7); 
	var co2threshold_st = co2_binary.substring(3, 4); 
	var co2calibration_st = co2_binary.substring(2, 3);
	trigger = parseInt(trigger_st); //Trigger Event
	button = parseInt(button_st); //Button pressed
	co2threshold = parseInt(co2threshold_st);  // CO2 is over the threshold 
	co2calibration = parseInt(co2calibration_st);// CO2 Calibration flag
	var co2ppm_hex =(intput_list[5].toString(16))+(intput_list[4].toString(16));
	co2_ppm = parseInt(co2ppm_hex, 16);  //CO2 ppm calculate
	if (co2_ppm < 0) {
		co2_ppm = 0;
	} else if (co2_ppm > 40000) {
		co2_ppm = 40000;
	} else {
		co2_ppm = co2_ppm;
	}

  return {
    data: {
      battery_volt,
      temperature,
      humi,
      trigger,
      button,
      co2threshold,
      co2calibration,
      co2_ppm
    },
  };
}
//////* MerryIot CO2 sensor End !!*//////

//////*MerryIot Open/Close sensor*//////

//hex to binary function
function hex2bin(hex){
  return (parseInt(hex, 16).toString(2)).padStart(8, '0');
}

//MerryIot Open/Close sensor
function decodeUplink(input) {
  var intput_list = input.bytes;
  var battery_int=intput_list[1];// battery calculate
  battery_volt = (21+battery_int)/10;
  temperature= intput_list[2]; //temperature calculate
  humi =  intput_list[3]; //Humidity calculate

	var door_hex = intput_list[0].toString(16); // Sensor Status calculate
	var door_binary = hex2bin(door_hex); 
	var open_st = door_binary.substring(7, 8); 
	var button_st = door_binary.substring(6, 7); 
	var tamper_st = door_binary.substring(5, 6); 
	var tilt_st = door_binary.substring(4, 5); 
	
	open = parseInt(open_st); // Door status
	button = parseInt(button_st); // Button pressed
	tamper = parseInt(tamper_st); // Tamper detected
	tilt = parseInt(tilt_st); // Tilt detected
  
  var time_hex = (intput_list[5].toString(16))+(intput_list[4].toString(16)); 
  time = parseInt(time_hex, 16); //Time elapsed since last event trigger
  var count_hex = (intput_list[8].toString(16))+(intput_list[7].toString(16))+(intput_list[6].toString(16)); 
  count = parseInt(count_hex, 16); //Total count of event triggers
      
  return {
    data: {
      battery_volt,
      temperature,
      humi,
      open,
      button,
      tamper,
	  tilt,
      time,
      count
    },
  };
}


//////* MerryIot Open/Close sensor End !!*//////


//////*MerryIot Leak Detection sensor*//////

//hex to binary function
function hex2bin(hex){
  return (parseInt(hex, 16).toString(2)).padStart(8, '0');
}

//MerryIot Open/Close sensor
function decodeUplink(input) {
  var intput_list = input.bytes;
  var battery_int=intput_list[1];// battery calculate
  battery_volt = (21+battery_int)/10;
  temperature= intput_list[2]; //temperature calculate
  humi =  intput_list[3]; //Humidity calculate

	var water_hex = intput_list[0].toString(16); // Sensor Status calculate
	var water_binary = hex2bin(water_hex); 
	var water_st = water_binary.substring(7, 8); 
	var button_st = water_binary.substring(6, 7); 
	var tamper_st = water_binary.substring(5, 6); 
	
	water = parseInt(water_st); // water status
	button = parseInt(button_st); // Button pressed
	tamper = parseInt(tamper_st); // Tamper detected
      
  return {
    data: {
    battery_volt,
    temperature,
    humi,
    water,
    button,
    tamper
    },
  };
}
//////* MerryIot Leak Detection sensor End !!*//////
