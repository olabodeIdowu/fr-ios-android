import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import {useState, useContext} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {url} from '../../../../../hooks/useUrl';
import {AuthContext} from '../../../../../context/authContext';
import ImagePickerModal from '../../../../../ui/ImagePickerModal';

export default function MediaModal({user, setUser, openMedia, setOpenMedia}) {
  const {setAuth} = useContext(AuthContext);
  const [images, setImages] = useState(user?.images);
  const [visible, setVisible] = useState(false);

  console.log(user, user?.images, user?.images?.length);

  const onImageGalleryPress = () => {
    try {
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

          const {data} = await axios.post(
            `${url}/fr/api/v1/users/upload-images`,
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
            `${url}/fr/api/v1/users/upload-images`,
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
    <View style={styles.centered_view}>
      <Modal
        visible={openMedia}
        onRequestClose={() => setOpenMedia(false)}
        animationType="slide"
        presentationStyle="pageSheet"
        style={{flex: 1, backgroundColor: '#F7F7F7'}}>
        <View style={styles.plans_modal}>
          <View
            style={{
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              backgroundColor: '#fbf3f4',
              // paddingBottom: 20,
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 100,
                alignSelf: 'flex-end',
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Avenir',
                  fontWeight: '900',
                  color: '#000000',
                  fontSize: 14,
                }}>
                Add Media
              </Text>
              <TouchableOpacity
                onPress={() => setOpenMedia(false)}
                activeOpacity={0.7}>
                <Text
                  style={{
                    fontFamily: 'Avenir',
                    fontWeight: '900',
                    color: '#D9A525',
                    fontSize: 14,
                  }}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.primaryText}>Gallery</Text>
          <TouchableOpacity
            style={styles.addMedia}
            onPress={() => setVisible(true)}
            activeOpacity={0.7}>
            <Text style={styles.addMediaText}>Add Media</Text>
          </TouchableOpacity>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text
              style={{
                fontFamily: 'Avenir',
                padding: 10,
                textAlign: 'center',
                fontSize: 16,
                color: '#333333',
              }}>
              Add a Video, pic or Loop to get 4% closer to completing your
              profile and you may even get more Likes
            </Text>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                columnGap: 10,
                rowGap: 10,
                margin: 10,
              }}>
              {images &&
                images.length > 0 &&
                images.map((img, i) => {
                  console.log(img?.url);
                  return (
                    <View key={i} style={styles.imageBackground}>
                      <Image
                        source={{uri: img.url}}
                        style={{
                          width: 115,
                          height: 140,
                          // marginLeft: "auto",
                          // marginRight: "auto",
                          borderWidth: 0.2,
                          backgroundColor: '#D9D9D9',
                          borderRadius: 6,
                        }}
                      />
                      <MaterialCommunityIcons
                        onPress={() => handleDeleteImg(img?.public_id)}
                        style={styles.camera}
                        name={'delete'}
                        size={32}
                        color="#F8B930"
                      />
                    </View>
                  );
                })}
            </View>
          </ScrollView>
        </View>
      </Modal>

      <ImagePickerModal
        isVisible={visible}
        onClose={() => setVisible(false)}
        onImageLibraryPress={onImageGalleryPress}
        onCameraPress={onCameraPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  primaryText: {
    fontFamily: 'Avenir',
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
    padding: 10,
  },

  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Avenir',
    color: '#000',
  },

  centered_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },

  plans_modal: {
    height: '100%',
    backgroundColor: '#F7F7F7',
  },

  imageContainer: {
    position: 'relative',
  },

  imageBackground: {
    width: 115,
    height: 140,
    borderWidth: 0.2,
    backgroundColor: '#575a5e',
    borderRadius: 6,
  },

  camera: {
    position: 'absolute',
    bottom: -10,
    right: -10,
  },

  addMedia: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: '#A8000E',
    padding: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
  },

  addMediaText: {
    color: '#FFF',
    fontSize: 20,
  },

  textarea: {
    height: 80,
    width: '100%',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#C6C6C6',
    color: '#333333',
    backgroundColor: '#0a100d',
    marginBottom: 10,
    textAlignVertical: 'top',
    padding: 10,
  },
});
