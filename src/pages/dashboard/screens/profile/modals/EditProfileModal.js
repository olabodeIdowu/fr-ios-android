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
  Alert,
} from 'react-native';
import {useState, useContext, useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import PassionModal from './PassionModal';
import PassionButton from '../buttons/PassionButton';
import HeightButton from '../buttons/HeightButton';
import GoalsButton from '../buttons/GoalsButton';
import LanguagesButton from '../buttons/LanguagesButton';
import BasicsButton from '../buttons/BasicsButton';
import LifestyleButton from '../buttons/LifestyleButton';
import JobTittleButton from '../buttons/JobTittleButton';
import CompanyButton from '../buttons/CompanyButton';
import SchoolButton from '../buttons/SchoolButton';
import LivingInButton from '../buttons/LivingInButton';
import GenderButton from '../buttons/GenderButton';
import ShowInstagramButton from '../buttons/ShowInstagramButton';
import SpotifyButton from '../buttons/SpotifyButton';
import ControlProfileButton from '../buttons/ControlProfileButton';
import HeightModal from './HeightModal';
import GoalsModal from './GoalsModal';
import LanguagesModal from './LanguagesModal';
import BasicModal from './BasicModal';
import LifestyleModal from './LifestyleModal';
import SchoolModal from './SchoolModal';
import CityModal from './CityModal';
import GenderModal from './GenderModal';
import ImagePickerModal from '../../../../../ui/ImagePickerModal';

export default function EditProfileModal({
  user,
  openEdit,
  setOpenEdit,
  image,
  uploadImage,
  visible,
  setVisible,
  onImageLibraryPress,
  onCameraPress,
}) {
  const [editPrev, setEditPrev] = useState('edit');
  const [openPassion, setOpenPassion] = useState(false);
  const [openHeight, setOpenHeight] = useState(false);
  const [openGoals, setOpenGoals] = useState(false);
  const [openBasics, setOpenBasics] = useState(false);
  const [openLanguages, setOpenLanguages] = useState(false);
  const [openLifestyle, setOpenLifestyle] = useState(false);
  const [openJob, setOpenJob] = useState('');
  const [openCompany, setOpenCompany] = useState('');
  const [openSchool, setOpenSchool] = useState(false);
  const [openLivingIn, setOpenLivingIn] = useState(false);
  const [openInstagram, setOpenInstagram] = useState(false);
  const [openSpotify, setOpenSpotify] = useState(false);
  const [openControlProfile, setOpenControlProfile] = useState(false);
  const [openGender, setOpenGender] = useState(false);
  const [profile, onChangeProfile] = useState('');

  console.log(user, user?.images, user?.images?.length);

  function handleJobTittle() {
    setOpenJob(() => openJob);
  }

  function handleCompany() {
    setOpenJob(() => openCompany);
  }

  return (
    <View style={styles.centered_view}>
      <Modal
        visible={openEdit}
        onRequestClose={() => setOpenEdit(false)}
        animationType="slide"
        presentationStyle="pageSheet"
        style={{flex: 1, backgroundColor: '#F7F7F7'}}>
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
              Edit Info
            </Text>
            <TouchableOpacity
              onPress={() => setOpenEdit(false)}
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
        <View style={styles.editPreview}>
          <Pressable onPress={() => setEditPrev('edit')}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Avenir',
                color: editPrev === 'preview' ? '#A8000E' : '#000000',
                fontWeight: 'bold',
              }}>
              Edit
            </Text>
          </Pressable>
          <View
            style={{
              borderColor: '#333',
              borderRightWidth: 0.5,
              height: 30,
            }}></View>
          <Pressable onPress={() => setEditPrev('preview')}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Avenir',
                color: editPrev === 'preview' ? '#A8000E' : '#000000',
                fontWeight: 'bold',
              }}>
              Preview
            </Text>
          </Pressable>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 20,
              marginBottom: 20,
            }}>
            <View style={styles.imageBackground}>
              {image && image.url ? (
                <Image
                  source={{uri: image.url}}
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
              ) : uploadImage ? (
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
                <Image
                  source={{uri: user?.photo?.url}}
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
              )}
            </View>
            <MaterialCommunityIcons
              onPress={() => setVisible(true)}
              style={styles.camera}
              name={image && image.url ? 'pencil-outline' : 'camera'}
              size={32}
              color="#A8000E"
            />
          </View>

          <View>
            <Text
              style={{
                fontFamily: 'Avenir',
                padding: 10,
                marginBottom: 10,
                color: '#333333',
                fontSize: 18,
                fontWeight: '800',
              }}>
              About {user?.firstName}
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              onChangeText={onChangeProfile}
              value={profile}
              style={styles.textarea}
            />
            <Text
              style={{
                fontWeight: '400',
                fontFamily: 'Avenir',
                padding: 10,
                marginBottom: 10,
                fontSize: 14,
                color: '#333333',
              }}>
              Do not include social media handles or other contact information
              in your profile
            </Text>
          </View>
          <PassionButton setOpenPassion={setOpenPassion} />
          <HeightButton setOpenHeight={setOpenHeight} />
          <GoalsButton setOpenGoals={setOpenGoals} />
          <LanguagesButton setOpenLanguages={setOpenLanguages} />
          <BasicsButton setOpenBasics={setOpenBasics} />
          <LifestyleButton setOpenLifestyle={setOpenLifestyle} />
          <JobTittleButton setOpenJob={handleJobTittle} />
          <CompanyButton setOpenCompany={handleCompany} />
          <SchoolButton setOpenSchool={setOpenSchool} />
          <LivingInButton setOpenLivingIn={setOpenLivingIn} />
          <ShowInstagramButton setOpenInstagram={setOpenInstagram} />
          <SpotifyButton setOpenSpotify={setOpenSpotify} />
          <ControlProfileButton setOpenControlProfile={setOpenControlProfile} />
          <GenderButton setOpenGender={setOpenGender} />

          <PassionModal
            openPassion={openPassion}
            setOpenPassion={setOpenPassion}
          />
          <HeightModal openHeight={openHeight} setOpenHeight={setOpenHeight} />
          <GoalsModal openGoals={openGoals} setOpenGoals={setOpenGoals} />
          <LanguagesModal
            openLanguages={openLanguages}
            setOpenLanguages={setOpenLanguages}
          />
          <BasicModal openBasics={openBasics} setOpenBasics={setOpenBasics} />
          <LifestyleModal
            openLifestyle={openLifestyle}
            setOpenLifestyle={setOpenLifestyle}
          />
          <SchoolModal openSchool={openSchool} setOpenSchool={setOpenSchool} />
          <CityModal
            openLivingIn={openLivingIn}
            setOpenLivingIn={setOpenLivingIn}
          />
          <GenderModal openGender={openGender} setOpenGender={setOpenGender} />
          <ImagePickerModal
            isVisible={visible}
            onClose={() => setVisible(false)}
            onImageLibraryPress={onImageLibraryPress}
            onCameraPress={onCameraPress}
          />
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  editPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    borderBottomWidth: 0.2,
    borderColor: 'gray',
    backgroundColor: '#FFFFFF',
  },

  editText: {
    fontSize: 16,
    fontFamily: 'Avenir',
    color: '#000000',
    fontWeight: 'bold',
  },

  previewText: {
    fontSize: 16,
    fontFamily: 'Avenir',
    color: '#000000',
    fontWeight: 'bold',
  },

  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#ffffff',
  },

  closeModalText: {
    fontSize: 20,
    color: '#D9A525',
  },

  centered_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
  },

  imageContainer: {
    position: 'relative',
  },

  imageBackground: {
    width: 115,
    height: 140,
    borderWidth: 0.2,
    backgroundColor: '#F7F7F7',
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
    backgroundColor: '#F8B930',
    padding: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#222',
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
  },

  addMediaText: {
    color: '#222',
    fontSize: 20,
  },

  textarea: {
    height: 80,
    width: '100%',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#C6C6C6',
    color: '#333',
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    textAlignVertical: 'top',
    padding: 10,
  },

  keyText: {
    fontWeight: '400',
    fontFamily: 'Avenir',
    fontSize: 14,
    color: '#333333',
  },
  valueText: {
    fontWeight: '800',
    fontFamily: 'Avenir',
    fontSize: 15,
    color: '#000000',
  },
});
