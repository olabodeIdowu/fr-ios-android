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
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function RegistrationScreen5({navigation, route: {params}}) {
  const [job, setJob] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [company, setCompany] = useState('');
  const [biography, setBiography] = useState('');
  const [active, setActive] = useState('');
  const [lookingFor, setLookingFor] = useState([
    'Long-term partner',
    'Long-term, open to short',
    'Short-term, open to long',
    'Short-term fun',
    'New friends',
    'Still figuring it out',
  ]);

  // console.log(params.userForm);
  const userForm = {
    ...params.userForm,
    job,
    nationalId,
    company,
    biography,
    lokkingFor: active,
  };

  function handleLookingFor(lf) {
    setActive(lf);
  }

  function handlePersonalInfo() {
    // console.log(userForm);
    navigation.navigate('Registration-6', {userForm: userForm});
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
          <Text style={styles.headerText}>Personal Information</Text>

          <View>
            <Text style={styles.label}>Biography</Text>
            <TextInput
              placeholder="Enter Your Biography"
              style={styles.input}
              onChangeText={text => setBiography(text)}
              value={biography}
              inputMode="text"
              multiline={true}
            />
          </View>

          <View>
            <Text style={styles.label}>Job</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setJob(text)}
              value={job}
              inputMode="text"
            />
          </View>

          <View>
            <Text style={styles.label}>Company</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setCompany(text)}
              value={company}
              inputMode="text"
            />
          </View>

          <View>
            <Text style={styles.label}>Looking for</Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                columnGap: 10,
                rowGap: 10,
                margin: 10,
              }}>
              {lookingFor.map((lf, index) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    key={index}
                    onPress={() => handleLookingFor(lf)}
                    style={active === lf ? styles.active : styles.inActive}>
                    <Text style={styles.genderText}>{lf}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handlePersonalInfo}
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
    backgroundColor: '#e5e5e5',
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

  genderText: {
    fontSize: 16,
    fontFamily: 'Avenir',
    color: '#000000',
    textAlign: 'center',
  },
  input: {
    fontFamily: 'Avenir',
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
