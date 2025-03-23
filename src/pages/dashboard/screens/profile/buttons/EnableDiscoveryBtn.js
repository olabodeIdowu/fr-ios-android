import {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function EnableDiscoveryBtn() {
  const [enable, setEnable] = useState(true);
  return (
    <Pressable
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: '#cc8b0f',
        marginBottom: 10,
        paddingHorizontal: 15,
      }}>
      <View>
        <Text style={styles.keyText}>Enable Discovery</Text>
      </View>
      <TouchableOpacity onPress={() => setEnable(!enable)}>
        {enable ? (
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
