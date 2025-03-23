import {StyleSheet, Text, View, Pressable} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SpotifyButton({setOpenSpotify}) {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <Text style={styles.keyText}>Add Spotify</Text>
        <Text
          style={{
            fontFamily: 'Avenir',
            padding: 10,
            fontSize: 18,
            color: '#A8000E',
          }}>
          +3%
        </Text>
      </View>
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
        onPress={() => setOpenSpotify(true)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <MaterialCommunityIcons name="spotify" size={16} color="#888" />

          <Text style={styles.spotifyInnerText}>Connect Spotify</Text>
        </View>
        <View>
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
