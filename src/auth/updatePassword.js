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
import { useNavigation } from "@react-navigation/native";

export default function UpdatePasswordScreen({ route: { params } }) {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function updatePassword() {
    try {
      setIsLoading(true);
      // console.log(email, process.env.DEV_API_URL);
      const response = await axios({
        method: "post",
        url: `${process.env.DEV_API_URL}/users/update-user-password`,
        data: {
          currentPassword: currentPassword,
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
      navigation.navigate("dashboard-screen");
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
            navigation.goBack();
          }}
        >
          <Text style={styles.backText}>&larr;</Text>
        </TouchableOpacity>

        <Text style={styles.skipText}>Update Password</Text>
      </View>
      <View>
        <Text style={styles.welcomeText}>
          Your new Password must be different from prevous used Passwords
        </Text>

        <View>
          <Text style={styles.label}>Current Password</Text>
          <TextInput
            style={styles.input}
            placeholder="current Password"
            onChangeText={(text) => setCurrentPassword(text)}
            value={currentPassword}
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
          <Text style={styles.label}>Set Confirm Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            placeholder="confirm Password"
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={updatePassword}
          activeOpacity={0.4}
        >
          {isLoading ? (
            <View style={styles.horizontal}>
              <ActivityIndicator />
            </View>
          ) : (
            <Text style={styles.buttonText}>Done</Text>
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
