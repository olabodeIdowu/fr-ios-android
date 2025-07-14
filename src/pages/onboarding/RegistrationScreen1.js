import {useContext, useState} from 'react';
import axios from 'axios';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../../context/authContext';
import {url} from '../../hooks/useUrl';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function RegistrationScreen1({navigation, route: {params}}) {
  const {auth, setAuth} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState('');
  const [phone, setPhone] = useState('');

  const userForm = {phone};

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View style={{width: 100}}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              //  Go back to the previous screen.
              navigation.goBack();
            }}>
            <Text style={styles.backText}>&larr;</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.primary_heading}>Enter Your Phone number</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            margin: 10,
          }}>
          <SelectList
            // onSelect={() => alert(selected)}
            setSelected={setSelected}
            fontFamily="Avenir"
            data={countries}
            arrowicon={
              <MaterialCommunityIcons
                name="chevron-down"
                size={12}
                color="black"
              />
            }
            searchicon={
              <MaterialCommunityIcons name="magnify" size={12} color="black" />
            }
            search={false}
            boxStyles={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              border: 'none',
              borderRadius: 8,
              backgroundColor: '#D9D9D9',
            }} //override default styles
            defaultOption={{key: 'NG', value: '+234'}} //default selected option
          />
          <TextInput
            name="phone"
            style={styles.input}
            onChangeText={text => setPhone(text)}
            autoCapitalize="none"
            value={phone}
            placeholder="Phone number"
            placeholderTextColor="#888"
            // secureTextEntry={true}
          />
        </View>
        <View>
          <Text
            style={{
              fontFamily: 'Avenir',
              fontSize: 14,
              color: '#333',
              marginBottom: 10,
              padding: 10,
            }}>
            We'll text you a code to confirm your number
          </Text>
        </View>

        <Pressable
          style={styles.continueButton}
          onPress={() => {
            navigation.navigate('VerifyOTPScreen', {userForm: userForm});
          }}
          activeOpacity={0.5}>
          {isLoading ? (
            <View style={styles.horizontal}>
              <ActivityIndicator />
            </View>
          ) : (
            <Text style={styles.continueButtonText}>Continue</Text>
          )}
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#F7F7F7',
  },

  backText: {
    fontSize: 36,
    color: '#000000',
    fontFamily: 'Avenir',
    padding: 10,
  },

  loginNavText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
  primary_heading: {
    fontFamily: 'Avenir',
    paddingBlock: 5,
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginLeft: 10,
  },
  input: {
    width: '70%',
    borderWidth: 0.2,
    padding: 15,
    backgroundColor: '#D9D9D9',
    borderRadius: 6,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },

  continueButton: {
    borderWidth: 1,
    borderColor: '#ffffff',
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    padding: 15,
    color: '#ffffff',
    borderRadius: 8,
    backgroundColor: '#8D020E',
    justifyContent: 'center',
    margin: 10,
    marginBottom: 20,
  },

  continueButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

