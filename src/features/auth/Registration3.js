import { useState } from "react";
import {
  Alert,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Registration3({ navigation }) {
  const [job, setJob] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [company, setCompany] = useState("");
  const [biography, setBiography] = useState("");
  const [active, setActive] = useState("");
  const [lookingFor, setLookingFor] = useState([
    "Long-term partner",
    "Long-term, open to short",
    "Short-term, open to long",
    "Short-term fun",
    "New friends",
    "Still figuring it out",
  ]);
  const userForm = { job, nationalId, company, biography, lokkingFor: active };

  function handleLookingFor(lf) {
    setActive(lf);
  }

  function handlePersonalInfo() {
    // console.log(userForm);
    navigation.navigate("Registration5", { userForm: userForm });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Personal Information</Text>

      <View>
        <Text style={styles.label}>Biography</Text>
        <TextInput
          placeholder="Enter Your Biography"
          style={styles.input}
          onChangeText={(text) => setBiography(text)}
          value={biography}
          inputMode="text"
        />
      </View>

      <View>
        <Text style={styles.label}>Job</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setJob(text)}
          value={job}
          inputMode="text"
        />
      </View>

      <View>
        <Text style={styles.label}>Company</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setCompany(text)}
          value={company}
          inputMode="text"
        />
      </View>

      <View>
        <Text style={styles.label}>NIN</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setNationalId(text)}
          value={nationalId}
          inputMode="text"
        />
      </View>
      <View>
        <Text style={styles.label}>Looking for</Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            columnGap: 10,
            rowGap: 10,
            margin: 10,
          }}
        >
          {lookingFor.map((lf, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleLookingFor(lf)}
                style={active === lf ? styles.active : styles.inActive}
              >
                <Text style={styles.genderText}>{lf}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handlePersonalInfo}
        activeOpacity={0.4}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },

  headerText: {
    color: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    padding: 10,
    marginTop: 10,
    marginBottom: 30,
  },

  secondaryHeaderText: {
    color: "#ffffff",
    fontSize: 14,
    paddingLeft: 20,
    paddingBottom: 20,
    lineHeight: 20,
  },

  label: {
    color: "#ffffff",
    fontSize: 16,
    paddingLeft: 10,
  },

  input: {
    margin: 10,
    borderWidth: 0.2,
    padding: 15,
    backgroundColor: "#D9D9D9",
    borderRadius: 6,
  },

  active: {
    backgroundColor: "#D9A525",
    padding: 10,
    color: "#ffffff",
    padding: 6,
    borderRadius: 5,
  },

  inActive: {
    backgroundColor: "#D9D9D9",
    padding: 10,
    padding: 6,
    borderRadius: 5,
  },
  genderText: {
    fontSize: 16,
    color: "#000000",
    textAlign: "center",
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
