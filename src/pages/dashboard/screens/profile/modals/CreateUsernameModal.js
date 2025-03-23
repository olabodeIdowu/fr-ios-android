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

export default function CreateUsernameModal({openUsername, setOpenUsername}) {
  const [number, onChangeNumber] = useState('');
  return (
    <View>
      <Modal
        animationType="slide"
        visible={openUsername}
        onRequestClose={() => setOpenUsername(false)}
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
              <MaterialCommunityIcons
                onPress={() => setOpenUsername(false)}
                name="chevron-left"
                size={24}
                color="#888"
              />

              <Text
                style={{
                  fontFamily: 'Avenir',
                  fontWeight: '900',
                  color: '#000000',
                  fontSize: 16,
                }}>
                Done
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontFamily: 'Avenir',
              padding: 10,
              marginTop: 10,
              fontSize: 16,
              fontWeight: '800',
              color: '#000000',
            }}>
            Username
          </Text>

          <View>
            <TextInput
              style={styles.input}
              onChangeText={onChangeNumber}
              // value={number}
              inputMode="text"
              placeholder="@"
            />
          </View>

          <Pressable
            style={{
              borderTopWidth: 0.5,
              borderBottomWidth: 0.5,
              borderColor: '#cc8b0f',
              marginBottom: 10,
              paddingVertical: 15,
              paddingHorizontal: 15,
            }}
            onPress={() => setOpenUsername(false)}>
            <Text style={{fontSize: 16, color: '#000000', textAlign: 'center'}}>
              Confirm
            </Text>
          </Pressable>
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

  input: {
    borderColor: '#c6c6c6',
    padding: 15,
    backgroundColor: '#FFFFFF',
    color: '#C6C6C6',
    fontSize: 14,
    marginBottom: 15,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
});
