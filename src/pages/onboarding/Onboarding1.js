import {useState, useEffect} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function Onboarding1({navigation}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding-2');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('./../../../assets/cafecouple.jpg')}
        style={styles.welcomeImage}
      />

      <Text style={styles.welcomeText}>
        Welcome to the premium dating App. Exclusively for you.
      </Text>

      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}></View>
        <View style={styles.progressBar2}></View>
      </View>

      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Onboarding-2');
        }}
      activeOpacity={0.7}>
        <Text style={styles.buttonText}>Next &rarr;</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
  },

  welcomeImage: {
    marginBottom: 30,
    width: 300,
    height: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  imageTextContainer: {
    marginTop: 10,
    justifyContent: 'center',
    flexDirection: 'column',
  },

  welcomeText: {
    padding: 20,
    fontFamily: 'Avenir',
    fontWeight: '400',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 16,
    color: '#333333',
    lineHeight: 18,
    marginBottom: 20,
  },

  progressBarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5,
    marginBottom: 50,
  },

  progressBar: {
    width: 50,
    height: 5,
    backgroundColor: '#8D020E',
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
    backgroundColor: '#8D020E',
    padding: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#ffffff',
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: 'Avenir',
    fontWeight: '700',
    fontSize: 16,
    color: '#FFFFFF',
  },
});
