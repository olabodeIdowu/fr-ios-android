import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../context/authContext';
import {url} from '../hooks/useUrl';
import {axiosInstance} from '../hooks/useAxios';

const Chat = ({item}) => {
  const navigation = useNavigation();
  const {auth} = useContext(AuthContext);
  const userId = auth?.user?.id;
  console.log('SDfsdf', userId);
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const senderId = userId;
      const receiverId = item?._id;

      console.log(senderId);
      console.log(receiverId);

      const response = await axiosInstance.get(
        `${url}/fr/api/v1/chats/user-messages`,
        {
          params: {senderId, receiverId},
          withCredentials: false,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );

      setMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log('messages', messages);

  useEffect(() => {
    fetchMessages();
  }, [userId]);

  const getLastMessage = () => {
    const n = messages.length;

    return messages[n - 1];
  };
  const lastMessage = getLastMessage();

  console.log('lastMessage: ', lastMessage);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('ChatRoom', {
          receiver: item,
          name: item?.firstName + ' ' + item?.lastName,
          receiverId: item?._id,
          image: item?.avatar,
        })
      }
      style={{marginVertical: 15}}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <Pressable>
          <Image
            source={{uri: item?.avatar}}
            style={{width: 40, height: 40, borderRadius: 20}}
          />
        </Pressable>

        <View>
          <Text style={{fontSize: 15, fontWeight: '500'}}>
            {item?.firstName + ' ' + item?.lastName}
          </Text>
          <Text style={{marginTop: 4, color: 'gray', paddingRight: 45}}>
            {lastMessage
              ? lastMessage.message
              : `Start chat with ${item?.firstName + ' ' + item?.lastName}`}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Chat;

const styles = StyleSheet.create({});
