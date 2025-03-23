import {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Pressable,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

function SignupPopupModal({showSignupPopupModal, setShowSignupPopupModal}) {
  const navigation = useNavigation();

  function onCloseModal() {
    // Pass data back to ScreenA using the onGoBack callback
    //  route.params.onGoBack(dataToSendBack);
    setShowSignupPopupModal(false);
    navigation.navigate('More');
  }

  function handleSignup() {
    setShowSignupPopupModal(false);
    navigation.navigate('register');
  }

  function handleLogin() {
    setShowSignupPopupModal(false);
    navigation.navigate('login');
  }

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <View style={styles.centered_view}>
        <Modal
          visible={showSignupPopupModal}
          onRequestClose={onCloseModal}
          animationType="slide"
          presentationStyle="pageSheet">
          <View style={styles.header}>
            <Text style={styles.title}>Signup</Text>
          </View>
          {/* <ImageBackground
            source={require('../../assets/cars/road-1.jpeg')}
            resizeMode="cover"
            style={styles.image}>
            <TouchableOpacity onPress={onCloseModal} style={styles.closeModal}>
              <Text style={styles.closeModalText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.title}>GODE</Text>
            <Text style={styles.find_driveText}>Find your drive</Text>
            <TouchableOpacity
              onPress={handleSignup}
              style={styles.signupButton}
              activeOpacity={0.4}>
              <Text style={styles.signupButtonText}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleLogin}
              style={styles.loginButton}
              activeOpacity={0.4}>
              <Text style={styles.loginButtonText}>Log in</Text>
            </TouchableOpacity>
          </ImageBackground> */}
        </Modal>
      </View>
    </SafeAreaView>
  );
}

export default SignupPopupModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },

  find_driveText: {
    fontSize: 32,
    marginTop: 280,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
  },
  title: {
    margin: 'auto',
    width: 200,
    borderWidth: 5,
    borderColor: '#fff',
    marginTop: 130,
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },

  closeModal: {
    borderRadius: '50%',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    // marginTop: -10,
  },

  closeModalText: {
    fontSize: 24,
    color: '#ffffff',
  },

  centered_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  signupButton: {
    alignItems: 'center',
    backgroundColor: '#3e92cc',
    padding: 15,
    borderRadius: 8,
    margin: 10,
    marginTop: 40,
  },

  signupButtonText: {
    color: '#000000',
    fontSize: 20,
  },

  loginButton: {
    borderWidth: 1,
    borderColor: '#141414',
    alignItems: 'center',
    padding: 15,
    color: '#ffffff',
    borderRadius: 8,
    backgroundColor: '#26282a',
    margin: 10,
    marginBottom: 40,
  },

  loginButtonText: {
    color: '#ffffff',
    fontSize: 20,
  },
});
