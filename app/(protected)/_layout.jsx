import React from 'react';
import { Stack } from 'expo-router';
import BottomBar from "../../components/BottomBar";
import TopBar from '../../components/TopBar';
import { SafeAreaView } from 'react-native';

const ProtectedLayout = () => {

  return (
    <>
        <TopBar  />
      <SafeAreaView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
        </Stack>
      </SafeAreaView>
      <BottomBar />
    </>
  );
};



export default ProtectedLayout;
