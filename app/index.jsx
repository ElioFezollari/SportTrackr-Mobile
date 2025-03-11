import { useFonts } from 'expo-font'; 
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Linking } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';  
import "react-native-reanimated";
import logo from "../assets/images/logo.png";
import bg from "../assets/images/main/soccer.webp";
import { Link } from 'expo-router';
import BottomBar from '../components/BottomBar';
import Svg, { Path } from 'react-native-svg';

export default function Index() {
  const [fontsLoaded] = useFonts({
    'Jersey20': require('../assets/fonts/Jersey20.ttf'),
  });

  if (!fontsLoaded) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  const handleOpenWithLinking = () =>{
    console.log("hi")
    Linking.openURL("/register");
}

  return (
    <View style={styles.container}>
      <View style={styles.viewOne}>
        <View style={styles.bgContainer}>
          <Image style={styles.bg} source={bg} resizeMode="cover" />
          <Svg style={styles.wave} viewBox="0 0 1440 320">
            <Path
              fill="#ffffff" fillOpacity="1" 
              d="M0,0L48,32C96,64,192,128,288,176C384,224,480,256,576,272C672,288,768,288,864,261.3C960,235,1056,181,1152,160C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </Svg>
        </View>
        <View style={styles.logoDiv}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.logoParagraph}>Sport Trackr</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            activeOpacity={0.7} 
          >
            <LinearGradient
              colors={['#495464', '#8796B0']}
              start={{ x: 0, y: 0 }} 
              end={{ x: 1, y: 0 }} 
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.loginButton]} 
          >
            <Text style={{...styles.buttonText,color:'#495464'}}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white", 
  },
  viewOne: {
    width: '100%',
    alignItems: 'center',
  },
  bgContainer: {
    position: 'relative',
    width: '100%',
    height: 450, 
  },
  bg: {
    width: '100%',
    height: '100%', 
  },
  wave: {
    position: 'absolute', 
    bottom: 0,
    width: Dimensions.get('screen').width, 
    height: 100, 
    marginBottom: -3,
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoDiv: {
    flexDirection: 'row',
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  logoParagraph: {
    marginLeft: 20,
    fontSize: 40,
    fontFamily: 'Jersey20',
  },
  buttonContainer: {
    marginTop: 40,
    width: '70%',
    alignItems: 'center',
    flexDirection: 'column', 
    justifyContent: 'center',
  },
  gradientButton: {
    paddingVertical: 12,
    paddingHorizontal: 0,
    marginVertical: 10,
    borderRadius: 25,
    width: '100%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'white',
    borderColor:'#495464',
    paddingVertical: 12,
    paddingHorizontal: 0,
    marginVertical: 10,
    borderRadius: 25,
    justifyContent: 'center',
    width: '100%',
    height: 70, 
    alignItems: 'center',
  },
  loginButton: {
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Jersey20'
  },
});
