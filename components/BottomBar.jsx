import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import house from "../assets/images/bottombar/house.webp";
import message from "../assets/images/bottombar/message.webp";
import bell from "../assets/images/bottombar/bell.webp";
import profileImg from "../assets/images/bottombar/profile.webp";
import logo from "../assets/images/logo.png";
import { router } from "expo-router";

function BottomBar() {


  return (
    <View style={styles.bottomNav}>
      <View style={styles.navItems}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/home")}
        >
          <Image style={styles.icons} source={house} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/search")} 
        >
          <Image style={styles.icons} source={message} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, styles.logoNavItem]} 
          onPress={() => router.push("/home")} 
        >
          <Image style={styles.logo} source={logo} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/messages")}
        >
          <Image style={styles.icons} source={bell} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/profile")} 
        >
          <Image style={styles.icons} source={profileImg} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    height: 100,
    backgroundColor: "#BBBFCA",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 10,
    position: "absolute",
    bottom: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    zIndex: 2,
  },
  navItems: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "relative",
  },
  navItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  logoNavItem: {
    transform: [{ translateY: -20 }],
    marginTop:'-5'
  },
  logo: {
    width: 90,
    height: 90,
  },
  icons: {
    width: 40,
    height: 40,
  },
});

export default BottomBar;
