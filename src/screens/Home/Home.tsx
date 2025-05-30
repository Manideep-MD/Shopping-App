import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useCustomTheme} from '../../theme/ThemeContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Dropdown} from 'react-native-element-dropdown';
import LocationIcon from 'react-native-vector-icons/Ionicons';
import NotificationIcon from 'react-native-vector-icons/Ionicons';
import SearchIcon from 'react-native-vector-icons/AntDesign';
import OptionIcon from 'react-native-vector-icons/Ionicons';
import CustomCarousel from '../../components/CustomCarousel/CustomCarousel';

const LocationData = [
  {
    id: 1,
    location: 'Hyderabad, JNTU',
  },
  {
    id: 2,
    location: 'Hyderabad, Kukatpally',
  },
  {
    id: 1,
    location: 'Hyderabad, Moosapet',
  },
];

const Home = () => {
  const {theme} = useCustomTheme();
  const styles = createStyle(theme);
  const [location, setLocation] = useState<any>(1);
  const [searchText, setSearchText] = useState<string>('');

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text style={{fontWeight: 300,fontSize:12}}>Location</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <LocationIcon
                  name="location-sharp"
                  size={20}
                  style={{color: theme?.primary}}
                />
                <Dropdown
                  style={styles.dropdown}
                  data={LocationData}
                  labelField="location"
                  valueField="id"
                  selectedTextStyle={{
                    color: 'black',
                    letterSpacing: 0.5,
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                  itemTextStyle={{color: 'black'}}
                  value={location}
                  iconColor="black"
                  // search
                  searchPlaceholder="Search..."
                  inputSearchStyle={{color: theme.text}}
                  onChange={item => setLocation(item.id)}
                />
              </View>
            </View>
            <View style={styles.notificationIcon}>
              <NotificationIcon
                name="notifications"
                size={20}
                color={theme.text}
              />
              <View style={styles.indicator}></View>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row', gap: 8}}>
          <View style={{position: 'relative'}}>
            <SearchIcon
              name="search1"
              size={28}
              style={{
                color: theme?.primary,
                position: 'absolute',
                top: 10,
                left: 10,
              }}
            />
            <TextInput
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search"
              placeholderTextColor={theme.text}
              style={{
                width: wp('78%'),
                borderWidth: 1,
                borderRadius: 25,
                height: 50,
                borderColor: '#ccc',
                paddingLeft: 45,
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              backgroundColor: theme.primary,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <OptionIcon
              name="options-outline"
              size={30}
              style={{color: theme.background}}
            />
          </TouchableOpacity>
        </View>
        <View>
          <CustomCarousel />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const createStyle = (theme: any) =>
  StyleSheet.create({
    container: {
      width: wp('100%'),
      paddingRight: 15,
      paddingLeft:15,
      gap:10
    },
    dropdown: {
      width: wp('43%'),
      borderRadius: 5,
      color: theme.secondaryBG,
      height: 40,
    },
    notificationIcon: {
      width: 42,
      height: 42,
      // borderWidth: 1,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      backgroundColor: theme?.inActive,
    },
    indicator: {
      backgroundColor: 'red',
      width: 7,
      height: 7,
      borderRadius: 50,
      position: 'absolute',
      top: 10,
      right: 11,
    },
  });
