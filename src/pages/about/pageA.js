import {useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';

export default function PageA({navigation, route: {params}}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('login');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Image
          style={styles.logo}
          source={require('./../../../assets/ddLogo.png')}
        />
        <Text style={styles.subtitle}>Be For Real</Text>
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
    width: 300,
    height: 400,
  },

  subtitle: {
    // margin: 'auto',
    // width: 200,
    // borderWidth: 5,
    // borderColor: '#fff',
    // marginTop: 400,
    // fontSize: 42,
    // fontWeight: 'bold',
    // textAlign: 'center',
    // color: '#ffffff',
    // borderTopRightRadius: 30,
    // borderBottomRightRadius: 30,
  },
});
