import RNFS from 'react-native-fs';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  TouchableOpacity,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Image,
  Dimensions,
  Platform,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  PermissionsAndroid,
} from 'react-native';
import {
  mediaDevices,
  RTCPeerConnection,
  RTCView,
  RTCIceCandidate,
  RTCSessionDescription,
} from 'react-native-webrtc';

import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import Sound from 'react-native-sound';
import * as ImagePicker from 'react-native-image-picker';
// import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {useNavigation, useRoute} from '@react-navigation/native';
import InCallManager from 'react-native-incall-manager';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {AuthContext} from '../../../../context/authContext';
import {useSocketContext} from '../../../../context/socketContext';
import {sendUserImage, sendUserMessage} from '../../../../services/apiChats';
import {url} from '../../../../hooks/useUrl';
import {axiosInstance} from '../../../../hooks/useAxios';
import PopUpBlockingModal from './chat_popups/PopupBlocking';

import CallEnd from './../../../../../assets/CallEnd';
import CallAnswer from './../../../../../assets/CallAnswer';
import MicOn from './../../../../../assets/MicOn';
import MicOff from './../../../../../assets/MicOff';
import VideoOn from './../../../../../assets/VideoOn';
import VideoOff from './../../../../../assets/VideoOff';
import CameraSwitch from './../../../../../assets/CameraSwitch';
import IconContainer from './IconContainer';
import {getUser} from '../../../../services/apiUsers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalComponent from '../../../../ui/ModalComponent';
import LinearGradient from 'react-native-linear-gradient';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

