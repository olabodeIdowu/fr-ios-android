import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import 'core-js/stable/atob';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../../../context/authContext';
import Chat from '../../../../components/Chat';
import {
  acceptUserRequests,
  deleteUserRequest,
  getUserFriends,
  getUserRequests,
  updateOnlineStatus,
} from '../../../../services/apiChats';
import {getUser as getMyself} from '../../../../services/apiUsers';
import LinearGradient from 'react-native-linear-gradient';

const ChatsScreen = () => {
  const {auth, setAuth} = useContext(AuthContext);
  const [options, setOptions] = useState(['Chats']);
  const [searchItem, setSearchItem] = useState('');
  const [chats, setChats] = useState([]);
  const [requests, setRequests] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function handle() {
      const storedAppUser = JSON.parse(await AsyncStorage.getItem('user'));
      if (storedAppUser) {
        //store in context
        setAuth(prev => {
          return {
            ...prev,
            user: storedAppUser,
          };
        });
      }
    }
    handle();
  }, []);

  const chooseOption = option => {
    if (options.includes(option)) {
      setOptions(options.filter(c => c !== option));
    } else {
      setOptions([...options, option]);
    }
  };
  const navigation = useNavigation();

  const logout = async () => {
    const form = {
      status: false,
    };
    await updateOnlineStatus(form);
    clearUserToken();
  };

  const clearUserToken = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      auth.userToken = '';
      navigation.replace('login');
    } catch (error) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      const userId = user?.id;
      console.log('userId: ', user);
      setUserId(userId);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) {
      getrequests();
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId]);

  const getrequests = async () => {
    try {
      const response = await getUserRequests();
      setRequests(response.data);
    } catch (error) {
      console.log('error', error);
    }
  };
  console.log(requests);

  const acceptRequest = async requestId => {
    try {
      const form = {
        userId: userId,
        requestId: requestId,
      };

      const response = await acceptUserRequests(form);

      if (response.status == 200) {
        await getrequests();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const deleteRequest = async requestId => {
    try {
      const form = {
        userId: userId,
        requestId: requestId,
      };

      const response = await deleteUserRequest(form);

      if (response.status == 200) {
        await getrequests();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const getUser = async () => {
    try {
      const response = await getUserFriends();
      setChats(response.data);
    } catch (error) {
      console.log('Error fetching user', error);
      throw error;
    }
  };

  console.log('users', chats);

  // JavaScript Filter Functionality
  function handleInputChange(text) {
    // // console.log("text ", text);
    // setSearchItem(text);
    // const filteredItems = chatLists.filter(c => {
    //   // console.log(c);
    //   return c?.text?.toLowerCase().includes(text.toLowerCase());
    // });
    // setFilteredChatLists(filteredItems);
  }

  return (
    // <LinearGradient
    //   start={{x: 0.3, y: 0.5}}
    //   end={{x: 0.2, y: 0.7}}
    //   colors={['#f5e9ea', '#f7f7f7']}
    //   style={{height: '100%'}}>
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          justifyContent: 'space-between',
        }}>
        <Pressable onPress={logout}>
          <Image
            style={{width: 30, height: 30, borderRadius: 15}}
            source={{
              uri: auth?.user?.photo?.url,
            }}
          />
        </Pressable>

        <Text style={{fontSize: 15, fontWeight: '500'}}>Chats</Text>

        <View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Pressable onPress={() => navigation.navigate('Stories')}>
              <AntDesign name="camerao" size={26} color="black" />
            </Pressable>
            <MaterialIcons
              onPress={() => navigation.navigate('People')}
              name="person-outline"
              size={26}
              color="black"
            />
          </View>
        </View>
      </View>

      <View
        style={{
          width: '95%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          margin: 10,
          paddingLeft: 25,
          paddingRight: 15,
          borderWidth: 0.3,
          borderWidthColor: '#e8e8e8',
          borderRadius: 8,
          position: 'relative',
          left: 0,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
        }}>
        <View style={{position: 'absolute', left: 10}}>
          <Pressable>
            <MaterialCommunityIcons name="magnify" color="#B8B8B8" size={26} />
          </Pressable>
        </View>
        <TextInput
          style={{
            width: '100%',
            padding: 15,
            color: '#444',
          }}
          name="search"
          value={searchItem}
          placeholderTextColor="#B8B8B8"
          placeholder="search"
          onChangeText={text => handleInputChange(text)}
        />
      </View>

      <View>
        <Text
          style={{
            marginBottom: 10,
            padding: 10,
            fontSize: 24,
            fontWeight: 'bold',
          }}>
          Matches
        </Text>
        <ScrollView
          style={{padding: 10}}
          showsHorizontalScrollIndicator={false}
          horizontal={true}>
          {auth?.user && auth?.user?.matches.length > 0 ? (
            auth?.user?.matches.map((c, i) => {
              // console.log("c, ", c);
              return (
                <Pressable
                  key={i}
                  style={{
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    gap: 10,
                    marginRight: 10,
                  }}
                  onPress={() =>
                    navigation.navigate('ChatRoom', {
                      receiver: c,
                      name: c?.firstName + ' ' + c?.lastName,
                      receiverId: c?._id,
                      image: c?.avatar,
                    })
                  }>
                  <Image
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                    }}
                    source={{uri: c?.avatar}}
                  />
                  <Text
                    style={{
                      marginBottom: 20,
                      padding: '0.8rem',
                      color: '#ffffff',
                      fontSize: 14,
                      fontWeight: 400,
                    }}>
                    {c?.firstName}
                  </Text>
                </Pressable>
              );
            })
          ) : (
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: '#333333',
                }}>
                No matches found.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      <View>
        <Text
          style={{
            marginBottom: 10,
            padding: 10,
            fontSize: 24,
            fontWeight: 'bold',
          }}>
          Likes
        </Text>

        <ScrollView
          style={{padding: 10}}
          showsHorizontalScrollIndicator={false}
          horizontal={true}>
          {auth?.user?.likes && auth?.user?.likes?.length > 0 ? (
            auth?.user?.likes.map((l, i) => {
              // console.log("l, ", l);

              return (
                <Pressable
                  key={i}
                  style={{
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    gap: 10,
                    marginRight: 10,
                  }}
                  onPress={() =>
                    navigation.navigate('ChatRoom', {
                      receiver: l,
                      name: l?.firstName + ' ' + l?.lastName,
                      receiverId: l?._id,
                      image: l?.avatar,
                    })
                  }>
                  <Image
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                    }}
                    source={{uri: l?.avatar}}
                  />
                  <Text
                    style={{
                      marginBottom: 20,
                      padding: '0.8rem',
                      color: '#ffffff',
                      fontSize: 14,
                      fontWeight: 400,
                    }}>
                    {l?.firstName}
                  </Text>
                </Pressable>
              );
            })
          ) : (
            <View>
              <Text
                style={{
                  fontSize: 16,
                }}>
                No likes found.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      <View style={{padding: 10}}>
        <Pressable
          onPress={() => chooseOption('Chats')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>Chats</Text>
          </View>
          <Entypo name="chevron-small-down" size={26} color="black" />
        </Pressable>

        <View>
          {options?.includes('Chats') &&
            (chats?.length > 0 ? (
              <View>
                {chats?.map((item, index) => (
                  <Chat item={item} key={item?._id} />
                ))}
              </View>
            ) : (
              <View
                style={{
                  height: 300,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View>
                  <Text style={{textAlign: 'center', color: 'gray'}}>
                    No Chats yet
                  </Text>
                  <Text style={{marginTop: 4, color: 'gray'}}>
                    Get started by nessaging a friend
                  </Text>
                </View>
              </View>
            ))}
        </View>

        <Pressable
          onPress={() => chooseOption('Requests')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>Requests</Text>
          </View>
          <Entypo name="chevron-small-down" size={26} color="black" />
        </Pressable>

        <View style={{marginVertical: 12}}>
          {options?.includes('Requests') && (
            <View>
              <Text style={{fontSize: 16, fontWeight: '500'}}>
                Checkout all the requests
              </Text>

              {requests?.map((item, index) => (
                <Pressable key={index} style={{marginVertical: 12}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                    <Pressable>
                      <Image
                        source={{uri: item?.from?.avatar}}
                        style={{width: 40, height: 40, borderRadius: 20}}
                      />
                    </Pressable>

                    <View style={{flex: 1}}>
                      <Text style={{fontSize: 15, fontWeight: '500'}}>
                        {item?.from?.firstName + ' ' + item?.from?.lastName}
                      </Text>

                      <Text style={{marginTop: 4, color: 'gray'}}>
                        {item?.message}
                      </Text>
                    </View>

                    <Pressable
                      onPress={() => acceptRequest(item?.from?._id)}
                      style={{
                        padding: 8,
                        backgroundColor: '#005187',
                        width: 75,
                        borderRadius: 5,
                      }}>
                      <Text
                        style={{
                          fontSize: 13,
                          textAlign: 'center',
                          color: 'white',
                        }}>
                        Accept
                      </Text>
                    </Pressable>
                    <Pressable onPress={() => deleteRequest(item?.id)}>
                      <AntDesign name="delete" size={26} color="red" />
                    </Pressable>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
    // </LinearGradient>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
