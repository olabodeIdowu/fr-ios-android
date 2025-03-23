import {StyleSheet, Text, View, Pressable} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function BlockedUsersBtn() {
  return (
    <View>
      <Text
        style={{
          padding: 15,
          fontSize: 20,
          color: '#ffffff',
        }}>
        Help & Support
      </Text>
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderColor: 'grey',
          borderTopWidth: 0.2,
          borderBottomWidth: 0.2,
          padding: 15,
        }}
        //   onPress={() => setEnable(!enable)}
      >
        <View>
          <Text
            style={{
              color: '#ffffff',
              fontSize: 18,
            }}>
            Help & Support
          </Text>
        </View>

        <MaterialCommunityIcons name="chevron-right" size={24} color="#888" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
