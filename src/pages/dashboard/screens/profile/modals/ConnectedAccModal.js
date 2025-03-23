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

export default function ConnectedAccModal({
  openConnectedAcc,
  setOpenConnectedAcc,
}) {
  const [signedIn, setSignedIn] = useState(true);

  return (
    <View>
      <Modal
        animationType="slide"
        visible={openConnectedAcc}
        onRequestClose={() => setOpenConnectedAcc(false)}
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
                  onPress={() => setOpenConnectedAcc(false)}
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
                Connected Accounts
              </Text>
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
            Sign in quicker by linking your account
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
              borderTopWidth: 0.2,
              padding: 15,
            }}>
            <View>
              <Text style={styles.keyText}>Sign in with Google</Text>
            </View>
            <TouchableOpacity onPress={() => setSignedIn(!signedIn)}>
              {signedIn ? (
                <MaterialCommunityIcons
                  name="toggle-switch"
                  size={42}
                  color="#A8000E"
                />
              ) : (
                <MaterialCommunityIcons
                  name="toggle-switch-off"
                  size={42}
                  color="#ffffff"
                />
              )}
            </TouchableOpacity>
          </Pressable>
          <Text
            style={{
              fontFamily: 'Avenir',
              fontSize: 14,
              color: '#333333',
              padding: 15,
              paddingBottom: 10,
            }}>
            You currently have a verified email by having your google account
            linked
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
});
