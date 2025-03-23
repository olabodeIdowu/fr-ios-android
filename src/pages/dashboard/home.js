import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DashboardScreen from './screens/dashboard/DashboardScreen';
import CoachesScreen from './screens/coaches/CoachesScreen';
import EventsScreen from './screens/events/EventsScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import ChatsScreen from './screens/chats/ChatsScreen';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        header: () => null,
        headerStyle: {
          borderRadius: 6,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
        },
        tabBarActiveTintColor: '#db3838',
        tabBarInactiveTintColor: '#a29c9c',
        tabBarShowLabel: false,

        // tabBarActiveBackgroundColor: '#db3838',
      }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 0,
          },
          tabBarIcon: ({color}) => (
            <Ionicons name="copy" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Coaches"
        component={CoachesScreen}
        options={{
          tabBarLabel: 'Coaches',
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 0,
          },
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="face-agent" color={color} size={32} />
          ),
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventsScreen}
        options={{
          tabBarLabel: 'Events',
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 0,
          },
          tabBarIcon: ({color}) => (
            <Ionicons name="calendar" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          tabBarLabel: 'Chats',
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 0,
          },
          tabBarIcon: ({color}) => (
            <Ionicons name="chatbubble-ellipses" color={color} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 0,
          },
          tabBarIcon: ({color}) => (
            <Ionicons name="person" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
});

// import React, {useEffect, useState, useRef} from 'react';
// import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import {
//   mediaDevices,
//   RTCPeerConnection,
//   RTCView,
//   RTCIceCandidate,
//   RTCSessionDescription,
// } from 'react-native-webrtc';

// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import InCallManager from 'react-native-incall-manager';
// import CallEnd from './../../../assets/CallEnd';
// import CallAnswer from './../../../assets/CallEnd';
// import MicOn from './../../../assets/CallEnd';
// import MicOff from './../../../assets/CallEnd';
// import VideoOn from './../../../assets/CallEnd';
// import VideoOff from './../../../assets/CallEnd';
// import CameraSwitch from './../../../assets/CameraSwitch';
// import IconContainer from './screens/chats/IconContainer';
// import {AuthContext} from '../../context/authContext';
// import {useSocketContext} from '../../context/socketContext';

// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import DashboardScreen from './screens/dashboard/DashboardScreen';
// import CoachesScreen from './screens/coaches/CoachesScreen';
// import EventsScreen from './screens/events/EventsScreen';
// import ProfileScreen from './screens/profile/ProfileScreen';
// import ChatsScreen from './screens/chats/ChatsScreen';
// import {useRoute} from '@react-navigation/native';

// const Tab = createBottomTabNavigator();

// export default function HomeScreen() {
//   const [localStream, setlocalStream] = useState(null);

//   const [remoteStream, setRemoteStream] = useState(null);

//   const [type, setType] = useState('DASHBOARD');

//   const otherUserId = useRef(null);
//   const [callerId, setCallerId] = useState('');

//   const {webrtcsocket} = useSocketContext();
//   const route = useRoute();

//   const [localMicOn, setlocalMicOn] = useState(true);

//   const [localWebcamOn, setlocalWebcamOn] = useState(true);

//   const peerConnection = useRef(
//     new RTCPeerConnection({
//       iceServers: [
//         {
//           urls: 'stun:stun.l.google.com:19302',
//         },
//         {
//           urls: 'stun:stun1.l.google.com:19302',
//         },
//         {
//           urls: 'stun:stun2.l.google.com:19302',
//         },
//       ],
//     }),
//   );

//   let remoteRTCMessage = useRef(null);

//   // type === 'INCOMING_CALL' &&
//   useEffect(() => {
//     webrtcsocket?.on('newCall', data => {
//       console.log('callerId', data?.callerId, 'rtcMessage', data?.rtcMessage);
//       setCallerId(data?.callerId);
//       remoteRTCMessage.current = data.rtcMessage;
//       otherUserId.current = data.callerId;
//       setType('INCOMING_CALL');
//     });

//     webrtcsocket?.on('callAnswered', data => {
//       remoteRTCMessage.current = data.rtcMessage;
//       peerConnection.current.setRemoteDescription(
//         new RTCSessionDescription(remoteRTCMessage.current),
//       );
//       setType('WEBRTC_ROOM');
//       setStartTime(true);
//     });

//     webrtcsocket?.on('callEnded', data => {
//       if (peerConnection.current) {
//         peerConnection.current.close();
//         setlocalStream(null);
//       }
//       setStartTime(false);
//       // setType('CHAT');
//       navigation.goBack();
//     });

//     webrtcsocket?.on('ICEcandidate', data => {
//       let message = data.rtcMessage;

