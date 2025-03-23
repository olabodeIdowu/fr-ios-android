import React, {useContext, useEffect} from 'react';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Event from './Event';
import {AuthContext} from '../../../../context/authContext';

export default function EventsScreen({navigation}) {
  const {auth, setAuth} = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [events, setEvents] = useState(true); //getEvents from the server
  const [refreshing, setRefreshing] = React.useState(false);

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
        navigation.navigate('Login');
      } else {
        //store in context
        setUser(storedAppUser);
      }
    }
    handle();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.nav}>
          <TouchableOpacity>
            {auth?.user?.avatar ? (
              <Image
                style={styles.navImage}
                source={{uri: auth?.user?.avatar}}
              />
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
              <Text
                style={{
                  position: 'absolute',
                  backgroundColor: '#db3838',
                  width: 10,
                  height: 10,
                  borderRadius: 50,
                  right: 2,
                  top: 2,
                  color: '#000000',
                  fontSize: 14,
                  justifyContent: 'center',
                  textAlign: 'center',
                }}></Text>
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
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}>
          {events ? (
            <Event />
          ) : (
            <View>
              <Text
                style={{
                  fontSize: 14,
                  color: '#000000',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                There are no upcoming events
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    // position: 'relative',
    // paddingBottom: 30,
  },

  navImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
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
});
