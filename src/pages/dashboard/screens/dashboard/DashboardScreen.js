import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  RefreshControl,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../../../context/authContext';
import {url} from '../../../../hooks/useUrl';
import {axiosInstance} from '../../../../hooks/useAxios';
import SwipeableImage from './components/SwipeableImage';
import {
  createBlocking,
  updateBlockedUser,
} from '../../../../services/apiBlocking';
import PopUpReportModal from '../chats/chat_popups/ReportUserPopup';
import MatchScreen from '../chats/MatchScreen';
import {LocationContext} from '../../../../context/locationContext';
import {updateUserLocation} from '../../../../services/apiUsers';
import {updateOnlineStatus} from '../../../../services/apiChats';
import Information from './components/Information';
import Questionaire from './components/Questionaire';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

const images = [
  `https://fastly.picsum.photos/id/22/428/926.jpg?hmac=cO3y3vLEmYwq4sI_0GHWAEhjdId5baUwd3UR2Yn4RPA`,
  `https://fastly.picsum.photos/id/1073/428/926.jpg?hmac=rcRmwul7vymSMMAMUS7fYNWruiV8qpDX1rmDmCcrlrY`,
  `https://fastly.picsum.photos/id/80/428/926.jpg?hmac=_fEMeJ8oLNwl0ur1p8ZgZwiUl8cKE4Ea5v58ynIdwk0`,
  `https://fastly.picsum.photos/id/337/428/926.jpg?hmac=2qMOozwz3GTXSZ8kHEp6u83DlHvKNEbAQPG1WXHJUOE`,
];

