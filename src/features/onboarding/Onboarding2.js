import {StatusBar} from 'expo-status-bar';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Onboarding2({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={styles.backText}>&larr;</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageTextContainer}>
        <Image
          source={require('./../../../assets/welcome-img-2.jpg')}
          style={styles.welcomeImage}
        />
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.welcomeText}>
            Meet new people, find new relationships,
          </Text>
          <Text style={styles.welcomeText}>
            chat with relationship coaches, attend
          </Text>
          <Text style={styles.welcomeText}>
            exclusive events, be in control.
          </Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar2}></View>
          <View style={styles.progressBar}></View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Login');
          }}
          activeOpacity={0.7}>
          <Text style={styles.buttonText}>Next &rarr;</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  welcomeImage: {
    marginBottom: 50,
    width: 300,
    height: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 50,
  },

  nav: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 3.2,
  },

  backText: {
    fontSize: 36,
    color: '#ffffff',
  },

  skipText: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'right',
    color: '#ffffff',
  },

  imageTextContainer: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 1,
  },

  welcomeTextContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  welcomeText: {
    color: '#fff',
    fontSize: 20,
  },

  progressBarContainer: {
    flex: 0.01,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5,
    marginBottom: 100,
  },

  progressBar: {
    width: 50,
    height: 5,
    backgroundColor: '#F8B930',
    borderRadius: 16,
    border: '1px solid',
  },

  progressBar2: {
    width: 50,
    height: 5,
    backgroundColor: '#e5e5e5',
    borderRadius: 16,
    border: '1px solid',
  },

  button: {
    width: '90%',
    alignItems: 'center',
    backgroundColor: '#F8B930',
    padding: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#ffffff',
    borderRadius: 8,
  },
  buttonText: {
    color: '#000000',
    fontSize: 20,
  },
});