//       if (peerConnection.current) {
//         peerConnection?.current
//           .addIceCandidate(
//             new RTCIceCandidate({
//               candidate: message.candidate,
//               sdpMid: message.id,
//               sdpMLineIndex: message.label,
//             }),
//           )
//           .then(data => {
//             console.log('SUCCESS');
//           })
//           .catch(err => {
//             console.log('Error', err.message);
//           });
//       }
//     });

//     let isFront = false;

//     mediaDevices.enumerateDevices().then(sourceInfos => {
//       let videoSourceId;
//       for (let i = 0; i < sourceInfos.length; i++) {
//         const sourceInfo = sourceInfos[i];
//         if (
//           sourceInfo.kind == 'videoinput' &&
//           sourceInfo.facing == (isFront ? 'user' : 'environment')
//         ) {
//           videoSourceId = sourceInfo.deviceId;
//         }
//       }

//       mediaDevices
//         .getUserMedia({
//           audio: true,
//           video: {
//             mandatory: {
//               minWidth: 500, // Provide your own width, height and frame rate here
//               minHeight: 300,
//               minFrameRate: 30,
//             },
//             facingMode: isFront ? 'user' : 'environment',
//             optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
//           },
//         })
//         .then(stream => {
//           // Got stream!

//           setlocalStream(stream);

//           // setup stream listening
//           peerConnection.current.addStream(stream);
//         })
//         .catch(error => {
//           // Log error
//         });
//     });

//     peerConnection.current.onaddstream = event => {
//       setRemoteStream(event.stream);
//     };

//     // Setup ice handling
//     peerConnection.current.onicecandidate = event => {
//       if (event.candidate) {
//         sendICEcandidate({
//           calleeId: otherUserId.current,
//           rtcMessage: {
//             label: event.candidate.sdpMLineIndex,
//             id: event.candidate.sdpMid,
//             candidate: event.candidate.candidate,
//           },
//         });
//       } else {
//         console.log('End of candidates.');
//         return;
//         // setType('CHAT');
//       }
//     };

//     return () => {
//       webrtcsocket?.off('newCall');
//       webrtcsocket?.off('callAnswered');
//       webrtcsocket?.off('callEnded');
//       webrtcsocket?.off('ICEcandidate');
//     };
//   }, []);

//   useEffect(() => {
//     InCallManager.start();
//     InCallManager.setKeepScreenOn(true);
//     InCallManager.setForceSpeakerphoneOn(true);

//     return () => {
//       InCallManager.stop();
//     };
//   }, []);

//   function sendICEcandidate(data) {
//     webrtcsocket.emit('ICEcandidate', data);
//   }

//   async function processAccept() {
//     peerConnection.current.setRemoteDescription(
//       new RTCSessionDescription(remoteRTCMessage.current),
//     );
//     const sessionDescription = await peerConnection.current.createAnswer();
//     await peerConnection.current.setLocalDescription(sessionDescription);
//     answerCall({
//       callerId: otherUserId.current,
//       rtcMessage: sessionDescription,
//     });
//   }

//   function answerCall(data) {
//     webrtcsocket.emit('answerCall', data);
//   }

//   const homeScreen = () => {
//     return (
//       <Tab.Navigator
//         initialRouteName="Dashboard"
//         screenOptions={{
//           header: () => null,
//           // tabBarActiveTintColor: '#F00518',
//           tabBarActiveTintColor: '#8D020E',
//           tabBarInactiveTintColor: '#333333',
//         }}>
//         <Tab.Screen
//           name="Dashboard"
//           component={DashboardScreen}
//           options={{
//             tabBarLabel: 'Dashboard',
//             tabBarStyle: {
//               backgroundColor: '#ffffff',
//               borderTopWidth: 0,
//             },
//             tabBarIcon: ({color}) => (
//               <MaterialCommunityIcons name="home" color={color} size={30} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="Coaches"
//           component={CoachesScreen}
//           options={{
//             tabBarLabel: 'Coaches',
//             tabBarStyle: {
//               backgroundColor: '#ffffff',
//               borderTopWidth: 0,
//             },
//             tabBarIcon: ({color}) => (
//               <MaterialCommunityIcons
//                 name="face-agent"
//                 color={color}
//                 size={30}
//               />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="Events"
//           component={EventsScreen}
//           options={{
//             tabBarLabel: 'Events',
//             tabBarStyle: {
//               backgroundColor: '#ffffff',
//               borderTopWidth: 0,
//             },
//             tabBarIcon: ({color}) => (
//               <MaterialCommunityIcons name="calendar" color={color} size={30} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="Chats"
//           component={ChatsScreen}
//           options={{
//             tabBarLabel: 'Chats',
//             tabBarStyle: {
//               backgroundColor: '#ffffff',
//               borderTopWidth: 0,
//             },
//             tabBarIcon: ({color}) => (
//               <MaterialIcons
//                 name="chat-bubble-outline"
//                 color={color}
//                 size={30}
//               />
//             ),
//           }}
//         />

