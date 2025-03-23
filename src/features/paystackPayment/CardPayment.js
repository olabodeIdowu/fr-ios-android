import axios from 'axios';
// import RNPaystack from "react-native-paystack";
import {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {UserContext} from '../../context/UserProvider';
import {AuthContext} from '../../context/AuthProvider';
import {url} from '../../hooks/useUrl';

// console.log(process.env.PAYSTACK_PUBLIC_KEY);
function CardPayment({navigation, route: {params}}) {
  // RNPaystack.init({ publicKey: process.env.PAYSTACK_PUBLIC_KEY });
  const {user} = useContext(UserContext);
  const {auth} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [reference, setReference] = useState('');
  const [cardPayment, setCardPayment] = useState(null);

  console.log(params.duration, params.plan, params.price);

  useEffect(() => {
    // async function initializaTransaction() {
    //   try {
    //     setIsLoading(true);
    //     const response = await axios({
    //       method: "post",
    //   url: `${url}/dedott/api/v1/users/initiate-transaction`,
    //       data: {
    //         // email: user?.email || auth?.email,
    //         email: "test@user.com",
    //         amount: Math.round(params?.price),
    //       },
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });
    //     setIsLoading(false);
    //     console.log(response?.data?.data?.data);
    //     if (response?.data?.data?.status === true) {
    //       setAccessCode(response?.data?.data?.data?.access_code);
    //       setReference(response?.data?.data?.data?.reference);
    //     } else {
    //       throw new Error("response not found");
    //     }
    //   } catch (error) {
    //     setIsLoading(false);
    //     console.log(error);
    //     Alert.alert("Error", error.message, [{ text: "OK" }]);
    //   }
    // }
    // initializaTransaction();
  }, []);

  const cardInfos = {
    cardNumber,
    expiryMonth,
    expiryYear,
    cvc: cvc,
    accessCode,
  };

  async function chargeCard() {
    console.log(reference, cardInfos);
    setIsLoading(true);
    try {
      // const response = await RNPaystack.chargeCardWithAccessCode({
      //   cardNumber,
      //   expiryMonth,
      //   expiryYear,
      //   cvc,
      //   accessCode,
      // });
      // setIsLoading(false);
      // if (!response) throw new Error("response not found");
      // console.log(response);
      // setCardPayment(response)
      // navigation.navigate("VerifyPayment", {
      //   reference,
      //   accessCode,
      //   duration: params?.duration,
      //   plan: params?.plan,
      // });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      console.log(error.message);
      console.log(error.code);
      Alert.alert('Error', error.message, [{text: 'OK'}]);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Card Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setCardName(text)}
        value={cardName}
        inputMode="text"
        placeholder="Test1 User"
      />
      <Text style={styles.label}>Card Number</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setCardNumber(text)}
        value={cardNumber}
        placeholder="5531886652142950"
        inputMode="text"
      />

      <View
        style={{
          flexDirection: 'row',
          gap: 80,
          alignItems: 'center',
        }}>
        <View>
          <View style={{flexDirection: 'row', gap: 2, alignItems: 'center'}}>
            <View>
              <Text style={styles.label}>MM</Text>
              <TextInput
                style={{
                  padding: 10,
                  marginLeft: 20,
                  width: 40,
                  height: 40,
                  borderWidth: 0.2,
                  backgroundColor: '#D9D9D9',
                  borderRadius: 6,
                }}
                onChangeText={text => setExpiryMonth(text)}
                value={expiryMonth}
                inputMode="text"
                maxLength={2}
                placeholder="09"
              />
            </View>

            <View>
              <Text>
                {' '}
                <Text style={styles.label}>/</Text>
              </Text>
            </View>
            <View>
              <Text style={styles.label}>YY</Text>
              <TextInput
                style={{
                  padding: 10,
                  marginLeft: 20,
                  width: 40,
                  height: 40,
                  borderWidth: 0.2,
                  backgroundColor: '#D9D9D9',
                  borderRadius: 6,
                }}
                onChangeText={text => setExpiryYear(text)}
                value={expiryYear}
                inputMode="text"
                maxLength={2}
                placeholder="24"
              />
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.label}>CVV</Text>
          <TextInput
            style={{
              padding: 10,
              marginLeft: 20,
              width: '90%',
              height: '20%',
              borderWidth: 0.2,
              backgroundColor: '#D9D9D9',
              borderRadius: 6,
            }}
            onChangeText={text => setCvc(text)}
            value={cvc}
            inputMode="text"
            maxLength={3}
            placeholder="564"
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={chargeCard}
        activeOpacity={0.4}>
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

export default CardPayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
  },

  label: {
    color: '#ffffff',
    fontSize: 16,
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 10,
  },

  input: {
    marginLeft: 20,
    width: '90%',
    borderWidth: 0.2,
    padding: 15,
    backgroundColor: '#D9D9D9',
    borderRadius: 6,
    color: '#222',
  },

  genderContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    margin: 10,
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#D9A525',
    padding: 15,
    borderRadius: 8,
    margin: 10,
    marginTop: 40,
  },

  buttonText: {
    color: '#000000',
    fontSize: 20,
  },

  terms: {
    color: '#f5f5f5',
    fontSize: 16,
  },
  innerText: {
    color: '#F8B930',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
