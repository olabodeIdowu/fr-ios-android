import {useState} from 'react';
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
import {url} from '../../../../../hooks/useUrl';
import axios from 'axios';

export default function PopUpBlockModal({
  navigation,
  showPopupBlockModal,
  setShowPopupBlockModal,
  setShowPopupBlockingModal,
  currentChat,
}) {
  async function handleBlockUser() {
    try {
      const {data} = await axios.post(
        `${url}/fr/api/v1/users/${currentChat?.id}/users-block_user`,
        {
          isBlocked: true,
        },
      );
      console.log(data?.data?.blockedUser);
      setShowPopupBlockModal(false);
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
      visible={showPopupBlockModal}
      onRequestClose={() => {
        setShowPopupBlockModal(false);
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
              Blocking will prevent further messages from{' '}
              {currentChat?.firstName + ' ' + currentChat?.lastName}
            </Text>
            <View
              style={{
                marginTop: 20,
              }}>
              <TouchableOpacity style={styles.button} onPress={handleBlockUser}>
                <Text style={styles.buttonText}>Block</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setShowPopupBlockingModal(false);
                  setShowPopupBlockModal(false);
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
