import {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

function DedottPlantinum({navigation}) {
  const [dimensions, setDimensions] = useState({window, screen});
  const [showPlantinum, setShowPlantinum] = useState(false);
  const [selectBoxActive, setSelectBoxActive] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');

  function handlePlantinumPlan() {
    console.log(duration);
    navigation.navigate('FLWPaymentOptions', {
      duration: duration,
      plan: 'plantinum',
      price: price,
    });
    setShowPlantinum(false);
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        <Text style={styles.headerText}>Upgrade Your Likes</Text>
        <View style={styles.listContainer}>
          <View style={styles.listItem}>
            <MaterialCommunityIcons name="check" size={18} color="#000000" />
            <Text style={[styles.primaryText, styles.activePlan]}>
              Unlimited Likes
            </Text>
          </View>
          <View style={styles.listItem}>
            <MaterialCommunityIcons name="check" size={18} color="#000000" />
            <Text style={[styles.primaryText, styles.activePlan]}>
              See Who Likes You
            </Text>
          </View>
          <View style={styles.listItem}>
            <MaterialCommunityIcons name="check" size={18} color="#000000" />
            <View>
              <Text style={[styles.primaryText, styles.activePlan]}>
                Priority Likes
              </Text>
              <Text
                style={[
                  styles.secondaryText,
                  {maxWidth: dimensions.screen.width - 100, color: '#333'},
                ]}>
                Your Likes will be seen sooner with Priority Likes
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.headerText}>Enhance Your Experience</Text>
        <View style={styles.listContainer}>
          <View style={styles.listItem}>
            <MaterialCommunityIcons name="check" size={18} color="#000000" />
            <Text style={[styles.primaryText, styles.activePlan]}>
              Unlimited Rewinds
            </Text>
          </View>
          <View style={styles.listItem}>
            <MaterialCommunityIcons name="check" size={18} color="#000000" />
            <Text style={[styles.primaryText, styles.activePlan]}>
              1 Free Boost per month
            </Text>
          </View>
          <View style={styles.listItem}>
            <MaterialCommunityIcons name="check" size={18} color="#000000" />
            <View>
              <Text style={[styles.primaryText, styles.activePlan]}>
                5 Free Super Likes per week
              </Text>
            </View>
          </View>
          <View style={styles.listItem}>
            <MaterialCommunityIcons name="check" size={18} color="#000000" />
            <View>
              <Text style={[styles.primaryText, styles.activePlan]}>
                Message Before Matching
              </Text>
              <Text style={[styles.secondaryText, {color: '#000000'}]}>
                Add a note to your Super Likes
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.headerText}>Premium Discovery</Text>
        <View style={styles.listContainer}>
          <View style={styles.listItem}>
            <MaterialCommunityIcons name="check" size={18} color="#000000" />
            <View>
              <Text style={[styles.primaryText, styles.activePlan]}>
                Passport
              </Text>
              <Text
                style={[
                  styles.secondaryText,
                  {maxWidth: dimensions.screen.width - 100, color: '#000000'},
                ]}>
                Your Likes will be seen sooner with Priority Likes
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.headerText}>Take Control</Text>
        <View style={styles.listContainer}>
          <View style={styles.listItem}>
            <MaterialCommunityIcons name="check" size={18} color="#000000" />
            <View>
              <Text style={[styles.primaryText, styles.activePlan]}>
                Control Your Profile
              </Text>
              <Text style={[styles.secondaryText, {color: '#000000'}]}>
                Only show what you want them to know.
              </Text>
            </View>
          </View>
          <View style={styles.listItem}>
            <MaterialCommunityIcons name="check" size={18} color="#000000" />
            <View>
              <Text style={[styles.primaryText, styles.activePlan]}>
                Control Who Sees You
              </Text>
              <Text style={[styles.secondaryText, {color: '#000000'}]}>
                Manage who you have seen by.
              </Text>
            </View>
          </View>
          <View style={styles.listItem}>
            <MaterialCommunityIcons name="check" size={18} color="#000000" />
            <View>
              <Text style={[styles.primaryText, styles.activePlan]}>
                Control Who You See
              </Text>
              <Text style={[styles.secondaryText, {color: '#000000'}]}>
                Choose the type of people you want to connect with.
              </Text>
            </View>
          </View>
          <View style={styles.listItem}>
            <MaterialCommunityIcons name="check" size={18} color="#000000" />
            <Text style={[styles.primaryText, styles.activePlan]}>
              Hide Ads
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            setShowPlantinum(true);
          }}
          activeOpacity={0.7}
          style={{
            backgroundColor: '#A8000E',
            margin: 'auto',
            borderRadius: 10,
            marginVertical: 10,
          }}>
          <Text
            style={{
              justifyContent: 'center',
              textAlign: 'center',
              color: '#fff',
              padding: 10,
            }}>
            Starting at NGN 2,205.00
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.centered_view}>
        <Modal
          visible={showPlantinum}
          onRequestClose={() => setShowPlantinum(false)}
          animationType="fade"
          presentationStyle="pageSheet">
          <View style={styles.plus_modal}>
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
                <TouchableOpacity
                  onPress={() => setShowPlantinum(false)}
                  activeOpacity={0.7}>
                  <MaterialCommunityIcons
                    name="close"
                    size={24}
                    color="#000000"
                  />
                </TouchableOpacity>

                <Text
                  style={{
                    fontFamily: 'Avenir',
                    fontWeight: '900',
                    color: '#D9A525',
                    fontSize: 16,
                  }}>
                  Dedott Plantinum
                </Text>
              </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.primary_header}>
                Unlimited Likes. Unlimited Rewinds. Unlimited Passport. No Ads
              </Text>
              <View>
                <Text style={styles.select_planText}>Select a plan</Text>

                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  style={{padding: 10}}>
                  <Pressable
                    onPress={() => {
                      setSelectBoxActive('week');
                      setDuration('week');
                      setPrice(2205.0);
                    }}
                    style={[
                      selectBoxActive === 'week'
                        ? styles.active_select_box
                        : null,
                      styles.select_box,
                    ]}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View>
                        <Text style={styles.select_box_priHeader}>Popular</Text>
                        <Text style={styles.select_box_secText}>1 week</Text>
                      </View>
                      {selectBoxActive === 'week' && (
                        <MaterialCommunityIcons
                          name="check"
                          size={24}
                          color="#F8B930"
                        />
                      )}
                    </View>

                    <Text style={styles.select_box_amount}>
                      NGN 2,205.00/WK
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => {
                      setSelectBoxActive('1 month');
                      setDuration('1 month');
                      setPrice(4839.24);
                    }}
                    style={[
                      selectBoxActive === '1 month'
                        ? styles.active_select_box
                        : null,
                      styles.select_box,
                    ]}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 30,
                      }}>
                      <Text style={{fontSize: 24, color: '#000000'}}>
                        1 month
                      </Text>
                      {selectBoxActive === '1 month' && (
                        <MaterialCommunityIcons
                          name="check"
                          size={24}
                          color="#F8B930"
                        />
                      )}
                    </View>

                    <View
                      style={[
                        styles.select_box_amount,
                        {
                          flexDirection: 'row',
                          gap: 70,
                        },
                      ]}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: '#000000',
                          fontFamily: 'Avenirs',
                        }}>
                        NGN 1,113.75/WK
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          color: '#A8000E',
                          backgroundColor: '#FFFFFF',
                          padding: 5,
                        }}>
                        Save 53%
                      </Text>
                    </View>
                  </Pressable>

                  <Pressable
                    onPress={() => {
                      setSelectBoxActive('6 month');
                      setDuration('6 month');
                      setPrice(15544.83);
                    }}
                    style={[
                      selectBoxActive === '6 month'
                        ? styles.active_select_box
                        : null,
                      styles.select_box,
                    ]}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View>
                        <Text style={styles.select_box_priHeader}>
                          Best Value
                        </Text>
                        <Text style={styles.select_box_secText}>6 months</Text>
                      </View>
                      {selectBoxActive === '6 month' && (
                        <MaterialCommunityIcons
                          name="check"
                          size={24}
                          color="#F8B930"
                        />
                      )}
                    </View>

                    <View
                      style={[
                        styles.select_box_amount,
                        {
                          flexDirection: 'row',
                          gap: 70,
                        },
                      ]}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: '#000000',
                          fontFamily: 'Avenir',
                        }}>
                        NGN 596.25/WK
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          color: '#A8000E',
                          backgroundColor: '#FFFFFF',
                          padding: 5,
                        }}>
                        Save 76%
                      </Text>
                    </View>
                  </Pressable>
                </ScrollView>
                <Text style={styles.headerText}>Take Control</Text>
                <View style={styles.plusListContainer}>
                  <View style={styles.listItem}>
                    <MaterialCommunityIcons
                      name="check"
                      size={18}
                      color="#000000"
                    />
                    <Text style={[styles.primaryText, styles.activePlan]}>
                      Unlimited Rewinds
                    </Text>
                  </View>
                  <View style={styles.listItem}>
                    <MaterialCommunityIcons
                      name="check"
                      size={18}
                      color="#000000"
                    />
                    <Text style={[styles.primaryText, styles.activePlan]}>
                      Unlimited Likes
                    </Text>
                  </View>
                  <View style={styles.listItem}>
                    <MaterialCommunityIcons
                      name="check"
                      size={18}
                      color="#000000"
                    />
                    <View>
                      <Text style={[styles.primaryText, styles.activePlan]}>
                        Passport
                      </Text>
                      <Text style={[styles.secondaryText, {color: '#000000'}]}>
                        Match and chat with people anywhere.
                      </Text>
                    </View>
                  </View>
                  <View style={styles.listItem}>
                    <MaterialCommunityIcons
                      name="check"
                      size={18}
                      color="#000000"
                    />
                    <View>
                      <Text style={[styles.primaryText, styles.activePlan]}>
                        Control Your Profile
                      </Text>
                      <Text style={[styles.secondaryText, {color: '#000000'}]}>
                        Only show what you want them to know.
                      </Text>
                    </View>
                  </View>
                  <View style={styles.listItem}>
                    <MaterialCommunityIcons
                      name="check"
                      size={18}
                      color="#000000"
                    />
                    <View>
                      <Text style={[styles.primaryText, styles.activePlan]}>
                        Control Who Sees You
                      </Text>
                      <Text style={[styles.secondaryText, {color: '#000000'}]}>
                        Manage who you have seen by.
                      </Text>
                    </View>
                  </View>
                  <View style={styles.listItem}>
                    <MaterialCommunityIcons
                      name="check"
                      size={18}
                      color="#000000"
                    />
                    <View>
                      <Text style={[styles.primaryText, styles.activePlan]}>
                        Control Who You See
                      </Text>
                      <Text style={[styles.secondaryText, {color: '#000000'}]}>
                        Choose the type of people you want to connect with.
                      </Text>
                    </View>
                  </View>
                  <View style={styles.listItem}>
                    <MaterialCommunityIcons
                      name="check"
                      size={18}
                      color="#000000"
                    />
                    <Text style={[styles.primaryText, styles.activePlan]}>
                      Hide Ads
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: dimensions.screen.width,
                padding: 10,
                backgroundColor: '#FFFFFF',
                zIndex: 10,
              }}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <MaterialCommunityIcons name="fire" size={32} color="#A8000E" />
                {selectBoxActive === 'week' ? (
                  <View>
                    <Text style={{color: '#000000', padding: 10, fontSize: 18}}>
                      1 Week
                    </Text>
                    <Text
                      style={{
                        color: '#000000',
                        fontWeight: 'bold',
                        fontSize: 20,
                      }}>
                      NGN 2,205.00/WK
                    </Text>
                  </View>
                ) : selectBoxActive === '1 month' ? (
                  <View>
                    <Text style={{color: '#000000', padding: 10, fontSize: 18}}>
                      1 Month
                    </Text>
                    <Text
                      style={{
                        color: '#000000',
                        fontWeight: 'bold',
                        fontSize: 20,
                      }}>
                      NGN 1,113.75/WK
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text style={{color: '#000000', padding: 10, fontSize: 18}}>
                      6 Months
                    </Text>
                    <Text
                      style={{
                        color: '#000000',
                        fontWeight: 'bold',
                        fontSize: 20,
                      }}>
                      NGN 596.25/WK
                    </Text>
                  </View>
                )}
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handlePlantinumPlan}
                style={{
                  backgroundColor: '#A8000E',
                  width: 100,
                  right: 0,
                  margin: 'auto',
                  borderRadius: 10,
                  marginVertical: 10,
                }}>
                <Text
                  style={{
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: '#fff',
                    padding: 10,
                  }}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

