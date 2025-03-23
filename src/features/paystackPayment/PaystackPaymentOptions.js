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
  Pressable,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
console.log(process.env.PAYSTACK_PUBLIC_KEY);

function PaymentOptions({ navigation, route: { params } }) {
  const [, setIsLoading] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  console.log(params.duration, params.plan, params.price);

  function handlePaymentOptions() {
    if (paymentMethod === "card") {
      navigation.navigate("CardPayment", {
        duration: params?.duration,
        plan: params?.plan,
        price: params?.price,
      });
    } else if (paymentMethod === "bank") {
      navigation.navigate("BankAccount", {
        duration: params?.duration,
        plan: params?.plan,
        price: params?.price,
      });
    } else if (paymentMethod === "transfer") {
      navigation.navigate("BankTransfer", {
        duration: params?.duration,
        plan: params?.plan,
        price: params?.price,
      });
    } else if (paymentMethod === "ussd") {
      navigation.navigate("USSD", {
        duration: params?.duration,
        plan: params?.plan,
        price: params?.price,
      });
    } else {
      navigation.navigate("MobileMoney", {
        duration: params?.duration,
        plan: params?.plan,
        price: params?.price,
      });
    }
  }
  console.log(paymentMethod);

  return (
    <View>
      <Text style={styles.primaryText}>PAYSTACK PAYMENTS OPTIONS</Text>
      <Text style={styles.secondaryText}>
        Choose your mode of payment from below options
      </Text>
      <View>
        <Pressable
          onPress={() => setPaymentMethod("card")}
          style={paymentMethod === "card" ? styles.active : styles.inActive}
        >
          <View style={styles.options}>
            <MaterialCommunityIcons
              name="credit-card"
              color="#D9A525"
              size={26}
            />
            <Text style={styles.options_name}>Card</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => setPaymentMethod("bank")}
          style={paymentMethod === "bank" ? styles.active : styles.inActive}
        >
          <View style={styles.options}>
            <MaterialCommunityIcons name="bank" color="#D9A525" size={26} />
            <Text style={styles.options_name}>Bank Account</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => setPaymentMethod("transfer")}
          style={paymentMethod === "transfer" ? styles.active : styles.inActive}
        >
          <View style={styles.options}>
            <MaterialCommunityIcons name="transfer" color="#D9A525" size={26} />
            <Text style={styles.options_name}>Bank Transfer</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => setPaymentMethod("ussd")}
          style={paymentMethod === "ussd" ? styles.active : styles.inActive}
        >
          <View style={styles.options}>
            <MaterialCommunityIcons name="numeric" color="#D9A525" size={26} />
            <Text style={styles.options_name}>USSD</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => setPaymentMethod("mobile money")}
          style={
            paymentMethod === "mobile money" ? styles.active : styles.inActive
          }
        >
          <View style={styles.options}>
            <MaterialCommunityIcons
              name="cellphone-basic"
              color="#D9A525"
              size={26}
            />
            <Text style={styles.options_name}>Mobile Money</Text>
          </View>
        </Pressable>
        <TouchableOpacity
          style={styles.button}
          onPress={handlePaymentOptions}
          activeOpacity={0.4}
        >
          <Text style={styles.buttonText}>Conitnue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PaymentOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
  },
  primaryText: {
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: 22,
    color: "#666",
    padding: 20,
  },
  secondaryText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    padding: 20,
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
  active: {
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#D9A525",
    padding: 20,
    color: "#ffffff",
    padding: 6,
    borderRadius: 5,
  },

  inActive: {
    // backgroundColor: "#D9D9D9",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    padding: 20,
    padding: 6,
    borderRadius: 5,
  },
  options: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  options_name: {
    color: "#222",
    fontSize: 18,
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
