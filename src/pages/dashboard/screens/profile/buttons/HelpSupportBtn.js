import {StyleSheet, Text, View, Pressable} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HelpSupportBtn() {
  return (
    <View>
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
          <Text style={styles.keyText}>Contact Support</Text>
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
