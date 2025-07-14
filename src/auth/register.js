import {useContext, useState} from 'react';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function RegisterScreen({navigation, route: {params}}) {
  const [clickEmailSignup, setClickEmailSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const form = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  };

  async function signup() {
    try {
      setIsLoading(true);
      const response = await axios({
        method: 'post',
        url: `${process.env.DEV_API_URL}/users/signup-user-with-email`,
        data: form,
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response) throw new Error('response not found');
      setIsLoading(false);
      // console.log(response?.data?.data?.user);
      const user = response?.data?.data?.user;
      navigation.navigate('verify-OTP-screen', {user: user});
    } catch (error) {
      setIsLoading(false);
      // console.log(
      //   error.response?.data?.error?.statusCode,
      //   error.response?.data?.message
      // );
      Alert.alert('Error', error.response?.data?.message, [{text: 'OK'}]);
    }
  }
  return (
    <View style={styles.container}>
      <View>
        {clickEmailSignup === false && (
          <View style={styles.nav}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              activeOpacity={0.7}>
              <MaterialCommunityIcons
                name="arrow-left-thin"
                color="#fff"
                size={26}
              />
            </TouchableOpacity>
            <Text style={styles.signupNavText}>Sign up</Text>
          </View>
        )}

        {clickEmailSignup === false && (
          <View>
            <TouchableOpacity style={styles.appleButton} activeOpacity={0.4}>
              <MaterialCommunityIcons name="apple" color="#222" size={26} />
              <Text style={styles.appleButtonText}>Continue with Apple</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.googleButton} activeOpacity={0.4}>
              <MaterialCommunityIcons name="google" color="blue" size={26} />
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>
          </View>
        )}

        {clickEmailSignup === false && (
          <Text style={styles.emailSignupText}>Email Sign up</Text>
        )}

        {clickEmailSignup === false ? (
          <Pressable
            style={styles.emailTextContainer}
            onPress={() => setClickEmailSignup(true)}>
            <Text style={styles.emailText}>Email</Text>
          </Pressable>
        ) : (
          <View>
            <View style={styles.nav}>
              <TouchableOpacity
                onPress={() => setClickEmailSignup(false)}
                activeOpacity={0.7}>
                <MaterialCommunityIcons
                  name="arrow-left-thin"
                  color="#fff"
                  size={26}
                />
              </TouchableOpacity>
              <Text style={styles.signupNavText}>Email sign up</Text>
            </View>
            <Text style={styles.emailSignupText}>Email Sign up</Text>

            <View>
              <TextInput
                editable
                name="firstName"
                style={styles.input}
                placeholder="Ex. Olabode"
                placeholderTextColor="#888"
                onChangeText={text => setFirstName(text)}
                value={firstName}
              />
              <TextInput
                name="lastName"
                style={styles.input}
                placeholder="Ex. Idowu"
                placeholderTextColor="#888"
                onChangeText={text => setLastName(text)}
                value={lastName}
              />
              <TextInput
                name="email"
                style={styles.input}
                placeholder="example@gmail.com"
                placeholderTextColor="#888"
                onChangeText={text => setEmail(text)}
                value={email}
              />
              <TextInput
                name="password"
                style={styles.input}
                onChangeText={text => setPassword(text)}
                value={password}
                placeholder="******************"
                placeholderTextColor="#888"
              />

              <TextInput
                name="confirmPassword"
                style={styles.input}
                onChangeText={text => setConfirmPassword(text)}
                value={confirmPassword}
                placeholder="******************"
                placeholderTextColor="#888"
              />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 15,
                  marginLeft: 10,
                  marginTop: 20,
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#666',
                  paddingBottom: 10,
                }}>
                <MaterialCommunityIcons
                  onPress={() => setIsChecked(!isChecked)}
                  name="checkbox-blank-outline"
                  color="#3e92cc"
                  size={26}
                />

                <View>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 14,
                      lineHeight: '28px',
                    }}>
                    I agree with the terms of service and privacy policy
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('terms-condition-screen')
                    }
                    activeOpacity={0.7}>
                    <Text
                      style={{
                        color: '#007FFF',
                        fontSize: 18,
                      }}>
                      view terms of service and privacy policy
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 15,
                  marginLeft: 10,
                  marginTop: 20,
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#666',
                  paddingBottom: 10,
                }}>
                <MaterialCommunityIcons
                  onPress={() => setIsChecked(!isChecked)}
                  name="checkbox-blank-outline"
                  color="#3e92cc"
                  size={26}
                />

                <View>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 14,
                    }}>
                    Send me promotions and annoucemeents via email
                  </Text>
                </View>
              </View>
              <Pressable style={styles.signupButton} onPress={signup}>
                {isLoading ? (
                  <View style={styles.horizontal}>
                    <ActivityIndicator />
                  </View>
                ) : (
                  <Text style={styles.signupButtonText}>
                    Sign up with email
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        )}
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('terms-conditions')}
        activeOpacity={0.4}
        style={{
          position: 'absolute',
          right: '25%',
          bottom: '5%',
        }}>
        <Text
          style={{
            color: '#3e92cc',
            fontWeight: '700',
          }}>
          Terms of service and privacy policy
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#1A2421',
    flex: 1,
  },
  nav: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: '30%',
    marginTop: 15,
  },
  signupNavText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
  emailSignupText: {
    margin: 10,
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  emailTextContainer: {
    margin: 10,
  },
  emailText: {
    paddingBlock: 10,
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopColor: '#666',
    borderBottomColor: '#666',
  },
  header: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '800',
  },
  sub_header: {
    fontSize: 14,
    color: '#f1f2f6',
    marginBlock: 5,
    lineHeight: 20,
  },

  input: {
    margin: 10,
    borderWidth: 0.2,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
  },

  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  appleButton: {
    margin: 'auto',
    width: '80%',
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    marginTop: 40,
    marginBottom: 15,
  },

  appleButtonText: {
    color: '#000000',
    fontSize: 20,
  },

  googleButton: {
    margin: 'auto',
    width: '80%',
    borderWidth: 1,
    borderColor: '#ffffff',
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    padding: 15,
    color: '#ffffff',
    borderRadius: 8,
    backgroundColor: '#494848',
    justifyContent: 'center',
    marginBottom: 40,
  },
  googleButtonText: {
    color: '#ffffff',
    fontSize: 20,
  },
  signupButton: {
    borderWidth: 1,
    borderColor: '#ffffff',
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    padding: 15,
    color: '#ffffff',
    borderRadius: 8,
    backgroundColor: '#494848',
    justifyContent: 'center',
    margin: 10,
    marginBottom: 40,
  },

  signupButtonText: {
    color: '#ffffff',
    fontSize: 20,
  },
});
