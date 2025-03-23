import {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Notifications({navigation}) {
  const [isAMentee, setIsAMentee] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('Details');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20,
          }}
          activeOpacity={0.7}
          onPress={() => {
            //  Go back to the previous screen.
            navigation.goBack();
          }}>
          <Text style={styles.backText}>&larr;</Text>
          <Text style={styles.detailsText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="#6C6C6C" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{height: '100%', paddingTop: 10}}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            borderBottomWidth: 0.5,
            borderColor: '#cc8b0f',
            paddingHorizontal: 10,
            paddingVertical: 20,
          }}>
          <Image
            style={{width: 40, height: 40, borderRadius: 50}}
            source={require('./../../../../../../assets/users/user.png')}
          />

          <Text
            style={{
              color: '#6C6C6C',
              fontFamily: 'Rubik',
              textAlign: 'center',
              marginTop: 5,
              fontWeight: 'medium',
              fontSize: 14,
              fontWeight: 400,
            }}>
            Mentor Kwashi Kweri accepted you request
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#fbf3f4',
            borderBottomWidth: 0.5,
            borderColor: '#cc8b0f',
            height: 90,
          }}>
          <Text
            style={{
              width: 260,
              color: '#6C6C6C',
              fontFamily: 'Rubik',
              padding: 10,
              fontSize: 14,
              fontWeight: 400,
            }}>
            Grace Ume, Theophilus Neni and 3 others reacted to your comment...
          </Text>

          <View
            style={{
              width: 100,
              height: 50,
              borderWidth: 0.4,
              borderWidthColor: '#6C6C6C',
              borderRadius: 10,
              margin: 'auto',
              justifyContent: 'center',
              padding: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <Image
                  style={{width: 10, height: 10, borderRadius: 50}}
                  source={{
                    uri: 'https://i.imghippo.com/files/nBZ5038joU.png',
                  }}
                />
                <View>
                  <Text
                    style={{
                      fontSize: 6,
                      fontFamily: 'Avenir',
                      fontWeight: '900',
                      color: '#000000',
                    }}>
                    Test User
                  </Text>
                </View>
              </View>
              <Ionicons name="ellipsis-vertical" size={4} color="#6C6C6C" />
            </View>

            <View>
              <Text
                style={{
                  color: '#6C6C6C',
                  fontFamily: 'Avenir',
                  fontSize: 4,
                  marginTop: 5,
                  fontWeight: '400',
                }}>
                Lorem ipsum dolor sit ametconsectetur. Morbi neque semper
                cras...read more
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignSelf: 'left',
                paddingVertical: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 5,
                  alignItems: 'center',
                }}>
                <Ionicons name="heart" size={4} color="#db3838" />
                {/* <Ionicons name="heart-outline" size={4} color="#6C6C6C" /> */}
                <Text
                  style={{
                    fontSize: 4,
                    fontFamily: 'Avenir',
                    color: '#6C6C6C',
                  }}>
                  33 likes
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 5,
                  alignItems: 'center',
                }}>
                {/* <MaterialCommunityIcons name="comment" size={4} color="#db3838" /> */}
                <MaterialCommunityIcons name="heart" size={4} color="#6C6C6C" />
                <Text
                  style={{
                    fontSize: 4,
                    fontFamily: 'Avenir',
                    color: '#6C6C6C',
                  }}>
                  33 comments
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomWidth: 0.5,
            borderColor: '#cc8b0f',
            height: 90,
          }}>
          <Text
            style={{
              color: '#6C6C6C',
              fontFamily: 'Rubik',
              padding: 10,
              fontSize: 14,
              fontWeight: 400,
            }}>
            Grace Ume commented on your post
          </Text>
          <View
            style={{
              width: 100,
              height: 50,
              borderWidth: 0.4,
              borderWidthColor: '#6C6C6C',
              borderRadius: 10,
              margin: 'auto',
              justifyContent: 'center',
              padding: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <Image
                  style={{width: 10, height: 10, borderRadius: 50}}
                  source={{
                    uri: 'https://i.imghippo.com/files/nBZ5038joU.png',
                  }}
                />
                <View>
                  <Text
                    style={{
                      fontSize: 6,
                      fontFamily: 'Avenir',
                      fontWeight: '900',
                      color: '#000000',
                    }}>
                    Test User
                  </Text>
                </View>
              </View>
              <Ionicons name="ellipsis-vertical" size={4} color="#6C6C6C" />
            </View>

            <View>
              <Text
                style={{
                  color: '#6C6C6C',
                  fontFamily: 'Avenir',
                  fontSize: 4,
                  marginTop: 5,
                  fontWeight: '400',
                }}>
                Lorem ipsum dolor sit ametconsectetur. Morbi neque semper
                cras...read more
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignSelf: 'left',
                paddingVertical: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 5,
                  alignItems: 'center',
                }}>
                <Ionicons name="heart" size={4} color="#db3838" />
                {/* <Ionicons name="heart-outline" size={4} color="#6C6C6C" /> */}
                <Text
                  style={{
                    fontSize: 4,
                    fontFamily: 'Avenir',
                    color: '#6C6C6C',
                  }}>
                  33 likes
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 5,
                  alignItems: 'center',
                }}>
                {/* <MaterialCommunityIcons name="comment" size={4} color="#db3838" /> */}
                <MaterialCommunityIcons name="heart" size={4} color="#6C6C6C" />
                <Text
                  style={{
                    fontSize: 4,
                    fontFamily: 'Avenir',
                    color: '#6C6C6C',
                  }}>
                  33 comments
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Text
          style={{
            color: '#6C6C6C',
            fontFamily: 'Rubik',
            padding: 10,
            fontSize: 14,
            fontWeight: 400,
            textAlign: 'center',
            padding: 20,
            borderBottomWidth: 0.5,
            borderColor: '#cc8b0f',
          }}>
          Africa Ignite Event is due today
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  welcomeImage: {
    marginBottom: 20,
    width: 300,
    height: 300,
    borderRadius: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 2,
    borderColor: '#4D4D4D80',
  },

  nav: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 80,
    flexDirection: 'row',
    padding: 3.2,
    marginBottom: 10,
    padding: 10,
  },

  backText: {
    fontSize: 36,
    color: '#000000',
    fontFamily: 'Avenir',
  },

  detailsText: {
    justifyContent: 'center',
    fontSize: 22,
    color: '#000000',
    fontFamily: 'Avenir',
  },

  button: {
    width: '50%',
    alignItems: 'center',
    backgroundColor: '#A8000E',
    padding: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#000000',
    fontFamily: 'Avenir',
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
