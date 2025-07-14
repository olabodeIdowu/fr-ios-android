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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../../context/authContext';
import {url} from '../../hooks/useUrl';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function VerifyNIN({navigation, route: {params}}) {
  const [isLoading, setIsLoading] = useState(false);
  const [nationalID, setNationalID] = useState('');

  // console.log(params.userForm);
  const userForm = {
    ...params.userForm,
    nationalID,
    //If NIN is valid, handle nationalIDVerified === true
    nationalIDVerified: false,
  };

  function handleNext() {
    //If NIN is valid, handle  nationalIDVerified === true
    // nationalIDVerified: {
    //   type: Boolean,
    //   default: false
    // },
    navigation.navigate('Registration-4', {userForm: userForm});
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View style={{width: 100}}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            activeOpacity={0.7}
            onPress={() => {
              //  Go back to the previous screen.
              navigation.goBack();
            }}>
            <Text style={styles.backText}>&larr;</Text>
            <Text style={{color: '#333'}}>Back</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.primary_heading}>Enter Your NIN</Text>
        <TextInput
          name="nationalID"
          style={styles.input}
          onChangeText={text => setNationalID(text)}
          autoCapitalize="none"
          value={nationalID}
          placeholder="NIN"
          placeholderTextColor="#888"
          // secureTextEntry={true}
        />

        {/* <View>
          <Text
            style={{
              fontFamily: 'Avenir',
              fontSize: 14,
              color: '#333',
              marginBottom: 10,
              padding: 10,
            }}>
            We'll text you a code to confirm your number
          </Text>
        </View> */}

        <Pressable
          style={styles.continueButton}
          onPress={handleNext}
          activeOpacity={0.5}>
          {isLoading ? (
            <View style={styles.horizontal}>
              <ActivityIndicator />
            </View>
          ) : (
            <Text style={styles.continueButtonText}>Continue</Text>
          )}
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#F7F7F7',
  },

  backText: {
    fontSize: 36,
    color: '#000000',
    fontFamily: 'Avenir',
    padding: 10,
  },

  loginNavText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
  primary_heading: {
    fontFamily: 'Avenir',
    paddingBlock: 5,
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginLeft: 10,
  },
  input: {
    width: '95%',
    borderWidth: 0.2,
    padding: 15,
    backgroundColor: '#D9D9D9',
    borderRadius: 6,
    margin: 10,
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
    backgroundColor: '#8D020E',
    justifyContent: 'center',
    margin: 10,
    marginBottom: 20,
  },

  continueButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});
