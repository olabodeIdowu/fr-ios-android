import { useContext, useEffect, useState } from "react";
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
import axios from "axios";
import { url } from "../../hooks/useUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function VerifyOTPScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [codeOne, setCodeOne] = useState("");
  const [codeTwo, setCodeTwo] = useState("");
  const [codeThree, setCodeThree] = useState("");
  const [codeFour, setCodeFour] = useState("");
  const [codeFive, setCodeFive] = useState("");
  const [codeSix, setCodeSix] = useState("");
  const [resendClick, setResendClick] = useState(false);

  // console.log(user);

  useEffect(() => {
    async function handle() {
      const storedAppUser = JSON.parse(await AsyncStorage.getItem("user"));
      if (!storedAppUser) {
        navigation.navigate("Login");
      } else {
        //store in context
        setUser(storedAppUser);
      }
    }
    handle();
  }, []);

  async function handleVerifyOTP() {
    try {
      setIsLoading(true);
      // console.log(
      //   codeOne + codeTwo + codeThree + codeFour + codeFive + codeSix
      // );
      // const response = await axios({
      //   method: "post",
      //   url: `${url}/dedott/api/v1/users/verify-user-email-OTP`,
      //   data: {
      //     emailOTP:
      //       codeOne + codeTwo + codeThree + codeFour + codeFive + codeSix,
      //   },
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      // setIsLoading(false);
      // if (!response) throw new Error("response not found");
      navigation.navigate("Registration3");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      Alert.alert("Error", error.message, [{ text: "OK" }]);
    }
  }

  async function resendEmailVerificationOTP() {
    try {
      setResendClick(true);
      const response = await axios({
        method: "post",
        url: `${url}/dedott/api/v1/users/resend-user-verification-email`,
        data: {
          email: user?.email,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      // setLoading(false)
      if (!response) throw new Error("response not found");
      console.log(response?.message);
    } catch (error) {
      // setLoading(false)
      console.log(error);
      Alert.alert("Error", error.message, [{ text: "OK" }]);
    }
  }

  return (
    <View style={styles.container}>
      <Text
        onPress={() => {
          navigation.navigate("ForgotPin");
        }}
        style={styles.backText}
      >
        &larr;
      </Text>
      <View style={{ flex: 0.8, justifyContent: "center" }}>
        <Text style={styles.headerText}>Enter Code</Text>
        {resendClick ? (
          <Text style={styles.secondaryHeaderText}>
            Another code was resend to {user?.email}
          </Text>
        ) : (
          <Text style={styles.secondaryHeaderText}>
            Enter the code that was sent to {user?.email}
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
          onPress={handleVerifyOTP}
          //onPress={() => navigation.navigate("Registration3")}
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

        <Text style={{ color: "#ffffff", padding: 30, textAlign: "center" }}>
          We send you code to your email {user?.email}. You can check your
          inbox.
        </Text>
        <View
          style={{ flexDirection: "row", justifyContent: "center", gap: 5 }}
        >
          <Text
            style={{
              color: "#ffffff",
            }}
          >
            I didn't received the code?
          </Text>

          <Text
            onPress={resendEmailVerificationOTP}
            style={{ color: "#D9A525" }}
          >
            Send again
          </Text>
        </View>
      </View>
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
    marginLeft: 10,
  },

  headerText: {
    color: "#ffffff",
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
    backgroundColor: "#D9D9D9",
    borderRadius: 6,
    textAlign: "center",
  },

  button: {
    width: "95%",
    alignItems: "center",
    backgroundColor: "#D9A525",
    padding: 15,
    marginLeft: "auto",
    marginRight: "auto",
    color: "#222",
    borderRadius: 8,
    marginTop: 20,
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
