
// *** Browan Communications Inc. ***
//
// *** Industrial Tracker decoder for JavaScript ***
// support parser type: Industrial Tracker
//
// Author: Brian.Jiang
// Version v1.0.1
//

//sample test data
var test_payload = '080a368c49fc0d843d0269'; 
var test_deveui = '00161600000023CC';
var test_fport = '136';

//hex to binary function
function hex2bin(hex){
  return (parseInt(hex, 16).toString(2)).padStart(8, '0');
}

// little-endian format
function littleendian(inputpayload) {
  var data = inputpayload.match(/../g);
  var buf = new ArrayBuffer(4);
  // Create a data view of it
  var view = new DataView(buf);
  // set bytes
  data.forEach(function (b, i) {
  view.setUint8(i, parseInt(b, 16));
  });
  // get an int32 with little endian
  var num = view.getInt32(0, 1);

  return num;
}

// GPS Lat calculate
function gnss_LatCal(firstbit,intput_lat){
  // var count02 = (parseInt(Math.pow(2,comtimes)))-1;
  if(firstbit==0){
    var Lat_littleend_int = littleendian(intput_lat);
    const Lat_bit_01 = (Lat_littleend_int| (0xF0000000)) ^ (0xF0000000);
    const Lat_bit_02 = Lat_bit_01/1000000;
    return (Lat_bit_02.toString());
  }
  else{
    var Lat_littleend_int = littleendian(intput_lat);
    var Lat_bit_01 = Lat_littleend_int^0xFFFFFFFF;
    const Lat_bit_02 = (Lat_bit_01| (0xF0000000)) ^ (0xF0000000);
    const Lat_bit_03 = Lat_bit_02/1000000;
    return -(Lat_bit_03.toString());
  }
}

// GPS Lat calculate
function gnss_LongCal(firstbit,intput_long){
  if(firstbit==0){
    var Long_littleend_int = littleendian(intput_long);
    const Long_bit_01 = (Long_littleend_int| (0xE0000000)) ^ (0xE0000000);
    const Long_bit_02 = Long_bit_01/1000000;
    return (Long_bit_02.toString());
  }
  else{
    var Lat_littleend_int = littleendian(intput_long);
    var Long_bit_01 = Lat_littleend_int^0xFFFFFFFF;
    const Long_bit_02 = (Long_bit_01| (0xE0000000)) ^ (0xE0000000);
    const Long_bit_03 = Long_bit_02/1000000;
    return -(Long_bit_03.toString());
  }
}

// GNSS position estimate calculate
function gnss_PositCal(intput_posit){
  var Posit_int_01 = parseInt(intput_posit,16);
  const Posit_bit_01 = (Posit_int_01>>5);
  const Posit_bit_02 = Math.pow(2,(Posit_bit_01+2));
  return (Posit_bit_02.toString());
}

//decoder function
function decodepayload(input) {
    // create the object to collect the data for returning the decoded payload
    console.log('Fport: '+input.fport);
    if(input.fport==136){ // Industrial Tracker Sensor
      var a = input.payload;
      var b = a.toString('base64');
      var indust_hex = b.toString("hex").substring(0, 2); // Sensors status HEX
      var indust_binary = hex2bin(indust_hex);
      var moveing_st = indust_binary.substring(7, 8); // moving mode
      var nognss_st = indust_binary.substring(4, 5); // no GNSS fix status
      var gnsserror_st = indust_binary.substring(3, 4); // GNSS error
      var battry_hex = b.toString("hex").substring(2, 4);// battery calculate
      var battry_int = parseInt(battry_hex, 16);
      var battry_volt = (25+battry_int)/10;
      var temperature_hex = b.toString("hex").substring(4, 6);//temperature calculate
      var temperature_int = parseInt(temperature_hex, 16);
      var temperature_final = temperature_int -32;
      // * Latitude as last reported by GNSS receiver - calculate * //
      var gnssLat_hex = b.toString("hex").substring(6, 14);
      var gnssLatbit_hex = b.toString("hex").substring(12, 14);// Latitude Negative sign bit
      var gnssLatbit_neg = (hex2bin(gnssLatbit_hex)).toString().substring(4,5);
      var gnssLat_final = gnss_LatCal(gnssLatbit_neg,gnssLat_hex);
      // * Longitude as last reported by GNSS receiver - calculate * //
      var gnssLong_hex = b.toString("hex").substring(14, 22);//
      var gnssLongbit_hex = b.toString("hex").substring(20, 22);// Latitude Negative sign bit
      var gnssLongbit_neg = (hex2bin(gnssLongbit_hex)).toString().substring(3,4);
      var gnssLong_final = gnss_LongCal(gnssLongbit_neg,gnssLong_hex);
      // * position accuracy estimate - calculate * //
      var gnssPosit_hex = b.toString("hex").substring(20, 22);
      var gnssPosit_final = gnss_PositCal(gnssPosit_hex);
      
      console.log('Sensor Type: Industrial Tracker');
      console.log('DeviceEUI: '+input.deveui);
      console.log('moving mode: '+moveing_st); //1 - moving mode, 0 - stationary mode
      console.log('no GNSS fix: '+nognss_st); //1 - no GNSS fix, 0 - GNSS fixed
      console.log('GNSS error: '+gnsserror_st); //1 - GNSS error, 0 - GNSS OK
      console.log('Battery: '+battry_volt+' v');
      console.log('Temperature: '+temperature_final+' oC');
      console.log('GNSS Lat: ',gnssLat_final);
      console.log('GNSS Long: ',gnssLong_final);
      console.log('GNSS position estimate: '+gnssPosit_final+' m');
    }
}

var sensor_origin = {
  "fport" : test_fport,  // lorawan port
  "deveui": test_deveui, // device eui
  "payload": test_payload, // original payload
};

//Test function output
decodepayload(sensor_origin);

