import {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function LocationModal({openLocation, setOpenLocation}) {
  return (
    <View>
      <Modal
        animationType="slide"
        visible={openLocation}
        onRequestClose={() => setOpenLocation(false)}
        presentationStyle="pageSheet">
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                backgroundColor: '#fbf3f4',
                paddingBottom: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 100,
                  alignSelf: 'flex-end',
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  marginTop: 5,
                }}>
                <Text
                  style={{
                    fontFamily: 'Avenir',
                    fontWeight: '900',
                    color: '#000000',
                    fontSize: 16,
                  }}>
                  Location
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setOpenLocation(false)}>
                  <Text
                    style={{
                      fontFamily: 'Avenir',
                      fontWeight: '900',
                      color: '#D9A525',
                      fontSize: 16,
                    }}>
                    Done
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text
              style={{
                fontFamily: 'Avenir',
                padding: 10,
                fontSize: 16,
                fontWeight: '800',
                color: '#000000',
              }}>
              Current Location
            </Text>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTopWidth: 0.5,
                borderBottomWidth: 0.5,
                borderColor: '#cc8b0f',
                marginBottom: 10,
                padding: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 20,
                }}>
                <MaterialCommunityIcons
                  name="map-marker-radius"
                  size={24}
                  color="#3772ff"
                />
                <Text style={styles.keyText}>My Current Location</Text>
              </View>
              <MaterialCommunityIcons name="check" size={24} color="#A8000E" />
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
    borderColor: '#000',
  },

  modalView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  keyText: {
    fontWeight: '400',
    fontFamily: 'Avenir',
    fontSize: 14,
    color: '#333333',
  },
  valueText: {
    fontWeight: '800',
    fontFamily: 'Avenir',
    fontSize: 15,
    color: '#000000',
  },
});
