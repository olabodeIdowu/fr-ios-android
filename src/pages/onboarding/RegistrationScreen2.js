import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../context/authContext';
import {url} from '../../hooks/useUrl';
import {useContext, useEffect, useState} from 'react';


export default function RegistrationScreen2({navigation, route: {params}}) {
  const {setAuth} = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [image, setImage] = useState('');
  const [uploadImage, setUploadImage] = useState(null);
  const [visible, setVisible] = useState(false);

  // console.log(params.userForm);
  const userForm = {
    ...params.userForm,
    photo: uploadImage,
  };

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
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  async function handleDeleteImg(id) {
    try {
      const {data} = await axios.patch(
        `${url}/fr/api/v1/users/delete-image/${id}`,
        {
          user: user,
        },
      );
      console.log('DELETED RESPONSE => ', data, data?.user);

      // update storage
      await AsyncStorage.setItem('user', JSON.stringify(data?.user));

      // update context
      setAuth(auth => {
        return {
          ...auth,
          user: data?.user,
        };
      });
      alert(' image deleted successfuly');
      console.log('images left ', user?.images, user?.images?.length);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}></View>
        <View style={styles.progressBar2}></View>
        <View style={styles.progressBar3}></View>
        <View style={styles.progressBar4}></View>
        <View style={styles.progressBar5}></View>
        <View style={styles.progressBar6}></View>
      </View>
      <Text
        style={{
          color: '#000',
          fontFamily: 'Avenir',
          fontSize: 18,
          fontWeight: '700',
          padding: 20,
        }}>
        Add your first photo
      </Text>
      <Text
        style={{
          color: '#333',
          fontFamily: 'Avenir',
          fontSize: 14,
          textAlign: 'center',
          padding: 20,
        }}>
        Choose a photo of just you where you can clearly see your face. You can
        change this later
      </Text>
      <View
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 20,
          marginBottom: 20,
        }}>
        <View style={styles.imageBackground}>
          {uploadImage ? (
            <Image
              source={{uri: uploadImage}}
              style={{
                width: 115,
                height: 140,
                marginLeft: 'auto',
                marginRight: 'auto',
                borderWidth: 0.2,
                backgroundColor: '#D9D9D9',
                borderRadius: 6,
              }}
            />
          ) : (
            <View
              style={{
                width: 115,
                height: 140,
                marginLeft: 'auto',
                marginRight: 'auto',
                borderWidth: 0.5,
                borderColor: '#8D020E',
                backgroundColor: '#D9D9D9',
                borderRadius: 6,
              }}></View>
          )}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '90%',
          alignItems: 'center',
          backgroundColor: '#8D020E',
          padding: 15,
          marginLeft: 'auto',
          marginRight: 'auto',
          borderRadius: 8,
          marginBlock: 20,
        }}>
        <Text style={{color: '#FFFFFF', fontFamily: 'Avenir', fontSize: 18}}>
          Choose a photo
        </Text>
        <Pressable onPress={onImageGalleryPress}>
          <Ionicons name="add-outline" size={24} color="#FFFFFF" />
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '90%',
          alignItems: 'center',
          backgroundColor: '#8D020E',
          padding: 15,
          marginLeft: 'auto',
          marginRight: 'auto',
          borderRadius: 8,
        }}>
        <Text style={{color: '#FFFFFF', fontFamily: 'Avenir', fontSize: 18}}>
          Take a photo
        </Text>
        <Pressable onPress={onCameraPress}>
          <Ionicons name="camera-outline" size={24} color="#FFFFFF" />
        </Pressable>
      </View>

      <View style={{width: 100, padding: 20, alignSelf: 'flex-end'}}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('Registration-3', {userForm: userForm});
          }}>
          <Text style={styles.backText}>&rarr;</Text>
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor: '#FFFFFF', padding: 20, borderRadius: 8}}>
        <Text
          style={{
            color: '#333',
            fontFamily: 'Avenir',
            fontSize: 14,
          }}>
          Not sure what to upload ?
        </Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text
            style={{
              color: '#333',
              fontFamily: 'Avenir',
              fontWeight: '700',
              fontSize: 14,
              textDecorationLine: 'underline',
            }}>
            Check out our guidelines
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  welcomeImage: {
    marginBottom: 30,
    width: 300,
    height: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  imageTextContainer: {
    marginTop: 10,
    justifyContent: 'center',
    flexDirection: 'column',
  },

  progressBarContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    padding: 10,
  },

  progressBar: {
    width: 50,
    height: 5,
    backgroundColor: '#e5e5e5',
    borderRadius: 16,
    border: '1px solid',
  },

  progressBar2: {
    width: 50,
    height: 5,
    backgroundColor: '#e5e5e5',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar3: {
    width: 50,
    height: 5,
    backgroundColor: '#e5e5e5',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar4: {
    width: 50,
    height: 5,
    backgroundColor: '#e5e5e5',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar5: {
    width: 50,
    height: 5,
    backgroundColor: '#e5e5e5',
    borderRadius: 16,
    border: '1px solid',
  },
  progressBar6: {
    width: 50,
    height: 5,
    backgroundColor: '#e5e5e5',
    borderRadius: 16,
    border: '1px solid',
  },

  backText: {
    fontSize: 36,
    color: '#000000',
    fontFamily: 'Avenir',
  },

  button: {
    width: '90%',
    alignItems: 'center',
    backgroundColor: '#8D020E',
    padding: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: 'Avenir',
    fontWeight: '700',
    fontSize: 16,
    color: '#FFFFFF',
  },
});