function DashboardScreen() {
  const [dimensions, setDimensions] = useState({window, screen});
  const {auth, setAuth} = useContext(AuthContext);
  const {latitude, longitude} = useContext(LocationContext);
  const {city, setCity} = useState(null);
  const {country, setCountry} = useState(null);
  const navigation = useNavigation();
  const [isBlocked, setIsBlocked] = useState(false);
  const [showPopupReportModal, setShowPopupReportModal] = useState(false);
  const [showQuestionaireModal, hideQuestionaireModal] = useState(false);
  const [showInformationModal, hideInformationModal] = useState(false);
  const [index, setIndex] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);

  const [next, setNext] = useState(0);
  const [userToDisplay, setUserToDisplay] = useState([]);
  const [user, setUser] = useState({});
  const {photo, email, sex, role, id, likes, membership} = user;

  const bottom = -dimensions.screen.height / 1.4;
  const bottomUpArrow = -dimensions.screen.height / 1.38;
  const slideCardInfo = -dimensions.screen.height / 1.72;
  console.log(longitude, latitude);

  useEffect(() => {
    async function updateStatus() {
      const form = {
        status: true,
      };
      await updateOnlineStatus(form);
    }
    updateStatus();
  }, [auth?.user]);

  useEffect(() => {
    async function updateLocation() {
      const form = {
        latitude: latitude,
        longitude: longitude,
      };
      const response = await updateUserLocation(form);
      console.log(response);
    }
    updateLocation();
  }, []);

  function getDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return Math.floor(d);
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  // useEffect(() => {
  //   async function updateUserCity() {
  //     try {
  //       const response = await axiosInstance({
  //         method: 'post',
  //         url: `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${process.env.GEOCODINGAPIKEY}`,
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //       });
  //       if (!response) throw new Error('response not found');

  //       setCity(response?.data?.address?.state);
  //       setCountry(response?.data?.address?.country);
  //       console.log(city, country);
  //     } catch (error) {
  //       console.log(
  //         error.response?.data?.error?.statusCode,
  //         error.response?.data?.message,
  //       );
  //       Alert.alert('Error', error.response?.data?.message, [{text: 'OK'}]);
  //     }
  //   }
  //   updateUserCity();
  // }, [longitude, latitude]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    async function handle() {
      const storedAppUser = JSON.parse(await AsyncStorage.getItem('user'));
      if (!storedAppUser) {
        navigation.navigate('login');
      } else {
        //store in context
        setUser(storedAppUser);
      }
    }
    handle();
  }, []);

  async function fetchMaleUsers() {
    try {
      const response = await axiosInstance({
        method: 'get',
        url: `${url}/fr/api/v1/users?sex=male&role=user`,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response) throw new Error('response not found');
      let doc = response?.data?.data?.doc;

      const myLikes = doc.filter(d => {
        return !d.likes?.some(l => l?.likedBy === user?.id);
      });

      const nonBlockedUsers = myLikes.filter(d => {
        return !d.blocked_users?.some(bu => bu?._id === d?.id);
      });

      console.log('fetching males', nonBlockedUsers.length, myLikes.length);

      // console.log("fetching females", doc, nonBlockedUsers);
      setUserToDisplay(nonBlockedUsers.sort());
    } catch (error) {
      console.log(error);
      Alert.alert('Error', error.message, [{text: 'OK'}]);
    }
  }

  async function fetchFemaleUsers() {
    try {
      const response = await axiosInstance({
        method: 'get',
        url: `${url}/fr/api/v1/users?sex=female&role=user`,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response) throw new Error('response not found');
      let doc = response?.data?.data?.doc;

      const myLikes = doc.filter(d => {
        return !d.likes?.some(l => l?.likedBy === user?.id);
      });

      const nonBlockedUsers = myLikes.filter(d => {
        return !d.blocked_users?.some(bu => bu?._id === d?.id);
      });

      console.log(
        'fetching females',
        myLikes,
        nonBlockedUsers.length,
        myLikes.length,
      );

      // console.log("fetching females", doc, nonBlockedUsers);
      setUserToDisplay(nonBlockedUsers.sort());
    } catch (error) {
      console.log(error);
      Alert.alert('Error', error.message, [{text: 'OK'}]);
    }
  }

  useEffect(() => {
    async function fetchUsers() {
      if (sex === 'male' && role === 'user') {
        await fetchFemaleUsers();
      } else if (sex === 'female' && role === 'user') {
        await fetchMaleUsers();
      }
    }
    fetchUsers();
  }, [sex, role]);

  async function handleNotLiked() {
    if (next >= userToDisplay.length - 1) {
      setNext(0);
    } else {
      setNext(next => next + 1);
    }
  }

  async function handleIsLiked(userId) {
    try {
      // setIsLiked(true);
      const response = await axiosInstance({
        method: 'post',
        url: `${url}/fr/api/v1/users/${userId}/users-likes`,
        data: {
          isLiked: true,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response) throw new Error('likes not created');
      console.log(
        userId,
        likes.some(l => {
          return l.likedBy === userId;
        }),
      );

      if (
        likes.length > 0 &&
        likes.some(l => {
          return l.likedBy === userId;
        })
      ) {
        // remember to access matches on current chat
        const {data} = await axios.patch(`${url}/fr/api/v1/users/${user?.id}`, {
          matches: [...user.matches, userToDisplay[next]],
        });

        // remember to access matches on users
        const {data2} = await axios.patch(`${url}/fr/api/v1/users/${userId}`, {
          matches: [...userToDisplay[next]?.matches, user],
        });

        console.log('data ', data?.data?.user, 'data2 ', data2?.data?.user);
        // update storage
        await AsyncStorage.setItem('user', JSON.stringify(data?.data?.user));

        // update context
        setAuth(auth => {
          return {
            ...auth,
            user: data?.data?.user,
          };
        });
        // Alert.alert('Matches found');
        Alert.alert('Matches found'[{text: 'OK'}]);
        navigation.navigate('MatchScreen', {
          currentChat: userToDisplay[next],
          user,
        });
      } else if (
        likes.length > 0 &&
        likes.some(l => {
          return l.likedBy !== userToDisplay[next].id;
        })
      ) {
        handleNotLiked();
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', error.message, [{text: 'OK'}]);
    }
  }

  // Handle Blocking user
  async function blockUser() {
    try {
      const form = {
        isBlocked: true,
      };
      await createBlocking(userToDisplay[next]?.id, form);
    } catch (error) {
      console.log(error.message);
    }
  }

  // unBlocking user
  async function unBlockUser() {
    try {
      const form = {
        isBlocked: false,
      };
      await updateBlockedUser(userToDisplay[next]?.id, form);
    } catch (error) {
      console.log(error.message);
    }
  }

  // Handle blocking user
  function handleBlocking() {
    if (isBlocked === true) {
      blockUser();
    } else {
      unBlockUser();
    }
  }
  // Handle reporting user
  function handleReporting() {
    setShowPopupReportModal(true);
  }

  //console log the users to display image
  console.log('id: ', userToDisplay[next]?.id);

  return (
    // <LinearGradient
    //   start={{x: 0.3, y: 0.5}}
    //   end={{x: 0.2, y: 0.7}}
    //   colors={['#f5e9ea', '#f7f7f7']}
    //   style={{height: '100%'}}>
    <SafeAreaView style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity>
          {auth?.user?.avatar ? (
            <Image style={styles.navImage} source={{uri: auth?.user?.avatar}} />
          ) : (
            <Image
              style={styles.navImage}
              source={{uri: 'https://i.imghippo.com/files/nBZ5038joU.png'}}
            />
          )}
        </TouchableOpacity>
        <View style={{flexDirection: 'column', gap: 4}}>
          <Text style={styles.navText}>Discover</Text>
          <Text style={{color: '#333333', fontSize: 12}}>Lekki, Lagos</Text>
        </View>
        <View style={{flexDirection: 'row', gap: 4}}>
          <TouchableOpacity
            style={{
              position: 'relative',
              backgroundColor: '#ffffff',
              justifyContent: 'center',
              alignItems: 'center',
              width: 40,
              height: 40,
              borderRadius: 10,
            }}
            onPress={() =>
              navigation.navigate('NotificationScreen', {
                currentChat: userToDisplay[next],
                user,
              })
            }>
            <Ionicons name="notifications" color="#cc8b0f" size={30} />
            {/* <View
              style={{
                position: 'absolute',
                backgroundColor: '#db3838',
                width: 20,
                height: 20,
                borderRadius: 50,
                right: 0,
                top: 0,
                color: '#FFFFFF',
                fontSize: 14,
                justifyContent: 'center',
                textAlign: 'center',
              }}> */}
            <Text
              style={{
                position: 'absolute',
                backgroundColor: '#db3838',
                width: 10,
                height: 10,
                borderRadius: 50,
                right: 2,
                top: 2,
                color: '#FFFFFF',
                fontSize: 14,
                justifyContent: 'center',
                textAlign: 'center',
              }}></Text>
            {/* </View> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#ffffff',
              justifyContent: 'center',
              alignItems: 'center',
              width: 40,
              height: 40,
              borderRadius: 10,
            }}
            onPress={() =>
              navigation.navigate('MatchScreen', {
                currentChat: userToDisplay[next],
                user,
              })
            }>
            <MaterialCommunityIcons name="sort" color="#cc8b0f" size={30} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={{
          height: '100%',
          paddingVertical: 10,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}>
        <Pressable
          style={{
            padding: 10,
            borderBottomWidth: 0.5,
            borderColor: '#cc8b0f',
            marginBottom: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <Image
                  style={{width: 30, height: 30, borderRadius: 50}}
                  source={{
                    uri: 'https://i.imghippo.com/files/nBZ5038joU.png',
                  }}
                />
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'Avenir',
                        fontWeight: '900',
                        color: '#000000',
                      }}>
                      Test
                    </Text>

                    <Text
                      style={{
                        color: '#333333',
                        fontWeight: '600',
                        fontSize: 18,
                      }}>
                      24
                    </Text>

                    <View
                      style={{
                        backgroundColor: 'green',
                        width: 10,
                        height: 10,
                        borderRadius: 50,
                      }}></View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 5,
                      marginTop: 5,
                    }}>
                    <Ionicons name="person-outline" size={12} color="#333333" />
                    <Text style={{color: '#333333', fontSize: 14}}>female</Text>
                    <Ionicons
                      name="location-outline"
                      size={12}
                      color="#333333"
                    />
                    <Text style={{color: '#333333', fontSize: 14}}>
                      {getDistance(
                        auth?.user?.userLocation[0],
                        auth?.user?.userLocation[1],
                        userToDisplay[next]?.userLocation[0],
                        userToDisplay[next]?.userLocation[1],
                      )}{' '}
                      km
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                width: 70,
                height: 40,
                borderRadius: 10,
                // borderWidth: 0.5,
                // borderColor: '#333',
                // justifyContent: 'center',
                // shadowColor: '#000',
                // shadowOffset: {
                //   width: 0,
                //   height: 2,
                // },
                // shadowOpacity: 0.25,
                // shadowRadius: 4,
                // elevation: 5,
              }}>
              <TouchableOpacity style={{}} activeOpacity={0.7}>
                <Ionicons name="heart-outline" size={24} color="#6C6C6C" />
              </TouchableOpacity>
              <TouchableOpacity style={{}} activeOpacity={0.7}>
                <Ionicons name="information" size={24} color="blue" />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text
              style={{
                color: '#6C6C6C',
                fontFamily: 'Avenir',
                fontSize: 14,
                marginTop: 10,
                fontWeight: '400',
              }}>
              Lorem ipsum dolor sit ametconsectetur. Morbi neque semper cras
              nunc aliquam sed. Sollicitudin hendrerit dolor varius nunc proin
              done
            </Text>
          </View>
        </Pressable>
        <Pressable
          style={{
            // backgroundColor: '#fff',
            padding: 10,
            borderBottomWidth: 0.5,
            borderColor: '#cc8b0f',
            marginBottom: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <Image
                  style={{width: 30, height: 30, borderRadius: 50}}
                  source={{
                    uri: 'https://i.imghippo.com/files/dcp3995WAk.jpg',
                  }}
                />
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'Avenir',
                        fontWeight: '900',
                        color: '#000000',
                      }}>
                      Test0
                    </Text>

                    <Text
                      style={{
                        color: '#333333',
                        fontWeight: '600',
                        fontSize: 18,
                      }}>
                      21
                    </Text>

                    <View
                      style={{
                        backgroundColor: '#999',
                        width: 10,
                        height: 10,
                        borderRadius: 50,
                      }}></View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 5,
                      marginTop: 5,
                    }}>
                    <Ionicons name="person-outline" size={12} color="#333333" />
                    <Text style={{color: '#333333', fontSize: 14}}>female</Text>
                    <Ionicons
                      name="location-outline"
                      size={12}
                      color="#333333"
                    />
                    <Text style={{color: '#333333', fontSize: 14}}>
                      {getDistance(
                        auth?.user?.userLocation[0],
                        auth?.user?.userLocation[1],
                        userToDisplay[next]?.userLocation[0],
                        userToDisplay[next]?.userLocation[1],
                      )}{' '}
                      km
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                width: 70,
                height: 40,
                borderRadius: 10,
                // borderWidth: 0.5,
                // borderColor: '#333',
                justifyContent: 'center',
                // shadowColor: '#000',
                // shadowOffset: {
                //   width: 0,
                //   height: 2,
                // },
                // shadowOpacity: 0.25,
                // shadowRadius: 4,
                // elevation: 5,
              }}>
              <TouchableOpacity
                onPress={() => hideQuestionaireModal(true)}
                style={
                  {
                    // shadowColor: '#000',
                    // shadowOffset: {
                    //   width: 0,
                    //   height: 2,
                    // },
                    // shadowOpacity: 0.25,
                    // shadowRadius: 4,
                    // elevation: 5,
                  }
                }
                activeOpacity={0.7}>
                <Ionicons name="heart" size={24} color="#db3838" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => hideInformationModal(true)}
                style={
                  {
                    // shadowColor: '#000',
                    // shadowOffset: {
                    //   width: 0,
                    //   height: 2,
                    // },
                    // shadowOpacity: 0.25,
                    // shadowRadius: 4,
                    // elevation: 5,
                  }
                }
                activeOpacity={0.8}>
                <Ionicons name="information" size={24} color="blue" />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text style={{color: '#6C6C6C', fontSize: 14, marginTop: 10}}>
              Lorem ipsum dolor sit ametconsectetur. Morbi neque semper cras
              nunc aliquam sed. Sollicitudin hendrerit dolor varius nunc proin
              done
            </Text>
          </View>
        </Pressable>
        {showQuestionaireModal && (
          <Questionaire
            showQuestionaireModal={showQuestionaireModal}
            hideQuestionaireModal={() => hideQuestionaireModal(false)}
            currentChat={userToDisplay[next]}
          />
        )}
        {showInformationModal && (
          <Information
            showInformationModal={showInformationModal}
            hideInformationModal={() => hideInformationModal(false)}
            showPopupReportModal={showPopupReportModal}
            setShowPopupReportModal={setShowPopupReportModal}
            currentChat={userToDisplay[next]}
            auth={auth}
            setAuth={setAuth}
            latitude={latitude}
            longitude={longitude}
            isBlocked={isBlocked}
            handleBlocking={handleBlocking}
            handleReporting={handleReporting}
          />
        )}
      </ScrollView>
      {/* <GestureHandlerRootView style={{position: 'relative'}}>
          <View style={styles.container}>
            {!scrollUp && (
              <View style={{marginTop: 5}}>
                <SwipeableImage images={images} />
              </View>
            )}

            {!scrollUp && (
              <View
                style={{
                  flexDirection: 'row',
                  gap: dimensions.screen.width / 10,
                  position: 'absolute',
                  bottom: `${bottom}`,
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#FFFFFF',
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                  }}
                  onPress={handleNotLiked}>
                  <Icon name="close" size={24} color="#cc8b0f" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    bottom: -20,
                    backgroundColor: '#db3838',
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                  }}
                  onPress={() => handleIsLiked(userToDisplay[next]?.id)}>
                  <Icon name="heart" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#FFFFFF',
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                  }}
                  onPress={() => handleIsLiked(userToDisplay[next]?.id)}>
                  <Icon name="star" size={24} color="#6725AC" />
                </TouchableOpacity>
              </View>
            )}

            {!scrollUp && (
              <View
                style={{
                  // flexDirection: 'row',
                  // alignItems: 'center',
                  position: 'absolute',
                  bottom: `${slideCardInfo}`,
                  left: 60,
                }}>
                <View>
                  <Text style={styles.name}>{`${
                    userToDisplay[next]?.firstName +
                    ' ' +
                    userToDisplay[next]?.lastName
                  }`}</Text>
                  <Text
                    style={styles.job}>{`${userToDisplay[next]?.job}`}</Text>
                </View>
              </View>
            )}

            <View
              style={{
                position: 'absolute',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 15,
                top: 40,
                left: 60,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  backgroundColor: '#D2D2D4',
                  padding: 4,
                  borderRadius: 5,
                }}>
                <Icon2 name="location-outline" size={18} color="#FFFFFF" />
                <Text style={styles.distance}>
                  {getDistance(
                    auth?.user?.userLocation[0],
                    auth?.user?.userLocation[1],
                    userToDisplay[next]?.userLocation[0],
                    userToDisplay[next]?.userLocation[1],
                  )}{' '}
                  km
                </Text>
              </View>
              {!scrollUp && (
                <TouchableOpacity
                  style={{
                    width: 24,
                    height: 24,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#D2D2D4',
                    fontWeight: '700',
                    borderRadius: '50%',
                  }}
                  onPress={() => setScrollUp(true)}>
                  <Icon2 name="information-outline" size={14} color="#FFFFFF" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </GestureHandlerRootView> */}
      {/* <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}>
          {scrollUp && (
            <View>
              {scrollUp && (
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => setScrollUp(false)}>
               
                  <Ionicons
                    name="caret-down-outline"
                    size={30}
                    color="#333333"
                  />
                </TouchableOpacity>
              )}

              <View
                style={{
                  borderBottomWidth: 0.2,
                  borderColor: 'gray',
                  paddingTop: 30,
                  paddingBottom: 10,
                  paddingLeft: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                    paddingBottom: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: '700',
                      color: '#333333',
                    }}>
                    {`${userToDisplay[next]?.firstName} ${userToDisplay[next]?.lastName}`}
                  </Text>
                  <Text
                    style={{
                      color: '#333333',
                      fontWeight: '700',
                      fontSize: 32,
                    }}>
                    {userToDisplay[next]?.age}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                    paddingTop: 5,
                    paddingBottom: 5,
                  }}>
                  <Ionicons name="person-outline" size={18} color="#333333" />
                  <Text style={{color: '#333333', fontSize: 16}}>
                    {' '}
                    {userToDisplay[next]?.sex}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                    paddingTop: 5,
                    paddingBottom: 5,
                  }}>
                  <Ionicons name="location-outline" size={18} color="#333333" />
                  <Text style={{color: '#333333', fontSize: 16}}>
                    {getDistance(
                      auth?.user?.userLocation[0],
                      auth?.user?.userLocation[1],
                      userToDisplay[next]?.userLocation[0],
                      userToDisplay[next]?.userLocation[1],
                    )}{' '}
                    kilometers away
                  </Text>
                </View>
              </View>

              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    textAlign: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: 10,
                    borderBottomWidth: 0.2,
                    borderColor: 'gray',
                  }}>
                  <View>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: '#333333',
                        fontSize: 24,
                        padding: 10,
                      }}>
                      Location
                    </Text>

                    <View>
                      <Text
                        style={{color: '#333333', fontSize: 16, padding: 10}}>
                        {longitude} {latitude}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      textAlign: 'center',
                      gap: 5,
                      backgroundColor: '#000000',
                      padding: 4,
                      borderRadius: 5,
                      marginRight: 10,
                    }}>
                    <Icon2 name="location-outline" size={18} color="#FFFFFF" />
                    <Text style={styles.distance}>
                      {' '}
                      {getDistance(
                        auth?.user?.userLocation[0],
                        auth?.user?.userLocation[1],
                        userToDisplay[next]?.userLocation[0],
                        userToDisplay[next]?.userLocation[1],
                      )}{' '}
                      km
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    paddingBottom: 10,
                    borderBottomWidth: 0.2,
                    borderColor: 'gray',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#333333',
                      fontSize: 24,
                      padding: 10,
                    }}>
                    About
                  </Text>
                  {userToDisplay[next]?.about?.length > 150
                  ? userToDisplay[next]?.about.slice(0, 150) +
                    (
                      <Text
                        onPress={() => setReadMore(!readMore)}
                        style={{color: 'coral'}}>
                        {readMore ? 'Read less..' : 'Read more..'}
                      </Text>
                    )
                  : userToDisplay[next]?.about}
                  <Text style={{color: '#333333', fontSize: 16, padding: 10}}>
                    Lorem ipsum dolor sit ametconsectetur. Morbi neque semper
                    cras nunc aliquam sed. Sollicitudin hendrerit dolor varius
                    nunc proin donec{' '}
                    <Text
                      onPress={() => setReadMore(!readMore)}
                      style={{color: 'coral'}}>
                      Read more..
                    </Text>
                  </Text>
                </View>

                <View
                  style={{
                    paddingBottom: 10,
                    borderBottomWidth: 0.2,
                    borderBottomColor: 'gray',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#333333',
                      fontSize: 24,
                      padding: 10,
                      marginBottom: 10,
                    }}>
                    Lifestyle
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      columnGap: 10,
                      rowGap: 10,
                      margin: 10,
                    }}>
                    {userToDisplay[next]?.lifestyles?.pet && (
                      <TouchableOpacity style={styles.lifestyle}>
                        <MaterialCommunityIcons
                          name="dog"
                          size={12}
                          color="#333333"
                        />
                        <Text style={styles.lifestyleText}>
                          {userToDisplay[next]?.lifestyles?.pet}
                        </Text>
                      </TouchableOpacity>
                    )}
                    {userToDisplay[next]?.lifestyles?.drinking && (
                      <TouchableOpacity style={styles.lifestyle}>
                        <MaterialCommunityIcons
                          name="glass-wine"
                          size={12}
                          color="#333333"
                        />
                        <Text style={styles.lifestyleText}>
                          {userToDisplay[next]?.lifestyles?.drinking}
                        </Text>
                      </TouchableOpacity>
                    )}
                    {userToDisplay[next]?.lifestyles?.workout && (
                      <TouchableOpacity style={styles.lifestyle}>
                        <MaterialCommunityIcons
                          name="dumbbell"
                          size={12}
                          color="#333333"
                        />
                        <Text style={styles.lifestyleText}>
                          {userToDisplay[next]?.lifestyles?.workout}
                        </Text>
                      </TouchableOpacity>
                    )}
                    {userToDisplay[next]?.lifestyles?.smoking && (
                      <TouchableOpacity style={styles.lifestyle}>
                        <MaterialCommunityIcons
                          name="smoking"
                          size={12}
                          color="#333333"
                        />
                        <Text style={styles.lifestyleText}>
                          {userToDisplay[next]?.lifestyles?.smoking}
                        </Text>
                      </TouchableOpacity>
                    )}
                    {userToDisplay[next]?.lifestyles?.dietery && (
                      <TouchableOpacity style={styles.lifestyle}>
                        <MaterialCommunityIcons
                          name="pizza"
                          size={12}
                          color="#333333"
                        />
                        <Text style={styles.lifestyleText}>
                          {userToDisplay[next]?.lifestyles?.dietery}
                        </Text>
                      </TouchableOpacity>
                    )}
                    {userToDisplay[next]?.lifestyles?.socialMediaActiveness && (
                      <TouchableOpacity style={styles.lifestyle}>
                        <MaterialCommunityIcons
                          name="at"
                          size={12}
                          color="#333333"
                        />
                        <Text style={styles.lifestyleText}>
                          {
                            userToDisplay[next]?.lifestyles
                              ?.socialMediaActiveness
                          }
                        </Text>
                      </TouchableOpacity>
                    )}
                    {userToDisplay[next]?.lifestyles?.sleepingHabits && (
                      <TouchableOpacity style={styles.lifestyle}>
                        <MaterialCommunityIcons
                          name="star"
                          size={12}
                          color="#333333"
                        />
                        <Text style={styles.lifestyleText}>
                          {userToDisplay[next]?.lifestyles?.sleepingHabits}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>

                <View
                  style={{
                    paddingBottom: 10,
                    borderTopWidth: 0.2,
                    borderBottomWidth: 0.2,
                    borderColor: 'gray',
                  }}>
                  <Text
                    style={{
                      color: '#333333',
                      fontSize: 24,
                      padding: 10,
                      marginBottom: 10,
                      fontWeight: 'bold',
                    }}>
                    Basics
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      columnGap: 10,
                      rowGap: 10,
                      margin: 10,
                    }}>
                    {userToDisplay[next]?.zodiac && (
                      <Pressable style={styles.lifestyle}>
                        <Icon2 name="moon-outline" size={12} color="#333333" />
                        <Text style={styles.lifestyleText}>
                          {userToDisplay[next]?.basics?.zodiac}
                        </Text>
                      </Pressable>
                    )}
                    {userToDisplay[next]?.basics?.education && (
                      <Pressable style={styles.lifestyle}>
                        <MaterialCommunityIcons
                          name="school"
                          size={12}
                          color="#333333"
                        />
                        <Text style={styles.lifestyleText}>
                          {userToDisplay[next]?.basics?.education}
                        </Text>
                      </Pressable>
                    )}
                    {userToDisplay[next]?.basics?.loveStyle && (
                      <Pressable style={styles.lifestyle}>
                        <MaterialCommunityIcons
                          name="heart"
                          size={12}
                          color="#333333"
                        />
                        <Text style={styles.lifestyleText}>
                          {userToDisplay[next]?.basics?.loveStyle}
                        </Text>
                      </Pressable>
                    )}
                    {userToDisplay[next]?.basics?.communication && (
                      <Pressable style={styles.lifestyle}>
                        <MaterialCommunityIcons
                          name="message"
                          size={12}
                          color="#333333"
                        />
                        <Text style={styles.lifestyleText}>
                          {userToDisplay[next]?.basics?.communication}
                        </Text>
                      </Pressable>
                    )}
                    {userToDisplay[next]?.basics?.personality && (
                      <Pressable style={styles.lifestyle}>
                        <MaterialCommunityIcons
                          name="smoking"
                          size={12}
                          color="#333333"
                        />
                        <Text style={styles.lifestyleText}>
                          {userToDisplay[next]?.basics?.personality}
                        </Text>
                      </Pressable>
                    )}
                    {userToDisplay[next]?.basics?.familyPlans && (
                      <Pressable style={styles.lifestyle}>
                        <MaterialCommunityIcons
                          name="shower"
                          size={12}
                          color="#333333"
                        />
                        <Text style={styles.lifestyleText}>
                          {userToDisplay[next]?.basics?.familyPlans}
                        </Text>
                      </Pressable>
                    )}
                    {userToDisplay[next]?.basics?.vaccination && (
                      <Pressable style={styles.lifestyle}>
                        <MaterialCommunityIcons
                          name="grease-pencil"
                          size={12}
                          color="#333333"
                        />
                        <Text style={styles.lifestyleText}>
                          {userToDisplay[next]?.basics?.vaccination}
                        </Text>
                      </Pressable>
                    )}
                  </View>
                </View>
                <View
                  style={{
                    paddingBottom: 10,
                    borderTopWidth: 0.2,
                    borderColor: 'gray',
                  }}>
                  <Text
                    style={{
                      color: '#333333',
                      fontSize: 24,
                      padding: 10,
                      marginBottom: 10,
                      fontWeight: 'bold',
                    }}>
                    Gallery
                  </Text>

                  {auth.user?.usersAllowedToViewUserImages.includes(
                    userToDisplay[next]?.id,
                  ) || auth.user?.allowImagesDisplay === true
                    ? userToDisplay[next]?.images?.map(img => {
                        <View
                          style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            columnGap: 10,
                            rowGap: 10,
                            margin: 10,
                          }}>
                          <Image
                            style={{
                              width: 160,
                              height: 160,
                            }}
                            source={{uri: img?.url}}
                          />
                        </View>;
                      })
                    : userToDisplay[next]?.images?.map(img => {
                        <View
                          style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            columnGap: 10,
                            rowGap: 10,
                            margin: 10,
                          }}>
                          <Image
                            style={{
                              width: 160,
                              height: 160,
                            }}
                            source={{uri: img?.url}}
                            blurRadius={5}
                          />
                        </View>;
                      })}
                </View>
              </View>

              <View>
                <Pressable
                  onPress={handleBlocking}
                  style={{
                    padding: 10,
                    borderTopWidth: 0.2,
                    borderBottomWidth: 0.2,
                    borderColor: 'gray',
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 10,
                      padding: 15,
                    }}>
                    <Text
                      style={{
                        color: '#333333',
                        fontSize: 18,
                      }}>
                      {isBlocked ? 'Unblock' : 'Block'}{' '}
                      {userToDisplay[next]?.firstName}
                    </Text>
                    <Text
                      style={{
                        color: '#333333',
                        fontSize: 16,
                      }}>
                      You won't see them, they wont see you
                    </Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={handleReporting}
                  style={{
                    padding: 10,
                    borderTopWidth: 0.2,
                    // borderBottomWidth: 0.2,
                    borderColor: 'gray',
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 10,
                      padding: 15,
                    }}>
                    <Text
                      style={{
                        color: '#333333',
                        fontSize: 18,
                      }}>
                      Report {userToDisplay[next]?.firstName}
                    </Text>
                    <Text
                      style={{
                        color: '#333333',
                        fontSize: 16,
                      }}>
                      Don't worry - we won't tell them.
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>
          )}

          {showPopupReportModal && (
            <PopUpReportModal
              showPopupReportModal={showPopupReportModal}
              setShowPopupReportModal={setShowPopupReportModal}
              currentChat={userToDisplay[next]}
            />
          )}
        </ScrollView> */}
    </SafeAreaView>
    // </LinearGradient>
  );
}

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  navImage: {
    // marginTop: 40,
    width: 40,
    height: 40,
    borderRadius: 50,
  },

  userImage: {
    width: '90%',
    height: 550,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 20,
  },

  name: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#FFFFFF',
    paddingBottom: 5,
  },
  job: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  distance: {
    fontSize: 14,
    color: '#FFFFFF',
  },

  progressBarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 10,
    rowGap: 10,
    margin: 10,
    top: 5,
  },

  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },

  navText: {
    fontFamily: 'Avenir',
    color: '#333333',
    fontWeight: '700',
    fontSize: 20,
  },

  priReaction: {
    backgroundColor: '#db3838',
    width: 50,
    height: 50,
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  lifestyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#111111',
    padding: 15,
    borderRadius: 6,
  },

  lifestyleText: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
  },
});
