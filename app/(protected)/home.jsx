import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { getLeagueStats } from "../../services/leagues";
import useAuth from "../../hooks/useAuth";
import { ScrollView } from "react-native";
import bayern from "../../assets/temp/bayern.jpg";
import monaco from "../../assets/temp/monaco.jpg";
import bologna from "../../assets/temp/bologna.jpg";
import musiala from "../../assets/temp/musiala.jpg";
import messi from "../../assets/temp/messi.jpg";
import neymar from "../../assets/temp/neymar.jpg";
import neuer from "../../assets/temp/neuer.jpg";
import neuerrm from "../../assets/temp/neuerrm.jpg";
import martinez from "../../assets/temp/martinez.webp";
import { router } from "expo-router";
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
            {topGoalScorers.map((player, index) => {
              return (
                <TouchableOpacity key={player.userId} onPress={()=>    router.push({pathname: '/profile',params: { id: player.userId,  }})}>
                <View
                  
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
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </View>
      <View style={styles.scrollWrapperView}>
      <Text style={styles.scrollWrapperHeader}>Top skills this week</Text>
        <ScrollView
          horizontal={true}
          style={{...styles.topGoalScorersScroll,paddingLeft:20}}
          showsHorizontalScrollIndicator={false}
        >
          <View style={[styles.highlightView]}>
            <Image source={musiala} style={styles.highlightImage} />
            <Text
              style={styles.highlightParagraph}j
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Musiala dismantles opposing team
            </Text>
          </View>
          <View style={[styles.highlightView]}>
            <Image source={messi} style={styles.highlightImage} />
            <Text
              style={styles.highlightParagraph}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Messi does it once more 
            </Text>
          </View>
          <View style={[styles.highlightView]}>
            <Image source={neymar} style={styles.highlightImage} />
            <Text
              style={styles.highlightParagraph}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Neymar rainbowflick against CEL
            </Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.scrollWrapperView}>
        <Text style={styles.scrollWrapperHeader}>Top goals this week</Text>
        <ScrollView
          horizontal={true}
          style={{...styles.topGoalScorersScroll,paddingLeft:20}}
          showsHorizontalScrollIndicator={false}
        >
          <View style={[styles.highlightView]}>
            <Image source={bayern} style={styles.highlightImage} />
            <Text
              style={styles.highlightParagraph}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Bayern 9th goal against Dynamo Zagreb
            </Text>
          </View>
          <View style={[styles.highlightView]}>
            <Image source={monaco} style={styles.highlightImage} />
            <Text
              style={styles.highlightParagraph}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Monaco surprises barcelona with this goal
            </Text>
          </View>
          <View style={[styles.highlightView]}>
          <Image source={bologna} style={styles.highlightImage} />
            <Text
              style={styles.highlightParagraph}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Bologna messes up against Liverpool
            </Text>
          </View>
        </ScrollView>
      </View>
      <View style={{...styles.scrollWrapperView,marginBottom:100}}>
        <Text style={styles.scrollWrapperHeader}>Top saves this week</Text>
        <ScrollView
          horizontal={true}
          style={{...styles.topGoalScorersScroll,paddingLeft:20}}
          showsHorizontalScrollIndicator={false}
        >
          <View style={[styles.highlightView]}>
            <Image source={neuer} style={styles.highlightImage} />
            <Text
              style={styles.highlightParagraph}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Neuer saves bayern again
            </Text>
          </View>
          <View style={[styles.highlightView]}>
            <Image source={neuerrm} style={styles.highlightImage} />
            <Text
              style={styles.highlightParagraph}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Neuer stops ronaldo from scoring
            </Text>
          </View>
          <View style={[styles.highlightView]}>
            <Image source={martinez} style={styles.highlightImage} />
            <Text
              style={styles.highlightParagraph}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Martinez stops french attack
            </Text>
          </View>
        </ScrollView>
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  homeView: {
    padding: 10,
    paddingTop:0,
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

  highlightImage: {
    width: 190,
    height: 130,
    marginBottom: 10,
    borderRadius:10
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
});

export default Home;
