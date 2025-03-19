import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";
import profile from "../assets/images/topbar/profile.png";
import settings from "../assets/images/topbar/settings.png";
export default function TopBar() {
  const { auth } = useAuth();

  const firstName = auth?.decodedInfo?.firstName;
  const lastName = auth?.decodedInfo?.lastName;

  return (
    <View style={styles.topView}>
      <View style={styles.innerView}>
        {firstName && lastName && (
          <View style={styles.profileView}>
            <TouchableOpacity>
              <Image style={styles.profileImage} source={profile}></Image>
            </TouchableOpacity>
            <Text style={styles.topViewText}>
              {firstName} {lastName}
            </Text>
          </View>
        )}
        <TouchableOpacity>
          <Image style={styles.profileImage} source={settings}></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topView: {
    backgroundColor: "#495464",
    height: 130,
    paddingLeft: 30,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: "row",
    color: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    zIndex:'2'
  },
  innerView: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignContent: "center",
    width: "100%",
    marginTop:34
  },
  topViewText: {
    color: "#FFFFFF",
    fontFamily: "Jersey20",
    fontSize: 26,
  },
  profileView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 35,
    height: 35,
    marginRight: 15,
  },
});
