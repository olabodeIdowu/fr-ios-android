import {createContext, useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';

export const LocationContext = createContext();

export default function Location({navigation, route: {params}}) {
  const [location, setLocation] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [userLocation, setUserLocation] = useState([]);

  const userForm = {
    ...params.userForm,
    userLocation,
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
        setLongitude(longitude);
        setLatitude(latitude);
        setUserLocation([longitude, latitude]);
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  useEffect(() => {
    navigation.navigate('SelectLanguage', {userForm: userForm});
  }, [userLocation]);

  return null;
}
