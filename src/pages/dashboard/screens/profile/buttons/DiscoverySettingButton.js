import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';
// import Slider from '@react-native-community/slider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';

export default function DiscoverySettingButton({
  setOpenLocation,
  setLookingFor,
}) {
  const [showDistance, setShowDistance] = useState(false);
  const [showAge, setShowAge] = useState(false);
  const [age, setAge] = useState(false);
  const [distance, setDistance] = useState(false);

  return (
    <View style={{paddingBottom: 15}}>
      <Text
        style={{
          fontFamily: 'Avenir',
          padding: 10,
          marginTop: 10,
          fontSize: 16,
          fontWeight: '800',
          color: '#000000',
        }}>
        Discovery Settings
      </Text>
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomWidth: 0.5,
          borderColor: '#cc8b0f',
          marginBottom: 10,
          borderTopWidth: 0.2,
          padding: 15,
        }}
        onPress={() => setOpenLocation(true)}>
        <Text style={styles.keyText}>Location</Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
          }}>
          <Text style={styles.valueText}>Akure, Nigeria</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#888" />
        </View>
      </Pressable>
      <Pressable
        style={{
          borderTopWidth: 0.2,
          borderBottomWidth: 0.5,
          borderColor: '#cc8b0f',
          marginBottom: 10,
          borderTopWidth: 0.2,
          padding: 15,
        }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.keyText}>Distance preference</Text>
            <Text style={styles.valueText}>127km</Text>
          </View>
          {/* <Slider
            style={{
              width: 350,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            minimumValue={18}
            maximumValue={80}
            step={1}
            minimumTrackTintcolor="#A8000E"
            maximumTrackTintColor="#D9D9D9"
            value={distance}
            onValueChange={setDistance}
          /> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.keyText}>Only show people in this range</Text>
          <TouchableOpacity onPress={() => setShowDistance(!showDistance)}>
            {showDistance ? (
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
          </TouchableOpacity>
        </View>
      </Pressable>
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderColor: 'grey',
          borderTopWidth: 0.2,
          padding: 15,
        }}
        onPress={() => setLookingFor(true)}>
        <Text style={styles.keyText}>Looking for</Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
          }}>
          <Text style={styles.valueText}>Women</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#888" />
        </View>
      </Pressable>
      <Pressable
        style={{
          borderTopWidth: 0.5,
          borderBottomWidth: 0.5,
          borderColor: '#cc8b0f',
          marginBottom: 10,
          borderTopWidth: 0.2,
          padding: 15,
        }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.keyText}>Age preference</Text>
            <Text style={styles.valueText}>18 - 69</Text>
          </View>
          {/* <Slider
            style={{
              width: 350,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            minimumValue={18}
            maximumValue={80}
            step={1}
            minimumTrackTintcolor="#A8000E"
            maximumTrackTintColor="#D9D9D9"
            value={age}
            onValueChange={setAge}
          /> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.keyText}>Only show people in this range</Text>
          <TouchableOpacity onPress={() => setShowAge(!showAge)}>
            {showAge ? (
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
          </TouchableOpacity>
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
