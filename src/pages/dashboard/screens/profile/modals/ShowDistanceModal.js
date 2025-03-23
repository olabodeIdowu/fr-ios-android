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

export default function ShowDistanceModal({showDistanceIn, setShowDistanceIn}) {
  const [selectActive, setSelectActive] = useState('kilometers');

  return (
    <View>
      <Modal
        animationType="slide"
        visible={showDistanceIn}
        onRequestClose={() => setShowDistanceIn(false)}
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
                onPress={() => setShowDistanceIn(false)}
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
                Show Distance In
              </Text>
            </View>
          </View>

          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTopWidth: 0.5,
              borderBottomWidth: 0.5,
              borderColor: '#cc8b0f',
              marginBottom: 10,
              paddingVertical: 15,
              paddingHorizontal: 15,
            }}
            onPress={() => setSelectActive('miles')}>
            <View>
              <Text style={styles.keyText}>Miles</Text>
            </View>
            {selectActive === 'miles' && (
              <MaterialCommunityIcons name="check" size={24} color="#A8000E" />
            )}
          </Pressable>
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottomWidth: 0.5,
              borderColor: '#cc8b0f',
              marginBottom: 10,
              borderTopWidth: 0.2,
              padding: 15,
            }}
            onPress={() => setSelectActive('kilometers')}>
            <View>
              <Text style={styles.keyText}>Kilometers</Text>
            </View>
            {selectActive === 'kilometers' && (
              <MaterialCommunityIcons name="check" size={24} color="#A8000E" />
            )}
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
