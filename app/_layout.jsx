import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {  Stack } from 'expo-router'

const RootLayout = () => {
    return (
      <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name='index'/>
      </Stack>
    )
}

export default RootLayout

const styles = StyleSheet.create({
  container:{
    display:'flex',
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
})