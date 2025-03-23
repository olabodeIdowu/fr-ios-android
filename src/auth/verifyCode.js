import { useContext, useState } from "react";
import axios from "axios";
import {
  Alert,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function VerifyOTPScreen({ route: { params } }) {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [codeOne, setCodeOne] = useState("");
  const [codeTwo, setCodeTwo] = useState("");
  const [codeThree, setCodeThree] = useState("");
  const [codeFour, setCodeFour] = useState("");
  const [codeFive, setCodeFive] = useState("");
  const [codeSix, setCodeSix] = useState("");
  const [resendClick, setResendClick] = useState(false);
  const { user } = params;
  // console.log(user);

  async function verifyOtp() {
    try {
      setIsLoading(true);
      // console.log(
      //   codeOne + codeTwo + codeThree + codeFour + codeFive + codeSix
      // );
      const response = await axios({
        method: "post",
        url: `${process.env.DEV_API_URL}/users/verify-user-OTP`,
        data: {
          otp: codeOne + codeTwo + codeThree + codeFour + codeFive + codeSix,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false);
      if (!response) throw new Error("response not found");
      // console.log(response);
      navigation.navigate("login-screen");
    } catch (error) {
      setIsLoading(false);
      // console.log(
      //   error.response?.data?.error?.statusCode,
      //   error.response?.data?.message
      // );
      Alert.alert("Error", error.response?.data?.message, [{ text: "OK" }]);
    }
  }

  async function resendVerificationOTP() {
    try {
      setResendClick(true);
      const response = await axios({
        method: "post",
        url: `${process.env.DEV_API_URL}/users/send-user-verification-otp`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      // setLoading(false)
      if (!response) throw new Error("response not found");
      console.log(response?.message);
    } catch (error) {
      setIsLoading(false);
      // console.log(
      //   error.response?.data?.error?.statusCode,
      //   error.response?.data?.message
      // );
      Alert.alert("Error", error.response?.data?.message, [{ text: "OK" }]);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("register-screen");
        }}
        style={styles.ibackground}
        activeOpacity={0.4}
      >
        <MaterialCommunityIcons name="arrow-left-thin" color="#222" size={26} />
      </TouchableOpacity>

      <View style={{ flex: 0.8, justifyContent: "center" }}>
        <Text style={styles.headerText}>Enter Code</Text>
        {resendClick ? (
          <Text style={styles.secondaryHeaderText}>
            Another code was resend to{" "}
            <Text style={{ color: "#007FFF" }}>{user?.email}</Text>
          </Text>
        ) : (
          <Text style={styles.secondaryHeaderText}>
            Enter the code that was sent to{" "}
            <Text style={{ color: "#007FFF" }}>{user?.email}</Text>
          </Text>
        )}

        <View style={styles.numberContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setCodeOne(text)}
            value={codeOne}
            maxLength={1}
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setCodeTwo(text)}
            value={codeTwo}
            maxLength={1}
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setCodeThree(text)}
            value={codeThree}
            maxLength={1}
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setCodeFour(text)}
            value={codeFour}
            maxLength={1}
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setCodeFive(text)}
            value={codeFive}
            maxLength={1}
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setCodeSix(text)}
            value={codeSix}
            maxLength={1}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={verifyOtp}
          activeOpacity={0.4}
        >
          {isLoading ? (
            <View style={styles.horizontal}>
              <ActivityIndicator />
            </View>
          ) : (
            <Text style={styles.buttonText}>Verify</Text>
          )}
        </TouchableOpacity>

        <Text style={{ color: "#555", padding: 30, textAlign: "center" }}>
          We send you code to your email{" "}
          <Text style={{ color: "#007FFF" }}>{user?.email}.</Text>
          You can check your inbox.
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              color: "#444",
              fontSize: 16,
            }}
          >
            {" "}
            I didn't received the code?
          </Text>

          <TouchableOpacity onPress={resendVerificationOTP} activeOpacity={0.4}>
            <Text
              style={{
                color: "#007FFF",
                fontSize: 15,
                textDecorationLine: "underline",
              }}
            >
              Send again
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
    padding: 10,
  },
  backText: {
    color: "#222",
    fontSize: 22,
  },

  headerText: {
    color: "#222",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    margin: 10,
  },

  secondaryHeaderText: {
    color: "#777",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    margin: 15,
  },

  numberContainer: {
    flex: 0.1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 30,
  },

  input: {
    width: 48,
    height: 44,
    borderWidth: 0.2,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 6,
    textAlign: "center",
  },

  button: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#007FFF",
    padding: 15,
    color: "#ffffff",
    borderRadius: 40,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: "#c8c6c4",
    fontSize: 20,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  ibackground: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#c8c6c4",
    width: 40,
    height: 40,
    borderRadius: "50%",
  },
});
