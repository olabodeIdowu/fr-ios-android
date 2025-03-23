import {StyleSheet, Text, View, Pressable} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PassionButton({setOpenPassion}) {
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
        Passions
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
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}
        onPress={() => setOpenPassion(true)}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            columnGap: 10,
            rowGap: 10,
            margin: 10,
          }}>
          <Text style={styles.keyText}>90 Kid,</Text>
          <Text style={styles.keyText}>Social Media,</Text>
          <Text style={styles.keyText}>Reading,</Text>
          <Text style={styles.keyText}>Country Music,</Text>
          <Text style={styles.keyText}>Marvel</Text>
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
