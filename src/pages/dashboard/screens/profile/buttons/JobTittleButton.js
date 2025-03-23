import {StyleSheet, Text, View, Pressable, TextInput} from 'react-native';

export default function JobTittleButton({setOpenJob}) {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <Text style={styles.keyText}>Job Tittle</Text>
        <Text
          style={{
            fontFamily: 'Avenir',
            padding: 10,
            fontSize: 18,
            color: '#A8000E',
          }}>
          +3%
        </Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setOpenJob}
          // value={number}
          inputMode="text"
          placeholder="Add Job Title"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontFamily: 'Avenir',
    borderColor: '#C6C6C6',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    padding: 15,
    marginBottom: 15,
    color: '#333333',
    fontSize: 14,
  },
});
