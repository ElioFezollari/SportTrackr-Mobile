import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function TopBar() {
  return (
    <View>
      <Text style={styles.topView}>TopBar</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    topView:{
        backgroundColor:"#495464",
        flex:1,
        height:400
    }
})