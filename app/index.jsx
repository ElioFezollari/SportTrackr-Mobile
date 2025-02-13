import { useFonts } from 'expo-font'; // Import the useFonts hook
import { Link } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import "react-native-reanimated";
import logo from "../assets/images/index/logo.png";

export default function Index() {
  // Load the font
  const [fontsLoaded] = useFonts({
    'Jersey20': require('../assets/fonts/Jersey20.ttf'), // Make sure this path is correct
  });

  // If fonts aren't loaded yet, show a loading screen (or splash screen)
  if (!fontsLoaded) {
    return null; // Or you could return a loading spinner, or a splash screen.
  }

  return (
    <View style={styles.container}>
      <View style={styles.viewOne}>
        <Image style={styles.logo} source={logo}/>
        <View style={styles.viewOne}>
          <Text style={styles.headerText}>Sport Trackr</Text>
        </View>
      </View>
      <View style={styles.viewTwo}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  logo: {
    width: 250,
    height: 250
  },
  viewOne: {
    marginTop: 20,
  },
  headerText: {
    textAlign: 'center',
    fontFamily: 'Jersey20', // Ensure the font name matches the one used when loading the font
    fontSize: 30
  },
  viewTwo: {
    backgroundColor: "green",
  },
});
