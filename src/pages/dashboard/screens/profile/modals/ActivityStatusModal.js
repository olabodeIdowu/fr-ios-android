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

export default function ActivityStatusModal({
  openActivityStatus,
  setOpenActivityStatus,
}) {
  const [enable, setEnable] = useState(true);
  return (
    <View>
      <Modal
        animationType="slide"
        visible={openActivityStatus}
        onRequestClose={() => setOpenActivityStatus(false)}
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
                onPress={() => setOpenActivityStatus(false)}
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
                Activity Status
              </Text>
            </View>
          </View>
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottomWidth: 0.5,
              borderColor: '#cc8b0f',
              borderTopWidth: 0.5,
              padding: 10,
            }}>
            <View>
              <Text style={styles.keyText}>Recently Active Status</Text>
            </View>
            <TouchableOpacity onPress={() => setEnable(!enable)}>
              {enable ? (
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
              fontSize: 14,
              color: '#333333',
              marginVertical: 15,
              padding: 10,
              fontFamily: 'Avenir',
              textAlign: 'center',
            }}>
            Allow Dedott members to see if you were recently active within the
            last 24 hours on Tindeer. If you have this turned off, they will not
            be able to see your recently active status.
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
