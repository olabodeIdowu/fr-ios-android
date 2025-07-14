import {useState, useContext} from 'react';
import {Pressable} from 'react-native';

import {
  Text,
  Modal,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {UserContext} from '../../context/UserProvider';

function WaitList({navigation}) {
  const {user} = useContext(UserContext);
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  function handleOnPressOk() {
    setShowEmail(false);
    navigation.navigate('PendingList');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>You are now on the waitlist</Text>
      <Text style={styles.subHeaderText}>
        Hey {user?.firstName}. Your information is being reviewed at the moment.
        When the verification process is complete, we’ll send you an email to
        let you know your status.
      </Text>

      <View style={{marginTop: 40}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setShowEmail(true);
          }}
          activeOpacity={0.7}>
          <Text style={styles.buttonText}>Send notification to my mail</Text>
        </TouchableOpacity>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}></View>
          <Text style={styles.orText}>or</Text>
          <View style={styles.progressBar}></View>
        </View>
        <TouchableOpacity
          style={styles.doNotButton}
          onPress={() => {
            setShowPhone(true);
          }}
          activeOpacity={0.7}>
          <Text style={styles.doNotButtonText}>
            Send notification to my number
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={showEmail}
        onRequestClose={() => setShowEmail(false)}
        animationType="fade"
        transparent={true}>
        <View style={styles.centered_view}>
          <View style={styles.email_modal}>
            <View style={styles.email_body}>
              <Image
                style={{marginLeft: 'auto', marginRight: 'auto'}}
                source={require('./../../../assets/email.png')}
              />
              <Text style={styles.email_text}>
                We’ll send a notification to your email ({user?.email}) when
                your account has been processed.
              </Text>
              <Pressable style={styles.email_button} onPress={handleOnPressOk}>
                <Text style={styles.email_buttonText}>ok</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={showPhone}
        onRequestClose={() => setShowPhone(false)}
        animationType="fade">
        <View style={styles.centered_view}>
          <View style={styles.phone_modal}>
            <View>
              <Text style={styles.phoneHeader}>
                “Dedott” Would Like to Send you Notifications
              </Text>
              <Text style={styles.phoneSubHeader}>
                Allowing access to your contacts helps the app find people you
                know. your contacts will be encrypted, securely stored, and
                never shared.
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 30,
              }}>
              <Pressable
                onPress={() => {
                  setShowPhone(false);
                  navigation.navigate('PendingList');
                }}>
                <Text style={{color: '#007AFF', fontSize: 18}}>
                  Don’t Allow
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setShowPhone(false);
                  navigation.navigate('PendingList');
                }}>
                <Text style={{color: '#007AFF', fontSize: 18}}>Allow</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default WaitList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: 10,
    paddingBottom: 10,
  },

  headerText: {
    textTransform: 'uppercase',
    color: '#ffffff',
    fontSize: 35,
    padding: 10,
  },

  subHeaderText: {
    color: '#ffffff',
    fontSize: 16,
    padding: 10,
    marginTop: 20,
  },

  timeDivider: {
    color: '#ffffff',
    fontSize: 16,
  },

  timeHeaderText: {
    color: '#F8B930',
    fontSize: 28,
  },
  timeHeaderLeft: {
    color: '#F8B930',
    fontSize: 45,
  },

  timeContainer: {
    flex: 0.1,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 15,
    // marginBottom: 30,
    // marginTop: 150,
  },

  timeContainerText: {
    fontSize: 12,
    color: '#ffffff',
    marginBottom: 20,
    marginTop: 150,
  },

  timeSubContainer: {
    alignItems: 'center',
    flexDirection: 'column',
  },

  orText: {
    fontSize: 16,
    color: '#ffffff',
  },

  progressBarContainer: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  progressBar: {
    width: '100%',
    height: 3,
    backgroundColor: '#e5e5e5',
    borderRadius: 16,
    border: '1px solid',
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#D9A525',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    margin: 10,
  },

  buttonText: {
    color: '#000000',
    fontSize: 20,
  },

  doNotButton: {
    marginTop: 20,
    alignItems: 'center',
    padding: 15,
    color: '#ffffff',
    borderRadius: 8,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ffffff',
    margin: 10,
  },

  doNotButtonText: {
    color: '#ffffff',
    fontSize: 20,
  },

  centered_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },

  email_modal: {
    width: 300,
    height: 300,
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
  },

  phone_modal: {
    width: 300,
    height: 250,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
    padding: 20,
  },

  email_body: {
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 20,
  },

  email_text: {
    fontSize: 18,
    textAlign: 'center',
    padding: 10,
    color: '#fff',
  },

  email_button: {
    alignItems: 'center',
    backgroundColor: '#D9A525',
    padding: 15,
    borderRadius: 8,
    margin: 10,
    marginTop: 20,
    marginBottom: 30,
  },

  email_buttonText: {
    textTransform: 'uppercase',
    fontSize: 16,
    color: '#000000',
  },

  phoneHeader: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
  },
  phoneSubHeader: {
    padding: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});
