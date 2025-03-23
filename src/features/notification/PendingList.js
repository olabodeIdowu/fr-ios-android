import { useContext, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { UserContext } from "../../context/UserProvider";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyPlans from "../subscription/MyPlans";

const Tab = createMaterialTopTabNavigator();

function PendingList({ navigation }) {
  const { user } = useContext(UserContext);
  const [showPlans, setShowPlans] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>You are now on the pending list</Text>
      <Text style={styles.subHeaderText}>
        Hey {user?.firstName} the information you provided for us is been
        reviewed at the moment and this process may take up to forty eight
        hours, a notification will be sent to your {user?.email || user?.phone}
        when the verification is complete. This process also helps us to find
        your match.
      </Text>
      <Text style={styles.becomeText}>Become a member</Text>

      <View style={{ justifyContent: "center", flex: 1 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setShowPlans(true);
          }}
          activeOpacity={0.4}
        >
          <Text style={styles.buttonText}>See all plans</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.referFriendButton}
          onPress={() => {
            navigation.navigate("Referal");
          }}
          activeOpacity={0.4}
        >
          <Text style={styles.referFriendButtonText}>
            Endorse / Refer a friend
          </Text>
        </TouchableOpacity>
      </View>
      <MyPlans showPlans={showPlans} setShowPlans={setShowPlans} />
    </View>
  );
}

export default PendingList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    paddingTop: 30,
    paddingBottom: 30,
  },
  headerText: {
    textTransform: "uppercase",
    color: "#ffffff",
    padding: 10,
    fontSize: 35,
  },

  subHeaderText: {
    color: "#ffffff",
    fontSize: 16,
    padding: 10,
    lineHeight: 20,
  },

  becomeText: {
    padding: 10,
    color: "#ffffff",
    marginTop: 50,
    marginBottom: 30,
    fontSize: 22,
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

  referFriendButton: {
    borderWidth: 1,
    borderColor: "#ffffff",
    alignItems: "center",
    padding: 15,
    color: "#ffffff",
    borderRadius: 8,
    backgroundColor: "transparent",
    margin: 10,
  },

  referFriendButtonText: {
    color: "#ffffff",
    fontSize: 20,
  },

  terms: {
    color: "#f5f5f5",
    fontSize: 12,
  },
});
