import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BleManager } from "react-native-ble-plx";
const bleManager = new BleManager();
export default function App() {
  useEffect(() => {
    bleManager.startDeviceScan(["FFFF"], null, (error, device) => {
      if (error) {
        console.log("error", error);
        return;
      }
      console.log("device", device.localName);
    });
    return () => {
      bleManager.stopDeviceScan();
    };
  });
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
