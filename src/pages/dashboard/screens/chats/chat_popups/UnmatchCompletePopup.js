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

export default function PopUpUnmatchCompleteModal({
  navigation,
  showPopupUnmatchCompleteModal,
  setShowPopupUnmatchCompleteModal,
}) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showPopupUnmatchCompleteModal}
      onRequestClose={() => {
        setShowPopupUnmatchCompleteModal(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
            }}>
            <Pressable>
              <MaterialCommunityIcons name="close" color="#fff" size={24} />
            </Pressable>

            <Text style={styles.primaryText}>unmatched</Text>

            <TouchableOpacity
              style={styles.button}
              // onPress={() => setShowPopupBookedModal(false)}
            >
              <Text style={styles.buttonText}>Block</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  primaryText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#000000',
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

  button: {
    alignItems: 'center',
    backgroundColor: '#F8B930',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#222',
    borderRadius: 8,
  },

  buttonText: {
    textTransform: 'uppercase',
    color: '#000000',
    fontSize: 20,
  },
});
