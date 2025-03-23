import {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PaymentModal({openPayment, setOpenPayment}) {
  const [openCard, setOpenCard] = useState(false);
  const [number, onChangeNumber] = useState('');
  return (
    <View>
      <Modal
        animationType="slide"
        visible={openPayment}
        onRequestClose={() => setOpenPayment(false)}
        presentationStyle="pageSheet">
        <View style={styles.centeredView}>
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
                alignSelf: 'flex-start',
                paddingVertical: 10,
                paddingHorizontal: 10,
                marginTop: 5,
              }}>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  onPress={() => setOpenPayment(false)}
                  name="chevron-left"
                  size={24}
                  color="#888"
                />
              </TouchableOpacity>

              <Text
                style={{
                  fontFamily: 'Avenir',
                  fontWeight: '900',
                  color: '#000000',
                  fontSize: 16,
                }}>
                Account
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: 16,
              color: '#333333',
              padding: 10,
              fontFamily: 'Avenir',
              fontWeight: '900',
              marginTop: 15,
            }}>
            Available Payment Methods
          </Text>
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#F7F7F7',
              borderTopWidth: 0.5,
              borderBottomWidth: 0.5,
              borderColor: '#cc8b0f',
              paddingVertical: 10,
              paddingHorizontal: 10,
              backgroundColor: '#F7F7F7',
            }}
            onPress={() => setOpenCard(true)}>
            <MaterialCommunityIcons
              name="credit-card-outline"
              size={42}
              color="#888"
            />
            <Text
              style={{
                fontSize: 14,
                color: '#333333',
                padding: 15,
                fontFamily: 'Avenir',
                fontWeight: '900',
              }}>
              Add Credit or Debit Card
            </Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#888"
            />
          </Pressable>

          <Text
            style={{
              fontFamily: 'Avenir',
              fontWeight: '800',
              padding: 10,
              fontSize: 16,
              color: '#000000',
              marginTop: 15,
            }}>
            Contact Us
          </Text>
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTopWidth: 0.5,
              borderBottomWidth: 0.5,
              borderColor: '#cc8b0f',
              marginBottom: 10,
              paddingVertical: 15,
              paddingHorizontal: 15,
              backgroundColor: '#F7F7F7',
            }}
            // onPress={() => setOpenLivingIn(false)}
          >
            <Text style={styles.keyText}>Help</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#888"
            />
          </Pressable>
          <Text
            style={{
              fontFamily: 'Avenir',
              fontSize: 14,
              color: '#333333',
              padding: 10,
            }}>
            Get answers to any of your questions about your purchases or
            payments
          </Text>
        </View>
        <Modal
          animationType="fade"
          visible={openCard}
          onRequestClose={() => setOpenCard(false)}
          presentationStyle="pageSheet">
          <View style={styles.cardModalView}>
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
                <Text
                  style={{
                    fontFamily: 'Avenir',
                    fontWeight: '900',
                    color: '#000000',
                    fontSize: 14,
                  }}>
                  Update Card
                </Text>
                <TouchableOpacity
                  onPress={() => setOpenCard(false)}
                  activeOpacity={0.7}>
                  <Text
                    style={{
                      fontFamily: 'Avenir',
                      fontWeight: '900',
                      color: '#D9A525',
                      fontSize: 14,
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text
              style={{
                fontSize: 16,
                color: '#333333',
                padding: 10,
                fontFamily: 'Avenir',
                fontWeight: '900',
                marginTop: 15,
                textAlign: 'center',
              }}>
              Add Your Credit Card
            </Text>

            <View
              style={{
                flexDirection: 'center',
                padding: 20,
              }}>
              <View
                style={{
                  backgroundColor: 'transparent',
                  borderBottomColor: '#cc8b0f',
                  borderBottomWidth: 0.5,
                  paddingTop: 20,
                }}>
                <TextInput
                  onChangeText={onChangeNumber}
                  value={number}
                  style={{
                    padding: 10,
                    fontSize: 14,
                    color: '#333',
                    fontFamily: 'Avenir',
                    fontWeight: '400',
                  }}
                  placeholder="Cardholder Name"
                />
              </View>
              <View
                style={{
                  backgroundColor: 'transparent',
                  borderBottomColor: '#cc8b0f',
                  borderBottomWidth: 0.5,
                  paddingTop: 20,
                }}>
                <TextInput
                  inputMode="decimal"
                  maxLength={16}
                  onChangeText={onChangeNumber}
                  value={number}
                  style={{
                    padding: 10,
                    fontSize: 14,
                    color: '#333',
                    fontFamily: 'Avenir',
                    fontWeight: '400',
                  }}
                  placeholder="Card Number"
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 150,
                    backgroundColor: 'transparent',
                    borderBottomColor: '#cc8b0f',
                    borderBottomWidth: 0.5,
                    paddingTop: 20,
                  }}>
                  <TextInput
                    onChangeText={onChangeNumber}
                    value={number}
                    style={{
                      padding: 10,
                      fontSize: 14,
                      color: '#333',
                      fontFamily: 'Avenir',
                      fontWeight: '400',
                    }}
                    placeholder="MM/YY"
                  />
                </View>

                <View
                  style={{
                    width: 150,
                    backgroundColor: 'transparent',
                    borderBottomColor: '#cc8b0f',
                    borderBottomWidth: 0.5,
                    paddingTop: 20,
                  }}>
                  <TextInput
                    onChangeText={onChangeNumber}
                    value={number}
                    style={{
                      padding: 10,
                      fontSize: 14,
                      color: '#333',
                      fontFamily: 'Avenir',
                      fontWeight: '400',
                    }}
                    placeholder="CVC"
                  />
                </View>
              </View>

              <View
                style={{
                  backgroundColor: 'transparent',
                  borderBottomColor: '#cc8b0f',
                  borderBottomWidth: 0.5,
                  paddingTop: 20,
                }}>
                <TextInput
                  onChangeText={onChangeNumber}
                  style={{
                    padding: 10,
                    fontSize: 14,
                    color: '#333',
                    fontFamily: 'Avenir',
                    fontWeight: '400',
                  }}
                  placeholder="admin@example.com"
                  // defaultValue="admin@example.com"
                />
              </View>

              <TouchableOpacity
                onPress={() => setOpenCard(false)}
                activeOpacity={0.7}
                style={{
                  padding: 15,
                  borderWidth: 0.3,
                  borderColor: 'gray',
                  backgroundColor: '#1b263b',
                  borderRadius: 50,
                  marginTop: 40,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: 'center',
                    color: '#fff',
                  }}>
                  Save new card
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 5,
                  marginTop: 10,
                }}>
                <MaterialCommunityIcons name="lock" size={14} color="#888" />
                <Text
                  style={{
                    fontFamily: 'Avenir',
                    fontWeight: '700',
                    fontSize: 14,
                    color: '#333',
                  }}>
                  Secure Checkout
                </Text>
              </View>
            </View>
          </View>
        </Modal>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
    borderColor: '#000',
  },
  cardModalView: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f7f7f7',
    borderWidth: 1,
    borderColor: '#000',
  },

  headerFlexText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 100,
    padding: 10,
    paddingBottom: 20,
    borderBottomWidth: 0.2,
    borderColor: 'gray',
    backgroundColor: '#0a100d',
  },
  headerCardFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 20,
    borderBottomWidth: 0.2,
    borderColor: 'gray',
    backgroundColor: '#0a100d',
  },

  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
  },

  helpText: {
    fontSize: 18,
    color: '#333',
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
