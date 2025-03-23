import { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

export default function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;

  const userForm = { firstName, lastName, email, password, confirmPassword };

  function handleNext() {
    navigation.navigate("RegisterScreen2", { userForm: userForm });
  }

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={styles.container}
    >
      <ScrollView>
        <View>
          <View>
            <Text style={styles.primaryText}>Lets Get Started</Text>
            <Text style={styles.secondaryText}>
              Create an account to get all the features
            </Text>

            <View>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                placeholder="enter first name"
                name="firstName"
                onChangeText={(text) => setFirstName(text)}
                value={firstName}
              />
            </View>
            <View>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                placeholder="enter last name"
                name="lastName"
                onChangeText={(text) => setLastName(text)}
                value={lastName}
              />
            </View>
            <View>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="enter your email"
                name="email"
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
            </View>
            <View>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                name="password"
                onChangeText={(text) => setPassword(text)}
                value={password}
                placeholder="password"
              />
            </View>
            <View>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                name="confirmPassword"
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
                placeholder="confirm password"
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={handleNext}
              activeOpacity={0.4}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
  },

  registerImage: {
    marginTop: 100,
    marginBottom: 50,
    width: 300,
    height: 300,
    borderRadius: 50,
    marginLeft: "auto",
    marginRight: "auto",
  },

  primaryText: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 24,
    color: "#ffffff",
    marginTop: 30,
  },

  secondaryText: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 16,
    color: "#666",
    padding: 20,
  },

  skipText: {
    fontSize: 16,
    margin: 20,
    textAlign: "right",
    color: "#ffffff",
  },

  welcomeText: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 20,
    color: "#ffffff",
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
