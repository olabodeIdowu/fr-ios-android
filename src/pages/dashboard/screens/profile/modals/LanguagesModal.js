import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
} from 'react-native';
import {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import languages from '../../../../../dev_data/languages/languages';

export default function LanguagesModal({openLanguages, setOpenLanguages}) {
  const [picked, setPicked] = useState(languages);
  const [searchItem, setSearchItem] = useState('');
  const [filteredLanguageLists, setFilteredLanguageLists] = useState(picked);

  function handleInputChange(text) {
    // console.log("text ", text);
    setSearchItem(text);
    const filteredItems = languages.filter(l => {
      // console.log(l);
      return l?.name?.toLowerCase().includes(text.toLowerCase());
    });
    setFilteredLanguageLists(filteredItems);
  }

  function handlePicked(id) {
    setPicked(prev => {
      return prev.map((goal, index) => {
        return {
          ...goal,
          active: index === id ? !goal.active : goal.active,
        };
      });
    });
  }
  function submitLanguages() {
    //handle language submission
    setOpenLanguages(false);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openLanguages}
      onRequestClose={() => setOpenLanguages(false)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              backgroundColor: '#fbf3f4',
              // paddingBottom: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 100,
                alignSelf: 'flex-end',
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}>
              <TouchableOpacity onPress={() => setOpenLanguages(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#888" />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 10,
              marginTop: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Avenir',

                fontSize: 16,
                fontWeight: '800',
                color: '#000000',
              }}>
              Languages I know
            </Text>
            <Text style={styles.primaryText}>1 / 5</Text>
          </View>

          <Text
            style={{
              fontWeight: '800',
              fontFamily: 'Avenir',
              fontSize: 15,
              color: '#333',
              padding: 10,
            }}>
            Select up to 5 languages you know and add them to your phone
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Search languages"
            inlineImageLeft="search_icon"
            inputMode="search"
            value={searchItem}
            onChangeText={text => handleInputChange(text)}
          />

          <ScrollView
            style={{
              borderColor: '#888',
              borderTopWidth: 0.5,
            }}
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                columnGap: 10,
                rowGap: 10,
                margin: 10,
                paddingTop: 10,
                paddingBottom: 20,
              }}>
              {picked &&
                picked.length > 0 &&
                filteredLanguageLists.map((l, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handlePicked(index)}
                      style={
                        l?.active
                          ? styles.languageActive
                          : styles.languageInActive
                      }>
                      <Text style={styles.languageInnerText}>{l?.name}</Text>
                    </TouchableOpacity>
                  );
                })}
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={submitLanguages}
              activeOpacity={0.4}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    marginTop: '50%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  modalView: {
    // marginBottom: 220,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  input: {
    borderWidth: 0.2,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 6,
    color: '#222',
    fontSize: 14,
    margin: 10,
  },

  languageActive: {
    backgroundColor: '#f77581',
    padding: 10,
    color: '#FFFFFF',
    padding: 6,
    borderRadius: 5,
  },

  languageInActive: {
    borderColor: '#6C6C6C',
    borderWidth: 0.5,
    padding: 10,
    padding: 6,
    borderRadius: 5,
  },

  languageInnerText: {
    fontFamily: 'Avenir',
    fontSize: 14,
    fontFamily: 'Avenir',
    textAlign: 'center',
    color: '#333333',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#A8000E',
    padding: 15,
    borderRadius: 8,
    margin: 10,
    marginTop: 20,
    marginBottom: '100%',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
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
