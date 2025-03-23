import {StyleSheet, Text, View, SafeAreaView, FlatList} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../../../context/authContext';
import User from '../../../../components/User';
import {getAllChatUsers} from '../../../../services/apiChats';

const PeopleScreen = () => {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const response = await getAllChatUsers();
      setUsers(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  console.log('users', users);
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 15,
            fontWeight: '500',
            marginTop: 12,
          }}>
          People using signal
        </Text>
      </View>
      <FlatList
        data={users}
        renderItem={({item}) => <User item={item} key={item?._id} />}
      />
    </SafeAreaView>
  );
};

export default PeopleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
