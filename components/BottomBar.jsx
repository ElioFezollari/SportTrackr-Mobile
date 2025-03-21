import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import house from "../assets/images/bottombar/house.webp";
import message from "../assets/images/bottombar/message.webp";
import bell from "../assets/images/bottombar/bell.webp";
import profile from "../assets/images/bottombar/profile.webp";
import logo from "../assets/images/logo.png";

function BottomBar() {
  return (
    <View style={styles.bottomNav}>
      <View style={styles.navItems}>
        <Link href="/home" style={styles.navItem}>
          <TouchableOpacity>
            <Image style={styles.icons} source={house} />
          </TouchableOpacity>
        </Link>

        <Link href="/search" style={styles.navItem}>
        <TouchableOpacity>
          <Image style={styles.icons} source={message} />
          </TouchableOpacity>
        </Link>
        <Link href="/leagues" style={styles.navItem}>
          <Image style={styles.logo} source={logo} />
        </Link>
        <Link href="/messages" style={styles.navItem}>
        <TouchableOpacity>
          <Image style={styles.icons} source={bell} />
          </TouchableOpacity>
        </Link>
        <Link href="/profile" style={styles.navItem}>
        <TouchableOpacity>
          <Image style={styles.icons} source={profile} />
          </TouchableOpacity>
        </Link>
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
    zIndex:'2'
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
  logo: {
    width: 90,
    height: 90,
    position: "absolute",
    left: "50%",
    transform: [{ translateY: -30 }],
  },
  icons: {
    width: 40,
    height: 40,
  },
  navText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default BottomBar;
