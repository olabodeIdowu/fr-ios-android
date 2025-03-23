import {Alert} from 'react-native';
import {axiosInstance} from '../hooks/useAxios';
// router.get('/user-friends', protect_user, restrictTo('user'), getUserFriends);
// router.get('/chat-users', protect_user, restrictTo('user'), getAllChatUsers);
// router.get(
//   '/get-user-requests',
//   protect_user,
//   restrictTo('user'),
//   getUserRequests
// );
// router.post(
//   '/accept-user-request',
//   protect_user,
//   restrictTo('user'),
//   acceptUserRequest
// );
// router.post(
//   '/send-user-request',
//   protect_user,
//   restrictTo('user'),
//   sendUserRequest
// );
// router.post(
//   '/send-user-Message',
//   protect_user,
//   restrictTo('user'),
//   sendMessage
// );
// router.get('/user-messages', protect_user, restrictTo('user'), getMessages);
// router.patch('/user-prensence', protect_user, restrictTo('user'), prensence);

// router.route('/');
// router.route('/:id').patch(protect_user, restrictTo('user'), deleteChat);

// module.exports = router;

export async function getAllChatUsers() {
  try {
    const response = await axiosInstance({
      method: 'get',
      url: `/fr/api/v1/chats/chat-users`,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (!response) throw new Error('response not found');
    return response;
  } catch (error) {
    console.log(error);
    Alert.alert('Error', error.message, [{text: 'OK'}]);
  }
}
export async function getUserFriends() {
  try {
    const response = await axiosInstance({
      method: 'get',
      url: `/fr/api/v1/chats/user-friends`,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (!response) throw new Error('response not found');
    return response;
  } catch (error) {
    console.log(error);
    Alert.alert('Error', error.message, [{text: 'OK'}]);
  }
}

export async function getUserRequests() {
  try {
    const response = await axiosInstance({
      method: 'get',
      url: `/fr/api/v1/chats/get-user-requests`,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (!response) throw new Error('response not found');
    return response;
  } catch (error) {
    console.log(error);
    Alert.alert('Error', error.message, [{text: 'OK'}]);
  }
}

export async function getMessages() {
  try {
    const response = await axiosInstance({
      method: 'get',
      url: `/fr/api/v1/chats/user-messages`,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (!response) throw new Error('response not found');
    return response;
  } catch (error) {
    console.log(error);
    Alert.alert('Error', error.message, [{text: 'OK'}]);
  }
}

export async function updateMessageStatusToRead() {
  try {
    const response = await axiosInstance({
      method: 'patch',
      url: `/fr/api/v1/chats/user-status-read`,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (!response) throw new Error('response not found');
    return response;
  } catch (error) {
    console.log(error);
    Alert.alert('Error', error.message, [{text: 'OK'}]);
  }
}

export async function updateMessageStatusToDelivered() {
  try {
    const response = await axiosInstance({
      method: 'patch',
      url: `/fr/api/v1/chats/user-status-delivered`,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (!response) throw new Error('response not found');
    return response;
  } catch (error) {
    console.log(error);
    Alert.alert('Error', error.message, [{text: 'OK'}]);
  }
}

export async function sendUserMessage(form) {
  try {
    const response = await axiosInstance({
      method: 'post',
      url: `/fr/api/v1/chats/send-user-message`,
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
    console.log(error);
    Alert.alert('Error', error.message, [{text: 'OK'}]);
  }
}

export async function sendUserImage(form) {
  try {
    const response = await axiosInstance({
      method: 'post',
      url: `/fr/api/v1/chats/send-user-image`,
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
    console.log(error);
    Alert.alert('Error', error.message, [{text: 'OK'}]);
  }
}

export async function acceptUserRequests(form) {
  try {
    const response = await axiosInstance({
      method: 'post',
      url: `/fr/api/v1/chats/accept-user-request`,
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
    console.log(error);
    Alert.alert('Error', error.message, [{text: 'OK'}]);
  }
}
export async function deleteUserRequest(form) {
  try {
    const response = await axiosInstance({
      method: 'patch',
      url: `/fr/api/v1/chats/delete-user-request`,
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
    console.log(error);
    Alert.alert('Error', error.message, [{text: 'OK'}]);
  }
}

export async function sendUserRequest(form) {
  try {
    const response = await axiosInstance({
      method: 'post',
      url: `/fr/api/v1/chats/send-user-request`,
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
    console.log(error);
    Alert.alert('Error', error.message, [{text: 'OK'}]);
  }
}

export async function updateOnlineStatus(form) {
  console.log(form);
  try {
    const response = await axiosInstance({
      method: 'patch',
      url: `/fr/api/v1/chats/user-prensence`,
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
