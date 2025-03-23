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

export default function LookingForModal({lookingFor, setLookingFor}) {
  const [searchingFor, setSearchingFor] = useState('');

  return (
    <View>
      <Modal
        animationType="slide"
        visible={lookingFor}
        onRequestClose={() => setLookingFor(false)}
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
                  onPress={() => setLookingFor(false)}
                  name="chevron-left"
                  size={24}
                  color="#888"
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setOpenLocation(false)}>
                <Text
                  style={{
                    fontFamily: 'Avenir',
                    fontWeight: '900',
                    color: '#000000',
                    fontSize: 16,
                  }}>
                  Show Me
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderColor: '#cc8b0f',
              marginBottom: 10,
              padding: 15,
            }}
            onPress={() => setSearchingFor('men')}>
            <Text style={styles.keyText}>Men</Text>
            <View>
              {searchingFor === 'men' && (
                <MaterialCommunityIcons
                  name="check"
                  size={24}
                  color="#A8000E"
                />
              )}
            </View>
          </Pressable>
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
            }}
            onPress={() => setSearchingFor('women')}>
            <Text style={styles.keyText}>Women</Text>
            <View>
              {searchingFor === 'women' && (
                <MaterialCommunityIcons
                  name="check"
                  size={24}
                  color="#A8000E"
                />
              )}
            </View>
          </Pressable>
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottomWidth: 0.5,
              borderColor: '#cc8b0f',
              marginBottom: 10,
              padding: 15,
            }}
            onPress={() => setSearchingFor('everyone')}>
            <Text style={styles.keyText}>Everyone</Text>
            <View>
              {searchingFor === 'everyone' && (
                <MaterialCommunityIcons
                  name="check"
                  size={24}
                  color="#A8000E"
                />
              )}
            </View>
          </Pressable>
          <Text
            style={{
              fontWeight: '400',
              fontFamily: 'Avenir',
              fontSize: 14,
              color: '#333333',
              textAlign: 'center',
              padding: 10,
            }}>
            You will only see {searchingFor} in discovery
          </Text>
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

  footerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#ffffff',
    padding: 15,
  },
});
