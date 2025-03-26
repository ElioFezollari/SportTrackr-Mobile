import React from 'react';
import { Stack } from 'expo-router';
import BottomBar from "../../components/BottomBar";
import TopBar from '../../components/TopBar';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { usePopUp } from '../../context/PopUpContext'; 
import TeamPopUp from '../../components/TeamPopUp';

const ProtectedLayout = () => {
  const { popUp } = usePopUp(); 

  return (
    <>
      {popUp.type === "team" && (
        <>
          {/* Overlay that darkens the background and prevents interaction */}
          <View style={styles.overlay} />
          <TeamPopUp />
        </>
      )}

      <TopBar />
      <SafeAreaView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
      <BottomBar />
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    zIndex: 10, 
  },
});

export default ProtectedLayout;
