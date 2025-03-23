import {Alert} from 'react-native';
import {axiosInstance} from '../hooks/useAxios';

export async function createBlocking(userId, form) {
  try {
    const response = await axiosInstance({
      method: 'post',
      url: `/fr/api/v1/users/${userId}/users-block_user`,
      data: form,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (!response) throw new Error('response not found');

    return response;
  } catch (error) {
    console.log(
      error.response?.data?.error?.statusCode,
      error.response?.data?.message,
    );
    Alert.alert('Error', error.response?.data?.message, [{text: 'OK'}]);
  }
}

export async function getBlockedUsers() {
  try {
    const response = await axiosInstance({
      method: 'get',
      url: `/fr/api/v1/users-block_user`,
      withCredentials: false,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response) throw new Error('response not found');
    return response;
  } catch (error) {
    console.log(
      error.response?.data?.error?.statusCode,
      error.response?.data?.message,
    );
    Alert.alert('Error', error.response?.data?.message, [{text: 'OK'}]);
  }
}

export async function updateBlockedUser(blockingId, form) {
  console.log(blockingId, form);
  try {
    const response = await axiosInstance({
      method: 'patch',
      url: `/fr/api/v1/users-block_user/${blockingId}`,
      data: form,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
      },
    });
    if (!response) throw new Error('response not found');
    console.log(response);
    return response;
  } catch (error) {
    console.log(
      error.response?.data?.error?.statusCode,
      error.response?.data?.message,
    );
    Alert.alert('Error', error.response?.data?.message, [{text: 'OK'}]);
  }
}

export async function getBlockedUser(blockingId) {
  try {
    const response = await axiosInstance({
      method: 'get',
      url: `/fr/api/v1/users-block_user/${blockingId}`,
      withCredentials: false,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response) throw new Error('response not found');
    return response;
  } catch (error) {
    console.log(
      error.response?.data?.error?.statusCode,
      error.response?.data?.message,
    );
    Alert.alert('Error', error.response?.data?.message, [{text: 'OK'}]);
  }
}
