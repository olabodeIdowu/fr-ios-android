import axios from "axios";
import { useContext, useState } from "react";
import {
  Alert,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import DatePicker from "react-native-modern-datepicker";
import Icon from "react-native-vector-icons/FontAwesome";
import { UserContext } from "../../context/UserProvider";
import RNPickerSelect from "react-native-picker-select";
import { url } from "../../hooks/useUrl";

export default function RegisterScreen2({ navigation, route: { params } }) {
  const { setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [gender, setGender] = useState("");
  const [referalCode, setReferalCode] = useState("");
  const keyboardVerticalOffset = Platform.OS === "ios" ? 10 : 0;

  // console.log(params.userForm);
  const userForm = {
    ...params.userForm,
    phone,
    sex: gender,
    date_of_birth: selectedDate,
    referalCode,
  };

  async function handleSignup() {
    try {
      // console.log(userForm);
      // setIsLoading(true);
      // const response = await axios({
      //   method: "post",
      //   url: `${url}/dedott/api/v1/users/signup-user-with-email`,
      //   data: userForm,
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      // setIsLoading(false);
      // if (!response) throw new Error("response not found");
      // // console.log(response?.data?.data?.user);
      // setUser(response?.data?.data?.user);
      navigation.navigate("VerifyOTP");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      Alert.alert("Error", error.message, [{ text: "OK" }]);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>More Information</Text>
      <View style={{ justifyContent: "center" }}>
        <View>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            placeholder="enter your phone"
            name="phone"
            onChangeText={(text) => setPhone(text)}
            value={phone}
          />
        </View>

        <View>
          <Text style={styles.label}>DOB</Text>
          <View style={{ position: "relative" }}>
            <Icon
              onPress={() => setOpenDate(!openDate)}
              style={{
                position: "absolute",
                top: 18,
                right: 30,
                zIndex: 100,
              }}
              name="calendar"
              size={24}
              color="#D9A525"
            />
            <TextInput
              style={styles.input}
              //   onChangeText={() => setOpenDate(!openDate)}
              value={selectedDate}
              placeholder="2023/12/14"
            />
          </View>
          {openDate && (
            <DatePicker
              options={{
                backgroundColor: "#090C08",
                textHeaderColor: "#D9A525",
                textDefaultColor: "#D9A525",
                selectedTextColor: "#fff",
                mainColor: "#D9A525",
                textSecondaryColor: "#D9A525",
                borderColor: "rgba(122, 146, 165, 0.1)",
              }}
              mode="calendar"
              style={{ borderRadius: 10 }}
              onSelectedChange={(date) => setSelectedDate(date)}
            />
          )}
        </View>
        <View>
          <Text style={styles.label}>Gender</Text>
          <RNPickerSelect
            placeholder={{
              label: "Select Your Gender",
              value: null,
              color: "#D9D9D9",
            }}
            onValueChange={(gender) => setGender(gender)}
            items={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
            ]}
            style={pickerSelectStyles}
          />
        </View>

        <View>
          <Text style={styles.label}>Referal Code (Optional)</Text>
          <TextInput
            style={styles.input}
            name="referal_code"
            onChangeText={(text) => setReferalCode(text)}
            value={referalCode}
            placeholder="referal code"
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSignup}
          // onPress={() => navigation.navigate("VerifyOTP")}
          activeOpacity={0.4}
        >
          {isLoading ? (
            <View style={styles.horizontal}>
              <ActivityIndicator />
            </View>
          ) : (
            <Text style={styles.buttonText}>Register</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text
            style={{
              marginTop: 15,
              marginBottom: 35,
              textAlign: "center",
              fontWeight: "bold",
              color: "#ffffff",
            }}
          >
            Already have an account..?
            <Text style={{ color: "#D9A525", marginLeft: 15 }}> Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
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
    marginTop: 20,
    marginBottom: 40,
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

  genderContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: 30,
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
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
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
