import axios from 'axios';
import {url} from './useUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const axiosInstance = axios.create({
  baseURL: url, // Replace with your API base URL
  // timeout: 1000,
  headers: {'Content-Type': 'application/json'},
}); // Create the axios instance

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async config => {
    const token = JSON.parse(await AsyncStorage.getItem('userToken'));

    console.log(token);
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  },
);
