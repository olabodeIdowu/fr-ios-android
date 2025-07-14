import {useContext, useState} from 'react';
// import { useConnection } from "@sendbird/uikit-react-native";
import axios from 'axios';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {AuthContext} from '../../context/AuthProvider';
import {url} from '../../hooks/useUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({navigation}) {
  // const { connect } = useConnection();
  const {auth, setAuth} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    try {
      // const timestamp = 730 * 60 * 60 * 1000;
      setIsLoading(true);
      console.log(email, password, process.env.DEV_API_URL, url);
      const response = await axios({
        method: 'post',
        url: `${url}/dedott/api/v1/users/login-user-with-email`,
        data: {
          email: email,
          password: password,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setIsLoading(false);
      if (!response) throw new Error('response not found');
      // console.log(response?.data);

      setAuth({
        userToken: response?.data?.userToken,
        refreshToken: response?.data?.refreshToken,
        user: response?.data?.data?.user,
      });

      await AsyncStorage.setItem(
        'userToken',
        JSON.stringify(response?.data?.userToken),
      );
      await AsyncStorage.setItem(
        'user',
        JSON.stringify(response?.data?.data?.user),
      );

      navigation.navigate('Dashboard');
      // navigation.navigate("SelectInterest");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      Alert.alert('Error', error.message, [{text: 'OK'}]);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.primaryText}>Welcome back!</Text>
        <Text style={styles.secondaryText}>
          Lets login for explore continues
        </Text>

        <View>
          <Text style={styles.label}>Email</Text>
          <TextInput
            name="email"
            style={styles.input}
            placeholder="enter your email"
            onChangeText={text => setEmail(text)}
            autoCapitalize="none"
            value={email}
          />
        </View>
        <View>
          <Text style={styles.label}>Password</Text>
          <TextInput
            name="password"
            style={styles.input}
            onChangeText={text => setPassword(text)}
            autoCapitalize="none"
            value={password}
            placeholder="password"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text
            style={{
              color: '#D9A525',
              textAlign: 'right',
              paddingRight: 20,
            }}>
            Forgot password
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
         
          {isLoading ? (
            <View style={styles.horizontal}>
              <ActivityIndicator />
            </View>
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
      <Text
        style={{
          marginTop: 25,
          textAlign: 'center',
          color: '#ffffff',
        }}>
        Don't have an account?
        <Text
          style={{color: '#D9A525'}}
          onPress={() => {
            navigation.navigate('Register');
          }}>
          {' '}
          Register here
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0a100d',
  },

  skipText: {
    fontSize: 16,
    margin: 20,
    textAlign: 'right',
    color: '#ffffff',
  },

  primaryText: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 24,
    color: '#ffffff',
    // marginTop: 30,
  },

  secondaryText: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 16,
    color: '#666',
    padding: 20,
  },
  label: {
    color: '#ffffff',
    fontSize: 16,
    paddingLeft: 10,
  },

  input: {
    margin: 10,
    borderWidth: 0.2,
    padding: 15,
    backgroundColor: '#D9D9D9',
    borderRadius: 6,
  },
  active: {
    backgroundColor: '#D9A525',
    padding: 10,
    color: '#ffffff',
    padding: 6,
    borderRadius: 5,
  },

  inActive: {
    backgroundColor: '#D9D9D9',
    padding: 10,
    padding: 6,
    borderRadius: 5,
  },
  genderText: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
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
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
