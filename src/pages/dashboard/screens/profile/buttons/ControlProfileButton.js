import {useState} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ControlProfileButton({setOpenControlProfile}) {
  const [age, setAge] = useState(true);
  const [distance, setDistance] = useState(true);
  return (
    <View style={{paddingBottom: 15}}>
      <Text
        style={{
          fontFamily: 'Avenir',
          fontWeight: '800',
          padding: 10,
          marginTop: 10,
          fontSize: 16,
          color: '#000000',
        }}>
        Control Your Profile
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
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
        onPress={() => setAge(!age)}>
        <View>
          <Text style={styles.keyText}>Don't Show My Age</Text>
        </View>
        <View>
          {age ? (
            <MaterialCommunityIcons
              name="toggle-switch"
              size={52}
              color="#A8000E"
            />
          ) : (
            <MaterialCommunityIcons
              name="toggle-switch-off"
              size={52}
              color="#C6C6C6"
            />
          )}
        </View>
      </Pressable>
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomWidth: 0.5,
          borderColor: '#cc8b0f',
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
        onPress={() => setDistance(!distance)}>
        <View>
          <Text style={styles.keyText}>Don't Show My Distance</Text>
        </View>
        <View>
          {distance ? (
            <MaterialCommunityIcons
              name="toggle-switch"
              size={52}
              color="#A8000E"
            />
          ) : (
            <MaterialCommunityIcons
              name="toggle-switch-off"
              size={52}
              color="#C6C6C6"
            />
          )}
        </View>
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
