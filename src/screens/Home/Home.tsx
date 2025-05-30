import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  VirtualizedList,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
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
import {FETCH_CATEGORIES, FETCH_PRODUCTS} from '../../api/api';
import {formatTime} from '../../Utils/TimeFormater';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import ProductCard from '../../components/ProductCard/ProductCard';

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

const Category = [
  {
    id: 1,
    title: 'T-shirt',
  },
];

const TWO_HOURS_IN_SECONDS = 2 * 60 * 60;

const Home = () => {
  const {theme} = useCustomTheme();
  const styles = createStyle(theme);
  const [location, setLocation] = useState<any>(1);
  const [searchText, setSearchText] = useState<string>('');
  const [categories, setCategories] = useState<any[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(TWO_HOURS_IN_SECONDS);
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<any[]>([]);

  const {hrs, mins, secs} = formatTime(secondsLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev === 0) {
          return TWO_HOURS_IN_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    handleFetchCategories();
    handleFetchProducts();
  }, []);

  const handleFetchCategories = async () => {
    try {
      setLoading(true);
      const response = await FETCH_CATEGORIES();

      if (response && response.status === 200) {
        setCategories(response?.data);
        console.log(response?.data, 'data--------->');
      } else {
        console.log('Error while fetching categories');
      }
    } catch (error) {
      console.log(error, 'error------->');
    } finally {
      setLoading(false);
    }
  };

  const handleFetchProducts = async () => {
    try {
      setLoading(true);
      const response = await FETCH_PRODUCTS();

      if (response && response.status === 200) {
        setProducts(response?.data);
        console.log(response?.data, 'products--------->');
      } else {
        console.log('Error while fetching categories');
      }
    } catch (error) {
      console.log(error, 'error------->');
    } finally {
      setLoading(false);
    }
  };

  const renderCategories = useCallback(({item}: {item: any}) => {
    return (
      <View style={styles.categoryItemContainer}>
        <View style={styles.categoryItem}>
          <Text style={styles.categoryText}>{item}</Text>
        </View>
      </View>
    );
  }, []);

  const renderProducts = useCallback(({item}: {item: any}) => {
    return (
      <View>
        <ProductCard item={item} />
      </View>
    );
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.locationLabel}>Location</Text>
            <View style={styles.locationRow}>
              <LocationIcon
                name="location-sharp"
                size={20}
                style={styles.locationIcon}
              />
              <Dropdown
                style={styles.dropdown}
                data={LocationData}
                labelField="location"
                valueField="id"
                selectedTextStyle={styles.dropdownSelectedText}
                itemTextStyle={styles.dropdownItemText}
                value={location}
                iconColor="black"
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
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <SearchIcon name="search1" size={25} style={styles.searchIcon} />
            <TextInput
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search"
              placeholderTextColor={theme.text}
              style={styles.searchInput}
            />
          </View>
          <TouchableOpacity style={styles.optionButton}>
            <OptionIcon
              name="options-outline"
              size={25}
              style={styles.optionIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <VirtualizedList
        keyExtractor={(_: any, index: any) => index.toString()}
        getItemCount={() => 1}
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        getItem={(_: any, index: any) => index}
        renderItem={() => (
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              <View>
                <CustomCarousel />
              </View>
              <View>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Category</Text>
                  <Text style={styles.seeAllText}>See All</Text>
                </View>
                {/* {loading ? (
            <CustomLoader visible={loading} message="Loading" />
          ) : (
            <FlatList
              data={categories}
              renderItem={renderCategories}
              keyExtractor={index => index.toString()}
              horizontal={true}
            />
          )} */}
              </View>
              <View>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Flash Sale</Text>
                  <View style={styles.timerContainer}>
                    <Text style={styles.closingText}>Closing in :</Text>
                    <View style={styles.timeBox}>
                      <Text style={styles.timeText}>{hrs}</Text>
                    </View>
                    <Text>:</Text>
                    <View style={styles.timeBox}>
                      <Text style={styles.timeText}>{mins}</Text>
                    </View>
                    <Text>:</Text>
                    <View style={styles.timeBox}>
                      <Text style={styles.timeText}>{secs}</Text>
                    </View>
                  </View>
                </View>
                {loading ? (
                  <CustomLoader visible={loading} message="Loading" />
                ) : (
                  <View style={styles.categoriesContainer}>
                    <FlatList
                      data={categories}
                      renderItem={renderCategories}
                      keyExtractor={index => index.toString()}
                      horizontal={true}
                    />
                  </View>
                )}
              </View>
              <View style={styles.productsContainer}>
                {loading ? (
                  <CustomLoader visible={loading} message="Loading" />
                ) : (
                  <FlatList
                    data={products}
                    renderItem={renderProducts}
                    keyExtractor={item => item?.id.toString()}
                    horizontal={false}
                    numColumns={2}
                    contentContainerStyle={styles.productsList}
                  />
                )}
              </View>
            </View>
          </ScrollView>
        )}
      />
    </>
  );
};

export default Home;

const createStyle = (theme: any) =>
  StyleSheet.create({
    container: {
      width: wp('100%'),
      paddingRight: 15,
      paddingLeft: 15,
      gap: 10,
      backgroundColor: theme.background,
      // paddingTop:20
    },
    scrollViewContent: {
      flexGrow: 1,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 15,
    },
    locationLabel: {
      fontWeight: '300',
      fontSize: 12,
    },
    locationRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    locationIcon: {
      color: theme?.primary,
    },
    dropdown: {
      width: wp('43%'),
      borderRadius: 5,
      color: theme.secondaryBG,
      height: 40,
    },
    dropdownSelectedText: {
      color: 'black',
      letterSpacing: 0.5,
      fontSize: 14,
      fontWeight: '500',
    },
    dropdownItemText: {
      color: 'black',
    },
    notificationIcon: {
      width: 42,
      height: 42,
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
      top: 12,
      right: 12,
      borderWidth: 1,
      borderColor: theme.background,
    },
    searchContainer: {
      flexDirection: 'row',
      gap: 10,
      paddingBottom: 10,
    },
    searchInputContainer: {
      position: 'relative',
    },
    searchIcon: {
      color: theme?.primary,
      position: 'absolute',
      top: 10,
      left: 10,
    },
    searchInput: {
      width: wp('78%'),
      borderWidth: 1,
      borderRadius: 25,
      height: 45,
      borderColor: '#ccc',
      paddingLeft: 45,
    },
    optionButton: {
      width: 40,
      height: 40,
      borderRadius: 50,
      backgroundColor: theme.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    optionIcon: {
      color: theme.background,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    sectionTitle: {
      fontSize: 18,
    },
    seeAllText: {
      fontSize: 12,
      color: theme.primary,
    },
    timerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 3,
    },
    closingText: {
      fontSize: 12,
      color: theme.primary,
    },
    timeBox: {
      width: 23,
      height: 23,
      backgroundColor: '#E4D5CA',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3,
    },
    timeText: {
      fontSize: 12,
      color: theme.primary,
    },
    categoriesContainer: {
      width: '100%',
    },
    categoryItemContainer: {
      margin: 5,
    },
    categoryItem: {
      padding: 10,
      borderRadius: 20,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#D8D7D6',
    },
    categoryText: {
      fontSize: 12,
      fontWeight: '500',
    },
    productsContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    productsList: {
      marginBottom: hp('10%'),
    },
  });
