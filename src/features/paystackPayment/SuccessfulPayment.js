import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";

export default function SuccessfulPayment() {
  return (
    <View>
      <Text>Veriying payments...</Text>
      <Text style={styles.headerText}>payment successful..</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
  },
  headerText: {
    color: "#777",
    textAlign: "center",
    fontSize: 14,
    margin: 15,
  },
});
