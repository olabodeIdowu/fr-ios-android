import {StyleSheet, Text, View, Pressable} from 'react-native';

export default function LogoutAccountBtn({setShowLogoutModal}) {
  return (
    <Pressable
      style={{
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: '#cc8b0f',
        marginBottom: 10,
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginTop: 50,
      }}
      onPress={() => setShowLogoutModal(true)}>
      <View>
        <Text
          style={{
            fontWeight: '800',
            fontFamily: 'Avenir',
            fontSize: 15,
            color: '#000000',
            textAlign: 'center',
          }}>
          Logout
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
