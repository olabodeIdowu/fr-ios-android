import { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { DEV_API_URL } from "@env";
import axios from "axios";
import { url } from "../../hooks/useUrl";

export default function ResetPasswordScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [emailOTP, setEmailOTP] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleResetPassword() {
    try {
      setIsLoading(true);
      // const response = await axios({
      //   method: "post",
      //   url: `${url}/dedott/api/v1/users/reset-user-password`,
      //   data: {
      //     emailOTP: emailOTP,
      //     password: password,
      //     confirmPassword: confirmPassword,
      //   },
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      // setIsLoading(false);
      // if (!response) throw new Error("response not found");
      // console.log(response);
      navigation.navigate("Login");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      Alert.alert("Error", error.message, [{ text: "OK" }]);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ForgotPassword");
          }}
        >
          <Text style={styles.backText}>&larr;</Text>
        </TouchableOpacity>

        <Text style={{ color: "#ffffff", fontSize: 18 }}>Reset password</Text>
      </View>

      <View style={{ justifyContent: "center", flex: 0.8 }}>
        <Text style={styles.welcomeText}>
          Your new password must be different from prevous used passwords
        </Text>

        <View>
          <TextInput
            style={styles.input}
            placeholder="enter your OTP"
            onChangeText={(text) => setEmailOTP(text)}
            value={emailOTP}
          />

          <TextInput
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder="password"
          />

          <TextInput
            style={styles.input}
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            placeholder="confirm password"
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleResetPassword}
          activeOpacity={0.4}
        >
          {isLoading ? (
            <View style={styles.horizontal}>
              <ActivityIndicator />
            </View>
          ) : (
            <Text style={styles.buttonText}>Create</Text>
          )}
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

  nav: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "left",
    gap: 80,
  },

  backText: {
    fontSize: 36,
    color: "#ffffff",
  },

  resetText: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 22,
    color: "#ffffff",
    marginTop: 30,
  },

  welcomeText: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 18,
    color: "#ffffff",
    padding: 25,
  },

  input: {
    width: "95%",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#D9D9D9",
    borderRadius: 6,
    fontSize: 16,
    padding: 15,
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
