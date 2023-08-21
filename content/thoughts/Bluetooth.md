---
title: "Bluetooth"
date: 2022-08-22
tags:
  - seed
---

![[thoughts/images/BLE communication workflow.png]]

Classes:

- CBCentralManager & CBCentralManagerDelegate
  - Are responsible to check that Bluetooth is ON and then to scan, discover, connect, and manage peripherals.
- CBPeripheral & CBPeripheralDelegate
  - Represents physical BLE devices as they were discovered by CBCentralManager. They are identified by UUID (universally unique identifier) which contains one or more services.
  - Generally, peripherals public data to central delegates
- CBService
  - Represents service physical BLE device, and provide data associated behaviors and characteristics given BLE-device.
- CBCharacteristics
  - Represent the data of the device’s service and contains a single value. Here is where we can read, write, and subscribe to the data from the device (ex: battery level, temperature, LED light).
