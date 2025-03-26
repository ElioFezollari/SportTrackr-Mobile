import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { getMatchesByUser } from "../../services/match";
import useAuth from "../../hooks/useAuth";
import { decodeJWT } from "../../utilities/decode";
import default_team_logo from "../../assets/defaultLogo/deafult_team_logo.png";

function Schedule() {
  const [userId, setUserId] = useState(""); 
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();

  useEffect(() => {
    if (auth.accessToken) {
      const decodeToken = decodeJWT(auth.accessToken);
      setUserId(decodeToken?.id || "");
    }
  }, [auth.accessToken]);

  useEffect(() => {
    if (!userId) return;

    async function fetchMatches() {
      setLoading(true);
      try {
        const response = await getMatchesByUser(auth.accessToken, userId);
        setMatches(response?.data.matches || []);
      } catch (error) {
        console.error("Error fetching matches:");
      } finally {
        setLoading(false);
      }
    }

    fetchMatches();
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#495464" />
      </View>
    );
  }

  return (
    <View style={styles.scheduleContainer}>
      <Text style={styles.scheduleTitle}>Schedule</Text>
      <FlatList
        data={matches}
        keyExtractor={(item) => item.matchId?.toString() || Math.random().toString()}
        renderItem={({ item }) => (
          <View>
            <View style={styles.matchInfoContainer}>
              <Text style={styles.scheduleMatchInfo}>{new Date(item.matchTime).toDateString()}</Text>
              <Text style={styles.scheduleMatchReferee}>Referee: {item.referee || "TBD"}</Text>
            </View>

            {/* Match Card */}
            <View style={styles.scheduleMatchCard}>
              <View style={styles.homescheduleTeam}>
                <Image source={item.logo1 ? { uri: item.logo1 } : default_team_logo} style={styles.scheduleTeamLogo} />
                  <View style={styles.scheduleTeamNameColorContainer}>
                    <Text style={styles.scheduleTeamName}>{item.team1}</Text>
                    <View style={styles.colorContainer}>
                      <Text style={styles.scheduleTeamWear}>Wears:</Text>
                      <View style={[styles.colorCircle, { backgroundColor: item.homeColor }]} />
                    </View>
                  </View>
              </View>

              <Text style={styles.scheduleScore}>
                <Text style={[styles.scoreText, getScoreStyle(item.homeTeamGoal, item.awayTeamGoal, "home")]}>
                  {item.homeTeamGoal}
                </Text>
                <Text style={styles.vsText}> vs </Text>
                <Text style={[styles.scoreText, getScoreStyle(item.homeTeamGoal, item.awayTeamGoal, "away")]}>
                  {item.awayTeamGoal}
                </Text>
              </Text>


              {/* Team 2 */}
              <View style={styles.awayscheduleTeam}>
                <Image source={item.logo2 ? { uri: item.logo2 } : default_team_logo} style={styles.scheduleTeamLogo} />
                <View style={styles.scheduleTeamNameColorContainer}>
                  <Text style={styles.scheduleTeamName}>{item.team2}</Text>
                  <View style={styles.colorContainer}>
                    <Text style={styles.scheduleTeamWear}>Wears:</Text>
                    <View style={[styles.colorCircle, { backgroundColor: item.awayColor }]} />
                  </View>

                </View>
              </View>
            </View>

            {/* Separator Line */}
            <View style={styles.separator} />
          </View>
        )}
      />
    </View>
  );
}

const getScoreStyle = (homeScore, awayScore, team) => {
  if (homeScore > awayScore) {
    return team === "home" ? { color: "green", fontWeight: "bold" } : { color: "red" };
  } else if (awayScore > homeScore) {
    return team === "away" ? { color: "green", fontWeight: "bold" } : { color: "red" };
  }
  return { color: "#495464" }; // Default for ties
};


const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scheduleContainer: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  scheduleTitle: {
    fontFamily: "Jersey20",
    color: "#495464",
    fontSize: 40,
    marginTop: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  matchInfoContainer: {
    alignItems: "center",
    marginBottom: 10,
    marginTop: 20 ,

  },
  scheduleMatchInfo: {
    fontFamily: "Jersey20",
    fontSize: 20,
    color: "black",
  },
  scheduleMatchReferee: {
    fontSize: 20,
    fontFamily: "Jersey20",
    fontWeight: "bold",
    color: "#333",
  },
  scheduleMatchCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 5,
    marginVertical: 10,
    padding: 15,
    shadowOffset: { width: 0, height: 2 },
  },
  homescheduleTeam: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",

  },
  awayscheduleTeam: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    direction:"rtl"

  },
  scheduleTeamLogo: {
    width: 40,
    height: 40,
    marginBottom: 20,
    marginLeft:5,
    marginRight: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
      },
  scheduleTeamName: {
    fontFamily: "Jersey20",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    color: "#495464",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  scheduleTeamNameColorContainer: {
    flexDirection: "column",
    alignItems: "center",
    direction:"ltr"
  },  
  scheduleScore: {
    fontSize: 22,
    fontWeight: "bold",
    margin: 15
  },
  scoreText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  vsText: {
    fontFamily: "Jersey20",
    color: "black",
  },
  colorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  colorCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
  },
  scheduleTeamWear: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 5,
  },
  separator: {
    height: 1,
    backgroundColor: "#D9D9D9",
    marginHorizontal: 15,
    marginTop: 5,
  },
});

export default Schedule;
