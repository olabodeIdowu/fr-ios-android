import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import axios from "axios";
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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function ForgotPasswordScreen({ route: { params } }) {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  async function forgotPassword() {
    try {
      setIsLoading(true);
      // console.log(email, process.env.DEV_API_URL);
      const response = await axios({
        method: "post",
        url: `${process.env.DEV_API_URL}/users/forgot-user-password`,
        data: {
          email: email,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsLoading(false);
      if (!response) throw new Error("response not found");
      navigation.navigate("reset-password-screen");
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
      <View style={styles.nav}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("login-screen");
          }}
          style={styles.ibackground}
          activeOpacity={0.4}
        >
          <MaterialCommunityIcons
            name="arrow-left-thin"
            color="#222"
            size={26}
          />
        </TouchableOpacity>
        <Text style={styles.skipText}>Forgot password</Text>
      </View>

      <Text style={{ textAlign: "center", marginTop: 50, fontSize: 22 }}>
        Create new OTP
      </Text>
      <View style={{ justifyContent: "center", flex: 0.5 }}>
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
          onPress={forgotPassword}
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
    backgroundColor: "#ffffff",
    padding: 10,
  },
  nav: {
    alignItems: "center",
    justifyContent: "left",
    gap: 80,
    flexDirection: "row",
    marginTop: 50,
  },

  backText: {
    fontSize: 22,
    color: "#222",
  },

  skipText: {
    fontSize: 16,
    margin: 10,
    textAlign: "right",
    color: "#222",
  },

  welcomeText: {
    padding: 25,
    textAlign: "center",
    justifyContent: "center",
    fontSize: 16,
    color: "#555",
  },
  input: {
    borderWidth: 0.2,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 6,
  },
  button: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#007FFF",
    padding: 15,
    color: "#ffffff",
    borderRadius: 40,
    marginTop: 60,
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
