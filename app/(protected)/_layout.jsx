import React from 'react'
import { Stack } from 'expo-router'
import BottomBar from "../../components/BottomBar"
import TopBar from '../../components/TopBar'
import { SafeAreaView } from 'react-native-safe-area-context'
const ProtectedLayout = () => {
  return (
    <>
    <SafeAreaView style={{backgroundColor:"#495464",borderBottomLeftRadius:20,borderBottomRightRadius:20}}>
    <TopBar/>
      <Stack screenOptions={{headerShown:false}} >
        <Stack.Screen name="home"  />
      </Stack>
      </SafeAreaView>
      <BottomBar/>
    </>
  )
}

export default ProtectedLayout
