/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  Platform,
  NativeModules,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContextProvider, {AuthContext} from './src/context/authContext';

import HomeScreen from './src/pages/dashboard/home';
import PageA from './src/pages/about/pageA';
import PeopleScreen from './src/pages/dashboard/screens/chats/PeopleScreen';
import RequestChatRoom from './src/pages/dashboard/screens/chats/RequestChatRoom';
import ChatRoom from './src/pages/dashboard/screens/chats/ChatRoom';
import AudioChatScreen from './src/pages/dashboard/screens/chats/AudioChat';
import VideoChatScreen from './src/pages/dashboard/screens/chats/VideoChat';
import MatchScreen from './src/pages/dashboard/screens/chats/MatchScreen';
import RegisterScreen from './src/auth/register';
import LoginScreen from './src/auth/login';
import ChatProfileScreen from './src/pages/dashboard/screens/chats/ChatProfileScreen';
import UnSubscribeScreen from './src/pages/dashboard/screens/UnSubscribeScreen';
import ProfileApprovedScreen from './src/notifications/ProfileApprovedScreen';
import {SocketContextProvider} from './src/context/socketContext';
import LocationContextProvider from './src/context/locationContext';
import ChatsScreen from './src/pages/dashboard/screens/chats/ChatsScreen';
import CoachDetailsScreen from './src/pages/dashboard/screens/coaches/CoachDetailsScreen';
import CoachAvailabilityScreen from './src/pages/dashboard/screens/coaches/CoachAvailabilityScreen';
import Notifications from './src/pages/dashboard/screens/dashboard/components/Notifications';
import ProfileScreen from './src/pages/dashboard/screens/profile/ProfileScreen';

const Stack = createNativeStackNavigator();
const {StatusBarManager} = NativeModules;

const NavigationStack = () => {
  const {auth: userToken, setAuth} = useContext(AuthContext);

  const prepareApp = async () => {
    try {
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
    } catch (message) {
      alert(message);
    } finally {
      //dismiss splas screen
      // setTimeout(async () => await SplashScreen.hideAsync(), 1000);
    }
  };

  useEffect(() => {
    prepareApp();
  }, []);
  // const [token, setToken] = useState(null);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const token = await AsyncStorage.getItem('userToken');
  //     console.log('token from context', token);
  //     setToken(token);
  //   };

  //   fetchUser();
  // }, []);

  return (
    <Stack.Navigator
      initialRouteName={!userToken ? 'page-a' : 'home-screen'}
      screenOptions={{
        header: () => null,
      }}>
      <Stack.Screen name="page-a" component={PageA} />
      <Stack.Screen name="home-screen" component={HomeScreen} />
      <Stack.Screen name="People" component={PeopleScreen} />
      <Stack.Screen name="Stories" component={ChatProfileScreen} />
      <Stack.Screen name="Request" component={RequestChatRoom} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
      <Stack.Screen name="ChatsScreen" component={ChatsScreen} />
      <Stack.Screen name="VideoChat" component={VideoChatScreen} />
      <Stack.Screen name="AudioChat" component={AudioChatScreen} />
      <Stack.Screen name="MatchScreen" component={MatchScreen} />
      <Stack.Screen name="CoachDetailsScreen" component={CoachDetailsScreen} />
      <Stack.Screen
        name="CoachAvailabilityScreen"
        component={CoachAvailabilityScreen}
      />
      <Stack.Screen name="NotificationScreen" component={Notifications} />
      <Stack.Screen name="register" component={RegisterScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="unSubscribe" component={UnSubscribeScreen} />
      <Stack.Screen name="profile-approved" component={ProfileApprovedScreen} />
    </Stack.Navigator>
  );
};

export default () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <LocationContextProvider>
      <AuthContextProvider>
        <SocketContextProvider>
          <SafeAreaView style={styles.container}>
            {/* <View
            style={{
              alignContent: 'center',
              justifyContent: 'center',
              paddingHorizontal: 16,
              // we are adding the following lines and we get rid of the height prop
              paddingTop:
                Platform.OS === 'android' ? StatusBarManager.HEIGHT : 0,
              paddingBottom: 16,
            }}></View> */}
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />
            {/* <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#ffeff0', '#f7f7f7']}
              style={styles.linearGradient}> */}
            <NavigationContainer>
              <NavigationStack />
            </NavigationContainer>
            {/* </LinearGradient> */}
          </SafeAreaView>
        </SocketContextProvider>
      </AuthContextProvider>
    </LocationContextProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Avenir',
    backgroundColor: '#F7F7F7',
    // backgroundColor: '#ffeff0',
    paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT : 0,
  },
});

// isSignedIn ? (
//   <>
//     <Stack.Screen name="Home" component={HomeScreen} />
//     <Stack.Screen name="Profile" component={ProfileScreen} />
//     <Stack.Screen name="Settings" component={SettingsScreen} />
//   </>
// ) : (
//   <>
//     <Stack.Screen name="SignIn" component={SignInScreen} />
//     <Stack.Screen name="SignUp" component={SignUpScreen} />
//   </>
// )
