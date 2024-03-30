import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import DemoList from "@/List";
export default function App() {
  return (
    <View style={styles.container}>
      <DemoList />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    color: "red",
    fontFamily: "Roboto",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
