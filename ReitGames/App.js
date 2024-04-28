import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BleManager } from "react-native-ble-plx";
const bleManager = new BleManager();
export default function App() {
  useEffect(() => {
    let counter = 0;
    bleManager.startDeviceScan(["FF00"], null, (error, device) => {
      if (error) {
        console.log("error", error);
        return;
      }
      counter++;
      console.log("device count", counter);
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
