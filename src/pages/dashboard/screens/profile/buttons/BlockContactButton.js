import {StyleSheet, Text, View, Pressable} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function BlockContactButton({setBlockContact}) {
  return (
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
        paddingVertical: 15,
        paddingHorizontal: 15,
      }}
      onPress={() => setBlockContact(true)}>
      <View>
        <Text style={styles.keyText}>Block Contacts</Text>
      </View>

      <MaterialCommunityIcons name="chevron-right" size={24} color="#888" />
    </Pressable>
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
