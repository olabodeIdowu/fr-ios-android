import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

function Notification({navigation}) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.bell}
        source={require('./../../../assets/bell.png')}
      />
      <Text style={styles.notifyHeader}>Enable notifications</Text>
      <Text style={styles.notifyText}>
        Get push notification when you are suggested a match or get a message
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('WaitList');
        }}
        activeOpacity={0.4}>
        <Text style={styles.buttonText}>Notify me</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.doNotButton}
        onPress={() => {
          navigation.navigate('PendingList');
        }}
        activeOpacity={0.4}>
        <Text style={styles.doNotButtonText}>Do not notify me</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
  },

  bell: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  notifyHeader: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 24,
    padding: 20,
    fontWeight: 'semibold',
  },

  notifyText: {
    color: '#ffffff',
    fontSize: 17,

    padding: 10,
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#D9A525',
    padding: 15,
    borderRadius: 8,
    margin: 10,
    marginTop: 40,
  },

  buttonText: {
    color: '#000000',
    fontSize: 20,
  },

  doNotButton: {
    borderWidth: 1,
    borderColor: '#ffffff',
    alignItems: 'center',
    padding: 15,
    color: '#ffffff',
    borderRadius: 8,
    backgroundColor: 'transparent',
    margin: 10,
  },

  doNotButtonText: {
    color: '#ffffff',
    fontSize: 20,
  },
});
