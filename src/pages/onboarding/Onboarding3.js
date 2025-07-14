import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Onboarding3({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Image
          style={styles.logo}
          source={require('./../../../assets/FRREDLOGO.jpg')}
        />
        <Text style={styles.subtitle}>Finders Republic</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Registration-1');
        }}
        activeOpacity={0.7}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>or sign up with</Text>
      {/* <TouchableOpacity
        style={styles.linkedinButton}
        onPress={() => {
          navigation.navigate('Linkedlin');
        }}
       activeOpacity={0.7}>
        <Text style={styles.buttonText}>Sign up with Linkedin</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.appleButton} activeOpacity={0.4}>
        <MaterialCommunityIcons name="apple" color="#fff" size={26} />
        <Text style={styles.buttonText}>Continue with Apple</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleButton} activeOpacity={0.4}>
        <MaterialCommunityIcons name="google" color="#2e3135" size={26} />
        <Text style={styles.buttonText}>Continue with Google</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
  },
  //   main: {
  //     flex: 1,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     maxWidth: 960,
  //     marginHorizontal: 'auto',
  //   },
  skipText: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'right',
    color: '#ffffff',
  },
  orText: {
    fontFamily: 'Avenir',
    fontSize: 16,
    fontWeight: '400',
    margin: 10,
    textAlign: 'center',
    color: '#333333',
  },

  logo: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 100,
    height: 100,
  },

  subtitle: {
    fontFamily: 'Avenir',
    // margin: 'auto',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
  },

  button: {
    width: '90%',
    alignItems: 'center',
    backgroundColor: '#8D020E',
    padding: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#ffffff',
    borderRadius: 8,
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  appleButton: {
    width: '90%',
    alignItems: 'center',
    backgroundColor: '#2e3135',
    padding: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#ffffff',
    borderRadius: 8,
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBlock: 10,
  },

  googleButton: {
    width: '90%',
    alignItems: 'center',
    backgroundColor: '#0076B2',
    padding: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#ffffff',
    borderRadius: 8,
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBlock: 10,
  },

  linkedinButton: {
    width: '90%',
    alignItems: 'center',
    backgroundColor: '#F8B930',
    padding: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#ffffff',
    borderRadius: 8,
    marginBlock: 10,
  },

  buttonText: {
    fontWeight: '700',
    fontSize: 18,
    color: '#FFFFFF',
  },
});
