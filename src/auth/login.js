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
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../context/authContext';
import {url} from '../hooks/useUrl';

export default function LoginScreen({navigation, route: {params}}) {
  const {auth, setAuth} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function login() {
    try {
      // const timestamp = 730 * 60 * 60 * 1000;
      setIsLoading(true);
      console.log(email, password, process.env.DEV_API_URL, url);
      const response = await axios({
        method: 'post',
        url: `${url}/fr/api/v1/users/login-user-with-email`,
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

      navigation.navigate('home-screen');
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      Alert.alert('Error', error.message, [{text: 'OK'}]);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.nav}>
          <TouchableOpacity
            onPress={() => {
              // navigation.goBack();
            }}
            activeOpacity={0.4}>
            <MaterialCommunityIcons name="home" color="#333333" size={26} />
          </TouchableOpacity>
          <Text style={styles.loginNavText}>Log in with email</Text>
        </View>
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
        <TouchableOpacity
          onPress={() => navigation.navigate('forgot-password-screen')}
          activeOpacity={0.4}>
          <Text
            style={{
              color: '#0099FF',
              textAlign: 'right',
              marginTop: 10,
              marginRight: 10,
              marginBottom: 20,
            }}>
            Forgot password?
          </Text>
        </TouchableOpacity>
        <Pressable
          style={styles.continueButton}
          onPress={login}
          activeOpacity={0.4}>
          {isLoading ? (
            <View style={styles.horizontal}>
              <ActivityIndicator />
            </View>
          ) : (
            <Text style={styles.continueButtonText}>Continue</Text>
          )}
        </Pressable>
      </View>

      <View>
        <Text
          style={{
            color: '#333333',
            textAlign: 'center',
          }}>
          By logging in, you agree to Finders Republic Inc.'s{' '}
          <Text
            onPress={() => navigation.navigate('terms-conditions')}
            style={{
              color: '#0099FF',
              fontWeight: '700',
            }}>
            Terms of service and privacy policy
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7',
    flex: 1,
  },
  nav: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: '25%',
    marginTop: 15,
  },
  loginNavText: {
    fontSize: 18,
    color: '#333333',
    fontWeight: '600',
  },
  label: {
    paddingBlock: 5,
    fontSize: 16,
    color: '#333333',
    fontWeight: '600',
    marginLeft: 10,
  },
  input: {
    margin: 10,
    borderWidth: 0.2,
    padding: 15,
    backgroundColor: '#D9D9D9',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },

  continueButton: {
    borderWidth: 1,
    borderColor: '#ffffff',
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    padding: 15,
    color: '#ffffff',
    borderRadius: 8,
    backgroundColor: '#FF6F61',
    justifyContent: 'center',
    margin: 10,
    marginBottom: 40,
  },

  continueButtonText: {
    color: '#ffffff',
    fontSize: 20,
  },
});
