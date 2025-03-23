import {useState} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CVButton({}) {
  const [selectActive, setSelectActive] = useState('standard');

  return (
    <View style={{paddingBottom: 15}}>
      <Text
        style={{
          fontFamily: 'Avenir',
          padding: 10,
          fontSize: 16,
          fontWeight: '800',
          color: '#000000',
        }}>
        Control My Visibility
      </Text>
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderColor: 'grey',
          borderTopWidth: 0.5,
          borderBottomWidth: 0.5,
          borderColor: '#cc8b0f',
          marginBottom: 10,
          padding: 15,
        }}
        onPress={() => setSelectActive('standard')}>
        <View>
          <Text
            style={{
              fontWeight: '400',
              fontFamily: 'Avenir',
              fontSize: 14,
              color: '#000000',
            }}>
            Standard
          </Text>
          <Text
            style={{
              fontWeight: '400',
              fontFamily: 'Avenir',
              fontSize: 14,
              color: '#000000',
            }}>
            You will be discoverable in the card stack
          </Text>
        </View>
        {selectActive === 'standard' && (
          <MaterialCommunityIcons name="check" size={24} color="#A8000E" />
        )}
      </Pressable>

      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderColor: 'grey',
          borderTopWidth: 0.2,
          borderColor: '#cc8b0f',

          borderTopWidth: 0.2,
          padding: 15,
        }}
        onPress={() => setSelectActive('incognition')}>
        <View>
          <Text
            style={{
              fontWeight: '400',
              fontFamily: 'Avenir',
              fontSize: 14,
              color: '#000000',
            }}>
            Incognition
          </Text>
          <Text
            style={{
              fontWeight: '400',
              fontFamily: 'Avenir',
              fontSize: 14,
              color: '#000000',
            }}>
            You will be discoverable only by people you Like
          </Text>
        </View>
        {selectActive === 'incognition' && (
          <MaterialCommunityIcons name="check" size={24} color="#A8000E" />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  // primaryText: {
  //   fontSize: 18,
  //   color: '#ffffff',
  //   marginBottom: 5,
  // },
  // secondaryText: {
  //   fontSize: 16,
  //   color: '#f5f5f5',
  // },
});
