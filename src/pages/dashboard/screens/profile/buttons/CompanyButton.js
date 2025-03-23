import {StyleSheet, Text, View, Pressable, TextInput} from 'react-native';

export default function CompanyButton({setOpenCompany}) {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.keyText}>Company</Text>
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
          onChangeText={setOpenCompany}
          // value={number}
          inputMode="text"
          placeholder="Add Company"
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
