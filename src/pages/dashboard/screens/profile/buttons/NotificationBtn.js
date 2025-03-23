import {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function NotificationBtn({
  setOpenEmailNotify,
  setOpenPushNotify,
}) {
  return (
    <View>
      <Text
        style={{
          fontFamily: 'Avenir',
          fontWeight: '800',
          padding: 10,
          marginTop: 10,
          fontSize: 16,
          color: '#000000',
        }}>
        Notifications
      </Text>
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTopWidth: 0.5,
          borderBottomWidth: 0.5,
          borderColor: '#cc8b0f',
          marginBottom: 10,
          paddingVertical: 15,
          paddingHorizontal: 15,
        }}
        onPress={() => setOpenEmailNotify(true)}>
        <View>
          <Text style={styles.keyText}>Email</Text>
        </View>

        <MaterialCommunityIcons name="chevron-right" size={24} color="#888" />
      </Pressable>
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomWidth: 0.5,
          borderColor: '#cc8b0f',
          marginBottom: 10,
          paddingVertical: 15,
          paddingHorizontal: 15,
        }}
        onPress={() => setOpenPushNotify(true)}>
        <View>
          <Text style={styles.keyText}>Push Notifications</Text>
        </View>

        <MaterialCommunityIcons name="chevron-right" size={24} color="#888" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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
