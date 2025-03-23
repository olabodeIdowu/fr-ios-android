import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function SchoolModal({ openSchool, setOpenSchool }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openSchool}
      onRequestClose={() => setOpenSchool(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.headerFlexText}>
            <Text style={styles.headerText}>Add School</Text>
            <TouchableOpacity
              onPress={() => setOpenSchool(false)}
              style={styles.closeModal}
            >
              <Text style={styles.closeModalText}>Cancel</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Search for schools"
            inlineImageLeft="search_icon"
            inputMode="search"
          />

          <Pressable
            style={{ backgroundColor: "#0a0000", marginTop: 15 }}
            onPress={() => setOpenSchool(false)}
          >
            <Text style={styles.donotaddText}>I dont want to add a school</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    marginTop: "10%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    backgroundColor: "#0a100d",
  },
  modalView: {
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  headerFlexText: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 100,
    padding: 15,
    paddingBottom: 20,
    borderBottomWidth: 0.2,
    borderColor: "gray",
    backgroundColor: "#0a100d",
  },

  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#ffffff",
  },

  closeModalText: {
    fontSize: 20,
    color: "#D9A525",
  },

  donotaddText: {
    fontSize: 20,
    color: "#ffffff",
    padding: 15,
  },

  input: {
    borderWidth: 0.2,
    padding: 15,
    backgroundColor: "#999",
    borderRadius: 6,
    color: "#ffffff",
    fontSize: 18,
  },
});
