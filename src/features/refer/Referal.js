import React, {useContext, useState, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UserContext} from '../../context/UserProvider';
// import * as Clipboard from "expo-clipboard";

const supportedURL = 'https://google.com';

const unsupportedURL = 'slack://open?team=123456';

const OpenURLButton = ({url, children}) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);
  return <Button title={children} onPress={handlePress} />;

  // return (
  //   <View style={styles.container}>
  //     <OpenURLButton url={supportedURL}>Open Supported URL</OpenURLButton>
  //     <OpenURLButton url={unsupportedURL}>Open Unsupported URL</OpenURLButton>
  //   </View>
  // );
};

function Referal({navigation}) {
  const {user} = useContext(UserContext);
  const [showCode, setShowCode] = useState(false);
  const [copiedText, setCopiedText] = useState('');

  const copyToClipboard = async text => {
    await Clipboard.setStringAsync(text);
    alert(text);
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };

  return (
    <View style={styles.container}>
      <Text
        style={styles.backText}
        onPress={() => {
          navigation.navigate('PendingList');
        }}>
        &larr;
      </Text>
      <Text style={styles.refer}>Refer a friend</Text>
      <Image
        style={styles.megaphone}
        source={require('./../../../assets/megaphone.png')}
      />

      <Text style={styles.inviteText}>
        Invite a friend get free access to DEDOTT for a month.
      </Text>
      <Text style={styles.referLink}>your referral code</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderWidth: 1,
          borderColor: '#ffffff',
          margin: 20,
          padding: 10,
        }}>
        {showCode ? (
          // <Text style={styles.hiddenText}>{user?.referal_code}</Text>
          <Text style={styles.hiddenText}>referal_code</Text>
        ) : (
          <Text style={styles.hiddenText}>xxxxxxxxxx</Text>
        )}

        {/* <TouchableOpacity
          onPress={() => setShowCode(true)}
          style={styles.copyButton}
        >
          <Text style={styles.copyText}>Copy</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.copyButton}
          onPress={() => {
            setShowCode(true);
            copyToClipboard('referal_code');
            // copyToClipboard(user?.referal_code);
          }}>
          <Text style={styles.copyText}>Copy</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 50,
          gap: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ReferAnotherFriend');
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 20,
          }}>
          <Icon name="address-book" size={24} color="#ffffff" />
          <Text style={{color: '#ffffff'}}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 20,
          }}>
          <Icon
            // onPress={() => setOpenDate(!openDate)}
            // style={{ backgroundColor:  }}
            name="whatsapp"
            size={24}
            color="#ffffff"
          />
          <Text style={{color: '#ffffff'}}>Whatsapp</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 20,
          }}>
          <Icon
            // onPress={() => setOpenDate(!openDate)}
            // style={{ backgroundColor:  }}
            name="facebook"
            size={24}
            color="#ffffff"
          />
          <Text style={{color: '#ffffff'}}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 20,
          }}>
          <Icon
            // onPress={() => setOpenDate(!openDate)}
            // style={{ backgroundColor:  }}
            name="instagram"
            size={24}
            color="#ffffff"
          />
          <Text style={{color: '#ffffff'}}>Instagram</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Referal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  megaphone: {
    width: 200,
    height: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 40,
    marginBottom: 50,
  },

  backText: {
    color: '#ffffff',
    fontSize: 36,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
  },

  refer: {
    color: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    padding: 20,
  },

  inviteText: {
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },

  referLink: {
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 20,
  },

  hiddenText: {
    color: '#ffffff',
    fontSize: 26,
  },

  copyText: {
    color: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    color: '#ffffff',
  },

  copyButton: {
    width: 80,
    alignItems: 'center',
    backgroundColor: '#D9A525',
    padding: 10,

    borderRadius: 8,
  },
});
