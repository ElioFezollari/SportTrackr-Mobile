import { View, Text,StyleSheet,Image,TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import bayern from "../../assets/temp/bayernlogo.png"
import neuer from "../../assets/temp/neuerProfile.webp"
import davies from "../../assets/temp/davies.png"
import kimmich from "../../assets/temp/kimmich.webp"
import musiala from "../../assets/temp/musiala.webp"
import sendIcon from "../../assets/images/send.png"
const Chat = () => {
  return (
    <View style={styles.chatWrapper}>
        <View style={styles.chat}>
        <View style={styles.chatHeader}><Image source={bayern} style={styles.groupLogo}></Image><Text style={styles.chatHeaderText}>FC Bayern Group</Text></View>
        <View style={styles.chatContent}>
            <View style={{...styles.messageWrapper,marginTop:5}}>
                <Image source={neuer} style={styles.groupLogo}></Image>
                <View style={styles.chatContentView} ><Text style={styles.chatContentName}>Manuel Neuer</Text><Text style={styles.chatContentBubble}>Guys don't forget practice today at 8pm!</Text></View>
            </View>
            <View style={styles.messageWrapper}>
                <Image source={davies} style={styles.groupLogo}></Image>
                <View style={styles.chatContentView} ><Text style={styles.chatContentName}>Alphonso Davies</Text><Text style={styles.chatContentBubble}>Will be there</Text></View>
            </View>
            <View style={styles.messageWrapperRight}>
                <View style={styles.chatContentViewRight} ><Text style={styles.chatContentNameRight}>Jamal Musiala</Text><Text style={styles.chatContentBubbleRight}>I'll let you know if I can
                make it later.</Text></View>
                <Image source={musiala} style={styles.groupLogo}></Image>
            </View>
            <View style={styles.messageWrapper}>
                <Image source={neuer} style={styles.groupLogo}></Image>
                <View style={styles.chatContentView} ><Text style={styles.chatContentName}>Manuel Neuer</Text><Text style={styles.chatContentBubble}>Ok Chief!</Text></View>
            </View>
            <View style={styles.messageWrapper}>
                <Image source={kimmich} style={styles.groupLogo}></Image>
                <View style={styles.chatContentView} ><Text style={styles.chatContentName}>Joshua Kimmich</Text><Text style={styles.chatContentBubble}>Can't 72make it today!</Text></View>
            </View>
        </View>
        <View style={styles.messageViewWrapper}>
            <TextInput style={styles.messageInput} placeholderTextColor={'#8F8D8D'} placeholder='Send Message...'></TextInput>
            <TouchableOpacity><Image source={sendIcon} style={styles.sendIcon}/></TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    chatWrapper:{
        justifyContent:'center',
        alignItems:'center',    },
    chat:{
        width:'95%',
        height:'90%',
        borderRadius:30,
        backgroundColor:'#E8E8E8',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 8,
        justifyContent:'space-between'
    },
    groupLogo:{
        width:50,
        height:50,
        objectFit:'contain'
    },
    sendIcon:{
        width:40,
        height:40
    },
    chatHeader:{
        padding:20,
        flexDirection:'row',
        borderBottomColor:"#D9D9D9",
        borderBottomWidth:1,
        alignItems:'center'
    },
    chatHeaderText:{
        fontFamily:'Jersey20',
        fontSize:30,
        marginLeft:5,
        color:"#495464",
    },
    chatContent:{
        padding:10
    },
    chatContentView:{
        maxWidth:'50%',
        marginLeft:5
    },
    chatContentViewRight:{
        maxWidth:'50%',
        marginRight:5
    },
    messageWrapper:{
        flexDirection:'row',
        marginTop:30
    },
    messageWrapperRight:{
        alignSelf:'flex-end',
        flexDirection:'row',
        marginTop:30
    },
    chatContentName:{
        color:"#BBBFCA",
        fontFamily:"Jersey20",
    },
    chatContentNameRight:{
        color:"#BBBFCA",
        fontFamily:"Jersey20",
    },
    chatContentBubble:{
        color:"white",
        backgroundColor:"#495464",
        padding:10,
        borderRadius:10,
        flexWrap:"wrap",
        fontFamily:"Jersey20",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 8,
    },
    chatContentBubbleRight:{
        color:"white",
        backgroundColor:"#758CA3",
        padding:10,
        borderRadius:10,
        flexWrap:"wrap",
        fontFamily:"Jersey20",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 8,
    },
    messageViewWrapper:{
        height:70,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderTopColor:"#D9D9D9",
        borderTopWidth:1,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        padding:20,

    },
    messageInput:{
        color: "black", 
        fontFamily: 'Jersey20', 
        fontSize: 20, 

    }

})

export default Chat