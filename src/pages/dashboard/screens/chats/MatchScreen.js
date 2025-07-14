import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useEffect, useRef, useState, useContext} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AuthContext} from '../../../../context/authContext';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

function MatchScreen() {
  const [dimensions, setDimensions] = useState({window, screen});
  const {auth, setAuth} = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();

  console.log(dimensions.screen.height);

  const onChange = ({window, screen}) => {
    setDimensions({window, screen});
  };

  return (
    <View style={{flex: 1, backgroundColor: '#F7F7F7', paddingBottom: 20}}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
          padding: 10,
        }}>
        <Pressable
          onPress={() => {
            //  Go back to the previous screen.
            navigation.goBack();
          }}>
          <Ionicons name="arrow-back" size={30} color="#333333" />
        </Pressable>
        <Pressable
        //  onPress={() => setShowPopupBlockingModal(true)}
        >
          <Ionicons
            name="ellipsis-vertical-outline"
            size={30}
            color="#333333"
          />
        </Pressable>
      </View>
      <ScrollView
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
        showsVerticalScrollIndicator={false}>
        <View style={{marginLeft: 'auto', marginRight: 'auto'}}>
          <Image
            source={{uri: route?.params?.currentChat?.avatar}}
            style={{
              width: 200,
              height: 250,
              borderRadius: 8,
              marginRight: '-20%',
              // position: "absolute",
            }}
          />
          <Image
            source={{uri: auth?.user?.avatar}}
            style={{
              width: 200,
              height: 250,
              borderRadius: 8,
              marginTop: -100,
              marginLeft: '-20%',
            }}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            margin: 10,
            marginTop: 40,
          }}>
          <Text style={{color: '#333333', fontSize: 18}}>
            Match Found, {auth?.user?.firstName + ' ' + auth?.user?.lastName}
          </Text>
          <Text style={{color: '#333333', fontSize: 14}}>
            say hello to{' '}
            {route?.params?.currentChat?.firstName +
              route?.params?.currentChat?.lastName}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={[styles.button, {width: dimensions.screen.width - 20}]}
            onPress={() =>
              navigation.navigate('ChatRoom', {
                receiver: route?.params?.currentChat,
                name:
                  route?.params?.currentChat?.firstName +
                  route?.params?.currentChat?.lastName,
                receiverId: route?.params?.currentChat?.id,
                image: route?.params?.currentChat?.avatar,
              })
            }
            activeOpacity={0.7}>
            <Text style={styles.buttonText}>Say Hello</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.cancelButton, {width: dimensions.screen.width - 20}]}
            onPress={() => {
              navigation.goBack();
            }}
            activeOpacity={0.7}>
            <Text style={styles.cancelButtonText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default MatchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
    justifyContent: 'center',
  },

  bell: {
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  notifyHeader: {
    color: '#333333',
    textAlign: 'center',
    fontSize: 24,
    padding: 20,
  },

  notifyText: {
    color: '#333333',
    fontSize: 17,
    textAlign: 'center',
    paddingBottom: 60,
  },

  button: {
    backgroundColor: '#FF6F61',
    alignItems: 'center',
    padding: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#222',
    borderRadius: 8,
    marginBottom: 10,
  },

  buttonText: {
    textTransform: 'uppercase',
    color: '#333333',
    fontSize: 16,
  },
  cancelButton: {
    borderWidth: 1,
    borderWidthColor: '#999',
    alignItems: 'center',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 8,
    backgroundColor: 'transparent',
  },

  cancelButtonText: {
    color: '#333333',
    fontSize: 20,
  },
});
