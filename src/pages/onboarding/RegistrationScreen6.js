import {useState} from 'react';
import {
  Alert,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import minArray from '../../dev_data/agepreference/minArray';
import maxArray from '../../dev_data/agepreference/maxArray';
import schoolArray from '../../dev_data/schools/school';

export default function RegistrationScreen6({navigation, route: {params}}) {
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [education, setEducation] = useState('');
  const [school, setSchool] = useState('');
  const agePreference = `${min}` + '-' + `${max}`;

  console.log(params.userForm);
  console.log(agePreference);

  const userForm = {
    ...params.userForm,
    education,
    school,
    agePreference,
  };

  function handleNextStep() {
    try {
      console.log(agePreference, userForm);
      if (
        Number(agePreference.split('-')[0]) >
        Number(agePreference.split('-')[1])
      ) {
        throw Error("Minumum age can't be greater than the maximum age");
      }
      navigation.navigate('GetLocation', {userForm: userForm});
    } catch (message) {
      alert(message);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{width: 100}}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          activeOpacity={0.7}
          onPress={() => {
            //  Go back to the previous screen.
            navigation.goBack();
          }}>
          <Text style={styles.backText}>&larr;</Text>
          <Text style={{color: '#333'}}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar2}></View>
        <View style={styles.progressBar}></View>
        <View style={styles.progressBar3}></View>
        <View style={styles.progressBar4}></View>
        <View style={styles.progressBar5}></View>
        <View style={styles.progressBar6}></View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <Text style={styles.headerText}>More Information</Text>

          <View>
            <Text style={styles.label}>Education</Text>
            <SelectList
              // onSelect={() => alert(selected)}
              setSelected={setSelected}
              fontFamily="Avenir"
              data={[
                {label: 'High School', value: 'High School'},
                {label: 'Masters', value: 'Masters'},
                {label: 'Bachelors', value: 'Bachelors'},
                {label: 'In College', value: 'In College'},
                {label: 'PhD', value: 'PhD'},
                {label: 'In Grad School', value: 'In Grad School'},
                {label: 'Trade School', value: 'Trade School'},
              ]}
              arrowicon={
                <MaterialCommunityIcons
                  name="chevron-down"
                  size={12}
                  color="black"
                />
              }
              searchicon={
                <MaterialCommunityIcons
                  name="magnify"
                  size={12}
                  color="black"
                />
              }
              search={false}
              boxStyles={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                border: 'none',
                borderRadius: 8,
                backgroundColor: '#D9D9D9',
                margin: 10,
              }} //override default styles
              defaultOption={{
                key: 'Select Your Level of Education',
                value: 'Select Your Level of Education',
              }} //default selected option
            />
          </View>
          <View>
            <Text style={styles.label}>Religion</Text>
            <SelectList
              // onSelect={() => alert(selected)}
              setSelected={setSelected}
              fontFamily="Avenir"
              data={[
                {label: 'Christianity', value: 'Christianity'},
                {label: 'Indigenous religions', value: 'Indigenous religions'},
                {label: 'Islam', value: 'Islam'},
              ]}
              arrowicon={
                <MaterialCommunityIcons
                  name="chevron-down"
                  size={12}
                  color="black"
                />
              }
              searchicon={
                <MaterialCommunityIcons
                  name="magnify"
                  size={12}
                  color="black"
                />
              }
              search={false}
              boxStyles={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                border: 'none',
                borderRadius: 8,
                backgroundColor: '#D9D9D9',
                margin: 10,
              }} //override default styles
              // defaultOption={{
              //   key: 'Select Your Level of Education',
              //   value: 'Select Your Level of Education',
              // }} //default selected option
            />
          </View>
          <View>
            <Text style={styles.label}>School</Text>
            <SelectList
              // onSelect={() => alert(selected)}
              setSelected={setSelected}
              fontFamily="Avenir"
              data={schoolArray}
              arrowicon={
                <MaterialCommunityIcons
                  name="chevron-down"
                  size={12}
                  color="black"
                />
              }
              searchicon={
                <MaterialCommunityIcons
                  name="magnify"
                  size={12}
                  color="black"
                />
              }
              search={false}
              boxStyles={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                border: 'none',
                borderRadius: 8,
                backgroundColor: '#D9D9D9',
                margin: 10,
              }} //override default styles
              // defaultOption={{key: 'Male', value: 'male'}} //default selected option
            />
          </View>

          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <Text style={styles.label}>Age Preference</Text>
              <Text style={styles.label}>18-35</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 30,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}>
                <Text style={styles.label}>Min Age</Text>
                <SelectList
                  // onSelect={() => alert(selected)}
                  setSelected={setSelected}
                  fontFamily="Avenir"
                  data={minArray}
                  arrowicon={
                    <MaterialCommunityIcons
                      name="chevron-down"
                      size={12}
                      color="black"
                    />
                  }
                  searchicon={
                    <MaterialCommunityIcons
                      name="magnify"
                      size={12}
                      color="black"
                    />
                  }
                  search={false}
                  boxStyles={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    border: 'none',
                    borderRadius: 8,
                    backgroundColor: '#D9D9D9',
                    margin: 10,
                  }} //override default styles
                  //  defaultOption={{key: 'Male', value: 'male'}} //default selected option
                />
              </View>
              <Text style={{color: '#ffffff'}}>-</Text>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}>
                <Text style={styles.label}>Max Age</Text>
                <SelectList
                  // onSelect={() => alert(selected)}
                  setSelected={setSelected}
                  fontFamily="Avenir"
                  data={maxArray}
                  arrowicon={
                    <MaterialCommunityIcons
                      name="chevron-down"
                      size={12}
                      color="black"
                    />
                  }
                  searchicon={
                    <MaterialCommunityIcons
                      name="magnify"
                      size={12}
                      color="black"
                    />
                  }
                  search={false}
                  boxStyles={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    border: 'none',
                    borderRadius: 8,
                    backgroundColor: '#D9D9D9',
                    margin: 10,
                  }} //override default styles
                  //   defaultOption={{key: 'Male', value: 'male'}} //default selected option
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleNextStep}
            activeOpacity={0.7}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  progressBarContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    padding: 10,
  },

  progressBar: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar3: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar2: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },

  progressBar4: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar5: {
    width: 50,
    height: 5,
    backgroundColor: '#e5e5e5',
    borderRadius: 16,
    border: '1px solid',
  },

  headerText: {
    fontFamily: 'Avenir',
    color: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  secondaryHeaderText: {
    fontFamily: 'Avenir',
    color: '#333333',
    fontSize: 14,
    paddingLeft: 20,
    paddingBottom: 20,
    lineHeight: 20,
  },

  backText: {
    fontSize: 36,
    color: '#000000',
    fontFamily: 'Avenir',
    padding: 10,
  },

  label: {
    fontFamily: 'Avenir',
    color: '#333333',
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: '600',
  },

  input: {
    margin: 10,
    borderWidth: 0.2,
    padding: 15,
    backgroundColor: '#D9D9D9',
    borderRadius: 6,
  },

  active: {
    fontFamily: 'Avenir',
    borderWidth: 0.5,
    borderColor: '#8D020E',
    padding: 10,
    color: '#ffffff',
    padding: 6,
    borderRadius: 5,
  },

  inActive: {
    fontFamily: 'Avenir',
    backgroundColor: '#FFFFFF',
    padding: 10,
    padding: 6,
    borderRadius: 5,
  },
  progressBarContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    padding: 10,
  },

  progressBar: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar3: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar2: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },

  progressBar4: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar5: {
    width: 50,
    height: 5,
    backgroundColor: '#e5e5e5',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar6: {
    width: 50,
    height: 5,
    backgroundColor: '#e5e5e5',
    borderRadius: 16,
    border: '1px solid',
  },

  headerText: {
    fontFamily: 'Avenir',
    color: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  secondaryHeaderText: {
    fontFamily: 'Avenir',
    color: '#333333',
    fontSize: 14,
    paddingLeft: 20,
    paddingBottom: 20,
    lineHeight: 20,
  },

  backText: {
    fontSize: 36,
    color: '#000000',
    fontFamily: 'Avenir',
    padding: 10,
  },

  label: {
    fontFamily: 'Avenir',
    color: '#333333',
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: '600',
  },

  input: {
    margin: 10,
    borderWidth: 0.2,
    padding: 15,
    backgroundColor: '#D9D9D9',
    borderRadius: 6,
  },

  active: {
    fontFamily: 'Avenir',
    borderWidth: 0.5,
    borderColor: '#8D020E',
    padding: 10,
    color: '#ffffff',
    padding: 6,
    borderRadius: 5,
  },

  inActive: {
    fontFamily: 'Avenir',
    backgroundColor: '#FFFFFF',
    padding: 10,
    padding: 6,
    borderRadius: 5,
  },
  progressBarContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    padding: 10,
  },

  progressBar: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar3: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar2: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },

  progressBar4: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar5: {
    width: 50,
    height: 5,
    backgroundColor: '#e5e5e5',
    borderRadius: 16,
    border: '1px solid',
  },

  headerText: {
    fontFamily: 'Avenir',
    color: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  secondaryHeaderText: {
    fontFamily: 'Avenir',
    color: '#333333',
    fontSize: 14,
    paddingLeft: 20,
    paddingBottom: 20,
    lineHeight: 20,
  },

  backText: {
    fontSize: 36,
    color: '#000000',
    fontFamily: 'Avenir',
    padding: 10,
  },

  label: {
    fontFamily: 'Avenir',
    color: '#333333',
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: '600',
  },

  input: {
    margin: 10,
    borderWidth: 0.2,
    padding: 15,
    backgroundColor: '#D9D9D9',
    borderRadius: 6,
  },

  active: {
    fontFamily: 'Avenir',
    borderWidth: 0.5,
    borderColor: '#8D020E',
    padding: 10,
    color: '#ffffff',
    padding: 6,
    borderRadius: 5,
  },

  inActive: {
    fontFamily: 'Avenir',
    backgroundColor: '#FFFFFF',
    padding: 10,
    padding: 6,
    borderRadius: 5,
  },
  progressBarContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    padding: 10,
  },

  progressBar: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar3: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar2: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },

  progressBar4: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar5: {
    width: 50,
    height: 5,
    backgroundColor: '#e5e5e5',
    borderRadius: 16,
    border: '1px solid',
  },

  headerText: {
    fontFamily: 'Avenir',
    color: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  secondaryHeaderText: {
    fontFamily: 'Avenir',
    color: '#333333',
    fontSize: 14,
    paddingLeft: 20,
    paddingBottom: 20,
    lineHeight: 20,
  },

  backText: {
    fontSize: 36,
    color: '#000000',
    fontFamily: 'Avenir',
    padding: 10,
  },

  label: {
    fontFamily: 'Avenir',
    color: '#333333',
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: '600',
  },

  input: {
    margin: 10,
    borderWidth: 0.2,
    padding: 15,
    backgroundColor: '#D9D9D9',
    borderRadius: 6,
  },

  active: {
    fontFamily: 'Avenir',
    borderWidth: 0.5,
    borderColor: '#8D020E',
    padding: 10,
    color: '#ffffff',
    padding: 6,
    borderRadius: 5,
  },

  inActive: {
    fontFamily: 'Avenir',
    backgroundColor: '#FFFFFF',
    padding: 10,
    padding: 6,
    borderRadius: 5,
  },
  progressBarContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    padding: 10,
  },

  progressBar: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar3: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar2: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },

  progressBar4: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar5: {
    width: 50,
    height: 5,
    backgroundColor: '#e5e5e5',
    borderRadius: 16,
    border: '1px solid',
  },

  headerText: {
    fontFamily: 'Avenir',
    color: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  secondaryHeaderText: {
    fontFamily: 'Avenir',
    color: '#333333',
    fontSize: 14,
    paddingLeft: 20,
    paddingBottom: 20,
    lineHeight: 20,
  },

  backText: {
    fontSize: 36,
    color: '#000000',
    fontFamily: 'Avenir',
    padding: 10,
  },

  label: {
    fontFamily: 'Avenir',
    color: '#333333',
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: '600',
  },

  input: {
    margin: 10,
    borderWidth: 0.2,
    padding: 15,
    backgroundColor: '#D9D9D9',
    borderRadius: 6,
  },

  active: {
    fontFamily: 'Avenir',
    borderWidth: 0.5,
    borderColor: '#8D020E',
    padding: 10,
    color: '#ffffff',
    padding: 6,
    borderRadius: 5,
  },

  inActive: {
    fontFamily: 'Avenir',
    backgroundColor: '#FFFFFF',
    padding: 10,
    padding: 6,
    borderRadius: 5,
  },
  progressBarContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    padding: 10,
  },

  progressBar: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar3: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar2: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },

  progressBar4: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar5: {
    width: 50,
    height: 5,
    backgroundColor: '#e5e5e5',
    borderRadius: 16,
    border: '1px solid',
  },

  headerText: {
    fontFamily: 'Avenir',
    color: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  secondaryHeaderText: {
    fontFamily: 'Avenir',
    color: '#333333',
    fontSize: 14,
    paddingLeft: 20,
    paddingBottom: 20,
    lineHeight: 20,
  },

  backText: {
    fontSize: 36,
    color: '#000000',
    fontFamily: 'Avenir',
    padding: 10,
  },

  label: {
    fontFamily: 'Avenir',
    color: '#333333',
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: '600',
  },

  input: {
    margin: 10,
    borderWidth: 0.2,
    padding: 15,
    backgroundColor: '#D9D9D9',
    borderRadius: 6,
  },

  active: {
    fontFamily: 'Avenir',
    borderWidth: 0.5,
    borderColor: '#8D020E',
    padding: 10,
    color: '#ffffff',
    padding: 6,
    borderRadius: 5,
  },

  inActive: {
    fontFamily: 'Avenir',
    backgroundColor: '#FFFFFF',
    padding: 10,
    padding: 6,
    borderRadius: 5,
  },
  progressBarContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    padding: 10,
  },

  progressBar: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar3: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar2: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },

  progressBar4: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar5: {
    width: 50,
    height: 5,
    backgroundColor: '#e5e5e5',
    borderRadius: 16,
    border: '1px solid',
  },

  headerText: {
    fontFamily: 'Avenir',
    color: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  secondaryHeaderText: {
    fontFamily: 'Avenir',
    color: '#333333',
    fontSize: 14,
    paddingLeft: 20,
    paddingBottom: 20,
    lineHeight: 20,
  },

  backText: {
    fontSize: 36,
    color: '#000000',
    fontFamily: 'Avenir',
    padding: 10,
  },

  label: {
    fontFamily: 'Avenir',
    color: '#333333',
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: '600',
  },

  input: {
    margin: 10,
    borderWidth: 0.2,
    padding: 15,
    backgroundColor: '#D9D9D9',
    borderRadius: 6,
  },

  active: {
    fontFamily: 'Avenir',
    borderWidth: 0.5,
    borderColor: '#8D020E',
    padding: 10,
    color: '#ffffff',
    padding: 6,
    borderRadius: 5,
  },

  inActive: {
    fontFamily: 'Avenir',
    backgroundColor: '#FFFFFF',
    padding: 10,
    padding: 6,
    borderRadius: 5,
  },
  progressBarContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    padding: 10,
  },

  progressBar: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar3: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar2: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },

  progressBar4: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar5: {
    width: 50,
    height: 5,
    backgroundColor: '#e5e5e5',
    borderRadius: 16,
    border: '1px solid',
  },

  headerText: {
    fontFamily: 'Avenir',
    color: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  secondaryHeaderText: {
    fontFamily: 'Avenir',
    color: '#333333',
    fontSize: 14,
    paddingLeft: 20,
    paddingBottom: 20,
    lineHeight: 20,
  },

  backText: {
    fontSize: 36,
    color: '#000000',
    fontFamily: 'Avenir',
    padding: 10,
  },

  label: {
    fontFamily: 'Avenir',
    color: '#333333',
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: '600',
  },

  input: {
    margin: 10,
    borderWidth: 0.2,
    padding: 15,
    backgroundColor: '#D9D9D9',
    borderRadius: 6,
  },

  active: {
    fontFamily: 'Avenir',
    borderWidth: 0.5,
    borderColor: '#8D020E',
    padding: 10,
    color: '#ffffff',
    padding: 6,
    borderRadius: 5,
  },

  inActive: {
    fontFamily: 'Avenir',
    backgroundColor: '#FFFFFF',
    padding: 10,
    padding: 6,
    borderRadius: 5,
  },
  progressBarContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    padding: 10,
  },

  progressBar: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar3: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar2: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },

  progressBar4: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar5: {
    width: 50,
    height: 5,
    backgroundColor: '#e5e5e5',
    borderRadius: 16,
    border: '1px solid',
  },

  headerText: {
    fontFamily: 'Avenir',
    color: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  secondaryHeaderText: {
    fontFamily: 'Avenir',
    color: '#333333',
    fontSize: 14,
    paddingLeft: 20,
    paddingBottom: 20,
    lineHeight: 20,
  },

  backText: {
    fontSize: 36,
    color: '#000000',
    fontFamily: 'Avenir',
    padding: 10,
  },

  label: {
    fontFamily: 'Avenir',
    color: '#333333',
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: '600',
  },

  input: {
    margin: 10,
    borderWidth: 0.2,
    padding: 15,
    backgroundColor: '#D9D9D9',
    borderRadius: 6,
  },

  active: {
    fontFamily: 'Avenir',
    borderWidth: 0.5,
    borderColor: '#8D020E',
    padding: 10,
    color: '#ffffff',
    padding: 6,
    borderRadius: 5,
  },

  inActive: {
    fontFamily: 'Avenir',
    backgroundColor: '#FFFFFF',
    padding: 10,
    padding: 6,
    borderRadius: 5,
  },
  progressBarContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    padding: 10,
  },

  progressBar: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar3: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar2: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },

  progressBar4: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar5: {
    width: 50,
    height: 5,
    backgroundColor: '#e5e5e5',
    borderRadius: 16,
    border: '1px solid',
  },

  headerText: {
    fontFamily: 'Avenir',
    color: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  secondaryHeaderText: {
    fontFamily: 'Avenir',
    color: '#333333',
    fontSize: 14,
    paddingLeft: 20,
    paddingBottom: 20,
    lineHeight: 20,
  },

  backText: {
    fontSize: 36,
    color: '#000000',
    fontFamily: 'Avenir',
    padding: 10,
  },

  label: {
    fontFamily: 'Avenir',
    color: '#333333',
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: '600',
  },

  input: {
    margin: 10,
    borderWidth: 0.2,
    padding: 15,
    backgroundColor: '#D9D9D9',
    borderRadius: 6,
  },

  active: {
    fontFamily: 'Avenir',
    borderWidth: 0.5,
    borderColor: '#8D020E',
    padding: 10,
    color: '#ffffff',
    padding: 6,
    borderRadius: 5,
  },

  inActive: {
    fontFamily: 'Avenir',
    backgroundColor: '#FFFFFF',
    padding: 10,
    padding: 6,
    borderRadius: 5,
  },
  genderText: {
    fontFamily: 'Avenir',
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#8D020E',
    padding: 15,
    borderRadius: 8,
    margin: 10,
    marginTop: 40,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
