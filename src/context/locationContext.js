import {createContext, useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';

export const LocationContext = createContext();

export default function LocationContextProvider({children}) {
  const [location, setLocation] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
        setLongitude(longitude);
        setLatitude(latitude);
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  // const requestLocationPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: 'Geolocation Permission',
  //         message: 'Can we access your location?',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     console.log('granted', granted);
  //     if (granted === 'granted') {
  //       console.log('You can use Geolocation');
  //       return true;
  //     } else {
  //       console.log('You cannot use Geolocation');
  //       return false;
  //     }
  //   } catch (err) {
  //     return false;
  //   }
  // };

  // function to check permissions and get Location
  // const getLocation = () => {
  //   const result = requestLocationPermission();
  //   result.then(res => {
  //     console.log('res is:', res);
  //     if (res) {
  //       Geolocation_xml.getCurrentPosition(
  //         position => {
  //           console.log(position);
  //           setLocation(position);
  //           setLongitude(location.coords.longitude);
  //           setLatitude(location.coords.latitude);
  //         },
  //         error => {
  //           // See error code charts below.
  //           console.log(error.code, error.message);
  //           setLocation(null);
  //         },
  //         {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //       );
  //     }
  //   });
  //   console.log(location);
  // };

  return (
    <LocationContext.Provider value={{longitude, latitude, setLocation}}>
      {children}
    </LocationContext.Provider>
  );
}
