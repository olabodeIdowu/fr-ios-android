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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import VideoInputScreen from './VideoInputScreen';
import PopUpBlockingModal from './chat_popups/PopupBlocking';
import {AuthContext} from '../../../../context/authContext';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

function VideoChatScreen() {
  const [dimensions, setDimensions] = useState({window, screen});
  const {auth, setAuth} = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();
  const [showPopupBlockingModal, setShowPopupBlockingModal] = useState(false);

  console.log(
    dimensions.screen.width,
    dimensions.screen.height,
    -dimensions.screen.height / 2,
    auth?.user?.photo.url,
  );

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
              navigation.goBack();
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
          <Pressable
            onPress={() =>
              navigation.navigate('AudioChat', {
                receiver: route?.params?.receiver,
                name: route?.params?.name,
                receiverId: route?.params?.receiverId,
                image: route?.params?.image,
              })
            }>
            <Ionicons name="call-outline" size={30} color="#333333" />
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
      <View>
        <Image
          style={{
            width: dimensions.screen.width,
            height: dimensions.screen.height,
          }}
          source={{uri: route?.params?.image}}
        />
        <Image
          style={{
            marginTop: -dimensions.screen.height / 2,
            zIndex: 900,
            width: 160,
            height: 160,
            borderRadius: 8,
            alignSelf: 'flex-end',
          }}
          source={{uri: auth?.user?.avatar}}
        />
      </View>
      <VideoInputScreen />
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

export default VideoChatScreen;

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: "#151515",
//       padding: 10,
//     },

//   });
