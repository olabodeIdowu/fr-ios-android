import {Platform} from 'react-native';

export const url =
  process.env.NODE_ENV === 'development'
    ? process.env.DEV_API_URL
    : process.env.BASE_URL;
