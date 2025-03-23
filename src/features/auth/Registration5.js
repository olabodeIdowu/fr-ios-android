import { useState } from "react";
import {
  Alert,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";

import RNPickerSelect from "react-native-picker-select";
import minArray from "./../../dev_data/agepreference/minArray";
import maxArray from "./../../dev_data/agepreference/maxArray";
import schoolArray from "../../dev_data/schools/school";
import languageArray from "../../dev_data/languages/languages";

export default function Registration5({ navigation, route: { params } }) {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [education, setEducation] = useState("");
  const [school, setSchool] = useState("");
  const [languages, setLanguages] = useState("");
  const agePreference = `${min}` + "-" + `${max}`;

  console.log(params.userForm);
  console.log(agePreference);

  const userForm = {
    ...params.userForm,
    education,
    school,
    languages,
    agePreference,
  };

  function handleNextStep() {
    try {
      console.log(agePreference, userForm);
      if (
        Number(agePreference.split("-")[0]) >
        Number(agePreference.split("-")[1])
      ) {
        throw Error("Minumum age can't be greater than the maximum age");
      }
      navigation.navigate("SelectInterest", { userForm: userForm });
    } catch (message) {
      alert(message);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Registration3");
        }}
      >
        <Text style={styles.backText}>&larr;</Text>
      </TouchableOpacity>

      <View>
        <Text style={styles.label}>Education</Text>
        <RNPickerSelect
          placeholder={{
            label: "Select Your Level of Education",
            value: null,
            color: "#D9D9D9",
          }}
          onValueChange={(education) => setEducation(education)}
          items={[
            { label: "High School", value: "High School" },
            { label: "Masters", value: "Masters" },
            { label: "Bachelors", value: "Bachelors" },
            { label: "In College", value: "In College" },
            { label: "PhD", value: "PhD" },
            { label: "In Grad School", value: "In Grad School" },
            { label: "Trade School", value: "Trade School" },
          ]}
          style={pickerSelectStyles}
        />
      </View>
      <View>
        <Text style={styles.label}>School</Text>
        <RNPickerSelect
          placeholder={{
            label: "Select Your School",
            value: null,
            color: "#D9D9D9",
          }}
          onValueChange={(school) => setSchool(school)}
          items={schoolArray.map((s) => {
            return { label: s, value: s };
          })}
          style={pickerSelectStyles}
        />
      </View>
      <View>
        <Text style={styles.label}>Languages</Text>
        <RNPickerSelect
          placeholder={{
            label: "Select Your Language",
            value: null,
            color: "#D9D9D9",
          }}
          onValueChange={(language) => setLanguages(language)}
          items={languageArray.map((l) => {
            return { label: l, value: l };
          })}
          style={pickerSelectStyles}
        />
      </View>

      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Text style={styles.label}>Age Preference</Text>
          <Text style={styles.label}>18-35</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 30,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Text style={styles.label}>Min Age</Text>
            <RNPickerSelect
              placeholder={{
                label: "18",
                value: null,
                color: "#D9D9D9",
              }}
              onValueChange={(min) => setMin(min)}
              items={minArray.map((min) => {
                return { label: min, value: min };
              })}
              style={pickerSelectStyles}
            />
          </View>
          <Text style={{ color: "#ffffff" }}>-</Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Text style={styles.label}>Max Age</Text>
            <RNPickerSelect
              placeholder={{
                label: "35",
                value: null,
                color: "#D9D9D9",
              }}
              onValueChange={(max) => setMax(max)}
              items={maxArray.map((max) => {
                return { label: max, value: max };
              })}
              style={pickerSelectStyles}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleNextStep}
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

  backText: {
    color: "#ffffff",
    fontSize: 36,
    marginTop: 20,
    marginBottom: 50,
    marginLeft: 10,
  },

  headerText: {
    color: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    padding: 20,
    marginTop: 20,
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
    marginTop: 60,
  },

  buttonText: {
    color: "#000000",
    fontSize: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    margin: 10,
    backgroundColor: "#D9D9D9",
    borderRadius: 6,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    color: "#222",
    // to ensure the text is never behind the icon
  },

  inputAndroid: {
    margin: 10,
    backgroundColor: "#D9D9D9",
    borderRadius: 6,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "#222",
    // to ensure the text is never behind the icon
  },
});
