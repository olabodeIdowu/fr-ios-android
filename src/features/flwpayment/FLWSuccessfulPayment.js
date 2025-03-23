import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import axios from "axios";

export default function FLWSuccessfulPayment({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.partyPopper}
        source={require("./../../../assets/checked 1.png")}
      />
      <Text style={styles.approvedHeader}>Payment successful</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
        activeOpacity={0.4}
      >
        <Text style={styles.buttonText}>Let's go</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
  },

  partyPopper: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 70,
  },

  approvedHeader: {
    textTransform: "uppercase",
    textAlign: "center",
    color: "#ffffff",
    fontSize: 24,
    paddingTop: 60,
  },

  approvedSubHeader: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 24,
    paddingTop: 30,
  },

  approvedText: {
    color: "#ffffff",
    fontSize: 17,
  },

  button: {
    alignItems: "center",
    backgroundColor: "#D9A525",
    padding: 15,
    borderRadius: 8,
    margin: 10,
    marginTop: 40,
  },

  buttonText: {
    color: "#000000",
    fontSize: 20,
  },
});
