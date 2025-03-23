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
import { url } from "../../hooks/useUrl";

console.log(process.env.PAYSTACK_PUBLIC_KEY);

function FLWPaymentWithTransfer({ navigation, route: { params } }) {
  const { user } = useContext(UserContext);
  const { auth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState("");
  const [reference, setReference] = useState("");
  const [cardPayment, setCardPayment] = useState(null);

  console.log(params.duration, params.plan, params.price);

  const cardInfos = {
    // email: user?.email || auth?.email,
    email: "test@user.com",
    amount: Math.round(params?.price),
  };

  async function paywithtransfer() {
    console.log(cardInfos);
    try {
      setIsLoading(true);
      const response = await axios({
        method: "post",
        url: `${url}/dedott/api/v1/pay-with-transfer-charge`,
        data: cardInfos,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false);
      if (!response) throw new Error("response not found");
      console.log(response);
      // setCardPayment(response);
      // navigation.navigate("VerifyPayment", {
      //   reference,
      //   accessCode,
      //   duration: params?.duration,
      //   plan: params?.plan,
      // });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      Alert.alert("Error", error.message, [{ text: "OK" }]);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={paywithtransfer}
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

export default FLWPaymentWithTransfer;

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
