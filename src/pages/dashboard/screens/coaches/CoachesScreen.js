import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CoachesScreen({navigation}) {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    async function handle() {
      const storedAppUser = JSON.parse(await AsyncStorage.getItem('user'));
      if (!storedAppUser) {
        navigation.navigate('login');
      } else {
        //store in context
        setCurrentUser(storedAppUser);
      }
    }
    handle();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text
          style={{
            backgroundColor: '#FFFFFF',
            color: '#000000',
            textAlign: 'center',
            padding: 20,
            fontSize: 20,
          }}>
          Coaches
        </Text>
        <Text
          style={{
            fontSize: 24,
            fontFamily: 'Avenir',
            color: '#000000',
            paddingTop: 10,
            paddingLeft: 10,
          }}>
          Hi Test User
          {/* Hi {currentUser?.firstName + ' ' + currentUser?.lastName} */}
        </Text>
        <Text
          style={{
            paddingLeft: 10,
            fontSize: 16,
            fontFamily: 'Avenir',
            color: '#333333',
            marginBottom: 10,
          }}>
          Find chat with an available coach
        </Text>
        <ScrollView
          style={{height: '100%', paddingTop: 10}}
          showsVerticalScrollIndicator={false}>
          <Pressable
            onPress={() => navigation.navigate('CoachDetailsScreen')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              marginHorizontal: 10,
              borderRadius: 10,
              backgroundColor: '#D9D9D9',
            }}>
            <Image
              style={{borderRadius: 8, width: 100, height: 120}}
              source={require('./../../../../../assets/users/Rectangle139.png')}
            />
            <View style={{}}>
              <Text
                style={{
                  fontFamily: 'Avenir',
                  color: '#000000',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                Janet Amechi
              </Text>
              <Text
                style={{
                  color: '#6C6C6C',
                  fontFamily: 'Avenir',
                  fontSize: 14,
                  fontWeight: 400,
                  paddingVertical: 5,
                }}>
                Dating/psychological coach
              </Text>
              {/* <Text
                style={{
                  color: '#000000',
                  fontFamily: 'Avenir',
                  fontSize: 14,
                  fontWeight: 400,
                }}>
                I aim to drive a reformation amongst the youths
              </Text> */}
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <MaterialCommunityIcons name="star" color="#F8B930" size={14} />
                <Text
                  style={{
                    color: '#000000',
                    fontFamily: 'Avenir',
                    fontSize: 14,
                    fontWeight: 400,
                    paddingVertical: 5,
                  }}>
                  (4.8) from 120 Reviews
                </Text>
              </View>
            </View>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('CoachDetailsScreen')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              borderRadius: 10,
              backgroundColor: '#D9D9D9',
              margin: 10,
            }}>
            <Image
              style={{borderRadius: 8, width: 100, height: 120}}
              source={require('./../../../../../assets/users/Rectangle140.png')}
            />
            <View>
              <Text
                style={{
                  color: '#000000',
                  fontWeight: 'bold',
                  marginTop: 5,
                  marginBottom: 5,
                }}>
                John Richards
              </Text>
              <Text
                style={{
                  color: '#6C6C6C',
                  fontFamily: 'Avenir',
                  fontSize: 14,
                  fontWeight: 400,
                  paddingVertical: 5,
                }}>
                Dating/psychological coach
              </Text>
              {/* <Text
                style={{
                  color: '#000000',
                  fontFamily: 'Avenir',
                  fontSize: 14,
                  fontWeight: 400,
                }}>
                I aim to drive a reformation amongst the youths
              </Text> */}
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <MaterialCommunityIcons name="star" color="#F8B930" size={14} />
                <Text
                  style={{
                    color: '#000000',
                    fontFamily: 'Avenir',
                    fontSize: 14,
                    fontWeight: 400,
                    paddingVertical: 5,
                    paddingVertical: 5,
                  }}>
                  (4.8) from 120 Reviews
                </Text>
              </View>
            </View>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('CoachDetailsScreen')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              marginHorizontal: 10,
              borderRadius: 10,
              backgroundColor: '#D9D9D9',
            }}>
            <Image
              style={{borderRadius: 8, width: 100, height: 120}}
              source={require('./../../../../../assets/users/Rectangle139.png')}
            />

            <View>
              <Text
                style={{
                  color: '#000000',
                  fontWeight: 'bold',
                  marginTop: 5,
                  marginBottom: 5,
                }}>
                Austin James
              </Text>
              <Text
                style={{
                  color: '#6C6C6C',
                  fontFamily: 'Avenir',
                  fontSize: 14,
                  fontWeight: 400,
                  paddingVertical: 5,
                }}>
                Dating/psychological coach
              </Text>
              {/* <Text
                style={{
                  color: '#000000',
                  fontFamily: 'Avenir',
                  fontSize: 14,
                  fontWeight: 400,
                }}>
                I aim to drive a reformation amongst the youths
              </Text> */}
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <MaterialCommunityIcons name="star" color="#F8B930" size={14} />
                <Text
                  style={{
                    color: '#000000',
                    fontFamily: 'Avenir',
                    fontSize: 14,
                    fontWeight: 400,
                    paddingVertical: 5,
                    paddingVertical: 5,
                  }}>
                  (4.8) from 120 Reviews
                </Text>
              </View>
            </View>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('CoachDetailsScreen')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              borderRadius: 10,
              backgroundColor: '#D9D9D9',
              margin: 10,
            }}>
            <Image
              style={{borderRadius: 8, width: 100, height: 120}}
              source={require('./../../../../../assets/users/Rectangle140.png')}
            />
            <View>
              <Text
                style={{
                  color: '#000000',
                  fontWeight: 'bold',
                  marginTop: 5,
                  marginBottom: 5,
                }}>
                John Richards
              </Text>
              <Text
                style={{
                  color: '#6C6C6C',
                  fontFamily: 'Avenir',
                  fontSize: 14,
                  fontWeight: 400,
                  paddingVertical: 5,
                }}>
                Dating/psychological coach
              </Text>
              {/* <Text
                style={{
                  color: '#000000',
                  fontFamily: 'Avenir',
                  fontSize: 14,
                  fontWeight: 400,
                }}>
                I aim to drive a reformation amongst the youths
              </Text> */}
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <MaterialCommunityIcons name="star" color="#F8B930" size={14} />
                <Text
                  style={{
                    color: '#000000',
                    fontFamily: 'Avenir',
                    fontSize: 14,
                    fontWeight: 400,
                    paddingVertical: 5,
                    paddingVertical: 5,
                  }}>
                  (4.8) from 120 Reviews
                </Text>
              </View>
            </View>
          </Pressable>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
});
