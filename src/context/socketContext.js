import {createContext, useContext, useEffect, useState} from 'react';
import io from 'socket.io-client';
import {AuthContext} from './authContext';
import {url} from '../hooks/useUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({children}) => {
  const {auth, setAuth} = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const [webrtcsocket, setWebrtcsocket] = useState(null);

  console.log(auth?.userToken);

  const prepareApp = async () => {
    try {
      const storedAppUser = JSON.parse(await AsyncStorage.getItem('user'));

      if (storedAppUser) {
        //store in context
        setAuth(prev => {
          return {
            ...prev,
            user: storedAppUser,
          };
        });
      }
    } catch (message) {
      alert(message);
    } finally {
      //dismiss splas screen
      // setTimeout(async () => await SplashScreen.hideAsync(), 1000);
    }
  };

  useEffect(() => {
    prepareApp();
  }, []);

  useEffect(() => {
    if (auth?.userToken) {
      const socket = io(`${url}`, {
        query: {
          userId: auth?.user?.id,
        },
      });
      console.log('socket', socket);
      setSocket(socket);

      return () => socket.close();
    }
  }, [auth?.userToken]);

  useEffect(() => {
    if (auth?.userToken) {
      const webrtcsocket = io(`${url}`, {
        query: {
          transports: ['websocket'],
          userId: auth?.user?.id,
        },
      });
      console.log('webrtcsocket', webrtcsocket);
      setWebrtcsocket(webrtcsocket);

      return () => webrtcsocket.close();
    }
  }, [auth?.userToken]);

  return (
    <SocketContext.Provider
      value={{socket, setSocket, webrtcsocket, setWebrtcsocket}}>
      {children}
    </SocketContext.Provider>
  );
};
