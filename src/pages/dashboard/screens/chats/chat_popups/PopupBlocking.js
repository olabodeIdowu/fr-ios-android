import {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PopUpBlockModal from './PopupBlock';
import PopUpUnmatchModal from './PopupUnmatch';
import PopUpReportModal from './ReportUserPopup';

const PopupBlocking = ({
  navigation,
  showPopupBlockingModal,
  setShowPopupBlockingModal,
  currentChat,
}) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showPopupBlockModal, setShowPopupBlockModal] = useState(false);
  const [showPopupUnmatchModal, setShowPopupUnmatchModal] = useState(false);
  const [showPopupReportModal, setShowPopupReportModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function handle() {
      const storedAppUser = JSON.parse(await AsyncStorage.getItem('user'));
      if (!storedAppUser) {
        navigation.navigate('login');
      } else {
        //store in context
        setCurrentUser(storedAppUser);
      }
    }
    handle();
  }, []);

  async function unmatchUser() {
    try {
      const currUser = currentUser?.matches.filter(m => {
        return m?.id !== currentChat?.id;
      });

      const currChat = currentChat?.matches.filter(m => {
        return m?.id !== currentUser?.id;
      });

      // remember to access matches on current user
      const {data} = await axiosInstance.patch(
        `${url}/fr/api/v1/users/${currentUser?.id}`,
        {
          matches: currUser,
        },
      );

      // remember to access matches on current chat
      const {data2} = await axiosInstance.patch(
        `${url}/fr/api/v1/users/${currentChat?.id}`,
        {
          matches: currChat,
        },
      );

      console.log('data ', data?.data?.user);
      // update storage
      await AsyncStorage.setItem('user', JSON.stringify(data?.data?.user));

      // update context
      setAuth(auth => {
        return {
          ...auth,
          user: data?.data?.user,
        };
      });
      setShowPopupUnmatchModal(false);
      alert(data?.status);
    } catch (error) {
      console.log(
        error.response?.data?.error?.statusCode,
        error.response?.data?.message,
      );
    }
  }

  async function handleBlockUser() {
    try {
      const {data} = await axios.post(
        `${url}/fr/api/v1/users/${currentChat?.id}/users-block_user`,
        {
          isBlocked: true,
        },
      );
      console.log(data?.data?.blockedUser);
      setShowPopupBlockModal(false);
      alert(data?.status);
    } catch (error) {
      console.log(
        error.response?.data?.error?.statusCode,
        error.response?.data?.message,
      );
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showPopupBlockingModal}
      onRequestClose={() => setShowPopupBlockingModal(false)}
      presentationStyle="pageSheet">
      <TouchableOpacity
        style={styles.modalBackDrop}
        activeOpacity={1}
        onPress={() => setShowPopupBlockingModal(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                backgroundColor: '#fbf3f4',
                padding: 20,
              }}>
              <View
                style={{
                  backgroundColor: '#A8000E',
                  width: 100,
                  height: 5,
                  margin: 'auto',
                  borderRadius: 25,
                  marginVertical: 10,
                }}></View>
            </View>
            <Pressable
              style={{
                paddingBlock: 20,
                borderBottomWidth: 0.3,
                borderBottomColor: '#333',
              }}
              onPress={() => {
                // handleBlockUser();
                console.log('block user');
                setShowPopupBlockingModal();
              }}>
              <Text
                style={{
                  color: '#333333',
                  fontSize: 16,
                  textAlign: 'center',
                }}>
                Block User
              </Text>
            </Pressable>
            <Pressable
              style={{
                paddingBlock: 20,
                borderBottomWidth: 0.3,
                borderBottomColor: '#333',
              }}
              onPress={() => {
                // unmatchUser();
                console.log('unmatch user');
                setShowPopupBlockingModal();
              }}>
              <Text
                style={{color: '#333333', fontSize: 16, textAlign: 'center'}}>
                Unmatch
              </Text>
            </Pressable>
            <Pressable
              style={{
                paddingBlock: 20,
              }}
              onPress={() => {
                setShowPopupReportModal(() => true);
              }}>
              <Text
                style={{color: '#333333', fontSize: 16, textAlign: 'center'}}>
                Report User
              </Text>
            </Pressable>
            {/* 
            <Pressable
              onPress={() => {
                setShowPopupBlockingModal();
                showPopupBlockModal
                  ? setShowPopupBlockModal(true) && setShowPopupBlockingModal()
                  : showPopupReportModal
                  ? setShowPopupUnmatchModal(true)
                  : setShowPopupUnmatchModal(true);
                // setShowPopupBookedModal(true);
              }}
              style={{
                backgroundColor: '#A8000E',
                width: 100,
                margin: 'auto',
                borderRadius: 10,
                marginVertical: 10,
              }}>
              <Text
                style={{
                  justifyContent: 'center',
                  textAlign: 'center',
                  color: '#fff',
                  padding: 10,
                }}>
                Continue
              </Text>
            </Pressable> */}
          </View>
        </View>
      </TouchableOpacity>

      {showPopupBlockModal && (
        <PopUpBlockModal
          showPopupBlockModal={showPopupBlockModal}
          setShowPopupBlockModal={setShowPopupBlockModal}
          setShowPopupBlockingModal={setShowPopupBlockingModal}
          currentChat={currentChat}
        />
      )}
      {showPopupUnmatchModal && (
        <PopUpUnmatchModal
          showPopupUnmatchModal={showPopupUnmatchModal}
          setShowPopupUnmatchModal={setShowPopupUnmatchModal}
          setShowPopupBlockingModal={setShowPopupBlockingModal}
          currentChat={currentChat}
        />
      )}
      {showPopupReportModal && (
        <PopUpReportModal
          showPopupReportModal={showPopupReportModal}
          setShowPopupReportModal={setShowPopupReportModal}
          setShowPopupBlockingModal={setShowPopupBlockingModal}
          currentChat={currentChat}
        />
      )}
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
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default PopupBlocking;
