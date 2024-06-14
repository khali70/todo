import { PermissionsAndroid, Platform } from "react-native";
import { BleManager, Device } from "react-native-ble-plx";

export const ConnectionState = {
  DISCONNECTED: "DISCONNECTED",
  CONNECTING: "CONNECTING",
  DISCOVERING: "DISCOVERING",
  CONNECTED: "CONNECTED",
  DISCONNECTING: "DISCONNECTING",
};
export type SensorTagTestMetadata = {
  id: string;
  title: string;
  execute: (device: Device) => Generator<any, boolean, any>;
};
function* readAllCharacteristics() {
  console.log("readAllCharacteristics");
  return true;
}
function* readTemperature() {
  console.log("readTemperature");
  return true;
}
export const SensorTagTests: { [k: string]: SensorTagTestMetadata } = {
  READ_ALL_CHARACTERISTICS: {
    id: "READ_ALL_CHARACTERISTICS",
    title: "Read all characteristics",
    execute: readAllCharacteristics,
  },
  READ_TEMPERATURE: {
    id: "READ_TEMPERATURE",
    title: "Read temperature",
    execute: readTemperature,
  },
};

export const requestBluetoothPermission = async () => {
  if (Platform.OS === "ios") {
    return true;
  }
  if (
    Platform.OS === "android" &&
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  ) {
    const apiLevel = parseInt(Platform.Version.toString(), 10);

    if (apiLevel < 31) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    if (
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN &&
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
    ) {
      const result = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);

      return (
        result["android.permission.BLUETOOTH_CONNECT"] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        result["android.permission.BLUETOOTH_SCAN"] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        result["android.permission.ACCESS_FINE_LOCATION"] ===
          PermissionsAndroid.RESULTS.GRANTED
      );
    }
  }

  return false;
};
export const main = async () => {
  try {
    console.log("testing...");
    const result = await requestBluetoothPermission();
    alert(result);
    const bleManager = new BleManager();
    const state = await bleManager.state();
    console.log(state);
    alert(state);
  } catch (e) {
    console.error(e);
  }
};
