
# Tabs Sensor Decoder for TTN

This is the documentation for "tabs_sensor_forTTN" file, which is the decoder file for tabs_sensor in The Things Stack for LoRaWAN.
Below you'll find explanations of various SensorTypes and the Release history contained within the document.

Problem report: <https://www.browan.com/contact>

## Index

- [SensorType](#sensortype)
  - [Door Window](#door-window)
  - [Motion Sensor](#motion-sensor)
  - [Temperature Humidity Sensor](#temperature-humidity-sensor)
  - [Healthy Home Sensor](#healthy-home-sensor)
  - [Ambient Light Sensor](#ambient-light-sensor)
  - [Sound Level Sensor](#sound-level-sensor)
  - [Water Leak Sensor](#water-leak-sensor)
  - [Object Locator Sensor](#object-locator-sensor)
  - [Industrial Tracker Sensor](#industrial-tracker-sensor)
  - [Temperature Probe Sensor](#temperature-probe-sensor)
- [Release History](#release-history)
- [Installation and Usage](#installation-and-usage)
- [Contribution](#contribution)
- [License](#license)

## SensorType

### Door Window

#### 1. Device Messages

- Fport: 100

| Name           | Content                                                                       |
|----------------|-------------------------------------------------------------------------------|
| `fPort`        | fPort number.                                                                 |
| `battery_volt` | Battery level. ex: 3.6 => 3.6V                                                |
| `temperature`  | Environment Temperature in degrees Celsius. ex: 25 => 25°C                    |
| `door_doorst`  | Door sensor status, 1 => open, 0 => closed                                    |
| `door_time`    | Time elapsed since the last event-triggered, value in minutes. ex: 2 => 2 min |
| `door_count`   | Total count of event-triggered, value in times. ex: 10 => 10 times            |

#### 2. Configuration Response Content

- Fport: 204

| Name             | Content                                                  |
|------------------|----------------------------------------------------------|
| `fPort`          | fPort number.                                            |
| `payloadlens`    | payload length.                                          |
| `door_keepalive` | Keep alive interval with configure. ex: 3600 => 3600 sec |

#### 3. Frame Count 0 Content

- Fport: 222
- payloadlens: 17

| Name         | Content             |
|--------------|---------------------|
| `fPort`      | fPort number.       |
| `bootloader` | Bootloader version. |
| `HW_ID`      | HW ID version.      |
| `FW_CRC`     | FW version.         |

### Motion Sensor

#### 1. Device Messages

- Fport: 102

| Name           | Content                                                                       |
|----------------|-------------------------------------------------------------------------------|
| `fPort`        | fPort number.                                                                 |
| `battery_volt` | Battery level. ex:3.6 => 3.6V                                                 |
| `temperature`  | Environment Temperature in degrees Celsius. ex:25=> 25°C                      |
| `mot_motionst` | Motion sensor status. 1 => occupied, 0 => free                                |
| `mot_times`    | Time elapsed since the last event-triggered, value in minutes. ex: 2 => 2 min |
| `mot_counts`   | Total count of event-triggered, value in times. ex: 10 => 10 times            |

#### 2. Configuration Response Content

- Fport: 204

| Name            | Content                                                                        |
|-----------------|--------------------------------------------------------------------------------|
| `fPort`         | fPort number.                                                                  |
| `payloadlens`   | payload length.                                                                |
| `mot_keepalive` | Periodic reporting interval with configure. ex: 3600 => 3600 sec               |
| `mot_occupied`  | Occupied status periodic reporting interval with configure. ex: 600 => 600 sec |
| `mot_free`      | The lead time for switching to the idle status with configure. ex: 5 => 5 min  |
| `mot_parmter`   | Motion sensor parameters with configure.                                       |
| `mot_trigct`    | Count of forced trigger occupied status. ex: 3 => upload if occupied 3 times   |

#### 3. Frame Count 0 Content

- Fport: 222
- payloadlens: 17

| Name         | Content             |
|--------------|---------------------|
| `fPort`      | fPort number.       |
| `bootloader` | Bootloader version. |
| `HW_ID`      | HW ID version.      |
| `FW_CRC`     | FW version.         |

### Temperature Humidity Sensor

#### 1. Device Messages

- Fport: 103

| Name           | Content                                                       |
|----------------|---------------------------------------------------------------|
| `fPort`        | fPort number.                                                 |
| `battery_volt` | Battery level. ex: 3.6 => 3.6V                                |
| `temperature`  | Environment Temperature in degrees Celsius. ex: 25 => 25°C    |
| `humidity`     | Environment Relative humidity. ex: 50 => 50%                  |
| `thh_type`     | 1 – Temperature and humidity sensor type, 0 – IAQ Sensor type |
| `CO2`          | THH sensor, no hardware always = FF. Here is "0".             |
| `VOC`          | THH sensor, no hardware always = FF. Here is "0".             |

#### 2. Configuration Response Content

- Fport: 204

| Name            | Content                                                                                  |
|-----------------|------------------------------------------------------------------------------------------|
| `fPort`         | fPort number.                                                                            |
| `payloadlens`   | payload length.                                                                          |
| `thh_keepalive` | Keep alive interval with configure. ex: 3600 => 3600 sec                                 |
| `thh_Monitor`   | Detection interval with configure. ex: 600 => 600 sec                                    |
| `thh_temptrig`  | Temperature trigger value with configure. temperature difference threshold. ex: 2 => 2°C |
| `thh_rhtrig`    | Humidity trigger value with configure. Humidity difference threshold. ex: 5 => 5%        |

#### 3. Frame Count 0 Content

- Fport: 222
- payloadlens: 17

| Name         | Content             |
|--------------|---------------------|
| `fPort`      | fPort number.       |
| `bootloader` | Bootloader version. |
| `HW_ID`      | HW ID version.      |
| `FW_CRC`     | FW version.         |

### Healthy Home Sensor

#### 1. Device Messages

- Fport: 103

| Name              | Content                                                                          |
|-------------------|----------------------------------------------------------------------------------|
| `fPort`           | fPort number.                                                                    |
| `battery_volt`    | Battery level. ex: 3.6 => 3.6V                                                   |
| `temperature_pcb` | Temperature on board in degrees Celsius. ex: 25 => 25°C                          |
| `humidity`        | Environment Relative humidity. ex: 50 => 50%                                     |
| `iaq_type`        | 1 – Temperature and humidity sensor type, 0 – IAQ Sensor type                    |
| `iaq_stat`        | 1 – Trigger Event, 0 – Keep-Alive                                                |
| `temp_trig`       | 1 - Temperature status is changed(2°C delta), 0 –Temperature status is unchanged |
| `rh_trig`         | 1 - RH status is changed (5% RH deltas), 0 – RH status is unchanged              |
| `iaq_trig`        | 1 - IAQ status is changed (25 IAQ index), 0 – status is unchanged                |
| `CO2`             | Equivalent CO2 level. ex: 400 => 400 ppm.                                        |
| `VOC`             | Total Volatile Organic Compound Level. ex: 1000 => 1000 ppm                      |
| `iaq`             | Indoor-air-quality value. ex: 300                                                |
| `temperature_env` | Environment Temperature in degrees Celsius. ex: 25 => 25°C                       |

#### 2. Configuration Response Content

- Fport: 204

| Name             | Content                                                                                  |
|------------------|------------------------------------------------------------------------------------------|
| `fPort`          | fPort number.                                                                            |
| `payloadlens`    | payload length.                                                                          |
| `iaq_keepalive`  | Keep alive interval. 1 => 1*5 min = 5 min                                                |
| `iaq_tempdelta`  | Temperature trigger value with configure. temperature difference threshold. ex: 2 => 2°C |
| `iaq_rhdelta`    | Humidity trigger value with configure. Humidity difference threshold. ex: 5 => 5%        |
| `iaq_indexdelta` | IAQ trigger value with configure. IAQ difference threshold. ex: 25                       |

#### 3. Frame Count 0 Content

- Fport: 222
- payloadlens: 17

| Name         | Content             |
|--------------|---------------------|
| `fPort`      | fPort number.       |
| `bootloader` | Bootloader version. |
| `HW_ID`      | HW ID version.      |
| `FW_CRC`     | FW version.         |

### Ambient Light Sensor

#### 1. Device Messages

- Fport: 104

| Name           | Content                                                 |
|----------------|---------------------------------------------------------|
| `fPort`        | fPort number.                                           |
| `battery_volt` | Battery level. ex: 3.6 => 3.6V                          |
| `temperature`  | Temperature on board in degrees Celsius. ex: 25 => 25°C |
| `dark_chag`    | 1 - darker, 0 - lighter or not change                   |
| `light_chag`   | 1 - lighter, 0 - darker or not change                   |
| `light_stat`   | 1 - status change, 0 - not status change                |
| `light_keep`   | 1 - keep-alive, 0 - not keep-alive                      |
| `light_lux`    | Lux data                                                |

#### 2. Configuration Response Content

- Fport: 204

| Name              | Content                                                |
|-------------------|--------------------------------------------------------|
| `fPort`           | fPort number.                                          |
| `payloadlens`     | payload length.                                        |
| `light_keepalive` | Keep alive interval. ex: 3600 => 3600 sec              |
| `light_detect`    | Monitor interval configure. ex: 300 => 300 sec         |
| `light_trigdel`   | Trigger delta lux value configure. ex: 100 => 100(lux) |

#### 3. Frame Count 0 Content

- Fport: 222
- payloadlens: 17

| Name         | Content             |
|--------------|---------------------|
| `fPort`      | fPort number.       |
| `bootloader` | Bootloader version. |
| `HW_ID`      | HW ID version.      |
| `FW_CRC`     | FW version.         |

### Sound Level Sensor

#### 1. Device Messages

- Fport: 105

| Name           | Content                                                 |
|----------------|---------------------------------------------------------|
| `fPort`        | fPort number.                                           |
| `battery_volt` | Battery level. ex: 3.6 => 3.6V                          |
| `temperature`  | Temperature on board in degrees Celsius. ex: 25 => 25°C |
| `sound_trig`   | 0 -> keep alive, 1 -> trigger threshold event.          |
| `sound_db`     | Sound decibel value. ex: 40 => 40 dBA                   |

#### 2. Configuration Response Content

- Fport: 204

| Name              | Content                                                        |
|-------------------|----------------------------------------------------------------|
| `fPort`           | fPort number.                                                  |
| `payloadlens`     | payload length.                                                |
| `sound_keepalive` | Keep alive interval. ex: 3600 => 3600 sec                      |
| `sound_detect`    | Sensor detection interval configure. ex: 300 => 300 sec        |
| `sound_dbtrig`    | Sensor’s decibel threshold to trigger event. ex: 80 => 80(dBA) |

#### 3. Frame Count 0 Content

- Fport: 222
- payloadlens: 17

| Name         | Content             |
|--------------|---------------------|
| `fPort`      | fPort number.       |
| `bootloader` | Bootloader version. |
| `HW_ID`      | HW ID version.      |
| `FW_CRC`     | FW version.         |

### Water Leak Sensor

#### 1. Device Messages

- Fport: 106

| Name              | Content                                                                            |
|-------------------|------------------------------------------------------------------------------------|
| `fPort`           | fPort number.                                                                      |
| `battery_volt`    | Battery level. ex: 3.6 => 3.6V                                                     |
| `temperature_pcb` | Temperature on board in degrees Celsius. ex: 25 => 25°C                            |
| `humidity`        | Humidity trigger value with configure. Humidity difference threshold. ex: 5 => 5%  |
| `water_detect`    | 1 – Water leakage detected, 0 – Dry.                                               |
| `water_interpt`   | 1 - Water leakage Interrupt.                                                       |
| `water_thchg`     | 1 - Temperature status is changed(2°C delta), 0 – Temperature status is unchanged. |
| `water_rhchg`     | 1 - RH status is changed (5% RH deltas), 0 – RH status is unchanged.               |
| `temperature_env` | Environment Temperature in degrees Celsius. ex: 25 => 25°C                         |

#### 2. Configuration Response Content

- Fport: 204

| Name           | Content                                                                                  |
|----------------|------------------------------------------------------------------------------------------|
| `fPort`        | fPort number.                                                                            |
| `payloadlens`  | payload length.                                                                          |
| `wl_keepalive` | Keep alive interval. ex: 3600 => 3600 sec                                                |
| `wl_tempdelta` | Temperature trigger value with configure. Temperature difference threshold. ex: 2 => 2°C |
| `wl_rhdelta`   | Humidity trigger value with configure. Humidity difference threshold. ex: 5 => 5%        |
| `wl_detect`    | Water detection interval with configure. ex: 600 => 600 sec                              |

#### 3. Frame Count 0 Content

- Fport: 222
- payloadlens: 17

| Name         | Content             |
|--------------|---------------------|
| `fPort`      | fPort number.       |
| `bootloader` | Bootloader version. |
| `HW_ID`      | HW ID version.      |
| `FW_CRC`     | FW version.         |

### Object Locator Sensor

#### 1. Device Messages

- Fport: 136

| Name              | Content                                                 |
|-------------------|---------------------------------------------------------|
| `fPort`           | fPort number.                                           |
| `battery_volt`    | Battery level. ex: 3.6 => 3.6V                          |
| `temperature_pcb` | Temperature on board in degrees Celsius. ex: 25 => 25°C |
| `obj_button`      | 1 - button trigger event, 0 - no button trigger event.  |
| `obj_move`        | 1 - moving mode, 0 - stationary mode.                   |
| `obj_gnsfix`      | 1 - no GNSS fix, 0 - GNSS fixed.                        |
| `obj_gnserr`      | 1 - GNSS error, 0 - GNSS OK.                            |
| `gnssLat_final`   | Latitude as last reported by GNSS receiver.             |
| `gnssLong_final`  | Longitude as last reported by GNSS receiver.            |
| `gnssPosit_final` | Position accuracy estimate by GNSS receiver.            |

#### 2. Configuration Response Content

- Fport: 204

| Name            | Content                                                                           |
|-----------------|-----------------------------------------------------------------------------------|
| `fPort`         | fPort number.                                                                     |
| `payloadlens`   | payload length.                                                                   |
| `obj_move`      | Update event interval when the sensor is in moving mode. (ex: 30 => 30 sec)       |
| `obj_keepalive` | Keep alive interval when the sensor is in stationary mode. (ex: 7200 => 7200 sec) |
| `obj_gsensor`   | G-sensor timeout interval when the sensor is moving. (ex: 60 => 60 sec)           |

#### 3. Frame Count 0 Content

- Fport: 222
- payloadlens: 17

| Name         | Content             |
|--------------|---------------------|
| `fPort`      | fPort number.       |
| `bootloader` | Bootloader version. |
| `HW_ID`      | HW ID version.      |
| `FW_CRC`     | FW version.         |

### Industrial Tracker Sensor

#### 1. Device Messages

- Fport: 136

| Name              | Content                                                 |
|-------------------|---------------------------------------------------------|
| `fPort`           | fPort number.                                           |
| `battery_volt`    | Battery level. ex: 3.6 => 3.6V                          |
| `temperature_pcb` | Temperature on board in degrees Celsius. ex: 25 => 25°C |
| `intk_move`       | 1 - moving mode, 0 - stationary mode.                   |
| `intk_gnsfix`     | 1 - no GNSS fix, 0 - GNSS fixed.                        |
| `intk_gnserr`     | 1 - GNSS error, 0 - GNSS OK.                            |
| `gnssLat_final`   | Latitude as last reported by GNSS receiver.             |
| `gnssLong_final`  | Longitude as last reported by GNSS receiver.            |
| `gnssPosit_final` | Position accuracy estimate by GNSS receiver.            |

#### 2. Configuration Response Content

- Fport: 204

| Name             | Content                                                                           |
|------------------|-----------------------------------------------------------------------------------|
| `fPort`          | fPort number.                                                                     |
| `payloadlens`    | payload length.                                                                   |
| `intk_move`      | Update event interval when the sensor is in moving mode. (ex: 30 => 30 sec)       |
| `intk_keepalive` | Keep alive interval when the sensor is in stationary mode. (ex: 7200 => 7200 sec) |
| `intk_gsensor`   | G-sensor timeout interval when the sensor is moving. (ex: 60 => 60 sec)           |

#### 3. Frame Count 0 Content

- Fport: 204
- payloadlens: 17

| Name     | Content       |
|----------|---------------|
| `fPort`  | fPort number. |
| `HW_ID`  | HW ID Version |
| `FW_CRC` | FW Version    |

### Temperature Probe Sensor

#### 1. Device Messages

- Fport: 112

| Name           | Content                                                            |
|----------------|--------------------------------------------------------------------|
| `fPort`        | fPort number.                                                      |
| `battery_volt` | Battery level, ex: 3.6 => 3.6V                                     |
| `temp_pcb`     | Temperature on board in degrees Celsius. ex: 25 => 25°C            |
| `temp_probe`   | Temperature probe's temperature in degrees Celsius. ex: 25 => 25°C |

#### 2. Configuration Response Content

- Fport: 204

| Name                         | Content                                     |
|------------------------------|---------------------------------------------|
| `fPort`                      | fPort number.                               |
| `payloadlens`                | payload length.                             |
| `temp_probe_keepalive`       | Keep alive interval. (ex: 3600 => 3600 sec) |
| `temp_probe_detect_time_int` | Detection time interval. (ex: 60 => 60 sec) |
| `temp_probe_temp_delta`      | Temperature delta. (ex: 2 => 2°C)           |
| `temp_probe_max_temp`        | Maximum temperature limit. (ex: 4 => 4°C)   |
| `temp_probe_min_temp`        | Minimum temperature limit. (ex: 0 => 0°C)   |

#### 3. Frame Count 0 Content

- Fport: 222
- payloadlens: 17

| Name         | Content             |
|--------------|---------------------|
| `fPort`      | fPort number.       |
| `bootloader` | Bootloader version. |
| `HW_ID`      | HW ID version.      |
| `FW_CRC`     | FW version.         |

## Release History

### Decoder_tabssensor_forTTN_v4.0.txt

- Support temperature probe sensor.
- Fix frame count 0 fPort number.

### tabs_sensor_forTTN_v3.0.txt

- Can judge decimal point, and negative number

### tabs_sensor_forTTN_v2.0.txt

- First release

## Installation and Usage

Before using the decoder, please ensure that you are using "The Things Stack" as your LoRaWAN server.
For specific installation and usage instructions, please refer to the project's documentation or user guide.

## Contribution

If you discover issues or have suggestions for improvement, feel free to submit an issue or create a pull request.

## License

The project adheres to the [MIT License](../LICENSE).
By [Browan Communications Inc.](https://www.browan.com/)
