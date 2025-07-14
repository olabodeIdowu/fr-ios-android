import {useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BookedPopupModal from './BookedPopup';
import PaymentOptions from '../../../../ui/PaymentOptions';

export default function CoachAvailabilityScreen({navigation}) {
  const [showPopupBookedModal, setShowPopupBookedModal] = useState(false);
  const [showPaymentOptionsModal, hidePaymentOptionsModal] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [active, setActive] = useState('');
  const [duration, setDuration] = useState([
    '8am - 9am',
    '10am - 11am',
    '1pm - 2pm',
  ]);

  function handleDuration(duration) {
    setActive(duration);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity
          onPress={() => {
            //  Go back to the previous screen.
            navigation.goBack();
          }}>
          <Text style={styles.backText}>&larr;</Text>
        </TouchableOpacity>

        <Text style={styles.detailsText}>Availability</Text>
      </View>
      <ScrollView
        style={{height: '100%', paddingTop: 10}}
        showsVerticalScrollIndicator={false}>
        <Text
          style={{
            color: '#000000',
            fontSize: 18,
            fontFamily: 'Avenir',
            fontWeight: '800',
            padding: 10,
          }}>
          Janet Amechi
        </Text>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 10,
            marginBottom: 20,
            padding: 10,
          }}>
          <Text
            style={{
              fontFamily: 'Avenir',
              fontStyle: 16,
              color: '#333333',
              fontWeight: '400',
            }}>
            Schedule
          </Text>
          <View
            style={{
              alignItems: 'center',
              gap: 5,
              flexDirection: 'row',
            }}>
            <View
              style={{
                backgroundColor: '#666',
                width: 10,
                height: 10,
                borderRadius: 50,
              }}></View>
            <Text
              style={{
                fontFamily: 'Avenir',
                fontStyle: 16,
                color: '#333333',
                fontWeight: '400',
              }}>
              Booked
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              gap: 5,
              flexDirection: 'row',
            }}>
            <View
              style={{
                backgroundColor: '#D9A525',
                width: 10,
                height: 10,
                borderRadius: 50,
              }}></View>
            <Text
              style={{
                fontFamily: 'Avenir',
                fontStyle: 16,
                color: '#333333',
                fontWeight: '400',
              }}>
              Available
            </Text>
          </View>
        </View>
        <View
          style={{
            padding: 10,
          }}>
          <DatePicker
            options={{
              backgroundColor: '#000000',
              textHeaderColor: '#FFA25B',
              textDefaultColor: '#F6E7C1',
              selectedTextColor: '#fff',
              mainColor: '#A8000E',
              textSecondaryColor: '#D6C7A1',
              borderColor: 'rgba(122, 146, 165, 0.1)',
            }}
            mode="calendar"
            style={{
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#D9A525',
            }}
            onSelectedChange={date => setSelectedDate(date)}
          />
        </View>

        <Text
          style={{
            color: '#000000',
            fontSize: 16,
            padding: 10,
            fontFamily: 'Avenir',
            fontWeight: 'bold',
          }}>
          Select Duration
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            columnGap: 10,
            rowGap: 10,
            margin: 10,
          }}>
          {duration &&
            duration.map((dur, index) => {
              return (
                <Pressable
                  key={index}
                  onPress={() => handleDuration(dur)}
                  style={active === dur ? styles.active : styles.inActive}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: active === dur ? '#FFFFFF' : '#6C6C6C',
                      textAlign: 'center',
                    }}>
                    {dur}
                  </Text>
                </Pressable>
              );
            })}
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            padding: 15,
          }}>
          <TouchableOpacity onPress={() => setChecked(!checked)}>
            {checked ? (
              <MaterialCommunityIcons
                color="#A8000E"
                name="checkbox-marked"
                size={24}
              />
            ) : (
              <MaterialCommunityIcons
                name="checkbox-blank-outline"
                size={24}
                color="#000000"
              />
            )}
          </TouchableOpacity>

          <Text style={{color: '#333333', fontFamily: 'Avenir', fontSize: 14}}>
            Set Reminder
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // make payment

            //if payment === succesful (next)

            // handle boooking coach

            hidePaymentOptionsModal(true);
          }}
          activeOpacity={0.7}>
          <Text style={styles.buttonText}>Book session</Text>
        </TouchableOpacity>
        {showPopupBookedModal && (
          <BookedPopupModal
            showPopupBookedModal={showPopupBookedModal}
            setShowPopupBookedModal={setShowPopupBookedModal}
          />
        )}
        {showPaymentOptionsModal && (
          <PaymentOptions
            showPaymentOptionsModal={showPaymentOptionsModal}
            hidePaymentOptionsModal={() => hidePaymentOptionsModal(false)}
            setShowPopupBookedModal={setShowPopupBookedModal}
            // showPopupBookedModal={showPopupBookedModal}
            // currentChat={}
          />
        )}
      </ScrollView>
      {/* {showPopupCoachRatingModal && (
        <CoachRatingModal
          showPopupCoachRatingModal={showPopupCoachRatingModal}
          setShowPopupCoachRatingModal={setShowPopupCoachRatingModal}
        />
      )} */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  nav: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'left',
    gap: 80,
    flexDirection: 'row',
    padding: 3.2,
    marginBottom: 10,
    padding: 10,
  },

  backText: {
    fontSize: 36,
    color: '#000000',
    fontFamily: 'Avenir',
  },

  detailsText: {
    justifyContent: 'center',
    fontSize: 22,
    color: '#000000',
    fontFamily: 'Avenir',
  },

  active: {
    backgroundColor: '#f77581',
    // backgroundColor: '#0085FF',
    padding: 10,
    color: '#FFFFFF',
    padding: 6,
    borderRadius: 5,
  },

  inActive: {
    backgroundColor: '#f5d4d7',
    borderColor: '#6C6C6C',
    padding: 10,
    padding: 6,
    borderRadius: 5,
  },

  durationText: {
    fontSize: 16,
    color: '#6C6C6C',
    textAlign: 'center',
  },

  button: {
    width: '95%',
    alignItems: 'center',
    backgroundColor: '#A8000E',
    padding: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 40,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
