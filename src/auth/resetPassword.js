import { useNavigation } from "@react-navigation/native";
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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function ResetPasswordScreen({ route: { params } }) {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function resetPassword() {
    try {
      setIsLoading(true);
      // console.log(process.env.DEV_API_URL);
      const response = await axios({
        method: "post",
        url: `${process.env.DEV_API_URL}/users/reset-user-password`,
        data: {
          otp: otp,
          password: password,
          confirmPassword: confirmPassword,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false);
      if (!response) throw new Error("response not found");
      // console.log(response);
      navigation.navigate("Login");
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
            navigation.navigate("forgot-password-screen");
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

        <Text style={{ color: "#222", fontSize: 18 }}>Reset password</Text>
      </View>
      <View style={{ justifyContent: "center" }}>
        <View style={{ justifyContent: "center", marginTop: 20 }}>
          <Text style={styles.resetText}>Create new password</Text>
          <Text style={styles.welcomeText}>
            Your new password must be different from previous used passwords
          </Text>

          <View>
            <Text style={styles.label}>OTP</Text>
            <TextInput
              style={styles.input}
              placeholder="enter your OTP"
              onChangeText={(text) => setOtp(text)}
              value={otp}
            />
          </View>
          <View>
            <Text style={styles.label}>Set Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setPassword(text)}
              value={password}
              placeholder="password"
            />
          </View>
          <View>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
              placeholder="confirm password"
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={resetPassword}
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

  resetText: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 22,
    color: "#222",
    marginTop: 30,
  },

  input: {
    borderWidth: 0.2,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 6,
    marginTop: 10,
    marginBottom: 15,
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
