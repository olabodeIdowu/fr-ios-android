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

export default function EmailNotifyModal({
  openEmailNotify,
  setOpenEmailNotify,
}) {
  const [enableNewMatches, setEnableNewMatches] = useState(false);
  const [enableMessages, setEnableMessages] = useState(false);
  const [enablePromotions, setEnablePromotions] = useState(false);
  return (
    <View>
      <Modal
        animationType="slide"
        visible={openEmailNotify}
        onRequestClose={() => setOpenEmailNotify(false)}
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
                  onPress={() => setOpenEmailNotify(false)}
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
                  Email
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
              paddingHorizontal: 15,
            }}>
            <View>
              <Text style={styles.keyText}>New Matches</Text>
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
              <Text style={styles.keyText}>Promotions</Text>
            </View>
            <TouchableOpacity
              onPress={() => setEnablePromotions(!enablePromotions)}>
              {enablePromotions ? (
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

          <Text
            style={{
              fontSize: 13,
              color: '#333333',
              padding: 15,
              fontFamily: 'Avenir',
              textAlign: 'center',
            }}>
            Control Emails you want to get- all of them, just the important
            stuff, or the bare minimum. You can always unsubscribe from the
            bottom of any email.
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
