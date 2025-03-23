import {useState} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function WYSButton({}) {
  const [selectActive, setSelectActive] = useState('default');

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
        Control Who You See
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
        onPress={() => setSelectActive('default')}>
        <View>
          <Text
            style={{
              fontWeight: '400',
              fontFamily: 'Avenir',
              fontSize: 14,
              color: '#000000',
            }}>
            See the most relevant people to you(default)
          </Text>
          <Text
            style={{
              fontWeight: '400',
              fontFamily: 'Avenir',
              fontSize: 14,
              color: '#000000',
            }}>
            Balanced Recommendations
          </Text>
        </View>
        {selectActive === 'default' && (
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
          borderBottompWidth: 0.2,
          borderBottomWidth: 0.5,
          borderColor: '#cc8b0f',
          marginBottom: 10,
          borderTopWidth: 0.2,
          padding: 15,
        }}
        onPress={() => setSelectActive('not-default')}>
        <View>
          <Text
            style={{
              fontWeight: '400',
              fontFamily: 'Avenir',
              fontSize: 14,
              color: '#000000',
            }}>
            Recently Active
          </Text>
          <Text
            style={{
              fontWeight: '400',
              fontFamily: 'Avenir',
              fontSize: 14,
              color: '#000000',
            }}>
            See the most recently active people first
          </Text>
        </View>
        {selectActive === 'not-default' && (
          <MaterialCommunityIcons name="check" size={24} color="#A8000E" />
        )}
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
