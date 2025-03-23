import { useState } from "react";
import {
  Image,
  StyleSheet,
  Alert,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import Plus from "../subscription/Plus";
// import DedottGold from "../subscription/DedottGold";
// import DedottPlantinum from "../subscription/DedottPlantinum";
import MyPlans from "../subscription/MyPlans";

const Tab = createMaterialTopTabNavigator();

function Approved({ navigation }) {
  const [checked, setChecked] = useState(false);
  const [showPlans, setShowPlans] = useState(false);
  function toggle() {
    // const item = data[index];
    // item.checked = !item.checked;
    // setData([...data]);
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.partyPopper}
        source={require("./../../../assets/party-popper.png")}
      />
      <Text style={styles.approvedHeader}>Profile Approved</Text>

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
      <MyPlans showPlans={showPlans} setShowPlans={setShowPlans} />
    </View>
  );
}

export default Approved;

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
