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
    /**
     * BarcodeScanningResult
     {
  "type": 256,
  "data": "exp://192.168.1.13:8081",
  "target": 109,
  "raw": "exp://192.168.1.13:8081",
  "cornerPoints": [
    {
      "y": 251.37777709960938,
      "x": 119.82221984863281
    },
    {
      "y": 353.4222106933594,
      "x": 123.02222442626953
    },
    {
      "y": 351.28887939453125,
      "x": 189.5111083984375
    },
    {
      "y": 251.37777709960938,
      "x": 189.5111083984375
    }
  ],
  "boundingBox": {
    "size": {
      "width": 102.04444122314453,
      "height": 69.68888854980469
    },
    "origin": {
      "y": 119.82221984863281,
      "x": 251.37777709960938
    }
  }
} 
     */
    setScanned(true);
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
