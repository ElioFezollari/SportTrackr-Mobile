import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getUserProfile } from "../../services/user";
import useAuth from "../../hooks/useAuth";
import { useRoute } from "@react-navigation/native";
import soccerBall from "../../assets/images/profile/soccer-ball.png";
import soccerShot from "../../assets/images/profile/soccer-shot.png";
import scarf from "../../assets/images/profile/scarf.png";
import goalkeeper from "../../assets/images/profile/goalkeeper.png";
import interception from "../../assets/images/profile/interception.png";
import appearances from "../../assets/images/profile/appearances.png";
import yellow from "../../assets/images/profile/yellow.png";
import red from "../../assets/images/profile/red.png";

const Profile = ({ passedId }) => {
  const [userProfile, setUserProfile] = useState();
  const { auth } = useAuth();
  const route = useRoute();
  const { id } = route.params;

  useEffect(() => {
    const getUser = async () => {
      try {
        const fetchedUserProfile = await getUserProfile(
          auth.accessToken,
          id || auth.decodedInfo.id
        );
        setUserProfile(fetchedUserProfile.data.userProfile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    getUser();
  }, [id, auth.accessToken, auth.decodedInfo.id]);

  return (
    userProfile && (
      <View style={styles.profileView}>
        <View style={styles.playerView}>
          <View style={styles.playerText}>
            <View style={styles.playerNameView}>
              <Image
                source={{ uri: userProfile.teamLogo }}
                style={styles.teamImg}
              />
              <Text style={styles.playerName}>
                {userProfile.firstName} {userProfile.lastName}
              </Text>
            </View>
            <View style={styles.playerStats}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.statDesc}>Plays For:</Text>
                <Text style={styles.statContent}>{userProfile.teamName}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.statDesc}>Position:</Text>
                <Text style={styles.statContent}>{userProfile.mostFrequentPosition}</Text>
              </View>
            </View>
          </View>
          <Image
            source={{ uri: userProfile.pictureUrl }}
            style={styles.playerImg}
          />
        </View>
        <View style={styles.currentSquadView}>
          <TouchableOpacity style={styles.currentSquadButton}>
            <Text style={styles.currentSquadText}>Current {userProfile.teamName} Squad</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.leagueStatsView}>
          <View style={styles.leagueStatsTitleView}>
            <Image
              source={{ uri: userProfile.leagueLogo }}
              style={styles.teamImg}
            />
            <Text style={styles.statistics}>Statistics</Text>
          </View>
          <View style={styles.leaguePlayerStats}>
            <View style={styles.statItem}>
              <Image source={soccerBall} style={styles.soccerImg} />
              <Text style={styles.soccerText}>Goals: {userProfile.totalGoals}</Text>
            </View>
            <View style={styles.statItem}>
              <Image source={soccerShot} style={styles.soccerImg} />
              <Text style={styles.soccerText}>Shots: {userProfile.totalShots}</Text>
            </View>
            <View style={styles.statItem}>
              <Image source={scarf} style={styles.soccerImg} />
              <Text style={styles.soccerText}>Assists: {userProfile.totalAssists}</Text>
            </View>
            <View style={styles.statItem}>
              <Image source={goalkeeper} style={styles.soccerImg} />
              <Text style={styles.soccerText}>Saves: {userProfile.totalSaves}</Text>
            </View>
            <View style={styles.statItem}>
              <Image source={interception} style={styles.soccerImg} />
              <Text style={styles.soccerText}>Interceptions: {userProfile.totalInterceptions}</Text>
            </View>
            <View style={styles.statItem}>
              <Image source={appearances} style={styles.soccerImg} />
              <Text style={styles.soccerText}>Appearances: {userProfile.numRows}</Text>
            </View>
            <View style={styles.statItem}>
              <Image source={yellow} style={styles.soccerImg} />
              <Text style={styles.soccerText}>Yellow Cards: {userProfile.totalYellowCards}</Text>
            </View>
            <View style={styles.statItem}>
              <Image source={red} style={styles.soccerImg} />
              <Text style={styles.soccerText}>Red Cards: {userProfile.totalRedCards}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  playerView: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  playerText: {
    flex: 1,
    paddingLeft: 10,
  },
  teamImg: {
    width: 50,
    height: 50,
  },
  playerImg: {
    width: 130,
    height: 130,
    borderRadius: 75,
    marginLeft: 10,
  },
  playerNameView: {
    flexDirection: "row",
    alignItems: "center",
  },
  playerName: {
    marginLeft: 10,
    fontSize: 30,
    color: "#495464",
    fontFamily: "Jersey20",
    flexWrap: "wrap",
  },
  playerStats: {
    fontFamily: "Jersey20",
    marginTop: 10,
  },
  currentSquadText: {
    fontFamily: "Jersey20",
    fontSize: 20,
    color: "#495464",
  },
  currentSquadView: {
    marginTop: 20,
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
  },
  currentSquadButton: {
    backgroundColor: "#E8E8E8",
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignSelf: "center",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 8,
  },
  statDesc: {
    fontFamily: "Jersey20",
    fontSize: 20,
    color: "#495464",
    marginRight: 20,
  },
  statContent: {
    fontFamily: "Jersey20",
    color: "#495464",
    fontSize: 20,
  },
  profileView: {
    padding: 10,
    marginTop: 20,
  },
  leagueStatsView: {
    padding: 10,
    marginTop: 20,
  },
  leagueStatsTitleView: {
    flexDirection: "row",
    alignItems: "center",
  },
  statistics: {
    marginLeft: 10,
    fontSize: 23,
    color: "#495464",
    fontFamily: "Jersey20",
    flexWrap: "wrap",
  },
  leaguePlayerStats: {
    marginTop: 20,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
  statItem: {
    width: "33%",
    alignItems: "center",
    marginBottom: 10,
  },
  statItemLastRow: {
    width: "50%",
    alignItems: "center",
    marginBottom: 10,
  },
  soccerImg: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  soccerText: {
    fontFamily: "Jersey20",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "normal",
    color: "#495464",
  },
});

export default Profile;
