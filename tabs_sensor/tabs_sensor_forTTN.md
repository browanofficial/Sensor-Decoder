



# tabs_sensor_forTTN.txt 文件說明

這是 tabs_sensor_forTTN 說明文件，它是 tabs_sensor 在【The Things Stack for LoRaWAN】的 decoder 文件，下面為文件中各種 SensorType 的名詞解釋，以及 Release history。

| 作者            | 聯絡方式                                             |
|----------------|--------------------------------------------------|
|BROWAN COMMUNICATIONS INC|https://www.browan.com/contact|
|Brian.jiang|brian.jiang@browan.com|
|Stanley.wang|stanley.wang@browan.com|


## Index

- [SensorType](#sensortype)
    - [door-window](#door-window)
    - [Motion Sensor](#motion-sensor)
    - [Temperature Humidity Sensor](#temperature-humidity-sensor)
    - [MerryIot Leak Detection sensor](#merryiot-leak-detection-sensor)
- [Release History](#release-history)

## SensorType

### <font color=#FF0000>Door Window</font>
#### 1. Device Messages (Fport:100)
| 名稱            | 說明                                             |
|----------------|--------------------------------------------------|
| `battery_volt`    | Battery level, ex: battery voltage: 3.6 v   |
| `temperature`  | Environment Temperature，以攝氏溫標為單位。                        |
| `humi`     | Relative humidity as measured by a digital sensor，表示空氣中水蒸氣的含量%數。                  |
| `button`     | Sensors status，1 – Button pressed, 0 - Button released.            |
| `tamper`     | Sensors status，1 – Tamper detected, 0 - No tamper detected.        |
| `motion`   | 風速數值，表示風的移動速度，可能以米/秒為單位。          |
| `count`     | 降雨量數值，表示在特定時間內降下的雨水量，可能以毫米為單位。 |
| `time`  | 光照強度數值，表示環境中的光照程度，可能以勒克斯為單位。     |

#### 2. Configuration Response Content (Fport:204)
| 名稱            | 說明                                             |
|----------------|--------------------------------------------------|
| `battery_volt`    | Battery level, ex: battery voltage: 3.6 v   |
| `temperature`  | Environment Temperature，以攝氏溫標為單位。                        |

### Motion Sensor
| 名稱              | 說明                                     |
|------------------|------------------------------------------|
| `sensor_id`      | Sensor 的唯一識別碼。                     |
| `battery_volt`   | 電池電壓數值，表示電池的電力水平。           |

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