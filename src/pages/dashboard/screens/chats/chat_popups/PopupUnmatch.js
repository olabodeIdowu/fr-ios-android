import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {axiosInstance} from '../../../../../hooks/useAxios';

export default function PopUpUnmatchModal({
  navigation,
  showPopupUnmatchModal,
  setShowPopupUnmatchModal,
  setShowPopupBlockingModal,
  currentChat,
}) {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    async function handle() {
      const storedAppUser = JSON.parse(await AsyncStorage.getItem('user'));
      if (!storedAppUser) {
        navigation.navigate('login');
      } else {
        //store in context
        setCurrentUser(storedAppUser);
      }
    }
    handle();
  }, []);

  async function unmatchUser() {
    try {
      const currUser = currentUser?.matches.filter(m => {
        return m?.id !== currentChat?.id;
      });

      const currChat = currentChat?.matches.filter(m => {
        return m?.id !== currentUser?.id;
      });

      // remember to access matches on current user
      const {data} = await axiosInstance.patch(
        `${url}/fr/api/v1/users/${currentUser?.id}`,
        {
          matches: currUser,
        },
      );

      // remember to access matches on current chat
      const {data2} = await axiosInstance.patch(
        `${url}/fr/api/v1/users/${currentChat?.id}`,
        {
          matches: currChat,
        },
      );

      console.log('data ', data?.data?.user);
      // update storage
      await AsyncStorage.setItem('user', JSON.stringify(data?.data?.user));

      // update context
      setAuth(auth => {
        return {
          ...auth,
          user: data?.data?.user,
        };
      });
      setShowPopupUnmatchModal(false);
      alert(data?.status);
    } catch (error) {
      console.log(
        error.response?.data?.error?.statusCode,
        error.response?.data?.message,
      );
    }
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showPopupUnmatchModal}
      onRequestClose={() => {
        setShowPopupUnmatchModal(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
            }}>
            <View style={styles.welcomeImage}>
              <MaterialCommunityIcons name="close" color="#FFF" size={44} />
            </View>

            <Text style={styles.primaryText}>
              Unmatch will prevent further interaction from{' '}
              {currentChat?.firstName + ' ' + currentChat?.lastName}
            </Text>

            <View
              style={{
                marginTop: 10,
              }}>
              <TouchableOpacity style={styles.button} onPress={unmatchUser}>
                <Text style={styles.buttonText}>Unmatch</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setShowPopupBlockingModal(false);
                  setShowPopupUnmatchModal(false);
                }}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  welcomeImage: {
    marginBottom: 30,
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: '#FF6F61',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  primaryText: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: 'semibold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    paddingBlock: 10,
    width: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: 280,
    backgroundColor: '#FF6F61',
    alignItems: 'center',
    padding: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#222',
    borderRadius: 8,
    marginBottom: 10,
  },

  buttonText: {
    textTransform: 'uppercase',
    color: '#FFFFFF',
    fontSize: 16,
  },
  cancelButton: {
    width: 280,
    borderWidth: 1,
    borderWidthColor: '#999',
    alignItems: 'center',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',

    borderRadius: 8,
    backgroundColor: 'transparent',
  },

  cancelButtonText: {
    color: '#333333',
    fontSize: 20,
  },
});
