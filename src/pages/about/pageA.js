import {useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';

export default function PageA({navigation, route: {params}}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('page-b');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Image
          style={styles.logo}
          source={require('./../../../assets/FRREDLOGO.jpg')}
        />
        <Text style={styles.subtitle}>Finders Republic</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 960,
    marginHorizontal: 'auto',
  },
  logo: {
    width: 100,
    height: 100,
  },

  subtitle: {
    fontFamily: 'Avenir',
    // margin: 'auto',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
  },
});
