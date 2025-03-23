import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function Blocked({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.blockText}>
        Members signed in to Deddot with the contact information you add here
        will be blocked
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
  },

  blockText: {
    fontFamily: 'Avenir',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#333333',
    fontSize: 14,
    margin: 'auto',
    padding: 10,
  },
});
