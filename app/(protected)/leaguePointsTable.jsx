import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

function LeaguePointsTable() {

    return (
        <View style={styles.container}>
            <Text>League Points Table</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: height * 0.03,
    },
});

export default LeaguePointsTable;
