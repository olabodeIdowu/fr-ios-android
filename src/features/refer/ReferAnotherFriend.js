import React, { useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { UserContext } from "../../context/UserProvider";

function ReferAnotherFriend({ navigation }) {
  const { user } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>WAITING FOR YOUR REFERAL</Text>
      <Text style={styles.subHeader}>
        Hey {user?.firstName} please wait patiently while the person that you
        have endorsed successfully registers and joins.
      </Text>
      <Text style={styles.primaryHeader}>Note</Text>
      <View>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Icon name="circle" size={4} color="#ffffff" />
          <Text style={styles.innerText}>
            Once the person has successfully registered a notification will be
            sent to you.
          </Text>
        </View>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Icon name="circle" size={4} color="#ffffff" />
          <Text style={styles.innerText}>
            Have access to the app once the person you referred has successfully
            registered
          </Text>
        </View>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Icon name="circle" size={4} color="#ffffff" />
          <Text style={styles.innerText}>
            After the current access to the App via referral your subsequent
            access to the app will be via subscription.
          </Text>
        </View>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Icon name="circle" size={4} color="#ffffff" />
          <Text style={styles.innerText}>
            You will not be able to access the event section of this app with
            this mode of entrance
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Referal")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Add referrals</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ReferAnotherFriend;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },

  header: {
    textTransform: "uppercase",
    color: "#ffffff",
    fontSize: 32,
    marginTop: 30,
    marginBottom: 30,
    padding: 10,
  },

  subHeader: {
    color: "#ffffff",
    fontSize: 16,
    padding: 10,
  },

  primaryHeader: {
    color: "#ffffff",
    fontSize: 24,
    padding: 10,
  },

  terms: {
    color: "#f5f5f5",
    fontSize: 16,
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
    borderWidth: 1,
    borderColor: "#Ffffff",
    padding: 15,
    marginLeft: "auto",
    marginRight: "auto",
    color: "#222",
    borderRadius: 8,
    marginTop: 70,
    marginBottom: 20,
  },

  buttonText: {
    color: "#fff",
    fontSize: 20,
  },

  innerText: {
    color: "#f5f5f5",
    fontSize: 16,
    padding: 5,
  },
});
