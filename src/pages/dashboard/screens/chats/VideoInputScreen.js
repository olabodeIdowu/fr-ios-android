import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function VideoInputScreen({handleSendMsg, navigation}) {
  const [action, setAction] = useState('video');

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        padding: 10,
      }}>
      <Pressable>
        <MaterialCommunityIcons
          name="camera"
          color={action === 'camera' ? '#FF6F61' : '#333333'}
          size={36}
        />
        {/* <MaterialCommunityIcons name="camera-off"   color={action === 'camera' ? '#FF6F61' : '#333333'}  size={36} /> */}
      </Pressable>
      <Pressable>
        <MaterialCommunityIcons
          name="video"
          color={action === 'video' ? '#FF6F61' : '#333333'}
          size={48}
        />
        {/* <MaterialCommunityIcons
          name="video-off"
          color={action === 'video' ? '#FF6F61' : '#333333'}
           size={36}
        /> */}
      </Pressable>
      <Pressable>
        <MaterialCommunityIcons
          name="microphone"
          color={action === 'microphone' ? '#FF6F61' : '#333333'}
          size={36}
        />
        {/* <MaterialCommunityIcons
          name="microphone-off"
            color={action === 'microphone' ? '#FF6F61' : '#333333'}
           size={36}
        /> */}
      </Pressable>
      <Pressable>
        {/* <MaterialCommunityIcons
            name="phone"
            color={action === 'audio' ? '#FF6F61' : '#333333'}
             size={36}
          /> */}
        <MaterialCommunityIcons
          name="phone-in-talk"
          color={action === 'audio' ? '#FF6F61' : '#333333'}
          size={36}
        />
      </Pressable>
    </View>
  );
}

export default VideoInputScreen;

const styles = StyleSheet.create({
  emoji: {
    position: 'absolute',
    width: '80rem',
    // marginTop: 40,
  },
});
