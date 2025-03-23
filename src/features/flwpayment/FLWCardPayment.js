import axios from 'axios';
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
import {openLink} from '../../utils/openurl';

let transactionId, flwRef, plan;
// console.log(process.env.PAYSTACK_PUBLIC_KEY);
function FLWCardPayment({navigation, route: {params}}) {
  // RNPaystack.init({ publicKey: process.env.PAYSTACK_PUBLIC_KEY });
  const {user} = useContext(UserContext);
  const {auth} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');

  // console.log(params.duration, params.plan, params.price);
  // fullname: "Test User",
  // email: "user@example.com",

  const cardInfos = {
    card_number: cardNumber,
    expiry_month: expiryMonth,
    expiry_year: expiryYear,
    cvv: cvv,
    currency: 'NGN',
    amount: params?.price,
    fullname: cardName,
    email: user?.email || user?.email,
  };

  async function chargeCard() {
    console.log(cardInfos);

    try {
      setIsLoading(true);
      const response = await axios({
        method: 'post',
        url: `${url}/dedott/api/v1/pay-with-card-charge`,
        data: cardInfos,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setIsLoading(false);
      if (!response) throw new Error('response not found');
      console.log(response?.data?.data);
      if (response?.data?.data?.meta?.authorization?.mode === 'pin') {
        navigation.navigate('CardPin', {
          cardInfos: cardInfos,
          plan: params.plan,
          duration: params.duration,
        });
      } else if (
        response?.data?.data?.meta?.authorization?.mode === 'avs_noauth'
      ) {
        navigation.navigate('CardAvs', {
          cardInfos: cardInfos,
          plan: params.plan,
          duration: params.duration,
        });
      } else if (
        response?.data?.data?.meta?.authorization?.mode === 'redirect'
      ) {
        // Store the transaction ID
        // so we can look it up later with the tx_ref
        flwRef = response.data.flw_ref;
        openLink(response?.data?.data?.meta?.authorization?.redirect);
      } else {
        navigation.navigate('VerifyCard', {
          plan: params.plan,
          duration: params.duration,
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
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
            onChangeText={text => setCvv(text)}
            value={cvv}
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

export default FLWCardPayment;

export function HandleUserPin({navigation, route: {params}}) {
  const [isLoading, setIsLoading] = useState();
  const [pin, setPin] = useState('');

  const authorization = {
    mode: 'pin',
    pin,
  };

  const cardInfos = {...params.cardInfos, authorization};

  async function handleUserPin() {
    console.log(cardInfos);
    try {
      setIsLoading(true);
      const response = await axios({
        method: 'post',
        url: `${url}/dedott/api/v1/handle-user-pin`,
        data: cardInfos,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setIsLoading(false);
      if (!response) throw new Error('response not found');

      console.log(response?.data?.data);

      if (response?.data?.data?.meta?.authorization?.mode === 'otp') {
        navigation.navigate('CardOtp', {
          response: response?.data?.data,
          plan: params.plan,
          duration: params.duration,
        });
      } else if (
        response?.data?.data?.meta?.authorization?.mode === 'redirect'
      ) {
        // Store the transaction ID
        // so we can look it up later with the tx_ref
        flwRef = response?.data?.data?.flw_ref;
        openLink(response?.data?.data?.meta?.authorization?.redirect);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      Alert.alert('Error', error.message, [{text: 'OK'}]);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>PIN</Text>
        <TextInput
          style={[styles.input, {textAlign: 'center'}]}
          onChangeText={text => setPin(text)}
          value={pin}
          inputMode="text"
          placeholder="Enter Pin"
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleUserPin}
        activeOpacity={0.4}>
        {isLoading ? (
          <View style={styles.horizontal}>
            <ActivityIndicator />
          </View>
        ) : (
          <Text style={styles.buttonText}>Send</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

export function HandleUserOTP({navigation, route: {params}}) {
  const [isLoading, setIsLoading] = useState();
  const [otp, setOtp] = useState('');
  console.log(params?.response?.data, params?.response?.data?.flw_ref);
  // console.log(params?.response?.data?.flw_ref);

  const cardInfos = {
    otp,
    flw_ref: params?.response?.data?.flw_ref,
  };
  async function handleUserOTP() {
    console.log(otp, cardInfos);

    try {
      setIsLoading(true);
      const response = await axios({
        method: 'post',
        url: `${url}/dedott/api/v1/validate-card-otp`,
        data: cardInfos,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setIsLoading(false);
      if (!response) throw new Error('response not found');
      console.log(response?.data?.data?.data?.status);
      if (response?.data?.data?.data?.status === 'successful') {
        navigation.navigate('VerifyCard', {
          transactionId: response?.data?.data?.data?.id,
          plan: params.plan,
          duration: params.duration,
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      Alert.alert('Error', error.message, [{text: 'OK'}]);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>OTP</Text>
        <TextInput
          style={[styles.input, {textAlign: 'center'}]}
          onChangeText={text => setOtp(text)}
          value={otp}
          inputMode="text"
          placeholder="Enter OTP"
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleUserOTP}
        activeOpacity={0.4}>
        {isLoading ? (
          <View style={styles.horizontal}>
            <ActivityIndicator />
          </View>
        ) : (
          <Text style={styles.buttonText}>validate</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

export function HandleAVSAuthorization({navigation, route: {params}}) {
  const [isLoading, setIsLoading] = useState();
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  // const [zipcode, setZipcode] = useState("");

  const authorization = {
    mode: 'avs_noauth',
    fields: [city, address, state, country],
  };

  const cardInfos = {...params.cardInfos, authorization};

  async function handleUserAVS() {
    console.log(cardInfos);
    try {
      setIsLoading(true);
      const response = await axios({
        method: 'post',
        url: `${url}/dedott/api/v1/handle-avs-auth`,
        data: cardInfos,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setIsLoading(false);
      if (!response) throw new Error('response not found');

      console.log(response);

      if (response?.data?.data?.meta?.authorization?.mode === 'otp') {
        navigation.navigate('CardOtp', {
          response: response,
          plan: params.plan,
          duration: params.duration,
        });
      } else if (
        response?.data?.data?.meta?.authorization?.mode === 'redirect'
      ) {
        flwRef = response.data.flw_ref;
        openLink(response?.data?.data?.meta?.authorization?.redirect);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      Alert.alert('Error', error.message, [{text: 'OK'}]);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setCity(text)}
          value={city}
          inputMode="text"
          placeholder="Enter City"
        />
      </View>
      <View>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setAddress(text)}
          value={address}
          inputMode="text"
          placeholder="Enter Your Address"
        />
      </View>
      <View>
        <Text style={styles.label}>State</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setState(text)}
          value={state}
          inputMode="text"
          placeholder="Enter Your State"
        />
      </View>
      <View>
        <Text style={styles.label}>Country</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setCountry(text)}
          value={country}
          inputMode="text"
          placeholder="Enter Your Country"
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleUserAVS}
        activeOpacity={0.4}>
        {isLoading ? (
          <View style={styles.horizontal}>
            <ActivityIndicator />
          </View>
        ) : (
          <Text style={styles.buttonText}>Enter</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

export function VerifyCardPayment({navigation, route: {params}}) {
  console.log(params?.plan, params.duration);
  const [popupVerificationModal, setPopupVerificationModal] = useState(false);
  const [isLoading, setIsLoading] = useState();
  // const [myPlusPlan, setMyPlusPlan] = useState();
  // const [myGoldPlan, setMyGoldPlan] = useState();
  // const [myPlantinumPlan, setMyPlantinumPlan] = useState();

  useEffect(() => {
    async function handleCardVerify() {
      try {
        setIsLoading(true);
        const response = await axios({
          method: 'post',
          url: `${url}/dedott/api/v1/verify-card`,
          data: {
            transactionId: params?.transactionId,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setIsLoading(false);
        if (!response) throw new Error('response not found');

        console.log(response);

        if (response?.data?.data?.status === false) {
          setPopupVerificationModal(true);
          throw new Error(
            "Ensure that you're passing the reference of a transaction that exists on this integration",
          );
        }

        if (params.plan === 'plus') {
          handlePlusPlan(params.duration);
        } else if (params.plan === 'gold') {
          handleGoldPlan(params.duration);
        } else {
          handlePlantinumPlan(params.duration);
        }
        navigation.navigate('FLWSuccessfulPayment');
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        Alert.alert('Error', error.message, [{text: 'OK'}]);
      }
    }
    handleCardVerify();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text>Veriying payments...</Text>
      </View>
    </View>
  );
}

export function HandleRedirectCardPayment({navigation, route: {params}}) {
  console.log(params?.plan);

  useEffect(() => {
    async function handleCardRedirect() {
      try {
        setIsLoading(true);
        const response = await axios({
          method: 'post',
          url: `${url}/dedott/api/v1/redirect`,
          data: {
            transactionId: transactionId || undefined,
            flwRef: flwRef || undefined,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setIsLoading(false);
        if (!response) throw new Error('response not found');

        console.log(response);

        if (response?.data?.data?.status === false) {
          setPopupVerificationModal(true);
          throw new Error(
            "Ensure that you're passing the reference of a transaction that exists on this integration",
          );
        }

        if (params.plan === 'plus') {
          handlePlusPlan();
        } else if (params.plan === 'gold') {
          handleGoldPlan();
        } else {
          handlePlantinumPlan();
        }
        navigation.navigate('FLWSuccessfulPayment');
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        Alert.alert('Error', error.message, [{text: 'OK'}]);
      }
    }
    handleCardRedirect();
  });

  return (
    <View style={styles.container}>
      <View>
        <Text>Veriying payments...</Text>
        {/* {popupVerificationModal ? (
          <Text style={styles.headerText}>Payment verification failed</Text>
        ) : (
          <Text style={styles.headerText}>Veriying payments...</Text>
        )} */}
      </View>
    </View>
  );
}

////////////////// PlusPlan //////////////////

async function handlePlusPlan(duration) {
  console.log('clicked plus');
  try {
    const response = await axios({
      method: 'post',
      url: `${url}/dedott/api/v1/users-plus-plan`,
      data: {
        duration: duration,
      },

      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response) throw new Error('response not found');
    console.log(response);
    // setMyPlusPlan(response);
    // console.log(myPlusPlan);
  } catch (error) {
    console.log(error);
    Alert.alert('Error', error.message, [{text: 'OK'}]);
  }
}

//////////////// GoldPlan ///////////////////////

async function handleGoldPlan(duration) {
  console.log('clicked gold');
  try {
    const response = await axios({
      method: 'post',
      url: `${url}/dedott/api/v1/users-gold-plan`,
      data: {
        duration: duration,
      },

      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response) throw new Error('response not found');
    console.log(response);
    // setMyGoldPlan(response);
    // console.log(myGoldPlan);
  } catch (error) {
    console.log(error);
    Alert.alert('Error', error.message, [{text: 'OK'}]);
  }
}

// ////////////// PlantinumPlan ///////////

async function handlePlantinumPlan(duration) {
  console.log('clicked plantinum');
  try {
    const response = await axios({
      method: 'post',
      url: `${url}/dedott/api/v1/users-plantinum-plan`,
      data: {
        duration: duration,
      },

      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response) throw new Error('response not found');
    console.log(response);
    // setMyPlantinumPlan(response);
    // console.log(myPlantinumPlan);
  } catch (error) {
    console.log(error);
    Alert.alert('Error', error.message, [{text: 'OK'}]);
  }
}

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
