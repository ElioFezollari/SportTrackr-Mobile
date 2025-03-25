import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import { getLeaguePointsTable } from "../services/leagues";
import useAuth from "../hooks/useAuth";

const { width, height } = Dimensions.get("window");
const currentDate = new Date();

function LeaguePointsTableModal({ leagueId, leagueName, leagueLogo, closeModal }) {
    
    const {auth} = useAuth();
    const [pointTable, setPointsTable] = useState([]);

    useEffect(()=>{
        const fetchLeaguePointsTable = async()=>{
            const response = await getLeaguePointsTable(leagueId, auth.accessToken);
            if (response.status === 200)
                setPointsTable(response.data.pointTable);
            else
                alert("Error Fetching Points Table");
        }

        fetchLeaguePointsTable();

    }, [leagueId])

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>✖</Text>
            </TouchableOpacity>

            <Image source={{ uri: leagueLogo }} style={styles.leagueLogo} />
            <Text style={styles.leagueName}>{leagueName}</Text>

            <View style={styles.listTeamsContainer}>
                <Text style={styles.leagueSeasonYear}>Table standings {currentDate.getFullYear()}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingTop: height * 0.03,
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
        marginTop: 30,
        backgroundColor: "#BBBFCA",
        height: height,
        width: width,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    leagueSeasonYear: {
        marginTop: 30,
        fontSize: 30,
        marginLeft: 25,
        fontFamily: "Jersey20",
        color: "#495464",
        textShadowColor: "rgba(0, 0, 0, 0.5)",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
    }
});

export default LeaguePointsTableModal;
