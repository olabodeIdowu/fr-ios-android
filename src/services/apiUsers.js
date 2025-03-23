import {Alert} from 'react-native';
import {axiosInstance} from '../hooks/useAxios';

export async function signup(form) {
  try {
    const response = await axiosInstance({
      method: 'post',
      url: `/fr/api/v1/users/signup-user`,
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

export async function login(form) {
  try {
    const response = await axiosInstance({
      method: 'post',
      url: `/fr/api/v1/users/login-user`,
      data: form,
      // withCredentials: true,
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

export async function logout() {
  try {
    const response = await axiosInstance({
      method: 'post',
      url: `/fr/api/v1/users/logout-user`,
      withCredentials: false,
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

export async function forgotUserPassword(form) {
  try {
    const response = await axiosInstance({
      method: 'post',
      url: `/fr/api/v1/users/forgot-user-password`,
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

export async function resetUserPassword(form) {
  try {
    const response = await axiosInstance({
      method: 'patch',
      url: `/fr/api/v1/users/reset-user-password`,
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

export async function updateUserPassword(form) {
  try {
    const response = await axiosInstance({
      method: 'patch',
      url: `/fr/api/v1/users/update-user-password`,
      data: form,
      withCredentials: false,
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

export async function VerifyOTP(form) {
  try {
    const response = await axiosInstance({
      method: 'post',
      url: `/fr/api/v1/users/verify-user-OTP`,
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

export async function sendVerificationOTP(form) {
  try {
    const response = await axiosInstance({
      method: 'post',
      url: `/fr/api/v1/users/send-user-verification-otp`,
      data: form,
      withCredentials: false,
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

export async function changeUserEmail(form) {
  try {
    const response = await axiosInstance({
      method: 'patch',
      url: `/fr/api/v1/users/change-user-email`,
      data: form,
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

export async function changeUserPhoneNumber(form) {
  try {
    const response = await axiosInstance({
      method: 'patch',
      url: `/fr/api/v1/users/change-user-phone`,
      data: form,
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

export async function updateUser(userId, form) {
  console.log(userId, form);
  try {
    const response = await axiosInstance({
      method: 'patch',
      url: `/fr/api/v1/users/${userId}`,
      data: form,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
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

export async function updateUserLocation(form) {
  console.log(form);
  try {
    const response = await axiosInstance({
      method: 'patch',
      url: `/fr/api/v1/users/update-user-location`,
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

export async function getUser(userId) {
  try {
    const response = await axiosInstance({
      method: 'get',
      url: `/fr/api/v1/users/${userId}`,
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
export async function getUsers() {
  try {
    const response = await axiosInstance({
      method: 'get',
      url: `/fr/api/v1/users`,
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
