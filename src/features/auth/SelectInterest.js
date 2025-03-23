import { useContext, useState, useEffect } from "react";
import axios from "axios";
import {
  Alert,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import passionArray from "./../../dev_data/passions/passions";
import { UserContext } from "../../context/UserProvider";
import { url } from "../../hooks/useUrl";

export default function SelectInterest({ navigation, route: { params } }) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [interestArray, setInterestArray] = useState(passionArray);
  const [passions, setPassions] = useState([]);

  // const userForm = {
  //   ...params.userForm,
  //   passions,
  // };

  function handlePassions(p, i) {
    setInterestArray((interest) => {
      return interest.map((int, index) => {
        return {
          ...int,
          active: i === index ? !int.active : int.active,
        };
      });
    });
    // setPassions(
    //   interestArray.filter((i) => i.active === true).map((i) => i.passion)
    //
  }

  // useEffect(() => {
  //   if (
  //     // passions.length <= 4 ||
  //     interestArray.filter((i) => i.active === true).length <= 4
  //   ) {
  //   }
  //   setPassions(
  //     interestArray.filter((i) => i.active === true).map((i) => i.passion)
  //   );
  // }, [passions.length === 5]);

  async function handleUpdateUser() {
    try {
      console.log(
        interestArray.filter((i) => i.active === true).map((i) => i.passion)
      );
      // console.log(userForm);
      // console.log({
      //   ...params.userForm,
      //   passions: passions,
      // });
      // setIsLoading(true);
      // const response = await axios({
      //   method: "patch",
      // url: `${url}/dedott/api/v1/users/${user?.id}/update-user`,
      //   // data: userForm,
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      // setIsLoading(false);
      // if (!response) throw new Error("response not found");
      // // console.log(response);
      navigation.navigate("Notification");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      Alert.alert("Error", error.message, [{ text: "OK" }]);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}>Select Interests</Text>
        <Text
          style={{
            color: "#ffffff",
            fontSize: 16,
            padding: 10,
          }}
        >
          You can only choose upto (5) interests
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            columnGap: 10,
            rowGap: 10,
            margin: 10,
          }}
        >
          {interestArray.map((p, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handlePassions(p, index)}
                style={p.active ? styles.active : styles.inActive}
              >
                <Text style={styles.genderText}>{p?.passion}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleUpdateUser}
          activeOpacity={0.4}
        >
          {isLoading ? (
            <View style={styles.horizontal}>
              <ActivityIndicator />
            </View>
          ) : (
            <Text style={styles.buttonText}>Next</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },

  headerText: {
    color: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    padding: 10,
    marginBottom: 10,
  },
  active: {
    backgroundColor: "#D9A525",
    borderRadius: 5,
  },

  inActive: {
    backgroundColor: "#D9D9D9",
    borderRadius: 5,
  },
  genderText: {
    padding: 10,
    color: "#ffffff",
    padding: 6,
    fontSize: 16,
    color: "#000000",
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#D9A525",
    padding: 15,
    borderRadius: 8,
    margin: 10,
    marginTop: 40,
    marginBottom: 40,
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
