import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AccountSettingButton from '../buttons/AccountSettingButton';
import DiscoverySettingButton from '../buttons/DiscoverySettingButton';
import WYSButton from '../buttons/WYSButton';
import CVButton from '../buttons/CVButton';
import EnableDiscoveryBtn from '../buttons/EnableDiscoveryBtn';
import CreateUsernameBtn from '../buttons/CreateUsernameBtn';
import ManageReceiptBtn from '../buttons/ManageReceiptBtn';
import ActivityStatusBtn from '../buttons/ActivityStatusBtn';
import NotificationBtn from '../buttons/NotificationBtn';
import DisplayPreferenceBtn from '../buttons/DisplayPreferenceBtn';
import LogoutAccountBtn from '../buttons/LogoutAccountBtn';
import HelpSupportBtn from '../buttons/HelpSupportBtn';
import DeleteAccountBtn from '../buttons/DeleteAccountBtn';
import PaymentModal from './PaymentModal';
import EmailModal from './EmailModal';
import PhoneModal from './PhoneModal';
import ConnectedAccModal from './ConnectedAccModal';
import LocationModal from './LocationModal';
import LookingForModal from './LookingForModal';
import BlockContactButton from '../buttons/BlockContactButton';
import BlockContactModal from './BlockContactModal';
import CreateUsernameModal from './CreateUsernameModal';
import ReadReceiptModal from './ReadReceiptModal';
import ActivityStatusModal from './ActivityStatusModal';
import EmailNotifyModal from './EmailNotifyModal';
import PushNotifyModal from './PushNotifyModal';
import ShowDistanceModal from './ShowDistanceModal';
import LogoutAccountModal from './LogoutAccountModal';
import DeleteAccountModal from './DeleteAccountModal';
import BlockedUsersBtn from '../buttons/BlockedUserBtn';
import CancelSubscriptionBtn from '../buttons/CancelSubscriptionBtn';
import PrivacyPolicyBtn from '../buttons/PrivacyPolicyBtn';
import UserSupportTeamBtn from '../buttons/UserSupportTeamBtn';
import DeactivateAccountBtn from '../buttons/DeactivateAccountBtn';
import LanguagesModal from './LanguagesModal';

