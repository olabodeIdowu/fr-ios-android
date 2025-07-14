import {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function RegistrationScreen3({navigation, route: {params}}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // console.log(params.userForm);
  const userForm = {
    ...params.userForm,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  };

  function handleNext() {
    navigation.navigate('VerifyNINScreen', {userForm: userForm});
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar2}></View>
        <View style={styles.progressBar}></View>
        <View style={styles.progressBar3}></View>
        <View style={styles.progressBar4}></View>
        <View style={styles.progressBar5}></View>
        <View style={styles.progressBar6}></View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View>
            <View>
              <Text style={styles.primaryText}>Personal Information</Text>
              <Text style={styles.secondaryText}>
                Enter your personal information to help us to create a profile
                for you.
              </Text>

              <View>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="enter first name"
                  name="firstName"
                  onChangeText={text => setFirstName(text)}
                  value={firstName}
                />
              </View>
              <View>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="enter last name"
                  name="lastName"
                  onChangeText={text => setLastName(text)}
                  value={lastName}
                />
              </View>
              <View>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="enter your email"
                  name="email"
                  onChangeText={text => setEmail(text)}
                  value={email}
                />
              </View>
              <View>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  name="password"
                  onChangeText={text => setPassword(text)}
                  value={password}
                  placeholder="password"
                  secureTextEntry={true}
                />
              </View>
              <View>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                  style={styles.input}
                  name="confirmPassword"
                  onChangeText={text => setConfirmPassword(text)}
                  value={confirmPassword}
                  placeholder="confirm password"
                  secureTextEntry={true}
                />
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={handleNext}
                activeOpacity={0.7}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
  },

  progressBarContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    padding: 10,
    marginTop: 20,
  },

  progressBar: {
    width: 50,
    height: 5,
    backgroundColor: '#e5e5e5',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar2: {
    width: 50,
    height: 5,
    backgroundColor: '#e5e5e5',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar3: {
    width: 50,
    height: 5,
    backgroundColor: '#e5e5e5',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar4: {
    width: 50,
    height: 5,
    backgroundColor: '#e5e5e5',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar5: {
    width: 50,
    height: 5,
    backgroundColor: '#e5e5e5',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar6: {
    width: 50,
    height: 5,
    backgroundColor: '#e5e5e5',
    borderRadius: 16,
    border: '1px solid',
  },

  progressBar2: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },

  registerImage: {
    marginTop: 100,
    marginBottom: 50,
    width: 300,
    height: 300,
    borderRadius: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  primaryText: {
    fontFamily: 'Avenir',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 24,
    color: '#000000',
    marginTop: 30,
  },

  secondaryText: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 16,
    color: '#333',
    padding: 20,
  },

  skipText: {
    fontSize: 16,
    margin: 20,
    textAlign: 'right',
    color: '#ffffff',
  },

  welcomeText: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    color: '#ffffff',
  },

  label: {
    fontFamily: 'Avenir',
    color: '#333333',
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

  button: {
    alignItems: 'center',
    backgroundColor: '#8D020E',
    padding: 15,
    borderRadius: 8,
    margin: 10,
    marginTop: 40,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});
