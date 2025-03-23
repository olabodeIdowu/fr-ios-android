import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';
import Plus from './Plus';
import DedottGold from './DedottGold';
import DedottPlantinum from './DedottPlantinum';
import {useState} from 'react';

const Tab = createMaterialTopTabNavigator();

function MyPlans({showPlans, setShowPlans}) {
  return (
    <View style={styles.centered_view}>
      <Modal
        visible={showPlans}
        onRequestClose={() => setShowPlans(false)}
        animationType="slide"
        presentationStyle="pageSheet">
        <View style={styles.plans_modal}>
          <View
            style={{
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              backgroundColor: '#fbf3f4',
              // paddingBottom: 20,
            }}>
            <View
              style={{
                backgroundColor: '#A8000E',
                width: 100,
                height: 5,
                margin: 'auto',
                borderRadius: 25,
                marginVertical: 10,
              }}></View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 100,
                alignSelf: 'flex-end',
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Avenir',
                  fontWeight: '900',
                  color: '#000000',
                  fontSize: 14,
                }}>
                My Subscription
              </Text>
              <TouchableOpacity
                onPress={() => setShowPlans(false)}
                activeOpacity={0.7}>
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color="#000000"
                />
              </TouchableOpacity>
            </View>
          </View>

          <Tab.Navigator
            screenOptions={{
              tabBarLabelStyle: {
                fontFamily: 'Avenir',
                fontSize: 16,
                color: '#333',
                fontWeight: '800',
              },
              tabBarStyle: {backgroundColor: '#FFFFFF'},
              tabBarSelectedItemStyle: {
                borderBottomWidth: 2,
                borderBottomColor: '#F8B930',
              },
            }}>
            <Tab.Screen name="Plus" component={Plus} />
            <Tab.Screen name="Gold" component={DedottGold} />
            <Tab.Screen name="Plantinum" component={DedottPlantinum} />
          </Tab.Navigator>
        </View>
      </Modal>
    </View>
  );
}

export default MyPlans;

const styles = StyleSheet.create({
  headerFlexText: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    padding: 40,
  },

  headerText: {
    fontSize: 22,
    color: '#ffffff',
  },
  closeModal: {
    borderColor: '#ffffff',
    borderWidth: 3,
    borderRadius: '50%',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeModalText: {
    fontSize: 24,
    color: '#ffffff',
  },

  centered_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },

  plans_modal: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0a100d',
    borderWidth: 1,
    borderColor: '#000',
  },
});
