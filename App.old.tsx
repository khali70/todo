import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import {
  NavigationContainer,
  ParamListBase,
  useRoute,
} from "@react-navigation/native";
import {
  StackScreenProps,
  createStackNavigator,
} from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import BarcodeScannerScreen from "@/BarcodeScannerScreen";
import { RootStackParamList } from "./types";

const Stack = createStackNavigator<RootStackParamList>();

type HomeScreenNavigationProps = StackScreenProps<RootStackParamList, "Home">;
const HomeScreen = ({ navigation, route }: HomeScreenNavigationProps) => {
  const [text, setText] = useState(route?.params?.barcode || "");

  const openBarcodeScanner = () => {
    navigation.replace("BarcodeScanner");
  };

  const handleSearch = () => {
    console.log("Searching for:", text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={openBarcodeScanner}>
          <Ionicons name="barcode-outline" size={30} color="#000" />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="Enter text"
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search-outline" size={30} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BarcodeScanner" component={BarcodeScannerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 18,
  },
});

export default App;
