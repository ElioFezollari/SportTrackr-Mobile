import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import LottieView from 'lottie-react-native';
import Svg, { Path } from 'react-native-svg'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';


const SignUp = () => {
  const [email, setEmail] = useState('');  

  
  const translateY = useSharedValue(Dimensions.get('window').height); 

  useEffect(() => {
    translateY.value = withSpring(0, {  
      mass: 1,
      damping: 20,  
      stiffness: 140,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 2,
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <View style={styles.container}>
            <View style={styles.bgContainer}>
        <LottieView
          source={require('../../assets/lottie/email.json')} 
          autoPlay
          loop
          style={styles.bg}
        />
      </View>

      <Animated.View style={[styles.emailDiv,animatedStyle]}>
      <View >
      <Text style={styles.enterEmail}>
        Enter your email to continue with the sign up process:
      </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Enter your email"
          keyboardType="email-address" 
          placeholderTextColor="#BBBFCA"
        />

        <TouchableOpacity 
          style={styles.button} 
          activeOpacity={0.7} 
          onPress={() => { console.log('Email Sent:', email); }} 
        >
          <Text style={styles.buttonText}>Send Email</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#495464',
    alignItems: 'center',
  },
  bgContainer: {
    position: 'relative',
    width: '100%',
    height:600, 

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
  emailDiv:{
    borderTopLeftRadius:40,
    borderTopRightRadius:40,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    backgroundColor:"white",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    
    elevation: 8,
  },
  enterEmail:{
    color:'#495464',
    textAlign:'center',
    fontSize:20,
    paddingHorizontal:57,
    fontFamily: 'Jersey20'
  },
  buttonContainer: {
    marginTop: 40,
    width: '70%',
    alignItems: 'center',
  },
  input: {
    fontFamily: 'Jersey20',
    width: '100%',
    padding:20,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    backgroundColor:'#E8E8E8',
    borderRadius: 15,
    marginBottom: 20,
    fontSize: 16,
    color: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, 
    shadowRadius: 3, 
    elevation: 4, 
  },
  button: {
    backgroundColor: '#495464',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius:15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, 
    shadowRadius: 3, 
    elevation: 4, 
  },
  buttonText: {
    fontFamily: 'Jersey20',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SignUp;
