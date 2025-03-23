import {StyleSheet, Text, View, Pressable} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function BasicsButton({setOpenBasics}) {
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
        Basics
      </Text>
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTopWidth: 0.5,
          borderColor: '#cc8b0f',
          paddingHorizontal: 15,
          paddingVertical: 15,
        }}
        onPress={() => setOpenBasics(true)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <MaterialCommunityIcons name="zodiac-leo" size={20} color="#888" />
          <Text style={styles.keyText}>Zodiac</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
          }}>
          <Text style={styles.valueText}>Add</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#888" />
        </View>
      </Pressable>
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTopWidth: 0.5,
          borderColor: '#cc8b0f',
          paddingHorizontal: 10,
          paddingVertical: 15,
        }}
        onPress={() => setOpenBasics(true)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <MaterialCommunityIcons name="school" size={20} color="#888" />
          <Text style={styles.keyText}>Education</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
          }}>
          <Text style={styles.valueText}>Add</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#888" />
        </View>
      </Pressable>
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTopWidth: 0.5,
          borderColor: '#cc8b0f',
          paddingHorizontal: 10,
          paddingVertical: 15,
        }}
        onPress={() => setOpenBasics(true)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <MaterialCommunityIcons name="shower" size={20} color="#888" />
          <Text style={styles.keyText}>Family Plans</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
          }}>
          <Text style={styles.valueText}>Add</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#888" />
        </View>
      </Pressable>
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTopWidth: 0.5,
          borderColor: '#cc8b0f',
          paddingHorizontal: 10,
          paddingVertical: 15,
        }}
        onPress={() => setOpenBasics(true)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <MaterialCommunityIcons name="smoking" size={20} color="#888" />
          <Text style={styles.keyText}>Personality Type</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
          }}>
          <Text style={styles.valueText}>Add</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#888" />
        </View>
      </Pressable>
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
          paddingVertical: 15,
        }}
        onPress={() => setOpenBasics(true)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <MaterialCommunityIcons name="message" size={20} color="#888" />
          <Text style={styles.keyText}>Communication Style</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
          }}>
          <Text style={styles.valueText}>Add</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#888" />
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
          paddingVertical: 15,
          paddingTop: -10,
        }}
        onPress={() => setOpenBasics(true)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <MaterialCommunityIcons name="heart" size={20} color="#888" />
          <Text style={styles.keyText}>Love Style</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
          }}>
          <Text style={styles.valueText}>Add</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#888" />
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
