import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { getLeagueStats } from "../../services/leagues";
import { getGoalHighlights, getDribbleHighlights, getSaveHighlights } from "../../services/match";
import { Video } from 'expo-av';
import useAuth from "../../hooks/useAuth";
import { ScrollView } from "react-native";
import { router } from "expo-router";

const HighlightCard = ({ imageSource, text, onPress }) => (
  <View style={styles.highlightView}>
    <TouchableOpacity onPress={onPress}>
      <Image source={imageSource} style={styles.highlightImage} />
    </TouchableOpacity>
    <Text style={styles.highlightParagraph} numberOfLines={1} ellipsizeMode="tail">
      {text}
    </Text>
  </View>
);

const VideoHighlightCard = ({ videoUrl, text }) => (
  <View style={styles.highlightView}>
    <TouchableOpacity>
      <View style={styles.videoContainer}>
        <Video
          source={{ uri: videoUrl }}
          style={styles.videoPlayer}
          useNativeControls
          resizeMode="cover"
          shouldPlay={false}
        />
      </View>
    </TouchableOpacity>
    <Text style={styles.highlightParagraph} numberOfLines={1} ellipsizeMode="tail">
      {text}
    </Text>
  </View>
);

function Home() {
  const { auth } = useAuth();
  const [topGoalScorers, setTopGoalScorers] = useState([]);
  const [goalHighlights, setGoalHighlights] = useState([]);
  const [saveHighlights, setSaveHighlights] = useState([]);
  const [dribbleHighlights, setDribbleHighlights] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [leagueStats, goalStats, saveStats, dribbleStats] = await Promise.all([
          getLeagueStats(auth.accessToken),
          getGoalHighlights(auth.accessToken),
          getSaveHighlights(auth.accessToken),
          getDribbleHighlights(auth.accessToken),
        ]);
        setTopGoalScorers(leagueStats.data.topGoalScorers);
        setGoalHighlights(goalStats.data);
        setSaveHighlights(saveStats.data);
        setDribbleHighlights(dribbleStats.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, [auth.accessToken]);

  return (
    <ScrollView style={styles.homeView}>
      <View style={styles.scrollWrapperView}>
        <Text style={styles.scrollWrapperHeader}>Top scorers this week</Text>
        {topGoalScorers.length === 0 ? (
          <Text style={styles.noDataText}>
            No top scorers available at the moment
          </Text>
        ) : (
          <ScrollView
            horizontal={true}
            style={styles.topGoalScorersScroll}
            showsHorizontalScrollIndicator={false}
          >
            {topGoalScorers.map((player, index) => (
              <TouchableOpacity
                key={player.userId}
                onPress={() => router.push({ pathname: '/profile', params: { id: player.userId } })}
              >
                <View style={[styles.playerView, index === topGoalScorers.length - 1 && { paddingRight: 20 }]}>
                  <Image
                    source={{ uri: player.pictureUrl, cache: "reload" }}
                    style={styles.profileImage}
                  />
                  <Text style={styles.topScorersParagraph}>
                    {player.firstName} - {player.totalGoals}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      <View style={styles.scrollWrapperView}>
        <Text style={styles.scrollWrapperHeader}>Top skills this month</Text>
        <ScrollView horizontal={true} style={{ ...styles.topGoalScorersScroll, paddingLeft: 20 }} showsHorizontalScrollIndicator={false}>
        {dribbleHighlights.map((highlight, index) => (
            <VideoHighlightCard
              key={index}
              videoUrl={highlight.highlight_url}
              text={`${highlight.full_name}`}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.scrollWrapperView}>
        <Text style={styles.scrollWrapperHeader}>Top goals this month</Text>
        <ScrollView horizontal={true} style={{ ...styles.topGoalScorersScroll, paddingLeft: 20 }} showsHorizontalScrollIndicator={false}>
        {goalHighlights.map((highlight, index) => (
            <VideoHighlightCard
              key={index}
              videoUrl={highlight.highlight_url}
              text={`${highlight.full_name}`}
            />
          ))}
        </ScrollView>
      </View>

      <View style={{ ...styles.scrollWrapperView, marginBottom: 100 }}>
        <Text style={styles.scrollWrapperHeader}>Top goals this month</Text>
        <ScrollView horizontal={true} style={{ ...styles.topGoalScorersScroll, paddingLeft: 20 }} showsHorizontalScrollIndicator={false}>
          {saveHighlights.map((highlight, index) => (
            <VideoHighlightCard
              key={index}
              videoUrl={highlight.highlight_url}
              text={`${highlight.full_name}`}
            />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  homeView: {
    padding: 10,
    paddingTop: 0,
  },
  scrollWrapperView: {
    marginTop: 20,
    width: "100%",
  },
  scrollWrapperHeader: {
    fontFamily: "Jersey20",
    color: "#495464",
    padding: 20,
    fontSize: 30,
  },
  noDataText: {
    fontFamily: "Jersey20",
    color: "#7e8b9e",
    fontSize: 20,
    textAlign: "left",
    paddingLeft: 20,
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
  highlightImage: {
    width: 190,
    height: 130,
    marginBottom: 10,
    borderRadius: 10,
  },
  highlightParagraph: {
    fontFamily: "Jersey20",
    color: "#495464",
    fontSize: 16,
    textAlign: "center",
    width: 140, 
    flexShrink: 1, 
    flexWrap: "wrap", 
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: "100%",
  },
  videoContainer: { overflow: 'hidden', borderRadius: 10, marginLeft: 50 },
  videoPlayer: { width: 200, height: 120, borderRadius: 10 },
  highlightParagraph: { marginTop: 5, fontSize: 14, fontFamily: "Jersey20", color: "#495464"},
});

export default Home;
