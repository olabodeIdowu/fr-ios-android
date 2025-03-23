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
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function PurchaseEventModal({
  showPopupEventPurchaseModal,
  setShowPopupEventPurchaseModal,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showPopupEventPurchaseModal}
        onRequestClose={() => {
          setShowPopupEventPurchaseModal(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              onPress={() => {
                setShowPopupEventPurchaseModal(false);
              }}
            >
              <MaterialCommunityIcons name="close" color="#F8B930" size={26} />
            </Pressable>
            <View>
              <Text>Explore Dating App</Text>
              <Text style={styles.modalText}>
                Subscribe to Dating App and explore our special features.
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  borderWidth: 0.5,
                  borderRadius: 8,
                  padding: 10,
                }}
              >
                <MaterialCommunityIcons
                  name="circle"
                  color="#F8B930"
                  size={26}
                />
                <View>
                  <Text>Table manners everyone should know</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>10 Minute</Text>
                    <Text>FREE</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  borderWidth: 0.5,
                  borderRadius: 8,
                  padding: 10,
                }}
              >
                <MaterialCommunityIcons
                  name="circle"
                  color="#F8B930"
                  size={26}
                />
                <View>
                  <Text>1-on-1 coaching</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>HOURLY SESSION</Text>
                    <Text>$400</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.button}
                // onPress={() => {
                // }}
                activeOpacity={0.4}
              >
                <Text style={styles.buttonText}>Purchase</Text>
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
    backgroundColor: "white",
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
    color: "#000000",
    fontSize: 20,
  },
});