//         <Tab.Screen
//           name="Profile"
//           component={ProfileScreen}
//           options={{
//             tabBarLabel: 'Profile',
//             tabBarStyle: {
//               backgroundColor: '#ffffff',
//               borderTopWidth: 0,
//             },
//             tabBarIcon: ({color}) => (
//               <MaterialIcons name="person-outline" color={color} size={30} />
//             ),
//           }}
//         />
//       </Tab.Navigator>
//     );
//   };

//   const IncomingCallScreen = () => {
//     return (
//       <View>
//         <View
//           style={{
//             padding: 35,
//             justifyContent: 'center',
//             alignItems: 'center',
//             borderRadius: 14,
//           }}>
//           <Text
//             style={{
//               fontSize: 36,
//               marginTop: 12,
//               color: '#333333',
//             }}>
//             {callerId} is calling..
//             {/* {otherUserId.current} is calling.. */}
//           </Text>
//         </View>
//         <View
//           style={{
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <TouchableOpacity
//             onPress={() => {
//               processAccept();
//               setType('WEBRTC_ROOM');
//             }}
//             style={{
//               backgroundColor: 'green',
//               borderRadius: 30,
//               height: 60,
//               aspectRatio: 1,
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             <CallAnswer height={28} fill={'#fff'} />
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   function switchCamera() {
//     localStream.getVideoTracks().forEach(track => {
//       track._switchCamera();
//     });
//   }

//   function toggleCamera() {
//     localWebcamOn ? setlocalWebcamOn(false) : setlocalWebcamOn(true);
//     localStream.getVideoTracks().forEach(track => {
//       localWebcamOn ? (track.enabled = false) : (track.enabled = true);
//     });
//   }

//   function toggleMic() {
//     localMicOn ? setlocalMicOn(false) : setlocalMicOn(true);
//     localStream.getAudioTracks().forEach(track => {
//       localMicOn ? (track.enabled = false) : (track.enabled = true);
//     });
//   }

//   function leave() {
//     peerConnection.current.close();
//     setlocalStream(null);
//     setType('DASHBOARD');
//   }

//   const WebrtcRoomScreen = () => {
//     return (
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: '#050A0E',
//           paddingHorizontal: 12,
//           paddingVertical: 12,
//         }}>
//         {localStream ? (
//           <RTCView
//             objectFit={'cover'}
//             style={{flex: 1, backgroundColor: '#050A0E'}}
//             streamURL={localStream.toURL()}
//           />
//         ) : null}
//         {remoteStream ? (
//           <RTCView
//             objectFit={'cover'}
//             style={{
//               flex: 1,
//               backgroundColor: '#050A0E',
//               marginTop: 8,
//             }}
//             streamURL={remoteStream.toURL()}
//           />
//         ) : null}
//         <View
//           style={{
//             marginVertical: 12,
//             flexDirection: 'row',
//             justifyContent: 'space-evenly',
//           }}>
//           <IconContainer
//             backgroundColor={'red'}
//             onPress={() => {
//               leave();
//             }}
//             Icon={() => {
//               return <CallEnd height={26} width={26} fill="#333" />;
//             }}
//           />
//           <IconContainer
//             style={{
//               borderWidth: 1.5,
//               borderColor: '#2B3034',
//             }}
//             backgroundColor={!localMicOn ? '#fff' : 'transparent'}
//             onPress={() => {
//               toggleMic();
//             }}
//             Icon={() => {
//               return localMicOn ? (
//                 <MicOn height={24} width={24} fill="#333" />
//               ) : (
//                 <MicOff height={28} width={28} fill="#1D2939" />
//               );
//             }}
//           />
//           <IconContainer
//             style={{
//               borderWidth: 1.5,
//               borderColor: '#2B3034',
//             }}
//             backgroundColor={!localWebcamOn ? '#fff' : 'transparent'}
//             onPress={() => {
//               toggleCamera();
//             }}
//             Icon={() => {
//               return localWebcamOn ? (
//                 <VideoOn height={24} width={24} fill="#333" />
//               ) : (
//                 <VideoOff height={36} width={36} fill="#1D2939" />
//               );
//             }}
//           />
//           <IconContainer
//             style={{
//               borderWidth: 1.5,
//               borderColor: '#2B3034',
//             }}
//             backgroundColor={'transparent'}
//             onPress={() => {
//               switchCamera();
//             }}
//             Icon={() => {
//               return <CameraSwitch height={24} width={24} fill="#333" />;
//             }}
//           />
//         </View>
//       </View>
//     );
//   };

//   switch (type) {
//     case 'DASHBOARD':
//       return homeScreen();
//     case 'INCOMING_CALL':
//       return IncomingCallScreen();
//     case 'WEBRTC_ROOM':
//       return WebrtcRoomScreen();
//     default:
//       return null;
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F7F7F7',
//   },
// });
