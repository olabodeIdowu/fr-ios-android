import {useState} from 'react';
import {Text, View, StyleSheet, Pressable, Modal} from 'react-native';

export default function ImagePickerModal({
  isVisible,
  onClose,
  onImageLibraryPress,
  onCameraPress,
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.primaryText}>
            {' '}
            You can either take a picture or select one from your gallery
          </Text>
          <Pressable
            style={styles.imageChangeButton}
            onPress={onImageLibraryPress}>
            <Text style={styles.imageChangeText}>Select from gallery</Text>
          </Pressable>
          <Pressable style={styles.imageChangeButton} onPress={onCameraPress}>
            <Text style={styles.imageChangeText}>Take a photo</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#0a100d",
  },
  primaryText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'semibold',
    borderBottomWidth: 0.2,
    borderBottomColor: '#fff',
    paddingBottom: 10,
    marginBottom: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#0a100d',
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
  imageChangeText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  imageChangeButton: {
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 8,
    borderWidth: 0.2,
    borderColor: '#fff',
    marginVertical: 5,
  },
});
