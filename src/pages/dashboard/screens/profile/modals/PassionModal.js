import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import passionArray from '../../../../../dev_data/passions/passions';
import {useState} from 'react';

export default function PassionModal({openPassion, setOpenPassion}) {
  const [active, setActive] = useState(false);
  const [text, setText] = useState('');
  const [passions, setPassions] = useState([]);

  function handlePassions(p) {
    setText(p);
    if (passions.length <= 4) {
      setPassions([...passions, p]);
    }
    // const [picked, setPicked] = useState(interest);

    // function handlePicked(id) {
    //   setPicked((prev) => {
    //     return prev.map((interest, index) => {
    //       return {
    //         ...interest,
    //         active: index === id ? !interest.active : interest.active,
    //       };
    //     });
    //   });
    // }
    return (
      <Modal
        visible={openPassion}
        onRequestClose={() => setOpenPassion(false)}
        animationType="slide"
        presentationStyle="pageSheet"
        transparent={true}>
        <ScrollView style={{flex: 1, backgroundColor: '#F7F7F7'}}>
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
              <Text
                style={{
                  fontFamily: 'Avenir',
                  fontWeight: '900',
                  color: '#000000',
                  fontSize: 16,
                }}>
                Edit Passions
              </Text>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  onPress={() => setOpenPassion(false)}
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
              </TouchableOpacity>
            </View>

            <View
              style={{
                backgroundColor: '#F7F7F7',
                paddingBottom: 10,
                paddingTop: 10,
              }}>
              <Text
                style={{
                  padding: 10,
                  fontSize: 17,
                  color: '#ffffff',
                }}>
                Select passions that you like to share with the people you
                connect with. Choose a minimum of 3.
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 10,
                }}>
                <Text
                  style={{
                    textTransform: 'uppercase',

                    fontSize: 17,
                    color: '#ffffff',
                  }}>
                  Passion
                </Text>
                <Text
                  style={{
                    fontSize: 17,
                    color: '#ffffff',
                  }}>
                  (5/5)
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                columnGap: 10,
                rowGap: 10,
                margin: 10,
              }}>
              {passionArray.map((p, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handlePassions(p)}
                    style={
                      text === p && passions.length <= 4
                        ? styles.active
                        : styles.inActive
                    }>
                    <Text style={styles.genderText}>{p}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  headerFlexText: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 100,
    padding: 15,
    paddingBottom: 20,
    borderBottomWidth: 0.2,
    borderColor: 'gray',
    backgroundColor: '#F7F7F7',
  },

  editPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    borderBottomWidth: 0.2,
    borderColor: 'gray',
    backgroundColor: '#F7F7F7',
  },

  editText: {
    fontSize: 20,
    color: '#9999',
    fontWeight: 'bold',
  },

  previewText: {
    fontSize: 20,
    color: '#9999',
    fontWeight: 'bold',
  },

  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#ffffff',
  },

  closeModalText: {
    fontSize: 20,
    color: '#59656f',
    fontWeight: 'bold',
  },
  active: {
    backgroundColor: '#D9A525',
    padding: 10,
    color: '#ffffff',
    padding: 6,
    borderRadius: 5,
  },

  inActive: {
    backgroundColor: '#D9D9D9',
    padding: 10,
    padding: 6,
    borderRadius: 5,
  },
  genderText: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#D9A525',
    padding: 15,
    borderRadius: 8,
    margin: 10,
    marginTop: 40,
    marginBottom: 40,
  },

  buttonText: {
    color: '#000000',
    fontSize: 20,
  },
});
