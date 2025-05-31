import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ThemeColors} from '../../theme/themeConfig';
import {useCustomTheme} from '../../theme/ThemeContext';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import StarIcon from 'react-native-vector-icons/AntDesign';
import {FETCH_PRODUCT_DETAILS} from '../../api/api';
import CustomLoader from '../../components/CustomLoader/CustomLoader';

const Size = [
  {
    id: 1,
    size: 'S',
  },
  {
    id: 2,
    size: 'M',
  },
  {
    id: 3,
    size: 'L',
  },
  {
    id: 4,
    size: 'XL',
  },
  {
    id: 5,
    size: 'XXL',
  },
  {
    id: 6,
    size: 'XXXL',
  },
];

const Colours = [
  {
    id: 1,
    color: 'yellow',
    name: 'Yellow',
  },
  {
    id: 2,
    color: 'green',
    name: 'Green',
  },
  {
    id: 3,
    color: 'brown',
    name: 'Brown',
  },
  {
    id: 4,
    color: 'blue',
    name: 'Blue',
  },
  {
    id: 5,
    color: 'lightgreen',
    name: 'Lightgreen',
  },
  {
    id: 6,
    color: 'black',
    name: 'Black',
  },
];

const ProductDetails = ({route}: any) => {
  const {theme} = useCustomTheme();
  const styles = createStyle(theme);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<any>(Colours[0]);
  const [productData, setProductData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    handleFetchProduct(route?.params?.Id);
  }, [route?.params?.Id]);

  const toggleExpanded = () => setExpanded(!expanded);

  const content = `Lorem Ipsum is simply dummy text of the printing and typesetting
industry. Lorem Ipsum has been the industry's standard dummy text
ever since the 1500s, when an unknown printer took a galley of type
and scrambled it to make a type specimen book. It has survived not
only five centuries, but also the leap into electronic typesetting,
remaining essentially unchanged. It was popularised in the 1960s
with the release of Letraset sheets containing Lorem Ipsum passages,
and more recently with desktop publishing software like Aldus
PageMaker including versions of Lorem Ipsum.`;

  const handleFetchProduct = async (id: any) => {
    try {
      setLoading(true);
      const response = await FETCH_PRODUCT_DETAILS(id);

      if (response && response.status === 200) {
        setProductData(response?.data);
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

  const handleBackPress = () => {};

  const handleHeartPress = () => {};

  const handleSize = (id: any) => {
    setSelectedId(id);
  };
  const handleColor = (item: any) => {
    setSelectedColor(item);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {!loading ? (
        <View>
          <View>
            <CustomHeader
              title="Product Details"
              onBackPress={handleBackPress}
              onRightIconPress={handleHeartPress}
              backgroundColor={selectedColor?.color}
            />
          </View>
          <View
            style={[
              styles.imageContainer,
              {backgroundColor: selectedColor?.color},
            ]}>
            <Image
              source={{uri: productData?.image}}
              resizeMode="contain"
              style={{width: 210, height: 240}}
            />
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.productInfoContainer}>
              <View style={styles.productInfo}>
                <Text style={styles.brandText}>{productData?.category}</Text>
                <Text style={styles.productTitle}>{productData?.title}</Text>
              </View>
              <View style={styles.ratingContainer}>
                <StarIcon name="star" style={styles.starIcon} size={16} />
                <Text style={styles.ratingText}>
                  {productData?.rating?.rate}
                </Text>
              </View>
            </View>
            <View style={styles.detailsSection}>
              <Text style={styles.sectionTitle}>Product Details</Text>

              <View>
                <Text
                  style={styles.contentText}
                  numberOfLines={expanded ? undefined : 3}>
                  {productData?.description}
                </Text>

                <TouchableOpacity onPress={toggleExpanded}>
                  <Text style={styles.readMoreText}>
                    {expanded ? 'Read Less' : 'Read More'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.selectionContainer}>
              <View style={styles.sizeSection}>
                <Text>Select Size</Text>
                <View style={styles.sizeOptionsContainer}>
                  {Size?.map(item => {
                    const selected = selectedId == item?.id;
                    return (
                      <TouchableOpacity
                        key={item?.id}
                        style={[
                          styles.sizeOption,
                          {
                            backgroundColor: selected
                              ? theme.primary
                              : 'transparent',
                          },
                        ]}
                        onPress={() => handleSize(item?.id)}>
                        <Text
                          style={[
                            styles.sizeText,
                            {color: selected ? theme.background : theme.text},
                          ]}>
                          {item?.size}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
              <View style={styles.colorSection}>
                <Text>
                  Select Colour :{' '}
                  <Text style={styles.selectedColorText}>
                    {selectedColor?.name}
                  </Text>
                </Text>
                <View style={styles.colorOptionsContainer}>
                  {Colours?.map(item => {
                    const selected = selectedColor?.id == item?.id;
                    return (
                      <TouchableOpacity
                        key={item?.id}
                        style={[
                          styles.colorOption,
                          {
                            borderWidth: selected ? 7 : 0,
                            backgroundColor: item?.color,
                          },
                        ]}
                        onPress={() => handleColor(item)}></TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <CustomLoader visible={loading} message="Fetching Details" />
      )}
    </ScrollView>
  );
};

export default ProductDetails;

const createStyle = (theme: ThemeColors) =>
  StyleSheet.create({
    starIcon: {
      color: '#F3B536',
    },
    scrollViewContent: {
      flexGrow: 1,
    },
    imageContainer: {
      width: wp('100%'),
      // backgroundColor: theme.detailsBG,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    contentContainer: {
      padding: 17,
      gap: 15,
    },
    productInfoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    productInfo: {
      gap: 15,
      width: '82%',
      // borderWidth:1
    },
    brandText: {
      fontSize: 12,
      letterSpacing: 0.5,
      fontWeight: '300',
    },
    productTitle: {
      fontSize: 17,
      fontWeight: '400',
      width: '100%',
    },
    ratingContainer: {
      flexDirection: 'row',
      gap: 5,
    },
    ratingText: {
      fontSize: 12,
      fontWeight: '300',
    },
    detailsSection: {
      gap: 10,
    },
    sectionTitle: {
      fontSize: 15,
      fontWeight: '400',
    },
    contentText: {
      color: '#979494',
      textAlign: 'left',
      writingDirection: 'ltr',
    },
    readMoreText: {
      color: theme.primary,
      fontWeight: '500',
      textDecorationLine: 'underline',
    },
    selectionContainer: {
      borderTopWidth: 1,
      borderColor: '#ccc',
      paddingTop: 15,
      gap: 15,
    },
    sizeSection: {
      gap: 14,
    },
    sizeOptionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    sizeOption: {
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: theme.inActive,
      borderWidth: 1,
      borderRadius: 10,
      height: 35,
      width: 45,
    },
    sizeText: {},
    colorSection: {
      gap: 14,
    },
    selectedColorText: {
      color: '#979494',
    },
    colorOptionsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    colorOption: {
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#979494',
      borderRadius: 60,
      height: 28,
      width: 28,
    },
  });
