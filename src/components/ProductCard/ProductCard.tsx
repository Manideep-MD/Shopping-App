import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import StarIcon from 'react-native-vector-icons/AntDesign';
import HeartIcon from 'react-native-vector-icons/FontAwesome';
import {useCustomTheme} from '../../theme/ThemeContext';

interface ProductCardProps {
  item: {
    image: string;
    title: string;
    price: number;
    rating?: {
      rate: number;
    };
  };
}

const ProductCard = ({item}: ProductCardProps) => {
  const {theme} = useCustomTheme();
  return (
    <View style={[styles.cardContainer, {width: wp('43%')}]}>
      <View style={[styles.imageWrapper, {backgroundColor: theme.inActive}]}>
        <View style={styles.heartContainer}>
          <HeartIcon
            name="heart-o"
            size={20}
            color="red"
            style={styles.heartIcon}
          />
        </View>
        <Image
          source={{uri: item?.image}}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      <View style={styles.titleRatingContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {item?.title.slice(0, 12)}
        </Text>
        <View style={styles.ratingContainer}>
          <StarIcon name="star" style={styles.starIcon} size={13} />
          <Text style={styles.ratingText}>{item?.rating?.rate}</Text>
        </View>
      </View>
      <Text style={styles.price}>$ {item?.price}</Text>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  cardContainer: {
    margin: 7,
    justifyContent: 'center',
    gap: 5,
  },
  imageWrapper: {
    width: '100%',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  heartContainer: {
    width: 35,
    height: 35,
    backgroundColor: '#D1D0CF',
    opacity: 0.5,
    position: 'absolute',
    top: 3,
    right: 5,
    zIndex: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIcon: {
    zIndex: 100,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 12,
  },
  titleRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  starIcon: {
    color: 'gold',
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '300',
  },
  price: {
    fontSize: 13,
    fontWeight:500
  },
});
