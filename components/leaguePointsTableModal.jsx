import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions, Image, TouchableOpacity, FlatList } from "react-native";
import { getLeaguePointsTable } from "../services/leagues";
import useAuth from "../hooks/useAuth";

const { width, height } = Dimensions.get("window");
const currentDate = new Date();

function LeaguePointsTableModal({ leagueId, leagueName, leagueLogo, closeModal }) {
    const { auth } = useAuth();
    const [pointsTable, setPointsTable] = useState([]);

    useEffect(() => {
        const fetchLeaguePointsTable = async () => {
            try {
                const response = await getLeaguePointsTable(leagueId, auth.accessToken);
                if (response.status === 200) {
                    setPointsTable(response.data.pointsTable);
                } else {
                    alert("Error Fetching Points Table");
                }
            } catch (error) {
                console.error("Error fetching points table:", error);
                alert("Error Fetching Points Table");
            }
        };
        fetchLeaguePointsTable();
    }, [leagueId, auth.accessToken]);

    const loadLeaguePointsTable = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.teamInfo}>
                <View style={styles.teamInfoLeft}>
                    <Text style={styles.teamRank}>{index + 1}</Text>
                    <Image
                        source={item.team_logo ? { uri: item.team_logo } : require('../assets/defaultLogo/default_team_logo.png')}
                        style={styles.teamLogo}
                    />
                    <Text style={styles.teamName}>{item.team_name}</Text>
                    <Text style={styles.teamPoints}>{item.total_points}pts</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>✖</Text>
            </TouchableOpacity>

            <Image source={{ uri: leagueLogo }} style={styles.leagueLogo} />
            <Text style={styles.leagueName}>{leagueName}</Text>

            <View style={styles.listTeamsContainer}>
                <Text style={styles.leagueSeasonYear}>Table Standings {currentDate.getFullYear()}</Text>
                {pointsTable.length > 0 ? (
                    <FlatList
                        data={pointsTable}
                        renderItem={loadLeaguePointsTable}
                        keyExtractor={(item) => item.team_id.toString()}
                        contentContainerStyle={styles.teamListContainer}
                        showsVerticalScrollIndicator={false}
                        style={styles.flatList}
                    />
                ) : (
                    <Text style={styles.noDataText}>No Data Available</Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: height * 0.05,
    },
    closeButton: {
        position: "absolute",
        top: 5,
        right: 5,
        backgroundColor: "red",
        borderRadius: 20,
        padding: 5,
    },
    closeButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    leagueLogo: {
        width: width * 0.20,
        height: width * 0.20,
    },
    leagueName: {
        fontFamily: "Jersey20",
        marginTop: 10,
        fontSize: 30,
    },
    listTeamsContainer: {
        flex: 1,
        marginTop: 30,
        backgroundColor: "#BBBFCA",
        width: width,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingBottom: 20,
    },
    leagueSeasonYear: {
        marginTop: 20,
        fontSize: 30,
        marginLeft: 25,
        fontFamily: "Jersey20",
        color: "#495464",
        textShadowColor: "rgba(0, 0, 0, 0.5)",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
    },
    flatList: {
        flex: 1,
        width: "100%",
    },
    teamListContainer: {
        paddingHorizontal: width * 0.05,
        paddingBottom: height * 0.1,
    },
    teamInfo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.015,
        width: "100%",
        marginVertical: height * 0.01,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 0,
    },
    teamInfoLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    teamRank: {
        fontSize: width * 0.05,
        marginRight: width * 0.03,
        color: "#495464",
    },
    teamLogo: {
        width: width * 0.10,
        height: width * 0.10,
        marginRight: width * 0.03,
    },
    teamName: {
        fontFamily: "Jersey20",
        fontSize: width * 0.07,
        color: "#495464",
        flex: 1,
    },
    teamPoints: {
        fontFamily: "Jersey20",
        fontSize: width * 0.08,
        color: "#495464",
    },
    noDataText: {
        fontSize: 18,
        color: "#495464",
        textAlign: "center",
        marginTop: 20,
    },
});

export default LeaguePointsTableModal;