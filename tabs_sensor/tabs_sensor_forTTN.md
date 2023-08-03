# tabs_sensor_forTTN.txt 文件說明

這是 tabs_sensor_forTTN 說明文件，它是 tabs_sensor 在【The Things Stack for LoRaWAN】的 decoder 文件，下面為文件中各種 SensorType 的名詞解釋，以及 Release history。

| 作者            | 聯絡方式                                             |
|----------------|--------------------------------------------------|
|BROWAN COMMUNICATIONS INC|https://www.browan.com/contact|
|Brian.jiang|brian.jiang@browan.com|
|Stanley.wang|stanley.wang@browan.com|


## Index

- [SensorType](#sensortype)
    - [Door Window](#door-window)
    - [Motion Sensor](#motion-sensor)
    - [Temperature Humidity Sensor](#temperature-humidity-sensor)
    - [MerryIot Leak Detection sensor](#merryiot-leak-detection-sensor)
- [Release History](#release-history)

## SensorType

### Door Window
#### 1. Device Messages

| Fport | 100 |
|-----|------|

| Name            | Content                     |
|----------------|------------------------------|
| `fPort`    | fPort   |
| `battery_volt`    | Battery level, ex:3.6 => 3.6V   |
| `temperature`  | Environment Temperature in degrees Celsius；ex:25=> 25°C      |
| `door_doorst`     | Door sensor status； 1 => open, 0 => closed                  |
| `door_time`     | Time elapsed since the last event-triggered；value in minutes.ex:2=> 2 min|
| `door_count`     | Total count of event-triggered；value in times.ex:10=>10 times|

#### 2. Configuration Response Content

| Fport | 204 | 
|-----|------|

| Name            | Content                     |
|----------------|------------------------------|
| `fPort`    | fPort. |
| `payloadlens`    | payload length. |
| `door_keepalive`  | Keep alive interval with configure.ex:3600=> 3600 sec  |
#### 3. Frame Count 0 Content
| Fport | 204 |
|-----|------|

| Name            | Content                     |
|----------------|------------------------------|
| `fPort`    | fPort. |
| `HW_ID`  | HW ID Version  |
| `FW_CRC`  | FW Version |

<hr  style="border: none; height: 5px; background-color: black">

### Motion Sensor
#### 1. Device Messages

| Fport | 100 |
|-----|------|

| Name            | Content                     |
|----------------|------------------------------|
| `fPort`    | fPort   |
| `battery_volt`    | Battery level, ex:3.6 => 3.6V   |
| `temperature`  | Environment Temperature in degrees Celsius；ex:25=> 25°C      |
| `door_doorst`     | Door sensor status； 1 => open, 0 => closed                  |
| `door_time`     | Time elapsed since the last event-triggered；value in minutes.ex:2=> 2 min|
| `door_count`     | Total count of event-triggered；value in times.ex:10=>10 times|

#### 2. Configuration Response Content

| Fport | 204 | 
|-----|------|

| Name            | Content                     |
|----------------|------------------------------|
| `fPort`    | fPort. |
| `payloadlens`    | payload length. |
| `door_keepalive`  | Keep alive interval with configure.ex:3600=> 3600 sec  |
#### 3. Frame Count 0 Content
| Fport | 204 |
|-----|------|

| Name            | Content                     |
|----------------|------------------------------|
| `fPort`    | fPort. |
| `HW_ID`  | HW ID Version  |
| `FW_CRC`  | FW Version |

### Temperature Humidity Sensor 

| 名稱          | 說明                                         |
|--------------|----------------------------------------------|
| `sensor_id`  | Sensor 的唯一識別碼。                         |
| `co2_level`  | 二氧化碳濃度數值，表示空氣中的 CO2 濃度，可能以 ppm 為單位。|
| `tvoc_level` | 總揮發性有機化合物濃度數值，表示空氣中的 VOC 濃度，可能以 ppm 為單位。|

### MerryIot Leak Detection sensor

| 名稱              | 說明                                                |
|------------------|---------------------------------------------------|
| `sensor_id`      | Sensor 的唯一識別碼。                                |
| `motion_detected`| 布爾值，表示是否偵測到運動。                         |
| `temperature`    | 溫度數值，以攝氏溫標為單位。                          |


## Release History

### tabs_sensor_forTTN_v3.0.txt
- Can judge decimal point, and negative number

### tabs_sensor_forTTN_v2.0.txt

-  first release

## 安裝與使用

在使用 Decoder 前，請確認是使用 The Things Stack 做為您的 LoRaWAN server。具體安裝和使用方法請參考專案的文檔或說明文件。

## 貢獻

如果你發現了問題，或者有改進的建議，歡迎提交 issue 或進行 pull request。

## 授權

本專案遵守 [MIT 授權條款](LICENSE)。
By [BROWAN COMMUNICATIONS INC.](https://www.browan.com/tw)