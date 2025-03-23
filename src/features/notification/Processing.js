import { Image, StyleSheet, Text, View, ActivityIndicator } from "react-native";

function Processing() {
  return (
    <View style={styles.container}>
      <Text>Aeaiting approval</Text>
      <View style={[styles.activityIndicatorContainer, styles.horizontal]}>
        <ActivityIndicator size="large" />
      </View>
      {/* <Text style={styles.subHeader}>Processing</Text> */}
    </View>
  );
}

export default Processing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: "center",
  },

  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },

  //   subHeader: {
  //     textTransform: "uppercase",
  //     color: "#ffffff",
  //     alignItems: "center",
  //     justifyContent: "center",
  //     fontSize: 17,
  //     padding: 20,
  //   },

  label: {
    color: "#ffffff",
    fontSize: 16,
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 10,
  },

  button: {
    width: "90%",
    alignItems: "center",
    backgroundColor: "#F8B930",
    padding: 15,
    marginLeft: "auto",
    marginRight: "auto",
    color: "#222",
    borderRadius: 8,
    marginTop: 70,
    marginBottom: 20,
  },

  buttonText: {
    color: "#000000",
    fontSize: 20,
  },

  terms: {
    color: "#f5f5f5",
    fontSize: 16,
  },
  innerText: {
    color: "#F8B930",
  },
});
