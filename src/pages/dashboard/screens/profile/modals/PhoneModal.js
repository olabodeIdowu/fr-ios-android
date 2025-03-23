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

export default function PhoneModal({openPhone, setOpenPhone}) {
  return (
    <View>
      <Modal
        animationType="slide"
        visible={openPhone}
        onRequestClose={() => setOpenPhone(false)}
        presentationStyle="pageSheet">
        <View style={styles.centeredView}>
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
                alignSelf: 'flex-start',
                paddingVertical: 10,
                paddingHorizontal: 10,
                marginTop: 5,
              }}>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  onPress={() => setOpenPhone(false)}
                  name="chevron-left"
                  size={24}
                  color="#888"
                />
              </TouchableOpacity>

              <Text
                style={{
                  fontFamily: 'Avenir',
                  fontWeight: '900',
                  color: '#000000',
                  fontSize: 16,
                }}>
                Account
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontFamily: 'Avenir',
              fontWeight: '800',
              padding: 10,
              marginTop: 10,
              fontSize: 16,
              color: '#000000',
            }}>
            Phone Number
          </Text>
          <Pressable
            disabled={true}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderColor: 'grey',
              borderTopWidth: 0.5,
              borderBottomWidth: 0.5,
              padding: 15,
              marginBottom: 15,
              backgroundColor: '#F7F7F7',
              borderColor: '#cc8b0f',
            }}>
            <Text style={styles.keyText}>2348165600000</Text>
            <View>
              <MaterialCommunityIcons name="check" size={24} color="#A8000E" />
            </View>
          </Pressable>

          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              color: '#333',
              padding: 10,
              fontFamily: 'Avenir',
            }}>
            Verified Phone Number
          </Text>
          <TouchableOpacity
            activeOpacity={0.4}
            style={{
              padding: 15,
              backgroundColor: '#004ba8',
              borderRadius: 50,
              marginLeft: 'auto',
              marginRight: 'auto',
              backgroundColor: '#F7F7F7',
              // borderWidth: 0.4,
              // borderColor: '#c6c6c6',
            }}>
            <Text
              style={{
                fontFamily: 'Avenir',
                fontSize: 18,
                color: 'red',
              }}>
              Update My Phone Number
            </Text>
          </TouchableOpacity>
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

  headerFlexText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 100,
    padding: 10,
    paddingBottom: 20,
    borderBottomWidth: 0.2,
    borderColor: 'gray',
    backgroundColor: '#F7F7F7',
  },
  headerCardFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 20,
    borderBottomWidth: 0.2,
    borderColor: 'gray',
    backgroundColor: '#F7F7F7',
  },

  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#ffffff',
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
