import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function Contacts({navigation}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add Contact</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
  },

  button: {
    width: '50%',
    alignItems: 'center',
    backgroundColor: '#A8000E',
    padding: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#222',
    borderRadius: 25,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
