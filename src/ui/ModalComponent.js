import {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ModalComponent = ({
  showModal,
  hideModal,
  senderId,
  receiverId,
  isRecording,
  onStopRecord,
  onStartPlay,
  onPausePlay,
  isPause,
  isPlaying,
  recordSecs,
  playTime,
  duration,
  path,
  deletePath,
  audioUri,
  sendAudio,
}) => {
  console.log(
    'showModal',
    showModal,
    'senderId',
    senderId,
    'receiverId',
    receiverId,
    'isRecording',
    isRecording,
    'isPause',
    isPause,
    'isPlaying',
    isPlaying,
    'recordSecs',
    recordSecs,
    'playTime',
    playTime,
    'duration',
    duration,
    'path',
    path,
    'audioUri',
    audioUri,
  );

  //   showModal true
  // senderId 67b1bd96e96cd2f74f42fc2b
  // receiverId 67b1bd3511e1bce6c8ef6f38
  // isRecording false
  // recordSecs 54932.902494
  // playTime 00:54:93
  // audioUri file:///Users/apple/Library/Developer/CoreSimulator/Devices/7D52013A-73FF-4BBF-980B-3A9BF250F788/data/Containers/Data/Application/E5408073-9C0B-45A1-8499-3FAB6C5FFD5B/Documents/o15kmy6862z2ssu97o086.m4a
  // ChatRoom.js:791

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onBackdropPress={() => {
        hideModal(false);
      }}>
      <TouchableOpacity
        style={styles.modalBackDrop}
        activeOpacity={1}
        onPress={hideModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                top: 5,
                padding: 10,
                justifyContent: 'space-between',
                flexDirection: 'row',
                // alignItems: 'center',
              }}>
              <Pressable
                onPress={isPlaying ? onPausePlay : onStartPlay}
                style={
                  {
                    //   top: -10,
                    //   right: 50,
                  }
                }>
                {isRecording ? (
                  <Text style={{color: '#333', fontSize: 14}}>
                    Recording...
                  </Text>
                ) : (
                  <Ionicons
                    name={isPlaying ? 'pause' : 'play'}
                    color="black"
                    size={24}
                  />
                )}
              </Pressable>

              <Pressable
                style={
                  {
                    //   top: -10,
                    //   right: -50,
                  }
                }>
                {isRecording ? (
                  <Text style={{color: '#333', fontSize: 18}}>{playTime}</Text>
                ) : isPause ? (
                  <Text
                    style={{
                      color: '#333333',
                      textAlign: 'center',
                      fontSize: 18,
                    }}>
                    {playTime}
                  </Text>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 15,
                    }}>
                    <Text style={{color: '#333', fontSize: 18}}>
                      {playTime}
                    </Text>
                    <Text style={{color: '#333', fontSize: 18}}>
                      {' '}
                      {duration}
                    </Text>
                  </View>
                )}
              </Pressable>
            </View>

            <Text
              style={{
                color: '#333333',
                fontSize: 14,
                textAlign: 'center',
                // paddingBlock: 10,
              }}>
              AUDIO
            </Text>

            <View
              style={{
                top: 5,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Pressable
                style={{
                  left: -70,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  backgroundColor: '#A26166',
                  borderRadius: 20,
                  paddingTop: 6,
                  paddingBottom: 6,
                  paddingRight: 10,
                  paddingLeft: 10,
                }}
                onPress={() => {
                  deletePath(path);
                  console.log('delete Audio from database');
                  // deleteAudio(senderId, receiverId, audioUri);
                  hideModal();
                }}>
                <Ionicons name="close-outline" color="#8D020E" size={20} />
                <Text style={{color: '#8D020E', fontSize: 14}}>Cancel</Text>
              </Pressable>

              {
                <Pressable onPress={onStopRecord}>
                  {isRecording ? (
                    <Ionicons name="stop" color="#8D020E" size={24} />
                  ) : (
                    <Ionicons name="mic-outline" color="#8D020E" size={30} />
                  )}
                </Pressable>
              }
              <Pressable
                style={{
                  right: -70,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  backgroundColor: '#507156',
                  borderRadius: 20,
                  paddingTop: 6,
                  paddingBottom: 6,
                  paddingRight: 10,
                  paddingLeft: 10,
                }}
                onPress={() => {
                  console.log('send');
                  sendAudio(senderId, receiverId, audioUri);
                  hideModal();
                }}>
                <Ionicons name="checkmark-outline" color="#51bf65" size={20} />
                <Text style={{color: '#51bf65', fontSize: 14}}>Done</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackDrop: {
    flex: 1,
    backgroundColor: `rgba(0,0,0.60)`,
  },
  centeredView: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  modalView: {
    height: 110,
    backgroundColor: '#E3B7E5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default ModalComponent;
