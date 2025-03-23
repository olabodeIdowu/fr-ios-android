import {StyleSheet, Text, View, Pressable} from 'react-native';

export default function DeleteAccountBtn({setOpenDeleteAccModal}) {
  return (
    <Pressable
      style={{
        borderBottomWidth: 0.5,
        borderColor: '#cc8b0f',
        marginBottom: 10,
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginBottom: 70,
      }}
      onPress={() => setOpenDeleteAccModal(true)}>
      <View>
        <Text
          style={{
            fontWeight: '800',
            fontFamily: 'Avenir',
            fontSize: 15,
            color: '#000000',
            textAlign: 'center',
          }}>
          Delete Account
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
