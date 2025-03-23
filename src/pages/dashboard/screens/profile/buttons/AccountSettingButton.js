import {StyleSheet, Text, View, Pressable} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AccountSettingButton({
  setOpenPayment,
  setRestorePayment,
  setOpenEmail,
  setOpenPhone,
  setOpenConnectedAcc,
}) {
  return (
    <View style={{paddingBottom: 15}}>
      <Text
        style={{
          fontFamily: 'Avenir',
          fontWeight: '800',
          padding: 10,
          marginTop: 10,
          fontSize: 16,
          color: '#000000',
        }}>
        Account Settings
      </Text>
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderColor: 'grey',
          borderTopWidth: 0.2,
          padding: 15,
          backgroundColor: '#FFFFFF',
        }}
        onPress={() => setOpenPayment(true)}>
        <Text
          style={{
            color: '#000000',
            fontFamily: 'Avenir',
            fontSize: 14,
            fontWeight: 500,
          }}>
          Manage Payment Account
        </Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color="#888" />
      </Pressable>
      <Pressable
        style={{
          borderColor: 'grey',
          borderTopWidth: 0.2,
          padding: 15,
        }}
        onPress={() => setRestorePayment(true)}>
        <Text
          style={{
            color: '#000000',
            fontSize: 14,
            fontFamily: 'Avenir',
            fontWeight: 500,
          }}>
          Restore Purchases
        </Text>
      </Pressable>
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderColor: 'grey',
          borderTopWidth: 0.2,
          padding: 15,
        }}
        onPress={() => setOpenEmail(true)}>
        <Text style={styles.keyText}>Email</Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
          }}>
          <Text style={styles.valueText}>admin@example.com</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#888" />
        </View>
      </Pressable>
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderColor: 'grey',
          borderTopWidth: 0.2,
          padding: 15,
        }}
        onPress={() => setOpenPhone(true)}>
        <Text style={styles.keyText}>Phone Number</Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
          }}>
          <Text style={styles.valueText}>2348165624000</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#888" />
        </View>
      </Pressable>
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderColor: 'grey',
          borderTopWidth: 0.2,
          padding: 15,
        }}
        onPress={() => setOpenConnectedAcc(true)}>
        <Text style={styles.keyText}>Connected Accounts</Text>

        <MaterialCommunityIcons name="chevron-right" size={24} color="#888" />
      </Pressable>
      <Pressable
        style={{
          borderColor: 'grey',
          borderTopWidth: 0.2,
          padding: 15,
        }}
        onPress={() => setRestorePayment(true)}>
        <Text style={styles.keyText}>Promo Code</Text>
      </Pressable>
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
});
