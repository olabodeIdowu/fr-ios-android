import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { UserContext } from "../../context/UserProvider";
import { AuthContext } from "../../context/AuthProvider";
import RNPickerSelect from "react-native-picker-select";
import { url } from "../../hooks/useUrl";

console.log(process.env.PAYSTACK_PUBLIC_KEY);

function FLWUSSDPayment({ navigation, route: { params } }) {
  const { user } = useContext(UserContext);
  const { auth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState("");
  const [ussdCode, setUSSDCode] = useState("");
  const [reference, setReference] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [isDisplayText, setIsDisplayText] = useState("");
  const [USSDPayment, setUSSDPayment] = useState({});
  const [ussdList, setUssdList] = useState([
    { name: "Guaranty Trust Bank", code: "737" },
    { name: "United Bank of Africa", code: "919" },
    { name: "Sterling Bank", code: "822" },
    { name: "Zenith Bank", code: "966" },
  ]);

  console.log(params.duration, params.plan, params.price);

  const cardInfos = {
    // email: user?.email || auth?.email,
    email: "test@user.com",
    amount: Math.round(params?.price),
    ussd: { type: ussdCode },
  };

  async function ussdCharge() {
    console.log(cardInfos);
    try {
      setIsLoading(true);
      const response = await axios({
        method: "post",
        url: `${url}/dedott/api/v1/pay-with-ussd-charge`,
        data: cardInfos,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false);
      if (!response) throw new Error("response not found");
      console.log(response?.data?.data?.data);
      setUSSDPayment(response?.data?.data?.data);
      setReference(response?.data?.data?.data?.reference);
      setDisplayText(response?.data?.data?.data?.display_text);
      setIsDisplayText(true);
      navigation.navigate("VerifyPayment", {
        reference,
        duration: params?.duration,
        plan: params?.plan,
      });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      Alert.alert("Error", error.message, [{ text: "OK" }]);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>USSD_TYPE</Text>
        <RNPickerSelect
          placeholder={{
            label: "Select Your Bank USSD",
            value: null,
            color: "#D9D9D9",
          }}
          onValueChange={(code) => setUSSDCode(code)}
          items={
            ussdList.length > 0 &&
            ussdList.map((ussd) => {
              return { label: ussd?.name, value: ussd?.code };
            })
          }
          style={pickerSelectStyles}
        />
      </View>
      {isDisplayText && (
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            padding: 32,
            color: "#ffffff",
          }}
        >
          {displayText}
        </Text>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={ussdCharge}
        activeOpacity={0.4}
      >
        {isLoading ? (
          <View style={styles.horizontal}>
            <ActivityIndicator />
          </View>
        ) : (
          <Text style={styles.buttonText}>Pay Now</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

export default FLWUSSDPayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
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

  genderContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    margin: 10,
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

  terms: {
    color: "#f5f5f5",
    fontSize: 16,
  },
  innerText: {
    color: "#F8B930",
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
