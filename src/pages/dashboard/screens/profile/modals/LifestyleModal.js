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
import pets from '../../../../../dev_data/lifestyles/pets';
import dietary from '../../../../../dev_data/lifestyles/dietary';
import smoking from '../../../../../dev_data/lifestyles/smoking';
import drink from '../../../../../dev_data/lifestyles/drink';
import sleeping from '../../../../../dev_data/lifestyles/sleeping';
import socialMedia from '../../../../../dev_data/lifestyles/socialMedia';
import workout from '../../../../../dev_data/lifestyles/workout';

export default function LifestyleModal({openLifestyle, setOpenLifestyle}) {
  const [petActive, setPetActive] = useState(null);
  const [dietaryActive, setDietaryActive] = useState(null);
  const [drinkActive, setDrinkActive] = useState(null);
  const [smokingActive, setSmokingActive] = useState(null);
  const [sleepingActive, setSleepingActive] = useState(null);
  const [socialMediaActive, setSocialMediaActive] = useState(null);
  const [workoutActive, setWorkoutActive] = useState(null);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openLifestyle}
      onRequestClose={() => setOpenLifestyle(false)}>
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
                onPress={() => setOpenLifestyle(false)}>
                <MaterialCommunityIcons name="close" size={32} color="#888" />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setOpenLifestyle(false)}>
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

          <Text style={styles.headerText}>Lifestyle</Text>

          <Text style={styles.primaryText}>
            Bring your best self forward by adding your lifestyle
          </Text>

          <ScrollView
            style={{marginBottom: 150}}
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                borderColor: '#888',
                borderTopWidth: 0.5,
                marginTop: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: 10,
                  padding: 10,
                }}>
                <MaterialCommunityIcons name="dog" size={24} color="#888" />
                <Text style={styles.previewText}>Do you have any pets?</Text>
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
                {pets.map((i, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={index}
                      onPress={() => setPetActive(i?.name)}
                      style={
                        petActive === i?.name ? styles.active : styles.inActive
                      }>
                      <Text style={styles.activeInnerText}>{i?.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            <View
              style={{
                borderColor: '#888',
                borderTopWidth: 0.5,
                marginTop: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: 10,
                  padding: 10,
                }}>
                <MaterialCommunityIcons
                  name="glass-wine"
                  size={24}
                  color="#888"
                />
                <Text style={styles.previewText}>How often do you drink?</Text>
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
                {drink.map((i, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={index}
                      onPress={() => setDrinkActive(i?.name)}
                      style={
                        drinkActive === i?.name
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
                borderColor: '#888',
                borderTopWidth: 0.5,
                marginTop: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: 10,
                  padding: 10,
                }}>
                <MaterialCommunityIcons name="smoking" size={24} color="#888" />
                <Text style={styles.previewText}>How often do you smoke?</Text>
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
                {smoking.map((i, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={index}
                      onPress={() => setSmokingActive(i?.name)}
                      style={
                        smokingActive === i?.name
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
                borderColor: '#888',
                borderTopWidth: 0.5,
                marginTop: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: 10,
                  padding: 10,
                }}>
                <MaterialCommunityIcons
                  name="dumbbell"
                  size={24}
                  color="#888"
                />
                <Text style={styles.previewText}>Do you work out?</Text>
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
                {workout.map((i, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={index}
                      onPress={() => setWorkoutActive(i?.name)}
                      style={
                        workoutActive === i?.name
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
                borderColor: '#888',
                borderTopWidth: 0.5,
                marginTop: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: 10,
                  padding: 10,
                }}>
                <MaterialCommunityIcons name="pizza" size={24} color="#888" />
                <Text style={styles.previewText}>
                  What are your dietary preference?
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
                {dietary.map((i, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={index}
                      onPress={() => setDietaryActive(i?.name)}
                      style={
                        dietaryActive === i?.name
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
                borderColor: '#888',
                borderTopWidth: 0.5,
                marginTop: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: 10,
                  padding: 10,
                }}>
                <MaterialCommunityIcons name="at" size={24} color="#888" />
                <Text style={styles.previewText}>
                  How active are you on social media?
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
                {socialMedia.map((i, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={index}
                      onPress={() => setSocialMediaActive(i?.name)}
                      style={
                        socialMediaActive === i?.name
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
                borderColor: '#888',
                borderTopWidth: 0.5,
                marginTop: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: 10,
                  padding: 10,
                }}>
                <MaterialCommunityIcons name="shower" size={24} color="#888" />
                <Text style={styles.previewText}>
                  What are your sleeping habits?
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
                  marginBottom: '10%',
                }}>
                {sleeping.map((i, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={index}
                      onPress={() => setSleepingActive(i?.name)}
                      style={
                        sleepingActive === i?.name
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