const countries = [
  {
    label: 'Afghanistan',
    value: '+93',
    key: 'AF',
  },
  {
    label: 'Aland Islands',
    value: '+358',
    key: 'AX',
  },
  {
    label: 'Albania',
    value: '+355',
    key: 'AL',
  },
  {
    label: 'Algeria',
    value: '+213',
    key: 'DZ',
  },
  {
    label: 'AmericanSamoa',
    value: '+1684',
    key: 'AS',
  },
  {
    label: 'Andorra',
    value: '+376',
    key: 'AD',
  },
  {
    label: 'Angola',
    value: '+244',
    key: 'AO',
  },
  {
    label: 'Anguilla',
    value: '+1264',
    key: 'AI',
  },
  {
    label: 'Antarctica',
    value: '+672',
    key: 'AQ',
  },
  {
    label: 'Antigua and Barbuda',
    value: '+1268',
    key: 'AG',
  },
  {
    label: 'Argentina',
    value: '+54',
    key: 'AR',
  },
  {
    label: 'Armenia',
    value: '+374',
    key: 'AM',
  },
  {
    label: 'Aruba',
    value: '+297',
    key: 'AW',
  },
  {
    label: 'Australia',
    value: '+61',
    key: 'AU',
  },
  {
    label: 'Austria',
    value: '+43',
    key: 'AT',
  },
  {
    label: 'Azerbaijan',
    value: '+994',
    key: 'AZ',
  },
  {
    label: 'Bahamas',
    value: '+1242',
    key: 'BS',
  },
  {
    label: 'Bahrain',
    value: '+973',
    key: 'BH',
  },
  {
    label: 'Bangladesh',
    value: '+880',
    key: 'BD',
  },
  {
    label: 'Barbados',
    value: '+1246',
    key: 'BB',
  },
  {
    label: 'Belarus',
    value: '+375',
    key: 'BY',
  },
  {
    label: 'Belgium',
    value: '+32',
    key: 'BE',
  },
  {
    label: 'Belize',
    value: '+501',
    key: 'BZ',
  },
  {
    label: 'Benin',
    value: '+229',
    key: 'BJ',
  },
  {
    label: 'Bermuda',
    value: '+1441',
    key: 'BM',
  },
  {
    label: 'Bhutan',
    value: '+975',
    key: 'BT',
  },
  {
    label: 'Bolivia, Plurinational State of',
    value: '+591',
    key: 'BO',
  },
  {
    label: 'Bosnia and Herzegovina',
    value: '+387',
    key: 'BA',
  },
  {
    label: 'Botswana',
    value: '+267',
    key: 'BW',
  },
  {
    label: 'Brazil',
    value: '+55',
    key: 'BR',
  },
  {
    label: 'British Indian Ocean Territory',
    value: '+246',
    key: 'IO',
  },
  {
    label: 'Brunei Darussalam',
    value: '+673',
    key: 'BN',
  },
  {
    label: 'Bulgaria',
    value: '+359',
    key: 'BG',
  },
  {
    label: 'Burkina Faso',
    value: '+226',
    key: 'BF',
  },
  {
    label: 'Burundi',
    value: '+257',
    key: 'BI',
  },
  {
    label: 'Cambodia',
    value: '+855',
    key: 'KH',
  },
  {
    label: 'Cameroon',
    value: '+237',
    key: 'CM',
  },
  {
    label: 'Canada',
    value: '+1',
    key: 'CA',
  },
  {
    label: 'Cape Verde',
    value: '+238',
    key: 'CV',
  },
  {
    label: 'Cayman Islands',
    value: '+ 345',
    key: 'KY',
  },
  {
    label: 'Central African Republic',
    value: '+236',
    key: 'CF',
  },
  {
    label: 'Chad',
    value: '+235',
    key: 'TD',
  },
  {
    label: 'Chile',
    value: '+56',
    key: 'CL',
  },
  {
    label: 'China',
    value: '+86',
    key: 'CN',
  },
  {
    label: 'Christmas Island',
    value: '+61',
    key: 'CX',
  },
  {
    label: 'Cocos (Keeling) Islands',
    value: '+61',
    key: 'CC',
  },
  {
    label: 'Colombia',
    value: '+57',
    key: 'CO',
  },
  {
    label: 'Comoros',
    value: '+269',
    key: 'KM',
  },
  {
    label: 'Congo',
    value: '+242',
    key: 'CG',
  },
  {
    label: 'Congo, The Democratic Republic of the Congo',
    value: '+243',
    key: 'CD',
  },
  {
    label: 'Cook Islands',
    value: '+682',
    key: 'CK',
  },
  {
    label: 'Costa Rica',
    value: '+506',
    key: 'CR',
  },
  {
    label: "Cote d'Ivoire",
    value: '+225',
    key: 'CI',
  },
  {
    label: 'Croatia',
    value: '+385',
    key: 'HR',
  },
  {
    label: 'Cuba',
    value: '+53',
    key: 'CU',
  },
  {
    label: 'Cyprus',
    value: '+357',
    key: 'CY',
  },
  {
    label: 'Czech Republic',
    value: '+420',
    key: 'CZ',
  },
  {
    label: 'Denmark',
    value: '+45',
    key: 'DK',
  },
  {
    label: 'Djibouti',
    value: '+253',
    key: 'DJ',
  },
  {
    label: 'Dominica',
    value: '+1767',
    key: 'DM',
  },
  {
    label: 'Dominican Republic',
    value: '+1849',
    key: 'DO',
  },
  {
    label: 'Ecuador',
    value: '+593',
    key: 'EC',
  },
  {
    label: 'Egypt',
    value: '+20',
    key: 'EG',
  },
  {
    label: 'El Salvador',
    value: '+503',
    key: 'SV',
  },
  {
    label: 'Equatorial Guinea',
    value: '+240',
    key: 'GQ',
  },
  {
    label: 'Eritrea',
    value: '+291',
    key: 'ER',
  },
  {
    label: 'Estonia',
    value: '+372',
    key: 'EE',
  },
  {
    label: 'Ethiopia',
    value: '+251',
    key: 'ET',
  },
  {
    label: 'Falkland Islands (Malvinas)',
    value: '+500',
    key: 'FK',
  },
  {
    label: 'Faroe Islands',
    value: '+298',
    key: 'FO',
  },
  {
    label: 'Fiji',
    value: '+679',
    key: 'FJ',
  },
  {
    label: 'Finland',
    value: '+358',
    key: 'FI',
  },
  {
    label: 'France',
    value: '+33',
    key: 'FR',
  },
  {
    label: 'French Guiana',
    value: '+594',
    key: 'GF',
  },
  {
    label: 'French Polynesia',
    value: '+689',
    key: 'PF',
  },
  {
    label: 'Gabon',
    value: '+241',
    key: 'GA',
  },
  {
    label: 'Gambia',
    value: '+220',
    key: 'GM',
  },
  {
    label: 'Georgia',
    value: '+995',
    key: 'GE',
  },
  {
    label: 'Germany',
    value: '+49',
    key: 'DE',
  },
  {
    label: 'Ghana',
    value: '+233',
    key: 'GH',
  },
  {
    label: 'Gibraltar',
    value: '+350',
    key: 'GI',
  },
  {
    label: 'Greece',
    value: '+30',
    key: 'GR',
  },
  {
    label: 'Greenland',
    value: '+299',
    key: 'GL',
  },
  {
    label: 'Grenada',
    value: '+1473',
    key: 'GD',
  },
  {
    label: 'Guadeloupe',
    value: '+590',
    key: 'GP',
  },
  {
    label: 'Guam',
    value: '+1671',
    key: 'GU',
  },
  {
    label: 'Guatemala',
    value: '+502',
    key: 'GT',
  },
  {
    label: 'Guernsey',
    value: '+44',
    key: 'GG',
  },
  {
    label: 'Guinea',
    value: '+224',
    key: 'GN',
  },
  {
    label: 'Guinea-Bissau',
    value: '+245',
    key: 'GW',
  },
  {
    label: 'Guyana',
    value: '+595',
    key: 'GY',
  },
  {
    label: 'Haiti',
    value: '+509',
    key: 'HT',
  },
  {
    label: 'Holy See (Vatican City State)',
    value: '+379',
    key: 'VA',
  },
  {
    label: 'Honduras',
    value: '+504',
    key: 'HN',
  },
  {
    label: 'Hong Kong',
    value: '+852',
    key: 'HK',
  },
  {
    label: 'Hungary',
    value: '+36',
    key: 'HU',
  },
  {
    label: 'Iceland',
    value: '+354',
    key: 'IS',
  },
  {
    label: 'India',
    value: '+91',
    key: 'IN',
  },
  {
    label: 'Indonesia',
    value: '+62',
    key: 'ID',
  },
  {
    label: 'Iran, Islamic Republic of Persian Gulf',
    value: '+98',
    key: 'IR',
  },
  {
    label: 'Iraq',
    value: '+964',
    key: 'IQ',
  },
  {
    label: 'Ireland',
    value: '+353',
    key: 'IE',
  },
  {
    label: 'Isle of Man',
    value: '+44',
    key: 'IM',
  },
  {
    label: 'Israel',
    value: '+972',
    key: 'IL',
  },
  {
    label: 'Italy',
    value: '+39',
    key: 'IT',
  },
  {
    label: 'Jamaica',
    value: '+1876',
    key: 'JM',
  },
  {
    label: 'Japan',
    value: '+81',
    key: 'JP',
  },
  {
    label: 'Jersey',
    value: '+44',
    key: 'JE',
  },
  {
    label: 'Jordan',
    value: '+962',
    key: 'JO',
  },
  {
    label: 'Kazakhstan',
    value: '+77',
    key: 'KZ',
  },
  {
    label: 'Kenya',
    value: '+254',
    key: 'KE',
  },
  {
    label: 'Kiribati',
    value: '+686',
    key: 'KI',
  },
  {
    label: "Korea, Democratic People's Republic of Korea",
    value: '+850',
    key: 'KP',
  },
  {
    label: 'Korea, Republic of South Korea',
    value: '+82',
    key: 'KR',
  },
  {
    label: 'Kuwait',
    value: '+965',
    key: 'KW',
  },
  {
    label: 'Kyrgyzstan',
    value: '+996',
    key: 'KG',
  },
  {
    label: 'Laos',
    value: '+856',
    key: 'LA',
  },
  {
    label: 'Latvia',
    value: '+371',
    key: 'LV',
  },
  {
    label: 'Lebanon',
    value: '+961',
    key: 'LB',
  },
  {
    label: 'Lesotho',
    value: '+266',
    key: 'LS',
  },
  {
    label: 'Liberia',
    value: '+231',
    key: 'LR',
  },
  {
    label: 'Libyan Arab Jamahiriya',
    value: '+218',
    key: 'LY',
  },
  {
    label: 'Liechtenstein',
    value: '+423',
    key: 'LI',
  },
  {
    label: 'Lithuania',
    value: '+370',
    key: 'LT',
  },
  {
    label: 'Luxembourg',
    value: '+352',
    key: 'LU',
  },
  {
    label: 'Macao',
    value: '+853',
    key: 'MO',
  },
  {
    label: 'Macedonia',
    value: '+389',
    key: 'MK',
  },
  {
    label: 'Madagascar',
    value: '+261',
    key: 'MG',
  },
  {
    label: 'Malawi',
    value: '+265',
    key: 'MW',
  },
  {
    label: 'Malaysia',
    value: '+60',
    key: 'MY',
  },
  {
    label: 'Maldives',
    value: '+960',
    key: 'MV',
  },
  {
    label: 'Mali',
    value: '+223',
    key: 'ML',
  },
  {
    label: 'Malta',
    value: '+356',
    key: 'MT',
  },
  {
    label: 'Marshall Islands',
    value: '+692',
    key: 'MH',
  },
  {
    label: 'Martinique',
    value: '+596',
    key: 'MQ',
  },
  {
    label: 'Mauritania',
    value: '+222',
    key: 'MR',
  },
  {
    label: 'Mauritius',
    value: '+230',
    key: 'MU',
  },
  {
    label: 'Mayotte',
    value: '+262',
    key: 'YT',
  },
  {
    label: 'Mexico',
    value: '+52',
    key: 'MX',
  },
  {
    label: 'Micronesia, Federated States of Micronesia',
    value: '+691',
    key: 'FM',
  },
  {
    label: 'Moldova',
    value: '+373',
    key: 'MD',
  },
  {
    label: 'Monaco',
    value: '+377',
    key: 'MC',
  },
  {
    label: 'Mongolia',
    value: '+976',
    key: 'MN',
  },
  {
    label: 'Montenegro',
    value: '+382',
    key: 'ME',
  },
  {
    label: 'Montserrat',
    value: '+1664',
    key: 'MS',
  },
  {
    label: 'Morocco',
    value: '+212',
    key: 'MA',
  },
  {
    label: 'Mozambique',
    value: '+258',
    key: 'MZ',
  },
  {
    label: 'Myanmar',
    value: '+95',
    key: 'MM',
  },
  {
    label: 'Namibia',
    value: '+264',
    key: 'NA',
  },
  {
    label: 'Nauru',
    value: '+674',
    key: 'NR',
  },
  {
    label: 'Nepal',
    value: '+977',
    key: 'NP',
  },
  {
    label: 'Netherlands',
    value: '+31',
    key: 'NL',
  },
  {
    label: 'Netherlands Antilles',
    value: '+599',
    key: 'AN',
  },
  {
    label: 'New Caledonia',
    value: '+687',
    key: 'NC',
  },
  {
    label: 'New Zealand',
    value: '+64',
    key: 'NZ',
  },
  {
    label: 'Nicaragua',
    value: '+505',
    key: 'NI',
  },
  {
    label: 'Niger',
    value: '+227',
    key: 'NE',
  },
  {
    label: 'Nigeria',
    value: '+234',
    key: 'NG',
  },
  {
    label: 'Niue',
    value: '+683',
    key: 'NU',
  },
  {
    label: 'Norfolk Island',
    value: '+672',
    key: 'NF',
  },
  {
    label: 'Northern Mariana Islands',
    value: '+1670',
    key: 'MP',
  },
  {
    label: 'Norway',
    value: '+47',
    key: 'NO',
  },
  {
    label: 'Oman',
    value: '+968',
    key: 'OM',
  },
  {
    label: 'Pakistan',
    value: '+92',
    key: 'PK',
  },
  {
    label: 'Palau',
    value: '+680',
    key: 'PW',
  },
  {
    label: 'Palestinian Territory, Occupied',
    value: '+970',
    key: 'PS',
  },
  {
    label: 'Panama',
    value: '+507',
    key: 'PA',
  },
  {
    label: 'Papua New Guinea',
    value: '+675',
    key: 'PG',
  },
  {
    label: 'Paraguay',
    value: '+595',
    key: 'PY',
  },
  {
    label: 'Peru',
    value: '+51',
    key: 'PE',
  },
  {
    label: 'Philippines',
    value: '+63',
    key: 'PH',
  },
  {
    label: 'Pitcairn',
    value: '+872',
    key: 'PN',
  },
  {
    label: 'Poland',
    value: '+48',
    key: 'PL',
  },
  {
    label: 'Portugal',
    value: '+351',
    key: 'PT',
  },
  {
    label: 'Puerto Rico',
    value: '+1939',
    key: 'PR',
  },
  {
    label: 'Qatar',
    value: '+974',
    key: 'QA',
  },
  {
    label: 'Romania',
    value: '+40',
    key: 'RO',
  },
  {
    label: 'Russia',
    value: '+7',
    key: 'RU',
  },
  {
    label: 'Rwanda',
    value: '+250',
    key: 'RW',
  },
  {
    label: 'Reunion',
    value: '+262',
    key: 'RE',
  },
  {
    label: 'Saint Barthelemy',
    value: '+590',
    key: 'BL',
  },
  {
    label: 'Saint Helena, Ascension and Tristan Da Cunha',
    value: '+290',
    key: 'SH',
  },
  {
    label: 'Saint Kitts and Nevis',
    value: '+1869',
    key: 'KN',
  },
  {
    label: 'Saint Lucia',
    value: '+1758',
    key: 'LC',
  },
  {
    label: 'Saint Martin',
    value: '+590',
    key: 'MF',
  },
  {
    label: 'Saint Pierre and Miquelon',
    value: '+508',
    key: 'PM',
  },
  {
    label: 'Saint Vincent and the Grenadines',
    value: '+1784',
    key: 'VC',
  },
  {
    label: 'Samoa',
    value: '+685',
    key: 'WS',
  },
  {
    label: 'San Marino',
    value: '+378',
    key: 'SM',
  },
  {
    label: 'Sao Tome and Principe',
    value: '+239',
    key: 'ST',
  },
  {
    label: 'Saudi Arabia',
    value: '+966',
    key: 'SA',
  },
  {
    label: 'Senegal',
    value: '+221',
    key: 'SN',
  },
  {
    label: 'Serbia',
    value: '+381',
    key: 'RS',
  },
  {
    label: 'Seychelles',
    value: '+248',
    key: 'SC',
  },
  {
    label: 'Sierra Leone',
    value: '+232',
    key: 'SL',
  },
  {
    label: 'Singapore',
    value: '+65',
    key: 'SG',
  },
  {
    label: 'Slovakia',
    value: '+421',
    key: 'SK',
  },
  {
    label: 'Slovenia',
    value: '+386',
    key: 'SI',
  },
  {
    label: 'Solomon Islands',
    value: '+677',
    key: 'SB',
  },
  {
    label: 'Somalia',
    value: '+252',
    key: 'SO',
  },
  {
    label: 'South Africa',
    value: '+27',
    key: 'ZA',
  },
  {
    label: 'South Sudan',
    value: '+211',
    key: 'SS',
  },
  {
    label: 'South Georgia and the South Sandwich Islands',
    value: '+500',
    key: 'GS',
  },
  {
    label: 'Spain',
    value: '+34',
    key: 'ES',
  },
  {
    label: 'Sri Lanka',
    value: '+94',
    key: 'LK',
  },
  {
    label: 'Sudan',
    value: '+249',
    key: 'SD',
  },
  {
    label: 'Surivalue',
    value: '+597',
    key: 'SR',
  },
  {
    label: 'Svalbard and Jan Mayen',
    value: '+47',
    key: 'SJ',
  },
  {
    label: 'Swaziland',
    value: '+268',
    key: 'SZ',
  },
  {
    label: 'Sweden',
    value: '+46',
    key: 'SE',
  },
  {
    label: 'Switzerland',
    value: '+41',
    key: 'CH',
  },
  {
    label: 'Syrian Arab Republic',
    value: '+963',
    key: 'SY',
  },
  {
    label: 'Taiwan',
    value: '+886',
    key: 'TW',
  },
  {
    label: 'Tajikistan',
    value: '+992',
    key: 'TJ',
  },
  {
    label: 'Tanzania, United Republic of Tanzania',
    value: '+255',
    key: 'TZ',
  },
  {
    label: 'Thailand',
    value: '+66',
    key: 'TH',
  },
  {
    label: 'Timor-Leste',
    value: '+670',
    key: 'TL',
  },
  {
    label: 'Togo',
    value: '+228',
    key: 'TG',
  },
  {
    label: 'Tokelau',
    value: '+690',
    key: 'TK',
  },
  {
    label: 'Tonga',
    value: '+676',
    key: 'TO',
  },
  {
    label: 'Trinidad and Tobago',
    value: '+1868',
    key: 'TT',
  },
  {
    label: 'Tunisia',
    value: '+216',
    key: 'TN',
  },
  {
    label: 'Turkey',
    value: '+90',
    key: 'TR',
  },
  {
    label: 'Turkmenistan',
    value: '+993',
    key: 'TM',
  },
  {
    label: 'Turks and Caicos Islands',
    value: '+1649',
    key: 'TC',
  },
  {
    label: 'Tuvalu',
    value: '+688',
    key: 'TV',
  },
  {
    label: 'Uganda',
    value: '+256',
    key: 'UG',
  },
  {
    label: 'Ukraine',
    value: '+380',
    key: 'UA',
  },
  {
    label: 'United Arab Emirates',
    value: '+971',
    key: 'AE',
  },
  {
    label: 'United Kingdom',
    value: '+44',
    key: 'GB',
  },
  {
    label: 'United States',
    value: '+1',
    key: 'US',
  },
  {
    label: 'Uruguay',
    value: '+598',
    key: 'UY',
  },
  {
    label: 'Uzbekistan',
    value: '+998',
    key: 'UZ',
  },
  {
    label: 'Vanuatu',
    value: '+678',
    key: 'VU',
  },
  {
    label: 'Venezuela, Bolivarian Republic of Venezuela',
    value: '+58',
    key: 'VE',
  },
  {
    label: 'Vietnam',
    value: '+84',
    key: 'VN',
  },
  {
    label: 'Virgin Islands, British',
    value: '+1284',
    key: 'VG',
  },
  {
    label: 'Virgin Islands, U.S.',
    value: '+1340',
    key: 'VI',
  },
  {
    label: 'Wallis and Futuna',
    value: '+681',
    key: 'WF',
  },
  {
    label: 'Yemen',
    value: '+967',
    key: 'YE',
  },
  {
    label: 'Zambia',
    value: '+260',
    key: 'ZM',
  },
  {
    label: 'Zimbabwe',
    value: '+263',
    key: 'ZW',
  },
];
