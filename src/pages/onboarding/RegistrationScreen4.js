import axios from 'axios';
import {useContext, useState} from 'react';
import {
  Alert,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SelectList} from 'react-native-dropdown-select-list';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function RegistrationScreen4({navigation, route: {params}}) {
  const [selected, setSelected] = useState('');
  const [isTextInputFocused, setTextInputFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [openDate, setOpenDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [gender, setGender] = useState('');
  const [referalCode, setReferalCode] = useState('');

  // console.log(params.userForm);
  const userForm = {
    ...params.userForm,
    phone,
    sex: gender,
    date_of_birth: selectedDate,
    referalCode,
  };

  async function handleNext() {
    try {
      // console.log(userForm);
      // setIsLoading(true);
      // const response = await axios({
      //   method: "post",
      //   url: `${url}/dedott/api/v1/users/signup-user-with-email`,
      //   data: userForm,
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      // setIsLoading(false);
      // if (!response) throw new Error("response not found");
      // // console.log(response?.data?.data?.user);
      // setUser(response?.data?.data?.user);
      navigation.navigate('Registration-5', {userForm: userForm});
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      Alert.alert('Error', error.message, [{text: 'OK'}]);
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
          <Text style={styles.headerText}>Personal Information</Text>
          <View style={{justifyContent: 'center'}}>
            <View>
              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={styles.input}
                placeholder="enter your phone"
                name="phone"
                onChangeText={text => setPhone(text)}
                value={phone}
              />
            </View>

            <View>
              <Text style={styles.label}>DOB</Text>
              <View style={{position: 'relative'}}>
                <Icon
                  onPress={() => setOpenDate(!openDate)}
                  style={{
                    position: 'absolute',
                    top: 18,
                    right: 30,
                    zIndex: 100,
                  }}
                  name="calendar"
                  size={24}
                  color="#8D020E"
                />
                <TextInput
                  style={styles.input}
                  //   onChangeText={() => setOpenDate(!openDate)}
                  value={selectedDate}
                  placeholder="2023/12/14"
                />
              </View>
              {openDate && (
                <DatePicker
                  options={{
                    backgroundColor: '#090C08',
                    textHeaderColor: '#D9A525',
                    textDefaultColor: '#D9A525',
                    selectedTextColor: '#fff',

                    mainColor: '#D9A525',
                    textSecondaryColor: '#D9A525',
                    borderColor: 'rgba(122, 146, 165, 0.1)',
                  }}
                  mode="calendar"
                  style={{borderRadius: 10}}
                  onSelectedChange={date => setSelectedDate(date)}
                />
              )}
            </View>
            <View>
              <Text style={styles.label}>Gender</Text>

              <SelectList
                // onSelect={() => alert(selected)}
                setSelected={setSelected}
                fontFamily="Avenir"
                data={[
                  {key: 'Male', value: 'male'},
                  {key: 'Female', value: 'female'},
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
                defaultOption={{key: 'Male', value: 'male'}} //default selected option
              />
            </View>

            <View>
              <Text style={styles.label}>Referal Code (Optional)</Text>
              <TextInput
                style={[
                  styles.input,
                  //   {
                  //     borderWidth: isTextInputFocused === true ? 0.5 : 0,
                  //     borderColor:
                  //       isTextInputFocused === true ? '#8D020E' : 'none',
                  //   },
                ]}
                name="referal_code"
                onChangeText={text => setReferalCode(text)}
                value={referalCode}
                placeholder="referal code"
                onFocus={() => !setTextInputFocused}
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={handleNext}
              // onPress={() => navigation.navigate("VerifyOTP")}
              activeOpacity={0.7}>
              {isLoading ? (
                <View style={styles.horizontal}>
                  <ActivityIndicator />
                </View>
              ) : (
                <Text style={styles.buttonText}>Next</Text>
              )}
            </TouchableOpacity>
          </View>
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
    backgroundColor: '#e5e5e5',
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

  genderContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    // marginBottom: 30,
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
  input: {
    margin: 10,
    borderWidth: 0.2,
    padding: 15,
    backgroundColor: '#D9D9D9',
    borderRadius: 6,
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
