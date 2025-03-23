import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";

function Processed() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.done}
        source={require("./../../../assets/denied.png")}
      />
      <Text style={styles.subHeader}>Profile Denied</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          //   navigation.navigate("Processing");
        }}
        activeOpacity={0.4}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Processed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
  },

  subHeader: {
    textTransform: "uppercase",
    color: "#ffffff",
    textAlign: "center",
    fontSize: 17,
    padding: 20,
  },

  done: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 60,
  },

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