export default function ChatRoom() {
  const {auth, setAuth} = useContext(AuthContext);
  const userId = auth?.user?.id;
  const {socket, webrtcsocket} = useSocketContext();
  const route = useRoute();
  const navigation = useNavigation();
  const scrollRef = useRef();

  const [dimensions, setDimensions] = useState({window, screen});
  const [isBlocked, setIsBlocked] = useState(false);
  const [showPopupBlockingModal, setShowPopupBlockingModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const [image, setImage] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);

  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(false);

  const [localStream, setlocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const [type, setType] = useState('CHAT');
  const otherUserId = useRef(null);

  const [localMicOn, setlocalMicOn] = useState(true);
  const [localWebcamOn, setlocalWebcamOn] = useState(true);

  const [path, setPath] = useState('');
  const [startRecord, setStartRecord] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUri, setAudioUri] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [recordSecs, setRecordSecs] = useState(0);
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [currentDurationSec, setCurrentDurationSec] = useState(0);
  const [playTime, setPlayTime] = useState('');
  const [duration, setDuration] = useState('');

  /************************************************** */
  // AUDIO RECORD SYSTEM LOGIC
  /************************************************** */

  async function requestToRecordAudiopermission() {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        console.log('write external storage', grants);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  }

  // async function requestStoragePermission() {
  //   let permission;

  //   if (Platform.OS === 'android') {
  //     permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  //   } else if (Platform.OS === 'ios') {
  //     permission = PERMISSIONS.IOS.PHOTO_LIBRARY; // Use this for broader storage scenarios on iOS
  //   }

  //   const result = await check(permission);
  //   switch (result) {
  //     case RESULTS.UNAVAILABLE:
  //       console.log('This feature is not available on this device/context');
  //       return false;
  //     case RESULTS.DENIED:
  //       const requestResult = await request(permission);
  //       return requestResult === RESULTS.GRANTED;
  //     case RESULTS.LIMITED:
  //       console.log('The permission is limited: some actions are possible');
  //       return true;
  //     case RESULTS.GRANTED:
  //       console.log('The permission is granted');
  //       return true;
  //     case RESULTS.BLOCKED:
  //       console.log('The permission is blocked');
  //       return false;
  //   }
  // }

  const audioRecorderPlayer = new AudioRecorderPlayer();

  function nanoid() {
    let digits = 'yz01234klmno56789stuABCvwxDEFghijGHIJLMNOUVXYZabcpqrdef';
    let unique = '';

    for (let i = 0; i < 21; i++) {
      unique += digits[Math.floor(Math.random() * 21)];
    }
    return unique;
  }

  useEffect(() => {
    return () => {
      audioRecorderPlayer.removeRecordBackListener();
      audioRecorderPlayer.removePlayBackListener();
    };
  }, []);

  const onStartRecord = useCallback(() => {
    async function startRecord() {
      console.log('onstartrecord');
      requestToRecordAudiopermission();
      // requestStoragePermission();

      const dirs =
        Platform.OS === 'ios'
          ? RNFS.DocumentDirectoryPath
          : RNFS.ExternalDirectoryPath;

      const newPath = Platform.select({
        ios: `${dirs}/${nanoid()}.m4a`,
        android: `${dirs}/${nanoid()}.mp3`,
      });

      setPath(newPath);

      const audioSet = {
        AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
        AudioSourceAndroid: AudioSourceAndroidType.MIC,
        AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
        AVNumberOfChannelsKeyIOS: 2,
        AVFormatIDKeyIOS: AVEncodingOption.aac,
      };

      const meteringEnabled = false;
      console.log(
        'path',
        path,
        'audioSet',
        audioSet,
        ' meteringEnabled',
        meteringEnabled,
      );
      // const result = await audioRecorderPlayer.startRecorder(path, audioSet, meteringEnabled);

      const uri = await audioRecorderPlayer.startRecorder(
        path,
        audioSet,
        meteringEnabled,
      );
      console.log('path', path, 'audioSet', audioSet);
      console.log('uri', uri);

      audioRecorderPlayer.addRecordBackListener(e => {
        setRecordSecs(e.currentPosition);
        setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
        return;
      });
      console.log(
        'recordSecs:',
        recordSecs,
        'playTime:',
        playTime,
        'recordedAudioUri:',
        uri,
      );

      setIsRecording(true);
      setShowModal(true);
      setAudioUri(uri);
    }
    startRecord();
  }, []);

  async function deletePath() {
    console.log('delete path', path);
    RNFS.unlink(path)
      .then(() => {
        console.log('File deleted');
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  const onStopRecord = useCallback(() => {
    async function stopRecord() {
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setIsRecording(false);
      setRecordSecs(0);
      console.log(result, 'stopAudioUri: ', audioUri);

      // send audio to backend
      // sendAudio(senderId, receiverId, audioUri);
      // console.log(`send uri: ${audioUri} to backend`);
    }
    stopRecord();
  }, []);

  const onStartPlay = useCallback(() => {
    async function startPlay() {
      console.log('onStartPlay', path);

      const msg = await audioRecorderPlayer.startPlayer(path);
      console.log(msg);

      audioRecorderPlayer.setVolume(1.0);
      console.log(msg);

      audioRecorderPlayer.addPlayBackListener(e => {
        if (e.currentPosition === e.duration) {
          console.log('finished');
          audioRecorderPlayer.stopPlayer();
          setIsPlaying(false);
        }

        setCurrentPositionSec(e.currentPosition);
        setCurrentDurationSec(e.duration);
        setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
        setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
        return;
      });

      setIsPlaying(true);
      setIsPause(false);
      console.log(currentPositionSec, currentDurationSec, playTime, duration);
    }
    startPlay();
  }, []);

  const onPausePlay = useCallback(() => {
    async function pause() {
      await audioRecorderPlayer.pausePlayer();
      setIsPause(true);
      setIsPlaying(false);
    }
    pause();
  }, []);

  const onStopPlay = async () => {
    console.log('onStopPlay');
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
    setIsPlaying(false);
  };

  const handlePlaySound = uriPath => {
    () => {
      setIsPlaying(true);
      const sound = new Sound(uriPath, '', error => {
        if (error) {
          console.log('failed to load the sound', error);
        }
        setIsPlaying(false);
        isPlaying
          ? sound.pause(success => {
              console.log(success, 'success play');
              setIsPlaying(true);
              if (!success) {
                Alert.alert('There was an error playing this audio');
              }
            })
          : sound.play(success => {
              console.log(success, 'success play');
              setIsPlaying(true);
              if (!success) {
                Alert.alert('There was an error playing this audio');
              }
            });
      });
    };
  };

  /************************************************** */
  // PICKING CAMERA SYSTEM LOGIC
  /************************************************** */
  const onCameraPress = (senderId, receiverId) => {
    try {
      const options = {
        saveToPhotos: false,
        mediaType: 'photo',
        includeBase64: true,
      };

      ImagePicker.launchCamera(options, async res => {
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.errorCode) {
          console.log('ImagePicker Error: ', res.errorMessage);
        } else {
          let base64Image = `data:image/jpg;base64,${res.assets[0].base64}`;
          console.log(base64Image, res.assets[0].base64);

          setUploadImage(base64Image);

          const {data} = await axiosInstance.post(
            `${url}/fr/api/v1/chats/send-user-image`,
            {
              senderId: senderId,
              receiverId: receiverId,
              image: base64Image,
            },
          );
          console.log('UPLOADED RESPONSE => ', data);

          setImage(data?.media);
          alert('Profile image saved');
          console.log('image: ', image?.url);
          sendImage(senderId, receiverId, image?.url);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  /************************************************** */
  // AUDIO & VIDEO SYSTEM LOGIC
  /************************************************** */

  const peerConnection = useRef(
    new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
        {
          urls: 'stun:stun1.l.google.com:19302',
        },
        {
          urls: 'stun:stun2.l.google.com:19302',
        },
      ],
    }),
  );

  let remoteRTCMessage = useRef(null);

  useEffect(() => {
    webrtcsocket.on('newCall', data => {
      console.log('callerId', data?.callerId, 'rtcMessage', data?.rtcMessage);
      remoteRTCMessage.current = data.rtcMessage;
      otherUserId.current = data.callerId;
      setType('INCOMING_CALL');
    });

    webrtcsocket.on('callAnswered', data => {
      remoteRTCMessage.current = data.rtcMessage;
      peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(remoteRTCMessage.current),
      );
      setType('WEBRTC_ROOM');
      setStartTime(true);
    });

    webrtcsocket.on('callEnded', data => {
      if (peerConnection.current) {
        peerConnection.current.close();
        setlocalStream(null);
      }
      setStartTime(false);
      setType('CHAT');
      // navigation.goBack();
    });

    webrtcsocket.on('ICEcandidate', data => {
      let message = data.rtcMessage;

      if (peerConnection.current) {
        peerConnection?.current
          .addIceCandidate(
            new RTCIceCandidate({
              candidate: message.candidate,
              sdpMid: message.id,
              sdpMLineIndex: message.label,
            }),
          )
          .then(data => {
            console.log('SUCCESS');
          })
          .catch(err => {
            console.log('Error', err.message);
          });
      }
    });

    let isFront = false;

    mediaDevices.enumerateDevices().then(sourceInfos => {
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (
          sourceInfo.kind == 'videoinput' &&
          sourceInfo.facing == (isFront ? 'user' : 'environment')
        ) {
          videoSourceId = sourceInfo.deviceId;
        }
      }

      mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            mandatory: {
              minWidth: 500, // Provide your own width, height and frame rate here
              minHeight: 300,
              minFrameRate: 30,
            },
            facingMode: isFront ? 'user' : 'environment',
            optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
          },
        })
        .then(stream => {
          // Got stream!

          setlocalStream(stream);

          // setup stream listening
          peerConnection.current.addStream(stream);
        })
        .catch(error => {
          // Log error
        });
    });

    peerConnection.current.onaddstream = event => {
      setRemoteStream(event.stream);
    };

    // Setup ice handling
    peerConnection.current.onicecandidate = event => {
      if (event.candidate) {
        sendICEcandidate({
          calleeId: otherUserId.current,
          rtcMessage: {
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate,
          },
        });
      } else {
        console.log('End of candidates.');
        return;
        // setType('CHAT');
      }
    };

    return () => {
      webrtcsocket.off('newCall');
      webrtcsocket.off('callAnswered');
      webrtcsocket.off('callEnded');
      webrtcsocket.off('ICEcandidate');
    };
  }, []);

  useEffect(() => {
    InCallManager.start();
    InCallManager.setKeepScreenOn(true);
    InCallManager.setForceSpeakerphoneOn(true);

    return () => {
      InCallManager.stop();
    };
  }, []);

  function sendICEcandidate(data) {
    webrtcsocket.emit('ICEcandidate', data);
  }

  async function processCall() {
    const sessionDescription = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(sessionDescription);
    sendCall({
      calleeId: otherUserId.current,
      rtcMessage: sessionDescription,
    });
  }

  async function processAccept() {
    peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(remoteRTCMessage.current),
    );
    const sessionDescription = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(sessionDescription);
    answerCall({
      callerId: otherUserId.current,
      rtcMessage: sessionDescription,
    });
  }

  async function processEndCall() {
    if (peerConnection.current) {
      peerConnection.current.close();
      setlocalStream(null);
    }

    endCall({
      callerId: otherUserId.current,
      rtcMessage: null,
    });
  }

  function answerCall(data) {
    webrtcsocket.emit('answerCall', data);
  }

  function sendCall(data) {
    webrtcsocket.emit('call', data);
  }

  function endCall(data) {
    webrtcsocket.emit('endCall', data);
  }

  /************************************************** */
  // CHAT SYSTEM LOGIC
  /************************************************** */
  const onChange = ({window, screen}) => {
    setDimensions({window, screen});
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    // return () => {
    //   Dimensions.removeEventListener('change', onChange);
    // };
  }, []);

  useEffect(() => {
    scrollRef.current.scrollToEnd({animated: true});
  }, [messages]);

  const listeMessages = () => {
    const {socket} = useSocketContext();

    useEffect(() => {
      socket?.on('newMessage', newMessage => {
        newMessage.shouldShake = true;
        setMessages([...messages, newMessage]);
      });

      return () => socket?.off('newMessage');
    }, [socket, messages, setMessages]);
  };
  listeMessages();

  const sendMessage = async (senderId, receiverId) => {
    console.log(senderId, receiverId);

    try {
      const form = {senderId, receiverId, message};
      await sendUserMessage(form);

      socket.emit('sendMessage', {senderId, receiverId, message});

      setMessage('');

      const receiverResponse = await getUser(receiverId);

      console.log(
        'TIMELOGGEDIN: ',
        new Date(
          receiverResponse?.data?.data?.user?.loggedOutAt + 2 * 60 * 1000,
        ),
        'DATENOW:',
        new Date(Date.now()),
      );

      if (receiverResponse?.data?.data?.user?.online === true) {
        await axiosInstance.get(
          `${url}/fr/api/v1/chats/user-status-delivered`,
          {
            params: {senderId, receiverId, message},
            withCredentials: false,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        );
      }

      if (
        receiverResponse?.data?.data?.user?.online === true &&
        new Date(
          receiverResponse?.data?.data?.user?.loggedOutAt + 2 * 60 * 1000,
        ) > new Date(Date.now())
      ) {
        await axiosInstance.get(`${url}/fr/api/v1/chats/user-status-read`, {
          params: {senderId, receiverId, message},
          withCredentials: false,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
      }

      fetchMessages();
    } catch (error) {
      console.log('Error', error.message);
    }
  };

  const sendImage = async (senderId, receiverId, image) => {
    console.log(senderId, receiverId);

    try {
      socket.emit('sendImage', {senderId, receiverId, image});

      setImage('');

      const receiverResponse = await getUser(receiverId);
      console.log(
        'TIMELOGGEDIN: ',
        new Date(
          receiverResponse?.data?.data?.user?.loggedOutAt + 2 * 60 * 1000,
        ),
        'DATENOW:',
        new Date(Date.now()),
      );

      if (receiverResponse?.data?.data?.user?.online === true) {
        await axiosInstance.get(
          `${url}/fr/api/v1/chats/user-status-delivered`,
          {
            params: {senderId, receiverId, image},
            withCredentials: false,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        );
      }

      if (
        receiverResponse?.data?.data?.user?.online === true &&
        new Date(
          receiverResponse?.data?.data?.user?.loggedOutAt + 2 * 60 * 1000,
        ) < new Date(Date.now())
      ) {
        await axiosInstance.get(`${url}/fr/api/v1/chats/user-status-read`, {
          params: {senderId, receiverId, image},
          withCredentials: false,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
      }

      fetchMessages();
    } catch (error) {
      console.log('Error', error.message);
    }
  };

  const sendAudio = async (senderId, receiverId, audio) => {
    console.log(senderId, receiverId, audio);

    try {
      socket.emit('sendAudio', {senderId, receiverId, audio});

      const file = {
        url: `file://${audio}`,
        type: 'audio/aac',
        name: 'audio.aac',
      };

      // const formData = new FormData();
      // formData.append('senderId', senderId);
      // formData.append('receiverId', receiverId);
      // formData.append('audio', file);
      // formData.append('lang', 'en-US');

      const data = await axiosInstance({
        method: 'post',
        url: `/fr/api/v1/chats/send-user-audio`,
        body: {
          senderId,
          receiverId,
          audio: file,
        },
        withCredentials: false,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload success: ', data);

      setAudioUri(null);

      const receiverResponse = await getUser(receiverId);

      console.log(
        'TIMELOGGEDIN: ',
        new Date(
          receiverResponse?.data?.data?.user?.loggedOutAt + 2 * 60 * 1000,
        ),
        'DATENOW:',
        new Date(Date.now()),
      );

      if (receiverResponse?.data?.data?.user?.online === true) {
        await axiosInstance.get(
          `${url}/fr/api/v1/chats/user-status-delivered`,
          {
            params: {senderId, receiverId, audio},
            withCredentials: false,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        );
      }

      if (
        receiverResponse?.data?.data?.user?.online === true &&
        new Date(
          receiverResponse?.data?.data?.user?.loggedOutAt + 2 * 60 * 1000,
        ) < new Date(Date.now())
      ) {
        await axiosInstance.get(`${url}/fr/api/v1/chats/user-status-read`, {
          params: {senderId, receiverId, audio},
          withCredentials: false,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
      }

      fetchMessages();

      RNFS.unlink(path)
        .then(() => {
          console.log('File deleted');
        })
        .catch(err => {
          console.log(err.message);
        });
    } catch (error) {
      console.log('Error', error.message);
    }
  };

  useEffect(() => {
    socket.on('receiveMessage', async data => {
      // console.log('receive');
      const senderId = data?.senderId;
      const receiverId = data?.receiverId;
      // const newMessage = data?.message;

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

      console.log(response.data, 'receive');
      setMessages(response.data);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const fetchMessages = async () => {
    try {
      const senderId = userId;
      const receiverId = route?.params?.receiverId;

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
      console.log('Error', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [userId]);

  // console.log('messages', messages);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (route?.params?.receiver) {
        const is_blocked =
          route?.params?.receiver?.blocked_users.length > 0 &&
          route?.params?.receiver?.blocked_users.some(bu => {
            console.log('blocked users ', bu?.blocked_user);
            return bu?.blocked_user === userId && bu?.isBlocked === true;
          });
        console.log('is_blocked ', is_blocked);
        setIsBlocked(is_blocked);
      }
    };
    getCurrentChat();
  }, [route?.params?.receiver]);

  const formatTime = time => {
    const options = {hour: 'numeric', minute: 'numeric'};
    return new Date(time).toLocaleString('en-US', options);
  };

  async function unblockUser() {
    try {
      const {data} = await axios.patch(
        `${url}/fr/api/v1/users-block_user/${route?.params?.receiverId}`,
      );
      alert(data?.status);
    } catch (error) {
      console.log(
        error.response?.data?.error?.statusCode,
        error.response?.data?.message,
      );
    }
  }

  const ChatRoom = () => {
    return (
      <View style={{height: '100%'}}>
        {/* <LinearGradient
          start={{x: 0.3, y: 0.5}}
          end={{x: 0.2, y: 0.7}}
          colors={['#f5e9ea', '#f7f7f7']}
          style={{height: '100%'}}> */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#FFFFFF',
              paddingBlock: 10,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <Ionicons
                onPress={() =>
                  navigation.navigate('ChatsScreen', {
                    receiver: route?.params?.receiver,
                    name: route?.params?.name,
                    receiverId: route?.params?.receiverId,
                    image: route?.params?.image,
                  })
                }
                name="arrow-back"
                size={24}
                color="#333333"
              />

              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <Image
                  source={{uri: route?.params?.image}}
                  style={{width: 40, height: 40, borderRadius: 50}}
                />
                <Text
                  style={{color: '#333333', fontWeight: '700', fontSize: 16}}>
                  {route?.params?.name}
                </Text>
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                gap: 20,
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
                <Ionicons name="videocam-outline" size={24} color="#333333" />
              </Pressable>
              <Pressable
                onPress={() => {
                  otherUserId.current = route?.params?.receiverId;
                  setType('OUTGOING_CALL');
                  processCall();
                }}>
                <Ionicons name="call-outline" size={24} color="#333333" />
              </Pressable>

              <Pressable
                onPress={() => {
                  setShowPopupBlockingModal(true);
                  console.log('showpopupblocking');
                }}>
                <Ionicons
                  name="ellipsis-vertical-outline"
                  size={24}
                  color="#333333"
                />
              </Pressable>
            </View>
          </View>

          <ScrollView ref={scrollRef} keyboardShouldPersistTaps="handled">
            {messages && messages.length > 0 ? (
              messages?.map((item, index) => {
                // console.log(item?.media?.url);
                return (
                  <View key={index}>
                    {image || image?.url || item?.media?.url || uploadImage ? (
                      <Pressable
                        style={[
                          item?.senderId?._id === userId
                            ? {
                                alignSelf: 'flex-end',
                                // backgroundColor: '#FF6F61',
                                padding: 8,
                                maxWidth: '60%',
                                borderRadius: 7,
                                margin: 10,
                              }
                            : {
                                alignSelf: 'flex-start',
                                // backgroundColor: '#E3B7E5',
                                padding: 8,
                                margin: 10,
                                borderRadius: 7,
                                maxWidth: '60%',
                              },
                        ]}>
                        {image && image?.url ? (
                          <Image
                            source={{uri: image.url}}
                            style={{
                              width: 160,
                              height: 160,
                              borderRadius: 7,
                            }}
                          />
                        ) : uploadImage ? (
                          <Image
                            source={{uri: uploadImage}}
                            style={{
                              width: 160,
                              height: 160,
                              borderRadius: 7,
                            }}
                          />
                        ) : (
                          <Image
                            source={{uri: item?.media?.url}}
                            style={{
                              width: 160,
                              height: 160,
                              borderRadius: 7,
                            }}
                          />
                        )}
                        <View
                          style={{
                            flexDirection: 'row',
                            gap: 5,
                            alignItems: 'center',
                            alignSelf: 'flex-end',
                          }}>
                          <Text
                            style={{
                              fontSize: 9,
                              color: '#333',
                              marginTop: 4,
                            }}>
                            {formatTime(item?.createdAt)}
                          </Text>
                          {item?.senderId?._id === userId && (
                            <View>
                              {item?.status === 'read' ? (
                                <Ionicons
                                  name="checkmark-done-outline"
                                  color="#0099FF"
                                  size={12}
                                />
                              ) : item?.status === 'delivered' ? (
                                <Ionicons
                                  name="checkmark-done-outline"
                                  color="#333333"
                                  size={12}
                                />
                              ) : (
                                <Ionicons
                                  name="checkmark-outline"
                                  color="#333333"
                                  size={12}
                                />
                              )}
                            </View>
                          )}
                        </View>
                      </Pressable>
                    ) : item?.audio?.url ? (
                      <Pressable
                        style={[
                          item?.senderId?._id === userId
                            ? {
                                alignSelf: 'flex-end',
                                backgroundColor: '#FF6F61',
                                padding: 8,
                                maxWidth: '60%',
                                borderRadius: 7,
                                margin: 10,
                              }
                            : {
                                alignSelf: 'flex-start',
                                backgroundColor: '#E3B7E5',
                                padding: 8,
                                margin: 10,
                                borderRadius: 7,
                                maxWidth: '60%',
                              },
                        ]}>
                        {item?.audio?.url && (
                          <Ionicons
                            name={isPlaying ? 'ios-pause' : 'ios-play'}
                            size={30}
                            color={isPlaying ? 'red' : 'blue'}
                            style={{
                              left: 90,
                              position: 'relative',
                              shadowColor: '#000',
                              shadowOffset: {width: 0, height: 0},
                              shadowOpacity: 0.5,
                              backgroundColor: 'transparent',
                            }}
                            onPress={() => handlePlaySound(item?.audio?.url)}
                          />
                        )}

                        <View
                          style={{
                            flexDirection: 'row',
                            gap: 5,
                            alignItems: 'center',
                            alignSelf: 'flex-end',
                          }}>
                          <Text
                            style={{
                              fontSize: 9,
                              color: '#333',
                              marginTop: 4,
                            }}>
                            {formatTime(item?.createdAt)}
                          </Text>
                          {item?.senderId?._id === userId && (
                            <View>
                              {item?.status === 'read' ? (
                                <Ionicons
                                  name="checkmark-done-outline"
                                  color="#0099FF"
                                  size={12}
                                />
                              ) : item?.status === 'delivered' ? (
                                <Ionicons
                                  name="checkmark-done-outline"
                                  color="#333333"
                                  size={12}
                                />
                              ) : (
                                <Ionicons
                                  name="checkmark-outline"
                                  color="#333333"
                                  size={12}
                                />
                              )}
                            </View>
                          )}
                        </View>
                      </Pressable>
                    ) : (
                      <Pressable
                        style={[
                          item?.senderId?._id === userId
                            ? {
                                alignSelf: 'flex-end',
                                backgroundColor: '#FF6F61',
                                padding: 8,
                                maxWidth: '60%',
                                borderRadius: 7,
                                margin: 10,
                              }
                            : {
                                alignSelf: 'flex-start',
                                backgroundColor: '#E3B7E5',
                                padding: 8,
                                margin: 10,
                                borderRadius: 7,
                                maxWidth: '60%',
                              },
                        ]}>
                        <Text
                          style={{
                            fontSize: 13,
                            textAlign: 'left',
                            color: '#333333',
                            fontWeight: '700',
                          }}>
                          {item?.message}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            gap: 5,
                            alignItems: 'center',
                            alignSelf: 'flex-end',
                          }}>
                          <Text
                            style={{
                              fontSize: 9,
                              color: '#333',
                              marginTop: 4,
                            }}>
                            {formatTime(item?.createdAt)}
                          </Text>
                          {item?.senderId?._id === userId && (
                            <View>
                              {item?.status === 'read' ? (
                                <Ionicons
                                  name="checkmark-done-outline"
                                  color="#0099FF"
                                  size={12}
                                />
                              ) : item?.status === 'delivered' ? (
                                <Ionicons
                                  name="checkmark-done-outline"
                                  color="#333333"
                                  size={12}
                                />
                              ) : (
                                <Ionicons
                                  name="checkmark-outline"
                                  color="#333333"
                                  size={12}
                                />
                              )}
                            </View>
                          )}
                        </View>
                      </Pressable>
                    )}
                  </View>
                );
              })
            ) : (
              <View
                style={{
                  height: `${dimensions.screen.height / 1.5}`,
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}>
                  <MaterialIcons
                    name="chat-bubble-outline"
                    color="#FF6F61"
                    size={56}
                  />

                  <Text
                    style={{
                      color: '#333333',
                      fontSize: 16,
                    }}>
                    say Hi to {route?.params?.name}
                  </Text>
                </View>
              </View>
            )}

            {isBlocked && (
              <TouchableOpacity
                onPress={unblockUser}
                style={[
                  styles.button,
                  {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: 5,
                    maxWidth: 960,
                    marginHorizontal: 'auto',
                    marginTop: '50%',
                  },
                ]}>
                <Text style={styles.buttonText}>Unblock User</Text>
              </TouchableOpacity>
            )}
          </ScrollView>

          <View
            style={{
              backgroundColor: 'white',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderTopWidth: 1,
              borderTopColor: '#dddddd',
              marginBottom: 20,
            }}>
            <Ionicons name="add-outline" size={24} color="gray" />

            <TextInput
              //  ref={(ref)=>{this.myTextInput = ref}}
              placeholder="type your message..."
              placeholderTextColor="#666666"
              value={message}
              onChangeText={text => setMessage(text)}
              style={{
                flex: 1,
                height: 40,
                borderWidth: 1,
                borderColor: '#ddddd',
                borderRadius: 20,
                paddingHorizontal: 10,
                marginLeft: 10,
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                marginHorizontal: 8,
              }}>
              <Pressable
                onPress={() =>
                  onCameraPress(userId, route?.params?.receiverId)
                }>
                <Entypo name="camera" size={24} color="gray" />
              </Pressable>
              <Pressable onPress={onStartRecord}>
                <Feather name="mic" size={24} color="gray" />
              </Pressable>
            </View>

            <Pressable
              onPress={() => sendMessage(userId, route?.params?.receiverId)}
              style={{
                backgroundColor: '#0099FF',
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 20,
              }}>
              <Text style={{textAlign: 'center', color: 'white'}}>Send</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
        {/* </LinearGradient> */}
        {showPopupBlockingModal && (
          <PopUpBlockingModal
            showPopupBlockingModal={showPopupBlockingModal}
            setShowPopupBlockingModal={setShowPopupBlockingModal}
            currentChat={route?.params?.receiver}
          />
        )}

        {showModal && (
          <ModalComponent
            showModal={showModal}
            hideModal={() => {
              setShowModal(false);
            }}
            senderId={userId}
            receiverId={route?.params?.receiverId}
            isRecording={isRecording}
            onStopRecord={onStopRecord}
            onPausePlay={onPausePlay}
            onStartPlay={onStartPlay}
            isPause={isPause}
            isPlaying={isPlaying}
            recordSecs={recordSecs}
            playTime={playTime}
            duration={duration}
            path={path}
            deletePath={deletePath}
            audioUri={audioUri}
            sendAudio={sendAudio}
          />
        )}
      </View>
    );
  };

  const OutgoingCallScreen = () => {
    return (
      <View>
        <View
          style={{
            padding: 35,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 14,
          }}>
          {/* 
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'column',
              margin: 'auto',
              gap: 10,
            }}>
            <Image
              style={{
                width: 160,
                height: 160,
                borderRadius: 50,
              }}
              source={{uri: route?.params?.image}}
            />

            <Text style={{color: '#333333', fontSize: 24, fontWeight: '700'}}>
              {hours + ':' + time + ':' + seconds}
            </Text>
          </View>
         <View
            style={{
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
      

            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'right',
                alignSelf: 'center',
                gap: 5,
                marginRight: 10,
              }}>
              <View
                style={{
                  backgroundColor: 'coral',
                  width: 5,
                  height: 20,
                  borderRadius: 20,
                  marginBlock: 10,
                }}></View>
              <View
                style={{
                  backgroundColor: 'coral',
                  width: 5,
                  height: 30,
                  borderRadius: 20,
                  marginBlock: 10,
                }}></View>
              <View
                style={{
                  backgroundColor: 'coral',
                  width: 5,
                  height: 60,
                  borderRadius: 20,
                  marginBlock: 10,
                }}></View>
              <View
                style={{
                  backgroundColor: 'coral',
                  width: 5,
                  height: 40,
                  borderRadius: 20,
                  marginBlock: 10,
                }}></View>
              <View
                style={{
                  backgroundColor: 'coral',
                  width: 5,
                  height: 20,
                  borderRadius: 20,
                  marginBlock: 10,
                }}></View>
            </View>
          </View> */}
          <Text
            style={{
              // marginTop: 80,
              fontSize: 16,
              color: '#333333',
            }}>
            Calling to...
          </Text>

          <Text
            style={{
              fontSize: 36,
              marginTop: 12,
              color: '#333333',
              letterSpacing: 6,
            }}>
            {/* {otherUserId.current} */}
            {route?.params?.name}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              // navigation.goBack();
              processEndCall();
              setType('CHAT');
            }}
            style={{
              backgroundColor: '#FF5D5D',
              borderRadius: 30,
              height: 60,
              aspectRatio: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CallEnd width={50} height={12} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const IncomingCallScreen = () => {
    return (
      <View>
        <View
          style={{
            padding: 35,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 14,
          }}>
          <Text
            style={{
              fontSize: 36,
              marginTop: 12,
              color: '#333333',
            }}>
            {route?.params?.name} is calling..
            {/* {otherUserId.current} is calling.. */}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              processAccept();
              setType('WEBRTC_ROOM');
            }}
            style={{
              backgroundColor: 'green',
              borderRadius: 30,
              height: 60,
              aspectRatio: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CallAnswer height={28} fill={'#fff'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  function switchCamera() {
    localStream.getVideoTracks().forEach(track => {
      track._switchCamera();
    });
  }

  function toggleCamera() {
    localWebcamOn ? setlocalWebcamOn(false) : setlocalWebcamOn(true);
    localStream.getVideoTracks().forEach(track => {
      localWebcamOn ? (track.enabled = false) : (track.enabled = true);
    });
  }

  function toggleMic() {
    localMicOn ? setlocalMicOn(false) : setlocalMicOn(true);
    localStream.getAudioTracks().forEach(track => {
      localMicOn ? (track.enabled = false) : (track.enabled = true);
    });
  }

  function leave() {
    const data = {
      callerId: otherUserId.current,
      rtcMessage: null,
    };

    peerConnection.current.close();
    setlocalStream(null);
    webrtcsocket.emit('endCall', data);
    setType('CHAT');
  }

  const WebrtcRoomScreen = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#050A0E',
          paddingHorizontal: 12,
          paddingVertical: 12,
        }}>
        {localStream ? (
          <RTCView
            objectFit={'cover'}
            style={{flex: 1, backgroundColor: '#050A0E'}}
            streamURL={localStream.toURL()}
          />
        ) : null}
        {remoteStream ? (
          <RTCView
            objectFit={'cover'}
            style={{
              flex: 1,
              backgroundColor: '#050A0E',
              marginTop: 8,
            }}
            streamURL={remoteStream.toURL()}
          />
        ) : null}
        <View
          style={{
            marginVertical: 12,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <IconContainer
            backgroundColor={'red'}
            onPress={() => {
              leave();
            }}
            Icon={() => {
              return <CallEnd height={26} width={26} fill="#333" />;
            }}
          />
          <IconContainer
            style={{
              borderWidth: 1.5,
              borderColor: '#2B3034',
            }}
            backgroundColor={!localMicOn ? '#fff' : 'transparent'}
            onPress={() => {
              toggleMic();
            }}
            Icon={() => {
              return localMicOn ? (
                <MicOn height={24} width={24} fill="#333" />
              ) : (
                <MicOff height={28} width={28} fill="#1D2939" />
              );
            }}
          />
          <IconContainer
            style={{
              borderWidth: 1.5,
              borderColor: '#2B3034',
            }}
            backgroundColor={!localWebcamOn ? '#fff' : 'transparent'}
            onPress={() => {
              toggleCamera();
            }}
            Icon={() => {
              return localWebcamOn ? (
                <VideoOn height={24} width={24} fill="#333" />
              ) : (
                <VideoOff height={36} width={36} fill="#1D2939" />
              );
            }}
          />
          <IconContainer
            style={{
              borderWidth: 1.5,
              borderColor: '#2B3034',
            }}
            backgroundColor={'transparent'}
            onPress={() => {
              switchCamera();
            }}
            Icon={() => {
              return <CameraSwitch height={24} width={24} fill="#333" />;
            }}
          />
        </View>
      </View>
    );
  };

  switch (type) {
    case 'CHAT':
      return ChatRoom();
    case 'INCOMING_CALL':
      return IncomingCallScreen();
    case 'OUTGOING_CALL':
      return OutgoingCallScreen();
    case 'WEBRTC_ROOM':
      return WebrtcRoomScreen();
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#FF6F61',
    padding: 15,
    borderRadius: 8,
    margin: 10,
    marginTop: 40,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});
