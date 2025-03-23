import React from 'react';
// import MapView, { Marker } from "react-native-maps";
// import { PROVIDER_GOOGLE } from "react-native-maps";
import {StyleSheet, Text, View} from 'react-native';
import flagBlueImg from './../../../assets/flag-pink.png';
// import flagPinkImg from "./../../../assets/flag-pink.png";

// provider=PROVIDER_GOOGLE
export default function Location() {
  return (
    <View style={styles.container}>
      <Text>Location</Text>
      {/* <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 7.2571,
          longitude: 5.2058,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker
          // onPress={() => this.setState({ marker1: !this.state.marker1 })}
          coordinate={{
            latitude: 7.2571,
            longitude: 5.2058,
          }}
          centerOffset={{ x: -18, y: -60 }}
          anchor={{ x: 0.69, y: 1 }}
          image={flagBlueImg}
          // image={this.state.marker1 ? flagBlueImg : flagPinkImg}
        >
          <Text
            onPress={() => {
              navigation.navigate("Notification");
            }}
            style={styles.marker}
          >
            Next
          </Text>
        </Marker>
      </MapView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  marker: {
    marginLeft: 46,
    marginTop: 33,
    fontWeight: 'bold',
  },
});
