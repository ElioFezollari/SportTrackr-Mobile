import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  Animated,
  PanResponder,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import getTeamPlayers from "../services/teams";
import useAuth from "../hooks/useAuth";
import { usePopUp } from "../context/PopUpContext";
import { router } from "expo-router";

const TeamPopUp = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();
  const [error, setError] = useState(null);
  const { popUp, setPopUp } = usePopUp();
  let teamId = popUp.teamId;

  const translateY = new Animated.Value(0);


  const handlePlayerPress = (item, setPopUp) => {
    if (item.profileVisibility === true) {
      router.push({
        pathname: '/(protected)/profile',
        params: { id: item.id },
      });
      setPopUp(false);
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dy: translateY }], {
      useNativeDriver: false,
      listener: (event, gestureState) => {
        if (gestureState.dy < 0) {
          translateY.setValue(0);
        }
      },
    }),
    onPanResponderRelease: (e, gestureState) => {

      if (gestureState.dy > 50) {
        handleAnimationClose();
      } else {
        Animated.spring(translateY, {
          toValue: 0,
          tension: 1,
          friction: 20,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const handleAnimationClose = () => {
    Animated.timing(translateY, {
      toValue: Dimensions.get("window").height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setPopUp(false);
    });
  };

  useEffect(() => {
    const fetchTeamPlayers = async () => {
      try {
        setLoading(true);
        const players = await getTeamPlayers(auth.accessToken, teamId);
        setTeam(players.data);
      } catch (err) {
        setError("Failed to load team players");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamPlayers();
  }, [auth.accessToken, teamId]);

  const closePopUpOnError = () => {
    if (error) {
      setPopUp(false); 
    }
  };

  useEffect(() => {
    closePopUpOnError();
  }, [error]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{error}</Text>
      </View>
    );
  }

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.container,
        {
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={styles.indicatorWrapper}>
        <View style={styles.indicator} />
      </View>

      <View style={styles.teamPopUpName}>
        <Image source={{ uri: popUp.teamImg }} style={styles.teamImg} />
        <Text style={styles.teamPopUpText}>{popUp.teamName}</Text>
        <TouchableOpacity style={styles.schedule}><Text style={styles.scheduleText}>Check Schedule</Text></TouchableOpacity>
      </View>

      <FlatList
        data={team}
        style={styles.list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
          style={[
            styles.playerItem,
            { opacity: item.profileVisibility === false ? 0.5 : 1 },
          ]}
          onPress={() => handlePlayerPress(item, setPopUp)} 
          disabled={item.profileVisibility === false}
        >
          <Image source={{ uri: item.pictureUrl }} style={styles.playerImg} />
          <Text
            style={[
              styles.playerName,
            ]}
          >
            {item.name}
            {`${item.firstName} ${item.lastName}`}
          </Text>
          <Text style={styles.playerName}>
            {item.captainStatus === "true" ? " (C)" : ""}
          </Text>
        </TouchableOpacity>
        )}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "75%",
    backgroundColor: "#BBBFCA",
    borderRadius: 30,
    zIndex: 1000,
    padding: 20,
    flexDirection: "column", 
  },
  indicatorWrapper: {
    alignItems: "center",
  },
  indicator: {
    width: 60,
    height: 5,
    backgroundColor: "#E8E8E8",
    borderRadius: 2.5,
    alignSelf: "center",
    marginTop: 10,
  },
  text: {
    fontFamily: "Jersey20",
    fontSize: 20,
    textAlign: "center",
    marginTop: "50%",
  },
  playerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  playerName: {
    fontSize: 20,
    color: "#495464",
    fontFamily: "Jersey20",
    fontWeight: "bold",
  },
  playerEmail: {
    fontSize: 14,
    color: "gray",
  },
  teamImg: {
    width: 100,
    height: 100,
  },
  schedule: {
    backgroundColor: '#D9D9D9',
    padding: 10,
    borderRadius: 10,
    marginTop:20,
    flexShrink: 1, 
    width: 'auto',  
    alignSelf: 'flex-start', 
    textAlign:'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex:'2'
  },
  scheduleText: {
    fontFamily: 'Jersey20',
    color: '#758CA3',
    fontSize: 20,
    textAlign:'center'
  },
  playerStatus: {
    fontSize: 16,
    color: "green",
  },
  playerImg: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 75,
  },
  list: {
    marginTop: 30,
    flex: 1, 
  },
  teamPopUpName: {
    flexDirection: "row",
    marginTop: 30,
    alignItems: "center",
    justifyContent:'space-between',
    flexShrink: 1, 
    marginBottom: 10,  
  },
  teamPopUpText: {
    fontFamily: "Jersey20",
    fontSize: 26,
    color: "#495464",
    marginLeft: 10,
    marginRight: 10,
  },
});

export default TeamPopUp;
