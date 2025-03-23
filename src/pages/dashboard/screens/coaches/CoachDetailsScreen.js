import {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

export default function CoachDetailsScreen({navigation}) {
  const [isAMentee, setIsAMentee] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('Details');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View style={styles.nav}>
          <TouchableOpacity
            onPress={() => {
              //  Go back to the previous screen.
              navigation.goBack();
            }}>
            <Text style={styles.backText}>&larr;</Text>
          </TouchableOpacity>

          <Text style={styles.detailsText}>Details</Text>
        </View>
        <ScrollView
          style={{height: '100%', paddingTop: 10}}
          showsVerticalScrollIndicator={false}>
          <Image
            style={styles.welcomeImage}
            source={require('./../../../../../assets/users/user.png')}
          />
          <Text
            style={{
              color: '#000000',
              fontFamily: 'Avenir',
              textAlign: 'center',
              fontWeight: 'semibold',
              fontSize: 24,
            }}>
            Janet Amechi
          </Text>
          <Text
            style={{
              color: '#000000',
              fontFamily: 'Avenir',
              textAlign: 'center',
              marginTop: 5,
              fontWeight: 'medium',
              fontSize: 14,
            }}>
            Dating/psychological coach
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('CoachAvailabilityScreen')}
            activeOpacity={0.4}>
            <Text style={styles.buttonText}>Check Availability</Text>
          </TouchableOpacity>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: '#4D4D4D80',
                marginTop: 15,
                marginBottom: 10,
                padding: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                }}>
                <MaterialCommunityIcons name="star" color="#F8B930" size={22} />
                <Text
                  style={{
                    color: '#000000',
                    fontFamily: 'Avenir',
                    fontSize: 14,
                  }}>
                  (4.8) 120 Reviews
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#4D4D4D80',
                  width: 1,
                  height: 30,
                }}></View>
              <Text
                style={{color: '#000000', fontFamily: 'Avenir', fontSize: 14}}>
                {' '}
                $10/Hour
              </Text>
            </View>
            <Text
              style={{
                color: '#000000',
                fontFamily: 'Avenir',
                padding: 10,
                fontSize: 14,
              }}>
              Lorem ipsum dolor sit amet consectetur. Morbi convallis id orci et
              scelerisque varius at arcu elit. Non nam venenatis faucibus ornare
              lectus ligula.
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 10,
              }}>
              <Pressable
                onPress={() => setActiveTab('Details')}
                style={{
                  backgroundColor: activeTab === 'Details' ? '#FCDDDF' : 'none',
                  borderTopLeftRadius: activeTab === 'Details' ? 10 : 0,
                  borderTopRightRadius: activeTab === 'Details' ? 10 : 0,
                  padding: 10,
                }}>
                <Text
                  style={{
                    fontFamily: 'Avenir',
                    fontStyle: 16,
                    color: '#6C6C6C',
                  }}>
                  Details
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setActiveTab('Posts')}
                style={{
                  backgroundColor: activeTab === 'Posts' ? '#FCDDDF' : 'none',
                  borderTopLeftRadius: activeTab === 'Posts' ? 10 : 0,
                  borderTopRightRadius: activeTab === 'Posts' ? 10 : 0,
                  padding: 10,
                }}>
                <Text
                  style={{
                    fontFamily: 'Avenir',
                    fontStyle: 16,
                    color: '#6C6C6C',
                  }}>
                  Posts
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setActiveTab('Testimonials')}
                style={{
                  backgroundColor:
                    activeTab === 'Testimonials' ? '#FCDDDF' : 'none',
                  borderTopLeftRadius: activeTab === 'Testimonials' ? 10 : 0,
                  borderTopRightRadius: activeTab === 'Testimonials' ? 10 : 0,
                  padding: 10,
                }}>
                <Text
                  style={{
                    fontFamily: 'Avenir',
                    fontStyle: 16,
                    color: '#6C6C6C',
                  }}>
                  Testimonials
                </Text>
              </Pressable>
            </View>
            {activeTab === 'Details' && (
              <View style={{marginBottom: 60}}>
                <View
                  style={{
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      backgroundColor: '#FCDDDF',
                      fontFamily: 'Avenir',
                      color: '#6C6C6C',
                      fontWeight: '800',
                      padding: 10,
                    }}>
                    Open Hours
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                      padding: 10,
                    }}>
                    <Ionicons name="alarm" size={20} color="#9E3A40" />
                    <Text
                      style={{
                        fontWeight: '400',
                        fontSize: 14,
                        fontFamily: 'Avenir',
                        color: '#000000',
                      }}>
                      9am - 5pm
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                      padding: 10,
                    }}>
                    <Ionicons name="alarm" size={20} color="#9E3A40" />
                    <Text
                      style={{
                        fontWeight: '400',
                        fontSize: 14,
                        fontFamily: 'Avenir',
                        color: '#000000',
                      }}>
                      Monday - Friday
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      backgroundColor: '#FCDDDF',
                      fontFamily: 'Avenir',
                      color: '#6C6C6C',
                      fontWeight: '800',
                      padding: 10,
                    }}>
                    Certifications
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      <Ionicons
                        name="document-attach"
                        size={20}
                        color="#9E3A40"
                      />
                      <Text
                        style={{
                          fontWeight: '400',
                          fontSize: 14,
                          fontFamily: 'Avenir',
                          color: '#000000',
                        }}>
                        Google Digital Coaching Certification
                      </Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.7}>
                      <Text
                        style={{
                          fontWeight: '400',
                          fontSize: 12,
                          fontFamily: 'Avenir',
                          color: '#00539F',
                        }}>
                        View
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      <Ionicons
                        name="document-attach"
                        size={20}
                        color="#9E3A40"
                      />
                      <Text
                        style={{
                          fontWeight: '400',
                          fontSize: 14,
                          fontFamily: 'Avenir',
                          color: '#000000',
                        }}>
                        Google Digital Coaching Certification
                      </Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.7}>
                      <Text
                        style={{
                          fontWeight: '400',
                          fontSize: 12,
                          fontFamily: 'Avenir',
                          color: '#00539F',
                        }}>
                        View
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      backgroundColor: '#FCDDDF',
                      fontFamily: 'Avenir',
                      color: '#6C6C6C',
                      fontWeight: '800',
                      padding: 10,
                    }}>
                    Language Proficiency
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      <Text
                        style={{
                          fontWeight: '400',
                          fontSize: 14,
                          fontFamily: 'Avenir',
                          color: '#000000',
                        }}>
                        English
                      </Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.7}>
                      <Text
                        style={{
                          fontWeight: '400',
                          fontSize: 12,
                          fontFamily: 'Avenir',
                          color: '#00539F',
                        }}>
                        Strong
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      <Text
                        style={{
                          fontWeight: '400',
                          fontSize: 14,
                          fontFamily: 'Avenir',
                          color: '#000000',
                        }}>
                        Spanish
                      </Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.7}>
                      <Text
                        style={{
                          fontWeight: '400',
                          fontSize: 12,
                          fontFamily: 'Avenir',
                          color: '#00539F',
                        }}>
                        Average
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            {activeTab === 'Posts' && (
              <View style={{marginBottom: 60}}>
                <View
                  style={{
                    padding: 10,
                    borderBottomWidth: 0.5,
                    borderColor: '#cc8b0f',
                    marginBottom: 5,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      <Image
                        style={{width: 30, height: 30, borderRadius: 50}}
                        source={{
                          uri: 'https://i.imghippo.com/files/nBZ5038joU.png',
                        }}
                      />
                      <View>
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: 'Avenir',
                            fontWeight: '900',
                            color: '#000000',
                          }}>
                          Test User
                        </Text>

                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 5,
                            marginTop: 5,
                          }}>
                          <Ionicons name="star" size={12} color="#333333" />
                          <Text style={{color: '#333333', fontSize: 14}}>
                            4.8
                          </Text>
                        </View>
                      </View>
                    </View>
                    <Ionicons
                      name="ellipsis-vertical"
                      size={24}
                      color="#6C6C6C"
                    />
                  </View>

                  <View>
                    <Text
                      style={{
                        color: '#6C6C6C',
                        fontFamily: 'Avenir',
                        fontSize: 14,
                        marginTop: 10,
                        fontWeight: '400',
                      }}>
                      Lorem ipsum dolor sit ametconsectetur. Morbi neque semper
                      cras nunc aliquam sed. Sollicitudin hendrerit dolor varius
                      nunc proin done
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      alignSelf: 'left',
                      paddingVertical: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 10,
                        alignItems: 'center',
                      }}>
                      {/* <Ionicons name="heart" size={24} color="#db3838" /> */}
                      <Ionicons
                        name="heart-outline"
                        size={24}
                        color="#6C6C6C"
                      />
                      <Text>33 likes</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 10,
                        alignItems: 'center',
                      }}>
                      <Ionicons name="share" size={24} color="#db3838" />
                      {/* <Ionicons name="share-outline" size={24} color="#6C6C6C" /> */}
                      <Text>33 shares</Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    padding: 10,
                    borderBottomWidth: 0.5,
                    borderColor: '#cc8b0f',
                    marginBottom: 5,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      <Image
                        style={{width: 30, height: 30, borderRadius: 50}}
                        source={{
                          uri: 'https://i.imghippo.com/files/nBZ5038joU.png',
                        }}
                      />
                      <View>
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: 'Avenir',
                            fontWeight: '900',
                            color: '#000000',
                          }}>
                          Test User
                        </Text>

                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 5,
                            marginTop: 5,
                          }}>
                          <Ionicons name="star" size={12} color="#333333" />
                          <Text style={{color: '#333333', fontSize: 14}}>
                            4.8
                          </Text>
                        </View>
                      </View>
                    </View>
                    <Ionicons
                      name="ellipsis-vertical"
                      size={24}
                      color="#6C6C6C"
                    />
                  </View>
                  <Image
                    style={{
                      width: '100%',
                      height: 180,
                      marginTop: 20,
                      marginBottom: 10,
                    }}
                    source={{
                      uri: 'https://i.imghippo.com/files/fCK2896Q.png',
                    }}
                  />
                  <View>
                    <Text
                      style={{
                        color: '#6C6C6C',
                        fontFamily: 'Avenir',
                        fontSize: 14,
                        marginTop: 10,
                        fontWeight: '400',
                      }}>
                      Lorem ipsum dolor sit ametconsectetur. Morbi neque semper
                      cras nunc aliquam sed. Sollicitudin hendrerit dolor varius
                      nunc proin done
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      alignSelf: 'left',
                      paddingVertical: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 10,
                        alignItems: 'center',
                      }}>
                      <Ionicons name="heart" size={24} color="#db3838" />
                      {/* <Ionicons
                        name="heart-outline"
                        size={24}
                        color="#6C6C6C"
                      /> */}
                      <Text>33 likes</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 10,
                        alignItems: 'center',
                      }}>
                      <Ionicons name="share" size={24} color="#db3838" />
                      {/* <Ionicons name="share-outline" size={24} color="#6C6C6C" /> */}
                      <Text>33 shares</Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
            {activeTab === 'Testimonials' && (
              <View style={{marginBottom: 60}}>
                <View
                  style={{
                    padding: 10,
                    borderBottomWidth: 0.5,
                    borderColor: '#cc8b0f',
                    marginBottom: 5,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      <Image
                        style={{width: 30, height: 30, borderRadius: 50}}
                        source={{
                          uri: 'https://i.imghippo.com/files/nBZ5038joU.png',
                        }}
                      />
                      <View>
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: 'Avenir',
                            fontWeight: '900',
                            color: '#000000',
                          }}>
                          Test User
                        </Text>

                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 5,
                          }}>
                          <Ionicons name="star" size={12} color="#333333" />
                          <Ionicons name="star" size={12} color="#333333" />
                          <Ionicons name="star" size={12} color="#333333" />
                          <Ionicons name="star" size={12} color="#333333" />
                          <Ionicons name="star" size={12} color="#333333" />
                        </View>
                      </View>
                    </View>
                    <Ionicons
                      name="ellipsis-vertical"
                      size={24}
                      color="#6C6C6C"
                    />
                  </View>

                  <View>
                    <Text
                      style={{
                        color: '#6C6C6C',
                        fontFamily: 'Avenir',
                        fontSize: 14,
                        marginTop: 10,
                        fontWeight: '400',
                      }}>
                      Lorem ipsum dolor sit ametconsectetur. Morbi neque semper
                      cras nunc aliquam sed. Sollicitudin hendrerit dolor varius
                      nunc proin done
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      alignSelf: 'left',
                      paddingVertical: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 10,
                        alignItems: 'center',
                      }}>
                      <Ionicons name="heart" size={24} color="#db3838" />
                      {/* <Ionicons name="heart-outline" size={24} color="#6C6C6C" /> */}
                      <Text>33 likes</Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    padding: 10,
                    borderBottomWidth: 0.5,
                    borderColor: '#cc8b0f',
                    marginBottom: 5,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      <Image
                        style={{width: 30, height: 30, borderRadius: 50}}
                        source={{
                          uri: 'https://i.imghippo.com/files/nBZ5038joU.png',
                        }}
                      />
                      <View>
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: 'Avenir',
                            fontWeight: '900',
                            color: '#000000',
                          }}>
                          Test User
                        </Text>

                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 5,
                            marginTop: 5,
                          }}>
                          <Ionicons name="star" size={12} color="#333333" />
                          <Ionicons name="star" size={12} color="#333333" />
                          <Ionicons name="star" size={12} color="#333333" />
                          <Ionicons name="star" size={12} color="#333333" />
                          <Ionicons
                            name="star-half"
                            size={12}
                            color="#333333"
                          />
                        </View>
                      </View>
                    </View>
                    <Ionicons
                      name="ellipsis-vertical"
                      size={24}
                      color="#6C6C6C"
                    />
                  </View>

                  <View>
                    <Text
                      style={{
                        color: '#6C6C6C',
                        fontFamily: 'Avenir',
                        fontSize: 14,
                        marginTop: 10,
                        fontWeight: '400',
                      }}>
                      Lorem ipsum dolor sit ametconsectetur. Morbi neque semper
                      cras nunc aliquam sed. Sollicitudin hendrerit dolor varius
                      nunc proin done
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      alignSelf: 'left',
                      paddingVertical: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 10,
                        alignItems: 'center',
                      }}>
                      {/* <Ionicons name="heart" size={24} color="#db3838" /> */}
                      <Ionicons
                        name="heart-outline"
                        size={24}
                        color="#6C6C6C"
                      />
                      <Text>33 likes</Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
        {isAMentee && activeTab === 'Testimonials' && (
          <View>
            <View
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                borderTopWidth: 1,
                borderTopColor: '#dddddd',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                paddingTop: 10,
              }}>
              <View>
                <Text
                  style={{
                    color: '#000000',
                    fontWeight: 'bold',
                    fontFamily: 'Avenir',
                    textAlign: 'center',
                    fontSize: 16,
                  }}>
                  How was the quality of your session?
                </Text>
                <Text
                  style={{
                    fontFamily: 'Avenir',
                    color: '#000000',
                    textAlign: 'center',
                    fontSize: 14,
                    padding: 10,
                  }}>
                  Your answer is anonymous. Platinum Fuse to help improve your
                  experience
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 5,
                    paddingBottom: 10,
                  }}>
                  <MaterialCommunityIcons
                    name="star"
                    color="#F8B930"
                    size={26}
                  />
                  <MaterialCommunityIcons
                    name="star"
                    color="#F8B930"
                    size={26}
                  />
                  <MaterialCommunityIcons
                    name="star"
                    color="#F8B930"
                    size={26}
                  />
                  <MaterialCommunityIcons
                    name="star"
                    color="#F8B930"
                    size={26}
                  />
                  <MaterialCommunityIcons
                    name="star-outline"
                    color="#333"
                    size={26}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderTopWidth: 1,
                borderTopColor: '#dddddd',
                marginBottom: 20,
              }}>
              <TextInput
                //  ref={(ref)=>{this.myTextInput = ref}}
                placeholder="Leave a review ..."
                placeholderTextColor="#6C6C6C"
                value={message}
                onChangeText={text => setMessage(text)}
                style={{
                  flex: 1,
                  height: 40,
                  borderWidth: 1,
                  borderColor: '#6C6C6C',
                  borderRadius: 20,
                  paddingHorizontal: 10,
                  marginRight: 10,
                }}
              />

              <TouchableOpacity
                activeOpacity={0.7}
                // onPress={() =>
                //   sendMessage(userId, route?.params?.receiverId)
                // }
                style={{
                  backgroundColor: '#0099FF',
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 20,
                }}>
                <Text style={{textAlign: 'center', color: 'white'}}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  welcomeImage: {
    marginBottom: 20,
    width: 300,
    height: 300,
    borderRadius: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 2,
    borderColor: '#4D4D4D80',
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

  button: {
    width: '50%',
    alignItems: 'center',
    backgroundColor: '#A8000E',
    padding: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#000000',
    fontFamily: 'Avenir',
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
