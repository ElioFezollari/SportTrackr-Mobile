import { useFonts } from 'expo-font'; 
import { View, Text, StyleSheet, Image } from "react-native";
import "react-native-reanimated";
import logo from "../assets/images/logo.png";
import { Link } from 'expo-router';
import BottomBar from '../components/BottomBar';

export default function Index() {
  const [fontsLoaded] = useFonts({
    'Jersey20': require('../assets/fonts/Jersey20.ttf'),
  });

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <View style={styles.container}>
      <View style={styles.viewOne}>
        <Image style={styles.logo} source={logo}/>
        <View >
          <Text style={styles.headerText}>Sport Trackr</Text>
        </View>
      </View>
      <View style={styles.viewTwo}>
        <Link style={styles.link} href="/login">Log In</Link>
        <Link style={{...styles.link,marginTop:20}} href="/register">Sign Up</Link>
      </View>
      <BottomBar/>
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
    height:"50%",
    alignContent:"center",
    justifyContent:"center"
  },
  headerText: {
    textAlign: 'center',
    fontFamily: 'Jersey20', 
    fontSize: 40,
    color:"#495464",
    marginTop:20,
  },
  viewTwo: {
    backgroundColor: "#495464",
    height:'50%',
    width:'100%',
    justifyContent:"center",
    alignItems:"center",
    borderTopLeftRadius:60,
    borderTopRightRadius:60
  },
  link:{
    padding:30,
    fontSize:30,
    textAlign:'center',
    backgroundColor:"#E8E8E8",
    fontFamily: 'Jersey20', 
    borderRadius:20,
    width:300
  }
});
