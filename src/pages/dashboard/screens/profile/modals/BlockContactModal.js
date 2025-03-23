import {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Contacts from '../blockContact/Contacts';
import Blocked from '../blockContact/Blocked';

const Tab = createMaterialTopTabNavigator();

export default function BlockContactModal({blockContact, setBlockContact}) {
  return (
    <View>
      <Modal
        animationType="slide"
        visible={blockContact}
        onRequestClose={() => setBlockContact(false)}
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
                  onPress={() => setBlockContact(false)}
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
                Block Contacts
              </Text>
            </View>
          </View>
          <Text style={styles.subHeaderText}>
            Select peope from your contact list that you dont want to see or be
            seen by on Dedott. Lean More
          </Text>

          <Tab.Navigator
            screenOptions={{
              tabBarLabelStyle: {fontSize: 17, color: '#333333'},
              tabBarStyle: {backgroundColor: '#F7F7F7'},
              tabBarSelectedItemStyle: {
                borderBottomWidth: 2,
                borderBottomColor: '#F8B930',
              },
            }}>
            <Tab.Screen name="Contacts" component={Contacts} />
            <Tab.Screen name="Blocked" component={Blocked} />
          </Tab.Navigator>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#F7F7F7',
  },

  subHeaderText: {
    fontFamily: 'Avenir',
    fontSize: 17,
    color: '#000000',
    padding: 15,
  },

  footerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#ffffff',
    padding: 15,
  },
});