export default DedottPlantinum;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  headerText: {
    color: '#333333',
    fontFamily: 'Avenir',
    textAlign: 'center',
    padding: 18,
    fontWeight: 'bold',
    fontSize: 18,
  },

  listContainer: {
    margin: 10,
    borderWidth: 0.25,
    borderColor: '#cc8b0f',
    padding: 10,
  },

  plusListContainer: {
    margin: 10,
    borderWidth: 0.25,
    borderColor: '#cc8b0f',
    padding: 10,
    marginBottom: 70,
  },

  listItem: {
    flexDirection: 'row',
    gap: 20,
    padding: 15,
  },

  primaryText: {
    color: '#333333',
    fontFamily: 'Avenir',
    color: '#bfc0c0',
    fontSize: 18,
    paddingBottom: 5,
  },

  secondaryText: {
    color: '#333333',
    fontFamily: 'Avenir',
    color: '#bfc0c0',
    fontSize: 16,
  },

  activePlan: {
    color: '#333333',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    color: '#000000',
  },

  priceButton: {
    position: 'fixed',
    bottom: 20,
    width: '70%',
    alignItems: 'center',
    backgroundColor: '#D9A525',
    padding: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#222',
    borderRadius: 25,
    marginTop: 35,
    marginBottom: 50,
  },

  priceButtonText: {
    textTransform: 'uppercase',
    color: '#000000',
    fontSize: 20,
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#D9A525',
    padding: 15,
    borderRadius: 8,
    margin: 10,
    marginTop: 40,
  },

  buttonText: {
    fontFamily: 'Avenir',
    color: '#000000',
    fontSize: 20,
  },

  nav: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'left',
    gap: 40,
    padding: 15,
  },

  closeModal: {
    borderColor: '#000000',
    borderWidth: 3,
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeModalText: {
    fontSize: 24,
    color: '#000000',
    // padding: 10,
  },

  centered_view: {
    backgroundColor: '#F7F7F7',
  },

  plus_modal: {
    height: '100%',
  },

  primary_header: {
    marginTop: 10,
    fontSize: 32,
    fontFamily: 'Avenir',
    color: '#000000',
    padding: 10,
  },

  select_box: {
    width: 300,
    height: 200,
    padding: 15,
    borderWidth: 0.25,
    borderColor: '#8d99ae',
    borderRadius: 8,
    marginRight: 10,
    marginTop: 20,
  },

  select_planText: {
    padding: 10,
    fontFamily: 'Avenir',
    fontSize: 18,
    color: '#000000',
    marginTop: 30,
  },

  select_box_priHeader: {
    fontFamily: 'Avenir',
    color: '#F8B930',
    fontSize: 18,
  },

  select_box_secText: {
    fontSize: 24,
    fontFamily: 'Avenir',
    color: '#000000',
    marginTop: 30,
  },

  select_box_amount: {
    fontFamily: 'Avenir',
    fontSize: 20,
    color: '#000000',
    position: 'absolute',
    bottom: 20,
    left: 20,
  },

  active_select_box: {
    borderWidth: 2,
    borderColor: '#F8B930',
  },
});
