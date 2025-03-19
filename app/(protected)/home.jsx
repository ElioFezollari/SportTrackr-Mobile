import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { getLeagueStats } from "../../services/leagues";
import useAuth from "../../hooks/useAuth";
import { ScrollView } from "react-native";

function Home() {
  const { auth } = useAuth();
  const [topGoalScorers, setTopGoalScorers] = useState([]);

  useEffect(() => {
    const fetchLeagueStats = async () => {
      try {
        const stats = await getLeagueStats(auth.accessToken);
        setTopGoalScorers(stats.data.topGoalScorers);
      } catch (error) {
        console.error("Error fetching league stats:", error);
      }
    };
    fetchLeagueStats();
  }, [auth.accessToken]);

  return (
    <View style={styles.homeView}>
      <View style={styles.topScorersView}>
        <Text style={styles.topScorersHeader}>Top Scorers this week</Text>
        <ScrollView
          horizontal={true}
          style={styles.topGoalScorersScroll}
          showsHorizontalScrollIndicator={false}
        >
          {topGoalScorers &&
            topGoalScorers.map((player, index) => {
              return (
                <View
                  key={player.userId}
                  style={[
                    styles.playerView,
                    index === topGoalScorers.length - 1
                      ? { paddingRight: 20 }
                      : null,
                  ]}
                >
                  <Image
                    source={{ uri: player.pictureUrl, cache: "reload" }}
                    style={styles.profileImage}
                  />
                  <Text style={styles.topScorersParagraph}>
                    {player.firstName}- {player.totalGoals}
                  </Text>
                </View>
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topScorersView: {
    marginTop: 20,
    width: "100%",
  },
  topScorersHeader: {
    fontFamily: "Jersey20",
    color: "#495464",
    padding: 20,
    fontSize: 30,
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
    paddingLeft: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: "100%",
  },
});

export default Home;
