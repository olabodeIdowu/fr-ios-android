import axios from 'axios';
import React, {useContext, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {url} from '../../../../../hooks/useUrl';
import {AuthContext} from '../../../../../context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DeleteAccountModal({
  openDeleteAccModal,
  setOpenDeleteAccModal,
  navigation,
}) {
  const {setAuth} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  function handleCancel() {
    setOpenDeleteAccModal(false);
  }

  async function handleDelete() {
    try {
      setIsLoading(true);
      await axios({
        method: 'post',
        url: `${url}/fr/api/v1/users/delete-user`,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setIsLoading(false);
      await setAuth(null);
      await AsyncStorage.setItem('user', null);

      setOpenDeleteAccModal(false);
      navigation.navigate('Login');
    } catch (error) {
      setIsLoading(false);
      // console.log(error);
      // Alert.alert("Error", error.message, [{ text: "OK" }]);
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openDeleteAccModal}
      onRequestClose={() => setOpenDeleteAccModal(false)}
      presentationStyle="pageSheet">
      <TouchableOpacity
        style={styles.modalBackDrop}
        activeOpacity={1}
        onPress={() => setOpenDeleteAccModal(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                backgroundColor: '#fbf3f4',
                marginBottom: 20,
              }}>
              <Text
                style={{
                  color: '#333333',
                  fontSize: 16,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontFamily: 'Avenir',
                  padding: 10,
                }}>
                Delete
              </Text>
            </View>
            <View
              style={{
                width: '40rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.2rem',
              }}>
              <Text
                style={{
                  color: '#000000',
                  textAlign: 'center',
                }}>
                Are you sure you want to delete this account?
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: '1.2rem',
                  marginVertical: 20,
                }}>
                <Pressable
                  onPress={handleCancel}
                  style={{
                    backgroundColor: '#A8000E',
                    width: 100,

                    margin: 'auto',
                    borderRadius: 10,
                    marginVertical: 10,
                  }}>
                  <Text
                    style={{
                      justifyContent: 'center',
                      textAlign: 'center',
                      color: '#fff',
                      padding: 10,
                      fontFamily: 'Avenir',
                    }}>
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  onPress={handleDelete}
                  style={{
                    backgroundColor: 'transparent',
                    width: 100,
                    borderColor: '#C6C6C6',
                    borderWidth: 0.5,
                    margin: 'auto',
                    borderRadius: 10,
                    marginVertical: 10,
                  }}>
                  {isLoading ? (
                    <View style={styles.horizontal}>
                      <ActivityIndicator />
                    </View>
                  ) : (
                    <Text
                      style={{
                        justifyContent: 'center',
                        textAlign: 'center',
                        color: '#333',
                        padding: 10,
                        fontFamily: 'Avenir',
                      }}>
                      Delete
                    </Text>
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackDrop: {
    flex: 1,
    backgroundColor: `rgba(0,0,0.60)`,
  },
  centeredView: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  modalView: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  button: {
    border: 'none',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#1ed760',
    padding: 15,
    color: '#030303',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
    cursor: 'pointer',
  },
  buttonText: {
    color: '#030303',
    fontSize: 15,
  },
});
