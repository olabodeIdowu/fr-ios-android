import {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function BookedPopupModal({
  showPopupBookedModal,
  setShowPopupBookedModal,
}) {
  const [selectActive, setSelectActive] = useState('kilometers');

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        visible={showPopupBookedModal}
        onRequestClose={() => {
          setShowPopupBookedModal(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
              }}>
              <Image
                source={require('./../../../../../assets/check.png')}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 50,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              />
              <Text style={styles.primaryText}>
                Your coaching session has been booked for 12pm-1pm
              </Text>

              <Pressable
                onPress={() => {
                  setShowPopupBookedModal(false);
                }}
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
                  }}>
                  Close
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  welcomeImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#4FD18B33',
    borderRadius: 20,
    padding: 35,
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
  primaryText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  button: {
    width: '95%',
    alignItems: 'center',
    backgroundColor: '#F8B930',
    padding: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#ffffff',
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
