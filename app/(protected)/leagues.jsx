import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, FlatList, Image, Dimensions, TouchableOpacity } from "react-native";
import useAuth from "../../hooks/useAuth";
import { FontAwesome } from "@expo/vector-icons";
import { getLeagues } from "../../services/leagues";
import defaultLeagueLogo from "../../assets/defaultLogo/default_league_logo.svg"; 
import { Link } from "expo-router";

const { width, height } = Dimensions.get("window");

function Leagues() {
    const { auth } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const [leagues, setLeagues] = useState([]);
    const currentDate = new Date();

    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                const res = await getLeagues(auth.accessToken);
                if (res.status === 200) setLeagues(res.data.leagues);
                else console.log(res.data.message);
            } catch (error) {
                console.error("Error fetching leagues:", error);
            }
        };
        fetchLeagues();
    }, [auth.accessToken]);

    const loadLeagues = ({ item }) => {
        const startTime = item.startTime;
        
        const startDate = startTime ? new Date(Date.parse(startTime)) : null;
    
        let started = startDate && startDate <= currentDate;
    
        return (
            <TouchableOpacity style={styles.leagueInfo}>
                <View style={styles.leagueInfoLeft}>
                    <Image 
                        source={item.logoUrl ? { uri: item.logoUrl } : defaultLeagueLogo} 
                        style={styles.leagueLogo} 
                    />
                    <Text style={styles.leagueName}>{item.leagueName}</Text>
                </View>
    
                <Text style={styles.redirectButtonText}>
                    {started ? "League has begun" : "Registration has begun"}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>

            <View style={styles.leaguesHeaderContainer}>
                <Text style={styles.heading}>Leagues</Text>
            </View>

            <View style={styles.searchContainer}>
                <FontAwesome name="search" size={20} color="#495464" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchQueryInput}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search"
                    placeholderTextColor="#495464"
                />
            </View>

            <View style={styles.flatListWrapper}>
                <FlatList
                    data={leagues}
                    renderItem={loadLeagues}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.leagueListContainer}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: height * 0.03,
    },
    heading: {
        fontFamily: "Jersey20",
        color: "#495464",
        fontSize: width * 0.1,
        textAlign: "center",
    },
    leaguesHeaderContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginBottom: height * 0.02
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: width * 0.04,
        paddingVertical: height * 0.01,
        backgroundColor: "#fff",
        width: width * 0.8,
        marginBottom: height * 0.02,
    },
    searchIcon: {
        marginRight: width * 0.02,
    },
    searchQueryInput: {
        flex: 1,
        fontSize: width * 0.04,
        color: "#000",
    },
    flatListWrapper: {
        flex: 1,
        width: "100%",
        paddingLeft: width * 0.05,
    },
    leagueListContainer: {
        alignItems: "flex-start",
        justifyContent: "flex-start",
        paddingBottom: height * 0.1,
        marginLeft: width * 0.05
    },
    leagueInfo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.015,
        width: "90%",
        marginVertical: height * 0.02,
        backgroundColor: "#ffffff",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    
    leagueInfoLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    leagueLogo: {
        width: width * 0.10,
        height: width * 0.10,
        marginRight: width * 0.03,
    },
    leagueName: {
        fontFamily: "Jersey20",
        fontSize: width * 0.06,
        color: "#495464",
    },
    redirectButtonText: {
        fontSize: width * 0.025,
        color: "#495464",
        textAlign: "center",
        padding: height * 0.008,
        borderRadius: 5,
    },
});

export default Leagues;
