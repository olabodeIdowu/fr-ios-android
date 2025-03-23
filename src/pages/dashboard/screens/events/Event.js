import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {useState} from 'react';
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
import EventInviteModal from './EventModal';

export default function Event({navigation}) {
  const [showPopupEventModal, setShowPopupEventModal] = useState(false);
  const [paid, setPaid] = useState(false);
  const [clickTab, setClickTab] = useState('description');

  return (
    <View style={{flex: 1}}>
      <View style={{position: 'relative'}}>
        <Image
          style={{
            width: 332,
            height: 497,
            marginLeft: 'auto',
            marginRight: 'auto',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
          source={require('./../../../../../assets/Group430.png')}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 332,
            padding: 10,
            backgroundColor: '#C6C6C6',
            position: 'absolute',
            bottom: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            left: 22,
            // right: 50,
          }}>
          <Text style={{fontSize: 16, color: '#000000', fontFamily: 'Avenir'}}>
            The Taurus Hosts
          </Text>
          {paid ? (
            <Text
              onPress={() => setPaid(!paid)}
              style={{fontSize: 16, color: '#000000', fontFamily: 'Avenir'}}>
              05/25/2023
            </Text>
          ) : (
            <TouchableOpacity
              onPress={() => setPaid(!paid)}
              activeOpacity={0.4}>
              <Text style={styles.detailsButtonText}>Details</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {paid && (
        <View
          style={{
            padding: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 10,
              paddingBottom: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#fff',
            }}>
            <Pressable
              style={{
                borderBottomWidth: clickTab === 'description' ? 1 : 0,
                borderBottomColor: clickTab === 'description' ? '#D9A525' : '',
              }}
              onPress={() => setClickTab('description')}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#333333',
                  paddingBottom: 5,
                  fontFamily: 'Avenir',
                }}>
                Description
              </Text>
            </Pressable>
            <Pressable
              style={{
                borderBottomWidth: clickTab === 'venue' ? 1 : 0,
                borderBottomColor: clickTab === 'venue' ? '#D9A525' : '',
              }}
              onPress={() => setClickTab('venue')}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#333333',
                  paddingBottom: 5,
                  fontFamily: 'Avenir',
                }}>
                Venue
              </Text>
            </Pressable>
          </View>
          {clickTab === 'description' && (
            <Text
              style={{
                fontFamily: 'Avenir',
                fontWeight: '400',
                fontSize: 14,
                color: '#333333',
                lineHeight: 20,
                padding: 10,
              }}>
              A physical get together that Lorem ipsum dolor sit amet
              consectetur and eufk. Scelerisque pharetra vestibulum sit quis
              consequat habitasse. Aliquam quisque vel non est sagittis ornare
              nibh eros ornare. Varius dui velit eget massa leo viverra metus ut
              turpis. Tortor ipsum at placerat sollicitudin aenean amet leo. Non
              sit ultrices sit ultricies laoreet malesuada ac. Nibh turpis
              semper arcu at elit. Nibh sit sit urna suspendisse at suscipit
              utus.
            </Text>
          )}
          {clickTab === 'venue' && (
            <View
              style={{
                fontSize: 14,
                color: '#000000',
                fontFamily: 'Avenir',
                padding: 10,
              }}>
              <Text
                style={{fontSize: 14, color: '#000000', fontFamily: 'Avenir'}}>
                Transcorp hilton. Number 23 bolt street, off lekki road, ikeja,
                lagos.
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#000000',
                  fontFamily: 'Avenir',
                  marginTop: 30,
                }}>
                Time: 7:30 Pm - 6:30 Am
              </Text>
            </View>
          )}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20,
              marginBottom: 80,
            }}>
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={() => {
                setShowPopupEventModal(true);
              }}
              activeOpacity={0.4}>
              <Text style={styles.acceptButtonText}>Attend Event</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rejectButton}
              // onPress={() => {
              //   setShowPopupEventModal(false);
              // }}
              activeOpacity={0.4}>
              <Text style={styles.rejectButtonText}>Decline Event</Text>
            </TouchableOpacity>
          </View>
          {showPopupEventModal && (
            <EventInviteModal
              showPopupEventModal={showPopupEventModal}
              setShowPopupEventModal={setShowPopupEventModal}
            />
          )}
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  detailsButtonText: {
    fontFamily: 'Avenir',
    alignItems: 'center',
    backgroundColor: '#A8000E',
    color: '#FFFFFF',
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  acceptButton: {
    fontFamily: 'Avenir',
    alignItems: 'center',
    backgroundColor: '#A8000E',
    padding: 10,
    color: '#222',
    borderRadius: 8,
  },

  acceptButtonText: {
    fontFamily: 'Avenir',
    color: '#FFFFFF',
    fontSize: 16,
  },
  rejectButton: {
    fontFamily: 'Avenir',
    alignItems: 'center',
    padding: 10,
    borderWidth: 0.5,
    borderColor: '#000000',
    borderRadius: 8,
    backgroundColor: 'transparent',
  },

  rejectButtonText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Avenir',
  },
});
