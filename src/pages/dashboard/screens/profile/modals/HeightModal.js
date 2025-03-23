import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
} from 'react-native';
import {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HeightModal({openHeight, setOpenHeight}) {
  const [on, setOn] = useState(true);

  return (
    <Modal
      visible={openHeight}
      onRequestClose={() => setOpenHeight(false)}
      animationType="slide"
      transparent={true}>
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
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setOpenHeight(false)}>
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
            Height
          </Text>
          <Text
            style={{
              color: '#333333',
              padding: 10,
              fontFamily: 'Avenir',
              fontSize: 16,
            }}>
            Here is a chance to add height to your profile
          </Text>
          <View>
            {on ? (
              <TextInput
                style={styles.input}
                // onChangeText={onChangeNumber}
                // value={number}
                inputMode="decimal"
              />
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  margin: 20,
                }}>
                <TextInput
                  style={styles.inputFit}
                  //   onChangeText={onChangeNumber}
                  //   value={number.code1}
                  keyboardType="numeric"
                  maxLength={2}
                />
                <Text style={styles.valueText}>ft</Text>
                <TextInput
                  style={styles.inputFit}
                  //   onChangeText={onChangeNumber}
                  //   value={number.code2}
                  keyboardType="numeric"
                  maxLength={2}
                />
                <Text style={styles.valueText}>cm</Text>
              </View>
            )}
          </View>

          <View style={styles.unitContainer}>
            <Text style={styles.keyText}>Height Unit</Text>
            <View style={styles.unit}>
              <Text style={styles.valueText}>ft/in</Text>
              <TouchableOpacity onPress={() => setOn(!on)}>
                {on ? (
                  <MaterialCommunityIcons
                    name="toggle-switch"
                    size={52}
                    color="#A8000E"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="toggle-switch-off"
                    size={52}
                    color="#ffffff"
                  />
                )}
              </TouchableOpacity>
              <Text style={styles.cm}>cm</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    marginTop: '70%',
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

  previewText: {
    fontSize: 20,
    color: '#9999',
    fontWeight: 'bold',
  },

  closeModalText: {
    fontSize: 20,
    color: '#59656f',
    fontWeight: 'bold',
  },

  inputFit: {
    width: 50,
    height: 50,
    fontSize: 20,
    borderWidth: 0.5,
    borderColor: '#C6C6C6',
    borderRadius: 6,
    color: '#333333',
    textAlign: 'center',
  },

  input: {
    textAlign: 'center',
    fontSize: 20,
    width: 50,
    height: 50,
    borderWidth: 0.2,
    borderColor: 'gray',
    borderRadius: 6,
    color: '#333333',
    margin: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  unitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  unit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
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
