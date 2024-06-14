import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import {
  BarcodeScanningResult,
  CameraView,
  PermissionStatus,
  useCameraPermissions,
} from "expo-camera";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

type HomeScreenNavigationProps = StackScreenProps<
  RootStackParamList,
  "BarcodeScanner"
>;
const BarcodeScannerScreen = ({ navigation }: HomeScreenNavigationProps) => {
  const [scanned, setScanned] = useState(false);
  const [facing, setFacing] = useState("back");

  const [permission, requestPermission] = useCameraPermissions();
  useEffect(() => {
    if (
      permission?.status === PermissionStatus.UNDETERMINED ||
      permission?.status === PermissionStatus.DENIED
    ) {
      requestPermission();
    }
  }, []);
  const handleBarCodeScanned = ({
    type,
    data,
    ...props
  }: BarcodeScanningResult) => {
    setScanned(true);
    console.log(JSON.stringify({ type, data, ...props }, null, 2));
    navigation.replace("Home", { barcode: data, type });
  };

  if (permission?.status === PermissionStatus.UNDETERMINED) {
    requestPermission();
    return <Text>Requesting for camera permission</Text>;
  }
  if (permission?.status === PermissionStatus.DENIED) {
    requestPermission();
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "code128"],
        }}
        onBarcodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default BarcodeScannerScreen;
