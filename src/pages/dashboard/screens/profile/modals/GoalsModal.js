import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
} from 'react-native';
import {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import goals from '../../../../../dev_data/languages/languages';

export default function GoalsModal({openGoals, setOpenGoals}) {
  const [active, setActive] = useState(null);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openGoals}
      onRequestClose={() => setOpenGoals(false)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              backgroundColor: '#fbf3f4',
              paddingBottom: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 100,
                alignSelf: 'flex-end',
                paddingVertical: 10,
                paddingHorizontal: 10,
                marginTop: 5,
              }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setOpenGoals(false)}>
                <Text
                  style={{
                    fontFamily: 'Avenir',
                    fontWeight: '900',
                    color: '#D9A525',
                    fontSize: 16,
                  }}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.headerText}>Right now I' am looking for...</Text>
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
            <TouchableOpacity
              onPress={() => setActive('long-term')}
              style={
                active === 'long-term'
                  ? styles.goalsActive
                  : styles.goalsInActive
              }>
              <MaterialCommunityIcons
                name="emoticon-kiss-outline"
                size={24}
                color="#D0A159"
              />
              <Text style={styles.goalsInnerText}>Long-term partner</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActive('long-term-short')}
              style={
                active === 'long-term-short'
                  ? styles.goalsActive
                  : styles.goalsInActive
              }>
              <MaterialCommunityIcons
                name="emoticon-happy-outline"
                size={24}
                color="#D0A159"
              />
              <Text style={styles.goalsInnerText}>
                Long-term, open to short
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActive('short-term-long')}
              style={
                active === 'short-term-long'
                  ? styles.goalsActive
                  : styles.goalsInActive
              }>
              <MaterialCommunityIcons
                name="glass-wine"
                size={24}
                color="#D0A159"
              />
              <Text style={styles.goalsInnerText}>
                Short-term, open to long
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActive('short-term-fun')}
              style={
                active === 'short-term-fun'
                  ? styles.goalsActive
                  : styles.goalsInActive
              }>
              <MaterialCommunityIcons
                name="emoticon-tongue-outline"
                size={24}
                color="#D0A159"
              />
              <Text style={styles.goalsInnerText}>Short-term fun</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActive('new-friends')}
              style={
                active === 'new-friends'
                  ? styles.goalsActive
                  : styles.goalsInActive
              }>
              <MaterialCommunityIcons
                name="hand-okay"
                size={24}
                color="#D0A159"
              />
              <Text style={styles.goalsInnerText}>New friends</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActive('still-figuring')}
              style={
                active === 'still-figuring'
                  ? styles.goalsActive
                  : styles.goalsInActive
              }>
              <MaterialCommunityIcons
                name="emoticon-neutral-outline"
                size={24}
                color="#D0A159"
              />
              <Text style={styles.goalsInnerText}>Still figuring it out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    marginTop: '70%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  modalView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  headerFlexText: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },

  headerText: {
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333333',
    padding: 10,
    marginBottom: 10,
  },

  primaryText: {
    fontSize: 16,
    color: '#f5f5f5',
  },

  previewText: {
    fontSize: 20,
    color: '#9999',
    fontWeight: 'bold',
  },

  closeModalText: {
    fontSize: 20,
    color: '#59656f',
    fontWeight: 'bold',
  },

  goalsActive: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    // width: 100,
    // height: 100,
    gap: 10,

    borderWidth: 0.5,
    // borderColor: '#D0A159',
    padding: 6,
    borderRadius: 5,
    // backgroundColor: '#000000',
  },

  goalsInActive: {
    width: 'fit-content',
    // width: 100,
    // height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,

    borderWidth: 0.5,
    borderColor: '#D9D9D9',
    padding: 6,
    borderRadius: 5,
    // backgroundColor: '#000000',
  },

  goalsInnerText: {
    fontFamily: 'Avenir',
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
  },
});
