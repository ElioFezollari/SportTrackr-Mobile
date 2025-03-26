import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions, Image, FlatList, TouchableOpacity, Modal, TextInput } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getTeamPlayersByLeague, joinTeam } from "../../services/teams";
import useAuth from "../../hooks/useAuth";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

function JoinTeam() {
    const { leagueId, leagueLogo } = useLocalSearchParams();
    const { auth } = useAuth();
    const [teams, setTeams] = useState([]);
    const [expandedTeam, setExpandedTeam] = useState(null);
    const [ password, setPassword ] = useState("");
    const [ isPasswordModal, setPasswordModal] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchTeams = async () => {
            const response = await getTeamPlayersByLeague(leagueId, auth.accessToken);
            if (response.status === 200) setTeams(response.data.teams);
            else alert("Error Fetching Teams");
        };

        fetchTeams();
    }, [leagueId]);

    const togglePlayersVisibility = (teamId) => {
        setExpandedTeam((prev) => (prev === teamId ? null : teamId));
    };

    const handleJoinTeam = async (teamId) => {
        try {
            const response = await joinTeam(teamId, { password }, auth.accessToken);
            console.log("Response:", response);
    
            if (response?.status === 200 || response?.data?.status === 200) {
                setPasswordModal(null);
                setPassword("");
                alert("Joined Team Successfully");
    
                router.push({
                    pathname: "/home",
                });
            } else {
                alert("Error joining Team");
            }
        } catch (error) {
            alert("Error joining Team");
        }
    };
    

    const loadTeams = ({ item }) => {
        const isExpanded = expandedTeam === item.id;
        const isModalOpen = isPasswordModal === item.id;

        return (
            <View style={styles.teamInfo}>
                <View style={styles.teamInfoInner}>
                    <View
                        style={styles.teamInfoLeft}
                    >
                        <Image
                            source={item.logoUrl ? { uri: item.logoUrl } : require('../../assets/defaultLogo/default_team_logo.png')}
                            style={styles.teamLogo}
                        />
                        <Text style={styles.teamName}>{item.name}</Text>
                        <TouchableOpacity onPress={() => togglePlayersVisibility(item.id)} >
                            <FontAwesome
                                name={isExpanded ? "chevron-up" : "chevron-down"}
                                size={20}
                                color="#495464"
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.teamInfoRight}>
                        <TouchableOpacity style={styles.joinTeamButton} onPress={()=>{
                            if (!item.teamVisibility) setPasswordModal(item.id);
                            else handleJoinTeam(item.id);
                        }}>
                            <Text>Join Team</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {isExpanded && (
                    <View style={styles.playersContainer}>
                        <FlatList
                            data={item.players}
                            renderItem={({ item: player }) => (
                                <View style={styles.playerItem}>
                                    <Image source={player.logoUrl ? { uri: player.logoUrl } : require('../../assets/defaultLogo/default_profile_logo.png')} style={styles.playerLogo} />
                                    <Text style={styles.playerName}>{player.name}</Text>
                                </View>
                            )}
                            keyExtractor={(player) => player.id.toString()}
                        />
                    </View>
                )}
                {isModalOpen && (
                    <Modal animationType="fade" transparent={true} onRequestClose={() => setPasswordModal(null)}>
                        <View style={styles.modalBackground}>
                            <View style={styles.passwordModal}>
                                <Image
                                    source={item.logoUrl ? { uri: item.logoUrl } : require('../../assets/defaultLogo/default_team_logo.png')}
                                    style={styles.passwordModalTeamLogo}
                                />
                                <TouchableOpacity style={styles.cancelButton} onPress={() => setPasswordModal(null)}>
                                    <Text>X</Text>
                                </TouchableOpacity>
                                <Text style={styles.modalText}>To join {item.name}, enter the password set by the team leader:</Text>
                                <TextInput
                                    style={styles.passwordInput}
                                    placeholder="Enter password"
                                    placeholderTextColor="#000"
                                    secureTextEntry
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                <View style={styles.modalButtons}>
                                    <TouchableOpacity style={styles.submitButton} onPress={() => handleJoinTeam(item.id)}>
                                        <Text style={styles.buttonText}>Join</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Image
                source={leagueLogo ? { uri: leagueLogo } : require('../../assets/defaultLogo/default_league_logo.png')}
                style={styles.logo}
            />
            <View style={styles.teamFlatListWrapper}>
                <FlatList
                    data={teams}
                    renderItem={loadTeams}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.teamListContainer}
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
    logo: {
        width: width * 0.3,
        height: width * 0.3,
        marginTop: 20,
    },
    teamFlatListWrapper: {
        flex: 1,
        width: "100%",
        marginTop: 20,
    },
    teamListContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: height * 0.1,
    },
    teamInfo: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
    teamInfoInner: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    teamInfoLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        justifyContent: "flex-start",
        width: width * 0.8,
    },
    teamInfoRight: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        justifyContent: "flex-end",
        width: "100%",
    },
    teamLogo: {
        width: width * 0.10,
        height: width * 0.10,
        marginRight: width * 0.03,
    },
    teamName: {
        fontFamily: "Jersey20",
        fontSize: width * 0.05,
        color: "#495464",
        marginRight: width * 0.01
    },
    playersContainer: {
        alignSelf: "flex-start",
        flex: 1,
        width: "100%",
        marginTop: height * 0.02,
    },
    playerItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: height * 0.01,
    },
    playerName: {
        fontFamily: "Jersey20",
        fontSize: width * 0.05,
        color: "#495464",
    },
    playerLogo: {
        width: width * 0.08,
        height: width * 0.08,
        marginLeft: width * 0.02,
    },
    joinTeamButton:{
        backgroundColor: "#76ABAE",
        borderRadius: 5,
        padding: width* 0.01
    },
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    passwordModal : {
        width: "80%",
        padding: 20,
        backgroundColor: "#495464",
        borderRadius: 10,
        alignItems: "center",
    },
    modalText : {
        fontSize: 25,
        fontFamily: "Jersey20",
        marginVertical: 10,
        color: "#E8E8E8"
    },
    passwordInput : {
        width: "80%",
        textAlign: "center",
        marginBottom: 15,
        borderRadius: 5,
        backgroundColor : "#E8E8E8",
        padding: 10
    },
    modalButtons : {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
    },
    cancelButton : {
        position: "absolute",
        top: "10",
        right : "10",
        backgroundColor: "red",
        padding: 5,
        borderRadius: 50,
    },
    buttonText : {
        backgroundColor: "#76ABAE",
        padding: 10,
        borderRadius: 5,
    },
    submitButton : {
        color: "#fff",
    },
    passwordModalTeamLogo: {
        width: width * 0.3,
        height: width * 0.3
    }
});

export default JoinTeam;
