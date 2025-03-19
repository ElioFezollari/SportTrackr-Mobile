import { View, Text, StyleSheet,Image } from 'react-native';
import React from 'react';
import useAuth from '../hooks/useAuth';
import profile from "../assets/images/topbar/profile.png"
import settings from "../assets/images/topbar/settings.png"
export default function TopBar() {
  const { auth } = useAuth();
  
  const firstName = auth?.decodedInfo?.firstName;
  const lastName = auth?.decodedInfo?.lastName;

  return (
    <View style={styles.topView}>
      <View style={{paddingTop:20,justifyContent:'space-between',flexDirection:'row',alignContent:'center',width:'100%'}}>
      {firstName && lastName && (
        <View style={styles.profileView}>
        <Image style={styles.profileImage} source={profile}></Image>
        <Text style={styles.topViewText}>
          {firstName} {lastName}
        </Text>
        </View>
      )}
      <Image style={styles.profileImage} source={settings}></Image>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topView: {
    backgroundColor: "#495464",
    height:40,
    paddingLeft:30,
    alignItems:'center',
    justifyContent:'space-between',
    borderBottomRightRadius: 20,
    flexDirection:'row',

    borderBottomLeftRadius: 20,
    color: '#FFFFFF',
  },
  topViewText: {
    color: '#FFFFFF',
    fontFamily: 'Jersey20',
    fontSize: 26,
  },
  profileView:{
    flexDirection:'row',
    alignItems:'center',
  },
  profileImage:{
    width:35,
    height:35,
    marginRight:15
  },
});
