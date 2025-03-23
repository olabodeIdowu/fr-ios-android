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
import axios from "axios";
import { url } from "../../hooks/useUrl";

export default function ForgotPasswordScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  async function handleForgotPassword() {
    try {
      setIsLoading(true);
      // console.log(email, process.env.DEV_API_URL);
      // const response = await axios({
      //   method: "post",
      //   url: `${url}/dedott/api/v1/users/forgot-user-password`,
      //   data: {
      //     email: email,
      //   },
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      // setIsLoading(false);
      // if (!response) throw new Error("response not found");
      navigation.navigate("ResetPassword");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      Alert.alert("Error", "There is no user with this email address", [
        { text: "OK" },
      ]);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.backText}>&larr;</Text>
        </TouchableOpacity>
        <Text style={styles.skipText}>Forgot password</Text>
      </View>

      <View style={{ justifyContent: "center", flex: 0.7 }}>
        {/* <Text style={styles.createText}>Create new OTP</Text> */}
        <Text style={styles.welcomeText}>
          Don't worry, Enter your email and we'll send you a verification code
          to reset your password
        </Text>
        <View>
          <TextInput
            name="email"
            style={styles.input}
            placeholder="enter your email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleForgotPassword}
          activeOpacity={0.4}
        >
          {isLoading ? (
            <View style={styles.horizontal}>
              <ActivityIndicator />
            </View>
          ) : (
            <Text style={styles.buttonText}>Send</Text>
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
    flex: 0.1,
    alignItems: "center",
    justifyContent: "left",
    gap: 80,
    flexDirection: "row",
    padding: 10,
  },

  backText: {
    fontSize: 36,
    color: "#ffffff",
  },

  skipText: {
    fontSize: 16,
    margin: 10,
    color: "#ffffff",
  },

  welcomeText: {
    padding: 25,
    // textAlign: "center",
    // justifyContent: "center",
    fontSize: 18,
    color: "#ffffff",
  },
  input: {
    margin: 10,
    backgroundColor: "#ffffff",
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
