import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { getUserProfile } from "../../services/user";
import { getHighlightsByUser } from "../../services/match";
import useAuth from "../../hooks/useAuth";
import { useRoute } from "@react-navigation/native";
import { usePopUp } from "../../context/PopUpContext";
import soccerBall from "../../assets/images/profile/soccer-ball.png";
import soccerShot from "../../assets/images/profile/soccer-shot.png";
import scarf from "../../assets/images/profile/scarf.png";
import goalkeeper from "../../assets/images/profile/goalkeeper.png";
import interception from "../../assets/images/profile/interception.png";
import appearances from "../../assets/images/profile/appearances.png";
import yellow from "../../assets/images/profile/yellow.png";
import red from "../../assets/images/profile/red.png";
import { Video } from 'expo-av';

const Profile = ({ passedId }) => {
  const [userProfile, setUserProfile] = useState(null);
  const { auth } = useAuth();
  const { setPopUp } = usePopUp();
  const route = useRoute();
  const id = route.params?.id || passedId || auth.decodedInfo.id; // Use passedId if available
  const [highlights, setHighlights] = useState([])

  useEffect(() => {
    const getUser = async () => {
      try {
        const fetchedUserProfile = await getUserProfile(auth.accessToken, id);
        if (fetchedUserProfile?.data?.userProfile) {
          setUserProfile(fetchedUserProfile.data.userProfile);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    const getUserHighlight = async () => {
      try {
        const fetchedHighlight = await getHighlightsByUser(auth.accessToken, id);
        if (fetchedHighlight?.data) {
          setHighlights(fetchedHighlight.data);
        }
      } catch (error) {
        console.error("Error fetching highlights:", error);
      }
    };

    if (id) getUser(); // Ensure we have an ID before calling API
    if (id) getUserHighlight();
  }, [id, auth.accessToken]);

  if (!userProfile) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.profileView}>
      {/* Player Info */}
      <View style={styles.playerView}>
        <View style={styles.playerText}>
          <View style={styles.playerNameView}>
            <Image source={{ uri: userProfile.teamLogo }} style={styles.teamImg} />
            <Text style={styles.playerName}>
              {userProfile.firstName} {userProfile.lastName}
            </Text>
          </View>
          <View style={styles.playerStats}>
            <Text style={styles.statDesc}>Plays For: <Text style={styles.statContent}>{userProfile.teamName}</Text></Text>
            <Text style={styles.statDesc}>Position: <Text style={styles.statContent}>{userProfile.mostFrequentPosition}</Text></Text>
          </View>
        </View>
        <Image source={{ uri: userProfile.pictureUrl }} style={styles.playerImg} />
      </View>

      {/* Current Squad Button */}
      <View style={styles.currentSquadView}>
        <TouchableOpacity 
          style={styles.currentSquadButton} 
          onPress={() => setPopUp({ type: "team", teamName: userProfile.teamName, teamImg: userProfile.teamLogo, teamId: userProfile.teamId })}
        >
          <Text style={styles.currentSquadText}>Current {userProfile.teamName} Squad</Text>
        </TouchableOpacity>
      </View>

      {/* League Stats */}
      <View style={styles.leagueStatsView}>
        <View style={styles.leagueStatsTitleView}>
          <Image source={{ uri: userProfile.leagueLogo }} style={styles.teamImg} />
          <Text style={styles.statistics}>Statistics</Text>
        </View>
        <View style={styles.leaguePlayerStats}>
          {[
            { image: soccerBall, label: "Goals", value: userProfile.totalGoals },
            { image: soccerShot, label: "Shots", value: userProfile.totalShots },
            { image: scarf, label: "Assists", value: userProfile.totalAssists },
            { image: goalkeeper, label: "Saves", value: userProfile.totalSaves },
            { image: interception, label: "Interceptions", value: userProfile.totalInterceptions },
            { image: appearances, label: "Appearances", value: userProfile.numRows },
            { image: yellow, label: "Yellow Cards", value: userProfile.totalYellowCards },
            { image: red, label: "Red Cards", value: userProfile.totalRedCards },
          ].map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Image source={stat.image} style={styles.soccerImg} />
              <Text style={styles.soccerText}>{stat.label}: {stat.value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Highlights Section */}
      <View style={styles.scrollWrapperView}>
      <View style={styles.leagueStatsTitleView}>
        <Image source={soccerBall} style={styles.teamImg} />
        <Text style={styles.scrollWrapperHeader}>Match Highlights</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.topGoalScorersScroll}>
        {highlights.map((item, index) => (
          <View key={index} style={styles.highlightView}>
            <TouchableOpacity>
              <View style={styles.videoContainer}>
                <Video
                  source={{ uri: item.highlight_url }}
                  style={styles.videoPlayer}
                  useNativeControls  // Enables play/pause buttons
                  resizeMode="cover"
                  shouldPlay={false}  // Video starts only when tapped
                />
              </View>
            </TouchableOpacity>
            <Text style={styles.highlightParagraph} numberOfLines={1} ellipsizeMode="tail">
              {`Type: ${item.highlight_type}`}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
      </ScrollView>

    );
    };

const styles = StyleSheet.create({
  profileView: { padding: 10, marginTop: 20 },
  playerView: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 },
  playerText: { flex: 1, paddingLeft: 10 },
  teamImg: { width: 50, height: 50 },
  playerImg: { width: 130, height: 130, borderRadius: 75, marginLeft: 10 },
  playerNameView: { flexDirection: "row", alignItems: "center" },
  playerName: { marginLeft: 10, fontSize: 30, color: "#495464", fontFamily: "Jersey20", flexWrap: "wrap" },
  playerStats: { fontFamily: "Jersey20", marginTop: 10 },
  statDesc: { fontSize: 20, color: "#495464", marginRight: 10 },
  statContent: { fontSize: 20, fontWeight: "bold", color: "#495464" },
  currentSquadView: { marginTop: 20, alignItems: "center" },
  currentSquadButton: { backgroundColor: "#E8E8E8", paddingVertical: 15, paddingHorizontal: 30, borderRadius: 15, elevation: 8 },
  currentSquadText: { fontSize: 20, color: "#495464" },
  leagueStatsView: { padding: 10, marginTop: 20 },
  leagueStatsTitleView: { flexDirection: "row", alignItems: "center" },
  statistics: { marginLeft: 10, fontSize: 23, color: "#495464", fontFamily: "Jersey20" },
  leaguePlayerStats: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  statItem: { width: "33%", alignItems: "center", marginBottom: 10 },
  soccerImg: { width: 50, height: 50, marginBottom: 10 },
  soccerText: { fontSize: 18, textAlign: "center", color: "#495464" },
  loadingText: { textAlign: "center", marginTop: 20, fontSize: 18, color: "gray" },
  scrollWrapperView: {
    marginTop: 20,
    width: "100%",
    marginBottom:100
  },
  scrollWrapperHeader: {
    fontFamily: "Jersey20",
    color: "#495464",
    padding: 20,
    fontSize: 23,
  },
  noDataText: {
    fontFamily: "Jersey20",
    color: "#7e8b9e",
    fontSize: 20,
    textAlign: "left",
    paddingLeft:20,
    marginTop: 20,
  },
  topScorersParagraph: {
    fontFamily: "Jersey20",
    color: "#495464",
    marginTop: 10,
    fontSize: 20,
    textAlign: "center",
  },
  playerView: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    paddingLeft: 10,
  },
  highlightView: {
    flexDirection: "column", 
    alignItems: "center", 
    justifyContent: "flex-start",
    paddingLeft: 10,
    height: 140,
    marginRight: 60,
    width: 150,
  },
  videoContainer: { overflow: 'hidden', borderRadius: 10, marginLeft: 50 },
  videoPlayer: { width: 200, height: 120, borderRadius: 10 },
  highlightParagraph: { marginTop: 5, fontSize: 14, fontFamily: "Jersey20", color: "#495464"},

});

export default Profile;
