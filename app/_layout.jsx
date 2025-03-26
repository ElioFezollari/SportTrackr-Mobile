import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthProvider';
import { PopUpProvider } from '../context/PopUpContext'; 

const RootLayout = () => {
    return (
      <AuthProvider>  
        <PopUpProvider> 
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='index' />
          </Stack>
        </PopUpProvider>
      </AuthProvider>
    );
};

export default RootLayout;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
