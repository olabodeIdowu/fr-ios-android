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
import Icon from 'react-native-vector-icons/FontAwesome';

export default function GenderModal({openGender, setOpenGender}) {
  const [showGender, setShowGender] = useState(true);
  const [selectBoxActive, setSelectBoxActive] = useState('');
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openGender}
      onRequestClose={() => setOpenGender(false)}>
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
                Gender
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setOpenGender(false)}>
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

          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderColor: '#cc8b0f',
              marginBottom: 10,
              paddingHorizontal: 15,
              paddingVertical: 15,
            }}
            onPress={() => setSelectBoxActive('man')}>
            <Text style={styles.keyText}>Man</Text>
            <View>
              {selectBoxActive === 'man' && (
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
              paddingHorizontal: 15,
              paddingVertical: 15,
            }}
            onPress={() => setSelectBoxActive('woman')}>
            <Text style={styles.keyText}>Woman</Text>
            <View>
              {selectBoxActive === 'woman' && (
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
              borderColor: 'grey',
              borderTopWidth: 0.2,
              borderBottomWidth: 0.2,
              padding: 10,
              backgroundColor: '#F7F7F7',
            }}>
            <View>
              <Text style={styles.keyText}>Show my gender on my profile</Text>
            </View>
            <TouchableOpacity onPress={() => setShowGender(!showGender)}>
              {showGender ? (
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
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    marginTop: '10%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    backgroundColor: '#F7F7F7',
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
