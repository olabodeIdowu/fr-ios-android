import {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MyPlans from './../../../../features/subscription/MyPlans';
import EditProfileModal from './modals/EditProfileModal';
import SettingsModal from './modals/SettingsModal';
import MediaModal from './modals/MediaModal';
import {url} from '../../../../hooks/useUrl';
import {AuthContext} from '../../../../context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({navigation}) {
  const {setAuth} = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [image, setImage] = useState(user?.photo?.url);
  const [uploadImage, setUploadImage] = useState(null);
  const [showPlans, setShowPlans] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openMedia, setOpenMedia] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function handle() {
      const storedAppUser = JSON.parse(await AsyncStorage.getItem('user'));

      if (!storedAppUser) {
        navigation.navigate('Login');
      } else {
        //store in context
        setUser(storedAppUser);
      }
    }
    handle();
  }, []);

  const onImageGalleryPress = () => {
    try {
      setVisible(false);
      const options = {
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: true,
      };

      ImagePicker.launchImageLibrary(options, async res => {
        if (res.didCancel) {
          console.log('User cancelled');
        } else if (res.errorCode) {
          console.log('ImagePickerError: ', res.errorMessage);
        } else {
          let base64Image = `data:image/jpg;base64,${res.assets[0].base64}`;
          console.log(base64Image, res.assets[0].base64);

          setUploadImage(base64Image);

          console.log('user ', user);
          const {data} = await axios.post(
            `${url}/dedott/api/v1/users/upload-images`,
            {
              image: base64Image,
              user: user,
            },
          );
          console.log('UPLOADED RESPONSE => ', data, data?.user);

          // update storage
          await AsyncStorage.setItem('user', JSON.stringify(data?.user));

          // update context
          setAuth(auth => {
            return {
              ...auth,
              user: data?.user,
            };
          });

          setImage(data?.user?.photo);
          alert('Profile image saved');
          console.log('image: ', image?.url);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onCameraPress = () => {
    try {
      setVisible(false);

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

          const {data} = await axios.post(
            `${url}/dedott/api/v1/users/upload-images`,
            {
              image: base64Image,
              user: user,
            },
          );
          console.log('UPLOADED RESPONSE => ', data, data?.user);

          // update storage
          await AsyncStorage.setItem('user', JSON.stringify(data?.user));

          // update context
          setAuth(auth => {
            return {
              ...auth,
              user: data?.user,
            };
          });

          setImage(data?.user?.photo);
          alert('Profile image saved');
          console.log('image: ', image?.url);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileProgressBar}>
        {image && image.url ? (
          <Image style={styles.profilePhoto} source={{uri: image.url}} />
        ) : uploadImage ? (
          <Image style={styles.profilePhoto} source={{uri: uploadImage}} />
        ) : (
          <Image style={styles.profilePhoto} source={{uri: user?.photo?.url}} />
        )}
      </View>
      <Text style={styles.progressBarText}>25% complete</Text>

      <View style={styles.profileHeader}>
        <Text style={styles.name}>
          {user?.firstName},{' '}
          <Text style={styles.age}>
            {new Date().getFullYear() -
              Number(user?.date_of_birth?.split('-')[0])}
          </Text>
        </Text>
        <MaterialCommunityIcons
          name="check-decagram"
          size={18}
          color="#000000"
        />
      </View>
      <View style={styles.profileIconHeader}>
        <View style={{flexDirection: 'column', gap: 10, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => setOpenSettings(true)}
            style={styles.iconBorder}>
            <MaterialCommunityIcons
              name="cog-outline"
              size={36}
              color="#6C6C6C"
            />
          </TouchableOpacity>
          <Text style={{color: '#6C6C6C'}}>Settings</Text>
        </View>
        <View style={{flexDirection: 'column', gap: 10, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => setOpenEdit(true)}
            style={styles.iconBorder}>
            <MaterialCommunityIcons
              name="pencil-outline"
              size={36}
              color="#6C6C6C"
            />
          </TouchableOpacity>
          <Text style={{color: '#6C6C6C'}}>Edit Profile</Text>
        </View>
        <View style={{flexDirection: 'column', gap: 10, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => setOpenMedia(true)}
            style={styles.iconBorder}>
            <MaterialCommunityIcons
              name="camera-plus"
              size={36}
              color="#6C6C6C"
            />
          </TouchableOpacity>
          <Text style={{color: '#6C6C6C'}}>Add Media</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setShowPlans(true);
        }}
        activeOpacity={0.7}>
        <Text style={styles.buttonText}>See all plans</Text>
      </TouchableOpacity>
      {showPlans && (
        <MyPlans showPlans={showPlans} setShowPlans={setShowPlans} />
      )}
      {openEdit && (
        <EditProfileModal
          user={user}
          setUser={setUser}
          image={image}
          setImage={setImage}
          uploadImage={uploadImage}
          setUploadImage={setUploadImage}
          visible={visible}
          setVisible={setVisible}
          onImageLibraryPress={onImageGalleryPress}
          onCameraPress={onCameraPress}
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
        />
      )}
      {openSettings && (
        <SettingsModal
          openSettings={openSettings}
          setOpenSettings={setOpenSettings}
        />
      )}
      {openMedia && (
        <MediaModal
          user={user}
          setUser={setUser}
          openMedia={openMedia}
          setOpenMedia={setOpenMedia}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },

  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },

  name: {
    color: '#000000',
    fontFamily: 'Avenir',
    fontSize: 28,
  },

  age: {
    color: '#000000',
    fontFamily: 'Avenir',
    fontSize: 32,
  },

  profileProgressBar: {
    width: 170,
    height: 170,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    borderWidth: 5,
    borderColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },

  progressBarText: {
    fontFamily: 'Avenir',
    color: '#D9A525',
    textAlign: 'center',
    fontSize: 18,
    padding: 10,
  },

  iconBorder: {
    width: 60,
    height: 60,
    borderWidth: 0.5,
    borderColor: '#6C6C6C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },

  profileIconHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 40,
  },
  button: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: '#A8000E',
    padding: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#222',
    borderRadius: 8,
    marginTop: 60,
  },

  buttonText: {
    fontFamily: 'Avenir',
    textTransform: 'uppercase',
    color: '#FFFFFF',
    fontWeight: '400',
    fontFamily: 'Avenir',
    fontSize: 14,
  },
});
