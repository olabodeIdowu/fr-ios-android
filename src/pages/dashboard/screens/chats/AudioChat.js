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
import {useNavigation, useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AudioInputScreen from './AudioInputScreen';
import PopUpBlockingModal from './chat_popups/PopupBlocking';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

function AudioChatScreen() {
  const [dimensions, setDimensions] = useState({window, screen});
  const navigation = useNavigation();
  const route = useRoute();
  const [showPopupBlockingModal, setShowPopupBlockingModal] = useState(false);
  console.log(dimensions.screen.height);

  const onChange = ({window, screen}) => {
    setDimensions({window, screen});
  };

  return (
    <View style={{flex: 1, backgroundColor: '#F7F7F7'}}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
          backgroundColor: '#FFFFFF',
          padding: 10,
        }}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            gap: 15,
          }}>
          <Pressable
            onPress={() => {
              //  Go back to the previous screen.
              navigation.navigate('ChatRoom', {
                receiver: route?.params?.receiver,
                name: route?.params?.name,
                receiverId: route?.params?.receiverId,
                image: route?.params?.image,
              });
            }}>
            <Ionicons name="arrow-back" size={24} color="#333333" />
          </Pressable>

          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              gap: 10,
            }}>
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
              }}
              source={{uri: route?.params?.image}}
            />

            <Text
              style={{
                color: '#333333',
                fontSize: 16,
                fontWeight: '700',
              }}>
              {route?.params?.name}
            </Text>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            gap: 10,
          }}>
          <Pressable
            onPress={() =>
              navigation.navigate('VideoChat', {
                receiver: route?.params?.receiver,
                name: route?.params?.name,
                receiverId: route?.params?.receiverId,
                image: route?.params?.image,
              })
            }>
            <Ionicons name="videocam-outline" size={30} color="#333333" />
          </Pressable>
          <Pressable
            onPress={() =>
              navigation.navigate('ChatRoom', {
                receiver: route?.params?.receiver,
                name: route?.params?.name,
                receiverId: route?.params?.receiverId,
                image: route?.params?.image,
              })
            }>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={30}
              color="#333333"
            />
          </Pressable>

          <Pressable onPress={() => setShowPopupBlockingModal(true)}>
            <Ionicons
              name="ellipsis-vertical-outline"
              size={30}
              color="#333333"
            />
          </Pressable>
        </View>
      </View>

      <AudioInputScreen
        receiverId={route?.params?.receiverId}
        receiver={route?.params?.receiver}
        name={route?.params?.name}
        image={route?.params?.image}
      />
      {showPopupBlockingModal && (
        <PopUpBlockingModal
          showPopupBlockingModal={showPopupBlockingModal}
          setShowPopupBlockingModal={setShowPopupBlockingModal}
          currentChat={route?.params?.receiver}
        />
      )}
    </View>
  );
}

export default AudioChatScreen;