export default function SettingsModal({openSettings, setOpenSettings}) {
  const [openPayment, setOpenPayment] = useState(false);
  const [restorePayment, setRestorePayment] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [openPhone, setOpenPhone] = useState(false);
  const [openConnectedAcc, setOpenConnectedAcc] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [lookingFor, setLookingFor] = useState(false);
  const [blockContact, setBlockContact] = useState(false);
  const [openUsername, setOpenUsername] = useState(false);
  const [readReceipt, setReadReceipt] = useState(false);
  const [openActivityStatus, setOpenActivityStatus] = useState(false);
  const [openEmailNotify, setOpenEmailNotify] = useState(false);
  const [openPushNotify, setOpenPushNotify] = useState(false);
  const [showDistanceIn, setShowDistanceIn] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [openDeleteAccModal, setOpenDeleteAccModal] = useState(false);
  const [openLanguages, setOpenLanguages] = useState(false);

  return (
    <View style={styles.centered_view}>
      <Modal
        visible={openSettings}
        onRequestClose={() => setOpenSettings(false)}
        animationType="slide"
        presentationStyle="pageSheet"
        style={{flex: 1}}>
        <View>
          <View
            style={{
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              backgroundColor: '#fbf3f4',
              // paddingBottom: 20,
            }}>
            <View
              style={{
                backgroundColor: '#A8000E',
                width: 100,
                height: 5,
                margin: 'auto',
                borderRadius: 25,
                marginVertical: 10,
              }}></View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 100,
                alignSelf: 'flex-end',
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Avenir',
                  fontWeight: '900',
                  color: '#000000',
                  fontSize: 14,
                }}>
                Settings
              </Text>
              <TouchableOpacity
                onPress={() => setOpenSettings(false)}
                activeOpacity={0.7}>
                <Text
                  style={{
                    fontFamily: 'Avenir',
                    fontWeight: '900',
                    color: '#D9A525',
                    fontSize: 14,
                  }}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <AccountSettingButton
              setOpenPayment={setOpenPayment}
              setRestorePayment={setRestorePayment}
              setOpenEmail={setOpenEmail}
              setOpenPhone={setOpenPhone}
              setOpenConnectedAcc={setOpenConnectedAcc}
            />

            <Text style={styles.primaryText}>
              Verified Phone Number and Email help secure your account.
            </Text>

            <DiscoverySettingButton
              setOpenLocation={setOpenLocation}
              setLookingFor={setLookingFor}
            />
            <WYSButton />
            <CVButton />
            <EnableDiscoveryBtn />

            <Text style={styles.primaryText}>
              When turned off, your profile will be hidden from the card stack
              and Discovery will be disabled, People you have already Liked may
              still see and match with you.
            </Text>

            <BlockContactButton setBlockContact={setBlockContact} />
            <Text style={styles.primaryText}>
              Select people from your contact list that you don't want to see or
              be seen by on Dedott.
            </Text>

            <CreateUsernameBtn setOpenUsername={setOpenUsername} />

            <Text style={styles.primaryText}>
              Create a username. Share your username. Have people match you with
              your username on Dedott.
            </Text>
            <ManageReceiptBtn setReadReceipt={setReadReceipt} />
            <ActivityStatusBtn setOpenActivityStatus={setOpenActivityStatus} />
            <NotificationBtn
              setOpenEmailNotify={setOpenEmailNotify}
              setOpenPushNotify={setOpenPushNotify}
            />
            {/* <AppearanceBtn /> */}
            <DisplayPreferenceBtn
              setOpenLanguages={setOpenLanguages}
              setShowDistanceIn={setShowDistanceIn}
            />
            <BlockedUsersBtn />
            <CancelSubscriptionBtn />
            <PrivacyPolicyBtn />
            <HelpSupportBtn />
            <DeactivateAccountBtn />
            <LogoutAccountBtn setShowLogoutModal={setShowLogoutModal} />
            <DeleteAccountBtn setOpenDeleteAccModal={setOpenDeleteAccModal} />

            <PaymentModal
              openPayment={openPayment}
              setOpenPayment={setOpenPayment}
            />
            <EmailModal openEmail={openEmail} setOpenEmail={setOpenEmail} />
            <PhoneModal openPhone={openPhone} setOpenPhone={setOpenPhone} />
            <ConnectedAccModal
              openConnectedAcc={openConnectedAcc}
              setOpenConnectedAcc={setOpenConnectedAcc}
            />
            <LocationModal
              openLocation={openLocation}
              setOpenLocation={setOpenLocation}
            />
            <LookingForModal
              lookingFor={lookingFor}
              setLookingFor={setLookingFor}
            />
            <BlockContactModal
              blockContact={blockContact}
              setBlockContact={setBlockContact}
            />
            <CreateUsernameModal
              openUsername={openUsername}
              setOpenUsername={setOpenUsername}
            />
            <ReadReceiptModal
              readReceipt={readReceipt}
              setReadReceipt={setReadReceipt}
            />
            <ActivityStatusModal
              openActivityStatus={openActivityStatus}
              setOpenActivityStatus={setOpenActivityStatus}
            />
            <EmailNotifyModal
              openEmailNotify={openEmailNotify}
              setOpenEmailNotify={setOpenEmailNotify}
            />
            <PushNotifyModal
              openPushNotify={openPushNotify}
              setOpenPushNotify={setOpenPushNotify}
            />
            <LanguagesModal
              openLanguages={openLanguages}
              setOpenLanguages={setOpenLanguages}
            />
            <ShowDistanceModal
              showDistanceIn={showDistanceIn}
              setShowDistanceIn={setShowDistanceIn}
            />
            <LogoutAccountModal
              showLogoutModal={showLogoutModal}
              setShowLogoutModal={setShowLogoutModal}
            />
            <DeleteAccountModal
              openDeleteAccModal={openDeleteAccModal}
              setOpenDeleteAccModal={setOpenDeleteAccModal}
            />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  headerFlexText: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'right',
    gap: 100,
    marginTop: 100,
    borderBottomWidth: 0.2,
    borderColor: 'gray',
  },

  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000000',
  },

  primaryText: {
    fontFamily: 'Avenir',
    fontSize: 14,
    color: '#000000',
    padding: 10,
    lineHeight: 25,
  },

  closeModalText: {
    fontSize: 20,
    color: '#D9A525',
  },

  centered_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
  },

  plans_modal: {
    // width: '100%',
    // height: '100%',
    // backgroundColor: '#000000',
    // borderWidth: 1,
    // borderColor: '#000',
  },

  imageContainer: {
    position: 'relative',
  },
});
