import {useEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../../../../context/authContext';

export default function EmailModal({navigation, openEmail, setOpenEmail}) {
  const {setAuth} = useContext(AuthContext);
  const [user, setUser] = useState(undefined);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    async function handle() {
      const storedAppUser = JSON.parse(await AsyncStorage.getItem('user'));
      if (!storedAppUser) {
        navigation.navigate('Login');
      } else {
        //store in context
        setUser(storedAppUser);
      }
    }
    handle();
  }, []);

  async function handleReceiveEmailPromotions() {
    try {
      setChecked(() => !checked);
      const {data} = await axios.patch(
        `${url}/dedott/api/v1/users/${user?.id}`,
        {
          receiveEmailPromotions: checked,
        },
      );

      console.log('data ', data?.data?.user);
      // update storage
      await AsyncStorage.setItem('user', JSON.stringify(data?.data?.user));

      // update context
      setAuth(auth => {
        return {
          ...auth,
          user: data?.data?.user,
        };
      });
      alert(data?.status);
    } catch (error) {
      console.log(
        error.response?.data?.error?.statusCode,
        error.response?.data?.message,
      );
    }
  }

  return (
    <View>
      <Modal
        animationType="slide"
        visible={openEmail}
        onRequestClose={() => setOpenEmail(false)}
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
              <TouchableOpacity>
                <MaterialCommunityIcons
                  onPress={() => setOpenEmail(false)}
                  name="chevron-left"
                  size={24}
                  color="#888"
                />
              </TouchableOpacity>

              <Text
                style={{
                  fontFamily: 'Avenir',
                  fontWeight: '900',
                  color: '#000000',
                  fontSize: 16,
                }}>
                Account
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontFamily: 'Avenir',
              fontWeight: '800',
              padding: 10,
              marginTop: 10,
              fontSize: 16,
              color: '#000000',
            }}>
            Email
          </Text>
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderColor: 'grey',
              borderTopWidth: 0.2,
              borderBottomWidth: 0.2,
              padding: 15,
              marginBottom: 15,
              backgroundColor: '#F7F7F7',
            }}>
            <Text style={styles.keyText}>{user?.email}</Text>
            <View>
              <MaterialCommunityIcons name="check" size={24} color="#A8000E" />
            </View>
          </Pressable>

          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Avenir',
              color: '#cc8b0f',
              padding: 15,
            }}>
            Verified Email Address
          </Text>
          <TouchableOpacity
            style={{
              width: '90%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              padding: 15,
              borderWidth: 0.3,
              borderColor: 'gray',
              backgroundColor: '#004ba8',
              borderRadius: 50,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
            <MaterialCommunityIcons name="google" size={24} color="blue" />
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                color: '#ffffff',
              }}>
              Continue with Google
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'Avenir',
              fontWeight: '800',
              padding: 10,
              marginTop: 10,
              fontSize: 16,
              color: '#000000',
              textAlign: 'center',
            }}>
            Verify instantly by connecting your Google Account
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              padding: 15,
            }}>
            <TouchableOpacity onPress={handleReceiveEmailPromotions}>
              {user?.receiveEmailPromotions ? (
                <MaterialCommunityIcons
                  color="#A8000E"
                  name="checkbox-marked"
                  size={24}
                />
              ) : (
                <MaterialCommunityIcons
                  name="checkbox-blank-outline"
                  size={24}
                  color="#C6C6C6"
                />
              )}
            </TouchableOpacity>

            <Text
              style={{
                fontFamily: 'Avenir',
                fontWeight: '400',
                padding: 10,
                // marginTop: 10,
                fontSize: 14,
                color: '#333333',
              }}>
              I would like to receive emails about promotions and marketing
              campaigns
            </Text>
          </View>
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

  headerFlexText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 100,
    padding: 10,
    paddingBottom: 20,
    borderBottomWidth: 0.2,
    borderColor: 'gray',
    backgroundColor: '#0a100d',
  },
  headerCardFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 20,
    borderBottomWidth: 0.2,
    borderColor: 'gray',
    backgroundColor: '#0a100d',
  },

  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#ffffff',
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
