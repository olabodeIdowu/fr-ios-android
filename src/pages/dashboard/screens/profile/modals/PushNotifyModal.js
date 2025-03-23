import {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PushNotifyModal({openPushNotify, setOpenPushNotify}) {
  const [enableNewMatches, setEnableNewMatches] = useState(false);
  const [enableMessages, setEnableMessages] = useState(false);
  const [enableMessageLikes, setEnableMessageLikes] = useState(false);
  return (
    <View>
      <Modal
        animationType="slide"
        visible={openPushNotify}
        onRequestClose={() => setOpenPushNotify(false)}
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
                  onPress={() => setOpenPushNotify(false)}
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
                Push Notifications
              </Text>
            </View>
          </View>
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderColor: '#cc8b0f',
              marginBottom: 10,
              paddingHorizontal: 15,
            }}>
            <View>
              <Text style={styles.keyText}>New Matches</Text>
              <Text style={styles.valueText}>You just got a new match</Text>
            </View>
            <TouchableOpacity
              onPress={() => setEnableNewMatches(!enableNewMatches)}>
              {enableNewMatches ? (
                <MaterialCommunityIcons
                  name="toggle-switch"
                  size={52}
                  color="#A8000E"
                />
              ) : (
                <MaterialCommunityIcons
                  name="toggle-switch-off"
                  size={52}
                  color="#C6C6C6"
                />
              )}
            </TouchableOpacity>
          </Pressable>
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTopWidth: 0.5,
              borderColor: '#cc8b0f',
              marginBottom: 10,
              paddingHorizontal: 15,
            }}>
            <View>
              <Text style={styles.keyText}>Messages</Text>
              <Text style={styles.valueText}>
                Someone sent you a new message.
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setEnableMessages(!enableMessages)}>
              {enableMessages ? (
                <MaterialCommunityIcons
                  name="toggle-switch"
                  size={52}
                  color="#A8000E"
                />
              ) : (
                <MaterialCommunityIcons
                  name="toggle-switch-off"
                  size={52}
                  color="#C6C6C6"
                />
              )}
            </TouchableOpacity>
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
              paddingHorizontal: 15,
            }}>
            <View>
              <Text style={styles.keyText}>Message Likes</Text>
              <Text style={styles.valueText}>someone liked your message.</Text>
            </View>
            <TouchableOpacity
              onPress={() => setEnableMessageLikes(!enableMessageLikes)}>
              {enableMessageLikes ? (
                <MaterialCommunityIcons
                  name="toggle-switch"
                  size={52}
                  color="#A8000E"
                />
              ) : (
                <MaterialCommunityIcons
                  name="toggle-switch-off"
                  size={52}
                  color="#C6C6C6"
                />
              )}
            </TouchableOpacity>
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
