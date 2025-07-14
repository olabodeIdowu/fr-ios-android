import {useState, useEffect} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Onboarding1({navigation}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding-2');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Onboarding-2')}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      <View style={styles.imageTextContainer}>
        <Image
          source={require('./../../../assets/welcome-img-3.jpg')}
          style={styles.welcomeImage}
        />

        <Text style={styles.welcomeText}>
          Welcome to the premium dating App.
        </Text>
        <Text style={styles.welcomeText}>Exclusively for you.</Text>

        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}></View>
          <View style={styles.progressBar2}></View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Onboarding-2');
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
    borderRadius: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  skipText: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 20,
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

  welcomeText: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    color: '#ffffff',
  },

  progressBarContainer: {
    flex: 0.01,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5,
    marginTop: 40,
    marginBottom: 80,
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
    fontSize: 20,
    color: '#000000',
  },
});
