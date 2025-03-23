// import {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   Pressable,
//   TextInput,
//   ScrollView,
// } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// function AudioInputScreen({handleSendMsg, navigation}) {
//   const [action, setAction] = useState('audio');

//   return (
//     <View
//       style={{
//         position: 'absolute',
//         bottom: 0,
//         width: '100%',
//         alignItems: 'center',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         backgroundColor: '#FFFFFF',
//         padding: 20,
//       }}>
//       <Pressable onPress={() => setAction('volume')}>
//         {/* <MaterialCommunityIcons name="volume-off"  color={action === 'volume' ? '#FF6F61' : '#333333'} size={36} /> */}
//         <MaterialCommunityIcons
//           name="volume-high"
//           color={action === 'volume' ? '#FF6F61' : '#333333'}
//           size={36}
//         />
//       </Pressable>
//       <Pressable onPress={() => setAction('video')}>
//         {/* <MaterialCommunityIcons name="video"  color={action === 'video' ? '#FF6F61' : '#333333'} size={36} /> */}
//         <MaterialCommunityIcons
//           name="video-off"
//           color={action === 'video' ? '#FF6F61' : '#333333'}
//           size={36}
//         />
//       </Pressable>
//       <Pressable onPress={() => setAction('microphone')}>
//         <MaterialCommunityIcons
//           name="microphone"
//           color={action === 'microphone' ? '#FF6F61' : '#333333'}
//           size={36}
//         />
//         {/* <MaterialCommunityIcons
//             name="microphone-off"
//             color={action === 'microphone' ? '#FF6F61' : '#333333'}
//             size={36}
//           /> */}
//       </Pressable>
//       <Pressable onPress={() => setAction('audio')}>
//         {/* <MaterialCommunityIcons
//             name="phone"
//             color={action === 'audio' ? '#FF6F61' : '#333333'}
//             size={36}
//           /> */}
//         <MaterialCommunityIcons
//           name="phone-in-talk"
//           color={action === 'audio' ? '#FF6F61' : '#333333'}
//           size={36}
//         />
//       </Pressable>
//     </View>
//   );
// }

// export default AudioInputScreen;

// const styles = StyleSheet.create({
//   emoji: {
//     position: 'absolute',
//     width: '80rem',
//     // marginTop: 40,
//   },
// });

import React, {useEffect, useState, useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  mediaDevices,
  RTCPeerConnection,
  RTCView,
  RTCIceCandidate,
  RTCSessionDescription,
} from 'react-native-webrtc';

import InCallManager from 'react-native-incall-manager';
import CallEnd from './../../../../../assets/CallEnd';
import CallAnswer from './../../../../../assets/CallAnswer';
import MicOn from './../../../../../assets/MicOn';
import MicOff from './../../../../../assets/MicOff';
import VideoOn from './../../../../../assets/VideoOn';
import VideoOff from './../../../../../assets/VideoOff';
import CameraSwitch from './../../../../../assets/CameraSwitch';
import IconContainer from './IconContainer';
import {useNavigation} from '@react-navigation/native';
import {useSocketContext} from '../../../../context/socketContext';
import {Image} from 'react-native-svg';

export default function AudioInputScreen({receiverId, receiver, name, image}) {
  console.log(image);
  const {socket} = useSocketContext();
  const navigation = useNavigation();
  const [localStream, setlocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const [type, setType] = useState('OUTGOING_CALL');

  const otherUserId = receiverId;

  const [localMicOn, setlocalMicOn] = useState(true);

  const [localWebcamOn, setlocalWebcamOn] = useState(true);

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
    socket.on('newCall', data => {
      console.log('INCOMING_CALL', data.callerId);
      remoteRTCMessage.current = data.rtcMessage;
      otherUserId = data.callerId;
      setType('INCOMING_CALL');
    });

    socket.on('callAnswered', data => {
      remoteRTCMessage.current = data.rtcMessage;
      peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(remoteRTCMessage.current),
      );
      setType('WEBRTC_ROOM');
    });

    socket.on('ICEcandidate', data => {
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
            console.log('Error', err);
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
          calleeId: otherUserId,
          rtcMessage: {
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate,
          },
        });
      } else {
        console.log('End of candidates.');
      }
    };

    return () => {
      socket.off('newCall');
      socket.off('callAnswered');
      socket.off('ICEcandidate');
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
    socket.emit('ICEcandidate', data);
  }

  async function processAccept() {
    peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(remoteRTCMessage.current),
    );
    const sessionDescription = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(sessionDescription);
    answerCall({
      callerId: otherUserId,
      rtcMessage: sessionDescription,
    });
  }

  function answerCall(data) {
    socket.emit('answerCall', data);
  }

  const OutgoingCallScreen = () => {
    console.log('otherUserIdCurrent', otherUserId);
    return (
      <View>
        <View
          style={{
            marginTop: 85,
            padding: 35,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 14,
          }}>
          <View
            style={{
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
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
                source={{uri: image}}
              />

              <Text style={{color: '#333333', fontSize: 24, fontWeight: '700'}}>
                00:08
              </Text>
            </View>

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
          </View>
          <Text
            style={{
              marginTop: 80,
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
            {otherUserId}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ChatRoom', {
                receiver: receiver,
                name: name,
                receiverId: receiverId,
                image: image,
              });
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
              color: '#ffff',
            }}>
            {otherUserId} is calling..
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
    peerConnection.current.close();
    setlocalStream(null);
    setType(null);
    navigation.navigate('ChatRoom');
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
