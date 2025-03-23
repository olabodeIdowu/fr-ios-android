import {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Questionaire = ({
  showQuestionaireModal,
  hideQuestionaireModal,
  currentChat,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [active, setActive] = useState('Long-term partner');
  //   'Long-term partner',
  //         'Long-term, open to short',
  //         'Short-term, open to long',
  //         'Short-term fun',
  //         'New friends',
  //         'Still figuring it out'

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showQuestionaireModal}
      onRequestClose={hideQuestionaireModal}
      presentationStyle="pageSheet">
      <TouchableOpacity
        style={styles.modalBackDrop}
        activeOpacity={1}
        onPress={hideQuestionaireModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                backgroundColor: '#fbf3f4',
                marginBottom: 20,
              }}>
              <View
                style={{
                  backgroundColor: '#A8000E',
                  width: 100,
                  height: 5,
                  margin: 'auto',
                  borderRadius: 25,
                  marginVertical: 10,
                }}></View>
              <Text
                style={{
                  fontFamily: 'Avenir',
                  fontWeight: '900',
                  color: '#000000',
                  fontSize: 14,
                  textAlign: 'center',
                  paddingTop: 10,
                  paddingBottom: 20,
                }}>
                Select reason for contacting{' '}
                {currentChat?.firstName + ' ' + currentChat?.lastName}
              </Text>
            </View>
            {[
              'Long-term partner',
              'Long-term, open to short',
              'Short-term, open to long',
              'Short-term fun',
              'New friends',
              'Still figuring it out',
            ].map((r, i) => {
              return (
                // <ScrollView
                //   style={{
                //     height: '100%',
                //     // paddingVertical: 10,
                //   }}
                //   showsVerticalScrollIndicator={false}>
                <Pressable
                  key={i}
                  onPress={() => setActive(r)}
                  style={{
                    flexDirection: 'row',
                    gap: 20,
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#6C6C6C33',
                    borderRadius: 10,
                    marginBottom: 10,
                    padding: 15,
                    marginHorizontal: 20,
                  }}>
                  {active === r ? (
                    <TouchableOpacity
                      style={{
                        color: '#B9B9B966',
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        background: '#FCDDDF',
                        borderWidth: 5,
                        borderColor: '#8D020E',
                      }}></TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{
                        color: '#B9B9B966',
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        borderWidth: 1,
                        borderColor: '#B9B9B966',
                      }}></TouchableOpacity>
                  )}
                  <Text
                    style={{
                      color: '#6C6C6C',
                      fontSize: 14,
                      fontWeight: '400',
                    }}>
                    {r}
                  </Text>
                </Pressable>
                // </ScrollView>
              );
            })}

            <Pressable
              onPress={() => {
                hideQuestionaireModal();
              }}
              style={{
                backgroundColor: '#A8000E',
                width: 100,

                margin: 'auto',
                borderRadius: 10,
                marginVertical: 10,
              }}>
              <Text
                style={{
                  justifyContent: 'center',
                  textAlign: 'center',
                  color: '#fff',
                  padding: 10,
                }}>
                Send
              </Text>
            </Pressable>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackDrop: {
    flex: 1,
    backgroundColor: `rgba(0,0,0.60)`,
  },
  centeredView: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  modalView: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Questionaire;
