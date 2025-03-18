import React from 'react'
import { Stack } from 'expo-router'
import BottomBar from "../../components/BottomBar"
import TopBar from '../../components/TopBar'
const ProtectedLayout = () => {
  return (
    <>
    <TopBar/>
      <Stack screenOptions={{headerShown:false}} >
        <Stack.Screen name="home"  />
      </Stack>
      <BottomBar/>
    </>
  )
}

export default ProtectedLayout
