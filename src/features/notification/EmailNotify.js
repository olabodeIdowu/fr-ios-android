import axios from "axios";
import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function EmailNotifyModal({
  showPopupEmailModal,
  setShowPopupEmailModal,
}) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showPopupEmailModal}
        onRequestClose={() => {
          setShowPopupEmailModal(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Image
                style={{ marginLeft: "auto", marginRight: "auto" }}
                source={require("./../../../assets/email.png")}
              />
              <Text style={{ color: "#fff" }}>
                We’ll send a notification to your email (janedoe@gmail.com) when
                your account has been processed.
              </Text>

              <TouchableOpacity
                style={styles.button}
                // onPress={() => {
                // }}
                activeOpacity={0.4}
              >
                <Text style={styles.buttonText}>ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#000000",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    textTransform: "uppercase",
    color: "#000000",
    fontSize: 20,
  },
});
