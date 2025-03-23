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

function FLWMobileMoneyPayment({ navigation, route: { params } }) {
  const { user } = useContext(UserContext);
  const { auth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState("");
  const [phone, setPhone] = useState("");
  const [provider, setProvider] = useState("");
  const [reference, setReference] = useState("");
  const [providerList, setProviderList] = useState([
    { name: "MTN", code: "mtn" },
    { name: "AirtelTigo", code: "atl" },
    { name: "Vodafone", code: "vod" },
    { name: "M-Pesa", code: "mpesa" },
  ]);

  console.log(params.duration, params.plan, params.price);

  const cardInfos = {
    email: user?.email || auth?.email,
    amount: params?.price,
    mobile_money: {
      phone,
      provider,
    },
  };

  async function paywithmobilemoney() {
    console.log(reference, cardInfos);
    try {
      setIsLoading(true);
      const response = await axios({
        method: "post",
        url: `${url}/dedott/api/v1/pay-with-mobile-money-charge`,
        data: cardInfos,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false);
      if (!response) throw new Error("response not found");
      console.log(response);
      // setCardPayment(response);
      navigation.navigate("VerifyPayment", {
        reference,
        accessCode,
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
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPhone(text)}
          value={phone}
          inputMode="text"
        />
      </View>
      <View>
        <Text style={styles.label}>Provider</Text>
        <RNPickerSelect
          placeholder={{
            label: "Select Provider",
            value: null,
            color: "#D9D9D9",
          }}
          onValueChange={(provider) => setProvider(provider)}
          items={
            providerList.length > 0 &&
            providerList.map((p) => {
              return { label: p?.name, value: p?.code };
            })
          }
          style={pickerSelectStyles}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={paywithmobilemoney}
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

export default FLWMobileMoneyPayment;

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
