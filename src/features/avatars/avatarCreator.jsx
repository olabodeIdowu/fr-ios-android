import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Slider,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import * as SVG from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {captureRef} from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';

const AvatarCreator = () => {
  // Enhanced state
  const [hairStyle, setHairStyle] = useState('short');
  const [hairColor, setHairColor] = useState('brown');
  const [eyeColor, setEyeColor] = useState('blue');
  const [height, setHeight] = useState(170);
  const [skinTone, setSkinTone] = useState('light');
  const [bodyType, setBodyType] = useState('average');
  const [gender, setGender] = useState('male');
  const [facialHair, setFacialHair] = useState('none');
  const [clothing, setClothing] = useState('shirt');
  const [accessory, setAccessory] = useState('none');
  const avatarRef = useRef();

  // Extended options
  const options = {
    hairStyles: ['short', 'long', 'curly', 'bald', 'ponytail', 'mohawk'],
    hairColors: ['brown', 'black', 'blonde', 'red', 'gray', 'blue'],
    eyeColors: ['blue', 'brown', 'green', 'hazel', 'gray', 'violet'],
    skinTones: ['light', 'medium', 'tan', 'dark'],
    bodyTypes: ['slim', 'average', 'athletic', 'curvy', 'muscular'],
    genders: ['male', 'female', 'non-binary'],
    facialHairs: ['none', 'beard', 'mustache', 'goatee'],
    clothings: ['shirt', 'dress', 'jacket', 't-shirt', 'suit'],
    accessories: ['none', 'glasses', 'hat', 'necklace', 'earrings'],
  };

  // SVG-based Avatar Preview
  const AvatarPreview = () => (
    <View ref={avatarRef} collapsable={false} style={styles.avatarContainer}>
      <SVG.Svg width="200" height={height}>
        {/* Head */}
        <SVG.Circle
          cx="100"
          cy="50"
          r="40"
          fill={
            skinTone === 'light'
              ? '#f0d7b6'
              : skinTone === 'medium'
              ? '#d9b38c'
              : skinTone === 'tan'
              ? '#b89470'
              : '#8c552f'
          }
        />

        {/* Hair */}
        {hairStyle !== 'bald' && (
          <SVG.Path
            d={
              hairStyle === 'long'
                ? 'M60,20 Q100,0 140,20'
                : hairStyle === 'curly'
                ? 'M60,20 C80,0 120,0 140,20'
                : 'M70,30 Q100,10 130,30'
            }
            stroke={hairColor}
            strokeWidth="20"
            fill="none"
          />
        )}

        {/* Eyes */}
        <SVG.Circle cx="85" cy="45" r="5" fill={eyeColor} />
        <SVG.Circle cx="115" cy="45" r="5" fill={eyeColor} />

        {/* Facial Hair */}
        {facialHair !== 'none' && (
          <SVG.Path
            d={
              facialHair === 'beard'
                ? 'M80,60 Q100,80 120,60'
                : facialHair === 'mustache'
                ? 'M90,55 Q100,60 110,55'
                : 'M90,60 Q100,70 110,60'
            }
            stroke="#333"
            strokeWidth="5"
          />
        )}

        {/* Body */}
        <SVG.Rect
          x={bodyType === 'slim' ? 80 : 70}
          y="90"
          width={bodyType === 'slim' ? 40 : bodyType === 'muscular' ? 60 : 50}
          height={height - 90}
          fill={
            clothing === 'shirt'
              ? '#666'
              : clothing === 'dress'
              ? '#pink'
              : clothing === 'suit'
              ? '#333'
              : '#999'
          }
          rx="10"
        />

        {/* Accessory */}
        {accessory === 'glasses' && (
          <SVG.Circle
            cx="85"
            cy="45"
            r="10"
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
        )}
      </SVG.Svg>
    </View>
  );

  // Save to local storage
  const saveAvatarLocally = async uri => {
    try {
      const avatarData = {
        uri,
        config: {
          hairStyle,
          hairColor,
          eyeColor,
          height,
          skinTone,
          bodyType,
          gender,
          facialHair,
          clothing,
          accessory,
        },
      };
      await AsyncStorage.setItem('avatar', JSON.stringify(avatarData));
      Alert.alert('Success', 'Avatar saved locally!');
    } catch (error) {
      console.error('Error saving avatar:', error);
      Alert.alert('Error', 'Failed to save avatar');
    }
  };

  // Upload to backend
  const uploadToBackend = async uri => {
    try {
      const formData = new FormData();
      formData.append('avatar', {
        uri,
        type: 'image/png',
        name: 'avatar.png',
      });

      await axios.post('YOUR_BACKEND_API_ENDPOINT', formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      });
      Alert.alert('Success', 'Avatar uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Failed to upload avatar');
    }
  };

  // Capture and save avatar
  const captureAndSave = async () => {
    try {
      const uri = await captureRef(avatarRef, {
        format: 'png',
        quality: 1,
      });

      // Move to permanent storage
      const permanentUri = `${FileSystem.documentDirectory}avatar.png`;
      await FileSystem.moveAsync({
        from: uri,
        to: permanentUri,
      });

      await saveAvatarLocally(permanentUri);
      await uploadToBackend(permanentUri);
    } catch (error) {
      console.error('Capture error:', error);
      Alert.alert('Error', 'Failed to capture avatar');
    }
  };

  // Render picker component
  const renderPicker = (label, value, setValue, items) => (
    <>
      <Text style={styles.label}>{label}</Text>
      <Picker
        selectedValue={value}
        style={styles.picker}
        onValueChange={itemValue => setValue(itemValue)}>
        {items.map(item => (
          <Picker.Item key={item} label={item} value={item} />
        ))}
      </Picker>
    </>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create Your Avatar</Text>

      <AvatarPreview />

      <View style={styles.controls}>
        {renderPicker('Gender', gender, setGender, options.genders)}
        {renderPicker(
          'Hair Style',
          hairStyle,
          setHairStyle,
          options.hairStyles,
        )}
        {renderPicker(
          'Hair Color',
          hairColor,
          setHairColor,
          options.hairColors,
        )}
        {renderPicker('Eye Color', eyeColor, setEyeColor, options.eyeColors)}

        <Text style={styles.label}>Height: {height}cm</Text>
        <Slider
          style={styles.slider}
          minimumValue={140}
          maximumValue={200}
          step={1}
          value={height}
          onValueChange={value => setHeight(value)}
        />

        {renderPicker('Skin Tone', skinTone, setSkinTone, options.skinTones)}
        {renderPicker('Body Type', bodyType, setBodyType, options.bodyTypes)}
        {renderPicker(
          'Facial Hair',
          facialHair,
          setFacialHair,
          options.facialHairs,
        )}
        {renderPicker('Clothing', clothing, setClothing, options.clothings)}
        {renderPicker(
          'Accessory',
          accessory,
          setAccessory,
          options.accessories,
        )}

        <TouchableOpacity style={styles.saveButton} onPress={captureAndSave}>
          <Text style={styles.saveButtonText}>Save & Upload Avatar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#fff', // For better SVG visibility
  },
  head: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'relative',
  },
  hair: {
    width: 120,
    position: 'absolute',
    top: -20,
    left: -10,
  },
  eyeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
    position: 'absolute',
    top: 40,
    left: 20,
  },
  eye: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  body: {
    borderRadius: 20,
    marginTop: -20,
  },
  controls: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AvatarCreator;
