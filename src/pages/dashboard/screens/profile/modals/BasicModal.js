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
import zodiac from '../../../../../dev_data/basics/zodiac';
import education from '../../../../../dev_data/basics/education';
import children from '../../../../../dev_data/basics/children';
import personalityType from '../../../../../dev_data/basics/personalityType';
import communication from '../../../../../dev_data/basics/communication';
import receiveLove from '../../../../../dev_data/basics/receiveLove';

export default function BasicModal({openBasics, setOpenBasics}) {
  const [zodiacActive, setZodiacActive] = useState(null);
  const [educationActive, setEducationActive] = useState(null);
  const [childrenActive, setChildrenActive] = useState(null);
  const [personalityActive, setPersonalityActive] = useState(null);
  const [communicationActive, setCommunicationActive] = useState(null);
  const [receiveLoveActive, setReceiveLoveActive] = useState(null);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openBasics}
      onRequestClose={() => setOpenBasics(false)}>
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
                justifyContent: 'space-between',
                paddingVertical: 10,
                paddingHorizontal: 10,
                marginTop: 5,
              }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setOpenBasics(false)}>
                <MaterialCommunityIcons name="close" size={32} color="#888" />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setOpenBasics(false)}>
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

          <Text style={styles.headerText}>Basics</Text>

          <Text style={styles.primaryText}>
            Bring your best self forward by adding more about you
          </Text>

          <ScrollView
            style={{marginBottom: 150}}
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                borderColor: '#cc8b0f',
                padding: 10,
                borderTopWidth: 0.5,
                marginTop: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: 10,
                }}>
                <MaterialCommunityIcons
                  name="zodiac-leo"
                  size={24}
                  color="#888"
                />
                <Text style={styles.previewText}>
                  What is your zodiac sign?
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  columnGap: 10,
                  rowGap: 10,
                  margin: 10,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}>
                {zodiac.map((i, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={index}
                      onPress={() => setZodiacActive(i?.name)}
                      style={
                        zodiacActive === i?.name
                          ? styles.active
                          : styles.inActive
                      }>
                      <Text style={styles.activeInnerText}>{i?.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            <View
              style={{
                borderColor: '#cc8b0f',
                padding: 10,
                borderTopWidth: 0.5,
                marginTop: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: 10,
                }}>
                <MaterialCommunityIcons name="school" size={24} color="#888" />
                <Text style={styles.previewText}>
                  What is your education level?
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  columnGap: 10,
                  rowGap: 10,
                  margin: 10,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}>
                {education.map((i, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={index}
                      onPress={() => setEducationActive(i?.name)}
                      style={
                        educationActive === i?.name
                          ? styles.active
                          : styles.inActive
                      }>
                      <Text style={styles.activeInnerText}>{i?.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            <View
              style={{
                borderColor: '#cc8b0f',
                padding: 10,
                borderTopWidth: 0.5,
                marginTop: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: 10,
                }}>
                <MaterialCommunityIcons name="shower" size={24} color="#888" />
                <Text style={styles.previewText}>Do you want children?</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  columnGap: 10,
                  rowGap: 10,
                  margin: 10,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}>
                {children.map((i, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={index}
                      onPress={() => setChildrenActive(i?.name)}
                      style={
                        childrenActive === i?.name
                          ? styles.active
                          : styles.inActive
                      }>
                      <Text style={styles.activeInnerText}>{i?.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            <View
              style={{
                borderColor: '#cc8b0f',
                padding: 10,
                borderTopWidth: 0.5,
                marginTop: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: 10,
                }}>
                <MaterialCommunityIcons name="smoking" size={24} color="#888" />
                <Text style={styles.previewText}>
                  What is your Personality Type?
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  columnGap: 10,
                  rowGap: 10,
                  margin: 10,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}>
                {personalityType.map((i, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={index}
                      onPress={() => setPersonalityActive(i?.name)}
                      style={
                        personalityActive === i?.name
                          ? styles.active
                          : styles.inActive
                      }>
                      <Text style={styles.activeInnerText}>{i?.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            <View
              style={{
                borderColor: '#cc8b0f',
                padding: 10,
                borderTopWidth: 0.5,
                marginTop: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: 10,
                }}>
                <MaterialCommunityIcons name="message" size={24} color="#888" />
                <Text style={styles.previewText}>
                  What is your Communication Type?
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  columnGap: 10,
                  rowGap: 10,
                  margin: 10,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}>
                {communication.map((i, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={index}
                      onPress={() => setCommunicationActive(i?.name)}
                      style={
                        communicationActive === i?.name
                          ? styles.active
                          : styles.inActive
                      }>
                      <Text style={styles.activeInnerText}>{i?.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            <View
              style={{
                borderColor: '#cc8b0f',
                padding: 10,
                borderTopWidth: 0.5,
                marginTop: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: 10,
                }}>
                <MaterialCommunityIcons name="heart" size={24} color="#888" />
                <Text style={styles.previewText}>How do you receive love?</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  columnGap: 10,
                  rowGap: 10,
                  margin: 10,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}>
                {receiveLove.map((i, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={index}
                      onPress={() => setReceiveLoveActive(i?.name)}
                      style={
                        receiveLoveActive === i?.name
                          ? styles.active
                          : styles.inActive
                      }>
                      <Text style={styles.activeInnerText}>{i?.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </ScrollView>
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

  headerText: {
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333333',
    padding: 10,
    marginBottom: 10,
  },

  primaryText: {
    fontSize: 14,
    fontFamily: 'Avenir',
    fontWeight: '400',
    color: '#333333',
    padding: 10,
    marginBottom: 10,
  },

  previewText: {
    fontFamily: 'Avenir',
    fontWeight: '400',
    fontSize: 18,
    color: '#333333',
    fontWeight: 'bold',
  },

  closeModalText: {
    fontSize: 20,
    color: '#59656f',
    fontWeight: 'bold',
  },

  active: {
    borderWidth: 0.5,
    borderColor: '#A8000E',
    padding: 6,
    borderRadius: 5,
  },

  inActive: {
    borderWidth: 0.5,
    borderColor: '#D9D9D9',
    padding: 6,
    borderRadius: 5,
  },

  activeInnerText: {
    fontWeight: '400',
    fontFamily: 'Avenir',
    fontSize: 14,
    color: '#333333',
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
