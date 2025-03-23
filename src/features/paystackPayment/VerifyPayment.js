import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { url } from "../../hooks/useUrl";

export default function VerifyPayment({ navigation, route: { params } }) {
  const [paymentVerification, setPaymentVerification] = useState();
  const [popupVerificationModal, setPopupVerificationModal] = useState(false);
  const [myPlusPlan, setMyPlusPlan] = useState();
  const [myGoldPlan, setMyGoldPlan] = useState();
  const [myPlantinumPlan, setMyPlantinumPlan] = useState();

  useEffect(() => {
    console.log(params.reference, params.duration, params.plan);
    const referenceId = params.reference;

    console.log(referenceId);

    async function verifyPayment() {
      try {
        const response = await axios({
          method: "get",
          url: `${url}/dedott/api/v1/verify-pending-charge/${params?.reference}`,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response?.data?.data?.status === false) {
          setPopupVerificationModal(true);
          throw new Error(
            "Ensure that you're passing the reference of a transaction that exists on this integration"
          );
        }
        console.log(response?.data?.data);
        // setPaymentVerification(response);

        if (params.plan === "plus") {
          handlePlusPlan();
        } else if (params.plan === "gold") {
          handleGoldPlan();
        } else {
          handlePlantinumPlan();
        }
        navigation.navigate("SuccessfulPayment");
      } catch (error) {
        console.log(error);
        Alert.alert("Error", error.message, [{ text: "OK" }]);
      }
    }
    verifyPayment();
  }, []);

  ////////////////// PlusPlan //////////////////

  async function handlePlusPlan() {
    try {
      setIsLoading(true);
      const response = await axios({
        method: "post",
        url: `${url}/dedott/api/v1/users-plus-plan`,
        data: {
          duration: params.duration,
        },

        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsLoading(false);
      if (!response) throw new Error("response not found");
      console.log(response);
      // setMyPlusPlan(response);
      // console.log(myPlusPlan);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      Alert.alert("Error", error.message, [{ text: "OK" }]);
    }
  }

  //////////////// GoldPlan ///////////////////////

  async function handleGoldPlan() {
    try {
      setIsLoading(true);
      const response = await axios({
        method: "post",
        url: `${url}/dedott/api/v1/users-gold-plan`,
        data: {
          duration: params.duration,
        },

        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsLoading(false);
      if (!response) throw new Error("response not found");
      console.log(response);
      // setMyGoldPlan(response);
      // console.log(myGoldPlan);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      Alert.alert("Error", error.message, [{ text: "OK" }]);
    }
  }

  // ////////////// PlantinumPlan ///////////

  async function handlePlantinumPlan() {
    try {
      setIsLoading(true);
      const response = await axios({
        method: "post",
        url: `${url}/dedott/api/v1/users-plantnum-plan`,
        data: {
          duration: params.duration,
        },

        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsLoading(false);
      if (!response) throw new Error("response not found");
      console.log(response);
      // setMyPlantinumPlan(response);
      // console.log(myPlantinumPlan);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      Alert.alert("Error", error.message, [{ text: "OK" }]);
    }
  }

  return (
    <View>
      <Text>Veriying payments...</Text>
      {popupVerificationModal ? (
        <Text style={styles.headerText}>Payment verification failed</Text>
      ) : (
        <Text style={styles.headerText}>Veriying payments...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
  },
  headerText: {
    color: "#777",
    textAlign: "center",
    fontSize: 18,
    margin: 15,
  },
});
