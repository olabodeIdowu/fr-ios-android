import {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  RefreshControl,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PopUpReportModal from '../../chats/chat_popups/ReportUserPopup';

const Information = ({
  showInformationModal,
  hideInformationModal,
  showPopupReportModal,
  setShowPopupReportModal,
  currentChat,
  auth,
  latitude,
  longitude,
  isBlocked,
  handleBlocking,
  handleReporting,
}) => {
  const [refreshing, setRefreshing] = useState(false);

  function getDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return Math.floor(d);
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <Modal
      animationType="slide"
      visible={showInformationModal}
      onRequestClose={hideInformationModal}
      presentationStyle="pageSheet"
      style={{fontFamily: 'Avenir'}}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              backgroundColor: '#A8000E',
              width: 100,
              height: 5,
              margin: 'auto',
              borderRadius: 25,
              marginVertical: 10,
            }}></View>
          <TouchableOpacity
            onPress={hideInformationModal}
            style={{alignSelf: 'flex-end', padding: 10}}
            activeOpacity={0.7}>
            <Ionicons name="close" size={30} color="#333" />
          </TouchableOpacity>
          <ScrollView
            // refreshControl={
            //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            // }
            showsVerticalScrollIndicator={false}>
            <View>
              <View
                style={{
                  borderBottomWidth: 0.2,
                  borderColor: 'gray',
                  paddingTop: 30,

                  paddingLeft: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                    paddingBottom: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Avenir',
                      fontSize: 24,
                      fontWeight: '700',
                      color: '#333333',
                    }}>
                    {`${currentChat?.firstName} ${currentChat?.lastName}`}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Avenir',
                      color: '#333333',
                      fontWeight: '700',
                      fontSize: 32,
                    }}>
                    {currentChat?.age}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                    paddingTop: 5,
                    paddingBottom: 5,
                    fontFamily: 'Avenir',
                  }}>
                  <Ionicons name="person-outline" size={18} color="#333333" />
                  <Text
                    style={{
                      color: '#333333',
                      fontFamily: 'Avenir',
                      fontSize: 16,
                    }}>
                    {' '}
                    {currentChat?.sex}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                    paddingTop: 5,
                    paddingBottom: 5,
                  }}>
                  <Ionicons name="location-outline" size={18} color="#333333" />
                  <Text
                    style={{
                      color: '#333333',
                      fontFamily: 'Avenir',
                      fontSize: 16,
                    }}>
                    {getDistance(
                      auth?.user?.userLocation[0],
                      auth?.user?.userLocation[1],
                      currentChat?.userLocation[0],
                      currentChat?.userLocation[1],
                    )}{' '}
                    kilometers away
                  </Text>
                </View>
              </View>

              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    textAlign: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: 10,
                    borderBottomWidth: 0.2,
                    borderColor: 'gray',
                  }}>
                  <View>
                    <Text
                      style={{
                        fontFamily: 'Avenir',
                        fontWeight: 'bold',
                        color: '#333333',
                        fontSize: 24,
                        padding: 10,
                      }}>
                      Location
                    </Text>

                    <View>
                      <Text
                        style={{color: '#333333', fontSize: 16, padding: 10}}>
                        {longitude} {latitude}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      textAlign: 'center',
                      gap: 5,
                      backgroundColor: '#000000',
                      padding: 4,
                      borderRadius: 5,
                      marginRight: 10,
                    }}>
                    <Ionicons
                      name="location-outline"
                      size={18}
                      color="#FFFFFF"
                    />
                    <Text style={styles.distance}>
                      {' '}
                      {getDistance(
                        auth?.user?.userLocation[0],
                        auth?.user?.userLocation[1],
                        currentChat?.userLocation[0],
                        currentChat?.userLocation[1],
                      )}{' '}
                      km
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    paddingBottom: 10,
                    borderBottomWidth: 0.2,
                    borderColor: 'gray',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Avenir',
                      fontWeight: 'bold',
                      color: '#333333',
                      fontSize: 24,
                      padding: 10,
                    }}>
                    About
                  </Text>
                  {currentChat?.about?.length > 150
                    ? currentChat?.about.slice(0, 150) +
                      (
                        <Text
                          onPress={() => setReadMore(!readMore)}
                          style={{color: 'coral'}}>
                          {readMore ? 'Read less..' : 'Read more..'}
                        </Text>
                      )
                    : currentChat?.about}
                  <Text
                    style={{
                      color: '#333333',
                      fontSize: 16,
                      fontFamily: 'Avenir',
                      padding: 10,
                    }}>
                    Lorem ipsum dolor sit ametconsectetur. Morbi neque semper
                    cras nunc aliquam sed. Sollicitudin hendrerit dolor varius
                    nunc proin donec{' '}
                    <Text
                      onPress={() => setReadMore(!readMore)}
                      style={{color: '#4847E0', fontFamily: 'Avenir'}}>
                      Read more..
                    </Text>
                  </Text>
                </View>

                <View
                  style={{
                    paddingBottom: 10,
                    borderBottomWidth: 0.2,
                    borderBottomColor: 'gray',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Avenir',
                      fontWeight: 'bold',
                      color: '#333333',
                      fontSize: 24,
                      padding: 10,
                      marginBottom: 10,
                    }}>
                    Lifestyle
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      columnGap: 10,
                      rowGap: 10,
                      margin: 10,
                    }}>
                    {currentChat?.lifestyles?.pet && (
                      <TouchableOpacity style={styles.lifestyle}>
                        <MaterialCommunityIcons
                          name="dog"
                          size={12}
                          color="#333333"
                        />
                        <Text style={styles.lifestyleText}>
                          {currentChat?.lifestyles?.pet}
                        </Text>
                      </TouchableOpacity>
                    )}
                    {currentChat?.lifestyles?.drinking && (
                      <TouchableOpacity style={styles.lifestyle}>
                        <MaterialCommunityIcons
                          name="glass-wine"
                          size={12}
                          color="#333333"
                        />
                        <Text style={styles.lifestyleText}>
                          {currentChat?.lifestyles?.drinking}
                        </Text>
                      </TouchableOpacity>
                    )}
                    {currentChat?.lifestyles?.workout && (
                      <TouchableOpacity style={styles.lifestyle}>
                        <MaterialCommunityIcons
                          name="dumbbell"
                          size={12}
                          color="#333333"
                        />
                        <Text style={styles.lifestyleText}>
                          {currentChat?.lifestyles?.workout}
                        </Text>
                      </TouchableOpacity>
                    )}
                    {currentChat?.lifestyles?.smoking && (
                      <TouchableOpacity style={styles.lifestyle}>
                        <MaterialCommunityIcons
                          name="smoking"
                          size={12}
                          color="#333333"
                        />
                        <Text style={styles.lifestyleText}>
                          {currentChat?.lifestyles?.smoking}
                        </Text>
                      </TouchableOpacity>
                    )}
                    {currentChat?.lifestyles?.dietery && (
                      <TouchableOpacity style={styles.lifestyle}>
                        <MaterialCommunityIcons
                          name="pizza"
                          size={12}
                          color="#333333"
                        />
                        <Text style={styles.lifestyleText}>
                          {currentChat?.lifestyles?.dietery}
                        </Text>
                      </TouchableOpacity>
                    )}
                    {currentChat?.lifestyles?.socialMediaActiveness && (
                      <TouchableOpacity style={styles.lifestyle}>
                        <MaterialCommunityIcons
                          name="at"
                          size={12}
                          color="#333333"
                        />
                        <Text style={styles.lifestyleText}>
                          {currentChat?.lifestyles?.socialMediaActiveness}
                        </Text>
                      </TouchableOpacity>
                    )}
                    {currentChat?.lifestyles?.sleepingHabits && (
                      <TouchableOpacity style={styles.lifestyle}>
                        <MaterialCommunityIcons
                          name="star"
                          size={12}
                          color="#333333"
                        />
                        <Text style={styles.lifestyleText}>
                          {currentChat?.lifestyles?.sleepingHabits}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>

                <View
                  style={{
                    paddingBottom: 10,
                    borderTopWidth: 0.2,
                    borderBottomWidth: 0.2,
                    borderColor: 'gray',
                  }}>
                  <Text
                    style={{
                      color: '#000000',
                      fontSize: 24,
                      padding: 10,
                      marginBottom: 10,
                      fontWeight: 'bold',
                      fontFamily: 'Avenir',
                    }}>
                    Basics
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      columnGap: 10,
                      rowGap: 10,
                      margin: 10,
                    }}>
                    {currentChat?.zodiac && (
                      <Pressable style={styles.lifestyle}>
                        <Icon2 name="moon-outline" size={12} color="#333333" />
                        <Text style={styles.lifestyleText}>
                          {currentChat?.basics?.zodiac}
                        </Text>
                      </Pressable>
                    )}
                    {currentChat?.basics?.education && (
                      <Pressable style={styles.lifestyle}>
                        <MaterialCommunityIcons
                          name="school"
                          size={12}
                          color="#333333"
                        />
                        <Text style={styles.lifestyleText}>
                          {currentChat?.basics?.education}
                        </Text>
                      </Pressable>
                    )}
                    {currentChat?.basics?.loveStyle && (
                      <Pressable style={styles.lifestyle}>
                        <MaterialCommunityIcons
                          name="heart"
                          size={12}
                          color="#333333"
                        />
                        <Text style={styles.lifestyleText}>
                          {currentChat?.basics?.loveStyle}
                        </Text>
                      </Pressable>
                    )}
                    {currentChat?.basics?.communication && (
                      <Pressable style={styles.lifestyle}>
                        <MaterialCommunityIcons
                          name="message"
                          size={12}
                          color="#333333"
                        />
                        <Text style={styles.lifestyleText}>
                          {currentChat?.basics?.communication}
                        </Text>
                      </Pressable>
                    )}
                    {currentChat?.basics?.personality && (
                      <Pressable style={styles.lifestyle}>
                        <MaterialCommunityIcons
                          name="smoking"
                          size={12}
                          color="#333333"
                        />
                        <Text style={styles.lifestyleText}>
                          {currentChat?.basics?.personality}
                        </Text>
                      </Pressable>
                    )}
                    {currentChat?.basics?.familyPlans && (
                      <Pressable style={styles.lifestyle}>
                        <MaterialCommunityIcons
                          name="shower"
                          size={12}
                          color="#333333"
                        />
                        <Text style={styles.lifestyleText}>
                          {currentChat?.basics?.familyPlans}
                        </Text>
                      </Pressable>
                    )}
                    {currentChat?.basics?.vaccination && (
                      <Pressable style={styles.lifestyle}>
                        <MaterialCommunityIcons
                          name="grease-pencil"
                          size={12}
                          color="#333333"
                        />
                        <Text style={styles.lifestyleText}>
                          {currentChat?.basics?.vaccination}
                        </Text>
                      </Pressable>
                    )}
                  </View>
                </View>
                <View
                  style={{
                    paddingBottom: 10,
                    borderTopWidth: 0.2,
                    borderColor: 'gray',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Avenir',
                      color: '#000000',
                      fontSize: 24,
                      padding: 10,
                      marginBottom: 10,
                      fontWeight: 'bold',
                    }}>
                    Gallery
                  </Text>

                  {auth.user?.usersAllowedToViewUserImages.includes(
                    currentChat?.id,
                  ) || auth.user?.allowImagesDisplay === true
                    ? currentChat?.images?.map(img => {
                        <View
                          style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            columnGap: 10,
                            rowGap: 10,
                            margin: 10,
                          }}>
                          <Image
                            style={{
                              width: 160,
                              height: 160,
                            }}
                            source={{uri: img?.url}}
                          />
                        </View>;
                      })
                    : currentChat?.images?.map(img => {
                        <View
                          style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            columnGap: 10,
                            rowGap: 10,
                            margin: 10,
                          }}>
                          <Image
                            style={{
                              width: 160,
                              height: 160,
                            }}
                            source={{uri: img?.url}}
                            blurRadius={5}
                          />
                        </View>;
                      })}
                </View>
              </View>

              <View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleBlocking}
                  style={{
                    padding: 10,
                    borderTopWidth: 0.2,
                    borderBottomWidth: 0.2,
                    borderColor: 'gray',
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 10,
                      padding: 15,
                    }}>
                    <Text
                      style={{
                        color: '#333333',
                        fontSize: 18,
                      }}>
                      {isBlocked ? 'Unblock' : 'Block'} {currentChat?.firstName}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Avenir',
                        color: '#333333',
                        fontSize: 16,
                      }}>
                      You won't see them, they wont see you
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleReporting}
                  style={{
                    padding: 10,
                    borderTopWidth: 0.2,
                    marginBottom: 200,
                    borderColor: 'gray',
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 10,
                      padding: 15,
                    }}>
                    <Text
                      style={{
                        color: '#333333',
                        fontSize: 18,
                      }}>
                      Report {currentChat?.firstName}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Avenir',
                        color: '#333333',
                        fontSize: 16,
                      }}>
                      Don't worry - we won't tell them.
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {showPopupReportModal && (
              <PopUpReportModal
                showPopupReportModal={showPopupReportModal}
                setShowPopupReportModal={setShowPopupReportModal}
                currentChat={currentChat}
              />
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    fontFamily: 'Avenir',
    // width: '100%',
    // // position: 'absolute',
    // // bottom: 0,
  },
  modalView: {
    backgroundColor: '#FFFFFF',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
});

export default Information;
