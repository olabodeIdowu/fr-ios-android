import {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import {
  Alert,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import passionArray from './../../dev_data/passions/passions';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function SelectInterest({navigation, route: {params}}) {
  const [isLoading, setIsLoading] = useState(false);
  const [interestArray, setInterestArray] = useState(passionArray);
  const [passions, setPassions] = useState([]);

  const userForm = {
    ...params.userForm,
    passions,
  };

  function handlePassions(p, i) {
    setInterestArray(interest => {
      return interest.map((int, index) => {
        return {
          ...int,
          active: i === index ? !int.active : int.active,
        };
      });
    });
    // setPassions(
    //   interestArray.filter((i) => i.active === true).map((i) => i.passion)
    //
  }

  // useEffect(() => {
  //   if (
  //     // passions.length <= 4 ||
  //     interestArray.filter((i) => i.active === true).length <= 4
  //   ) {
  //   }
  //   setPassions(
  //     interestArray.filter((i) => i.active === true).map((i) => i.passion)
  //   );
  // }, [passions.length === 5]);

  async function handleCreateUser() {
    try {
      console.log(
        interestArray.filter(i => i.active === true).map(i => i.passion),
      );
      // console.log(userForm);
      // console.log({
      //   ...params.userForm,
      //   passions: passions,
      // });
      // setIsLoading(true);
      // const response = await axios({
      //   method: "patch",
      // url: `${url}/dedott/api/v1/users/${user?.id}/update-user`,
      //   // data: userForm,
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      // setIsLoading(false);
      // if (!response) throw new Error("response not found");
      // // console.log(response);
      navigation.navigate('Notification');
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
      <View>
        <Text style={styles.headerText}>Select Interests</Text>
        <Text
          style={{
            fontFamily: 'Avenir',
            color: '#333',
            fontSize: 16,
            padding: 10,
          }}>
          You can only choose upto (5) interests
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            columnGap: 10,
            rowGap: 10,
            margin: 10,
          }}>
          {interestArray.map((p, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handlePassions(p, index)}
                style={p.active ? styles.active : styles.inActive}>
                <Text style={styles.genderText}>{p?.passion}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleCreateUser}
          activeOpacity={0.4}>
          {isLoading ? (
            <View style={styles.horizontal}>
              <ActivityIndicator />
            </View>
          ) : (
            <Text style={styles.buttonText}>Next</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
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
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },

  progressBar6: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
    borderRadius: 16,
    border: '1px solid',
  },

  progressBar7: {
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
    padding: 10,
    color: '#ffffff',
    padding: 6,
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
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
