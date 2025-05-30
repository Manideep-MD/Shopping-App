import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useCustomTheme } from '../../theme/ThemeContext';

const {width} = Dimensions.get('window');

const images = [
  {
    id: 1,
    uri: 'https://img.freepik.com/premium-psd/online-shopping-with-discount_23-2148536749.jpg',
  },
  {
    id: 2,
    uri: 'https://img.freepik.com/premium-psd/online-shopping-with-discount_23-2148536749.jpg',
  },
  {
    id: 3,
    uri: 'https://img.freepik.com/premium-psd/online-shopping-with-discount_23-2148536749.jpg',
  },
];

const CustomCarousel = () => {
  const flatListRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const {theme} = useCustomTheme()

  const scrollToNext = () => {
    const nextIndex = (activeIndex + 1) % images.length;
    flatListRef.current?.scrollToIndex({index: nextIndex, animated: true});
    setActiveIndex(nextIndex);
  };

  useEffect(() => {
    const interval = setInterval(scrollToNext, 3000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const onMomentumScrollEnd = event => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.imageWrapper}>
        <Image source={{uri: item?.uri}} style={styles.image} />
      </View>
    );
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        scrollEventThrottle={16}
      />

      <View style={styles.dotContainer}>
        {images.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              flatListRef.current.scrollToIndex({index, animated: true})
            }>
            <View
              style={[
                styles.dot,
                {backgroundColor: activeIndex === index ? theme.primary : theme.inActive},
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CustomCarousel;

const styles = StyleSheet.create({
  imageWrapper: {
    width: width,
    height: 180,
    borderRadius: 15,
    overflow: 'hidden',
    marginHorizontal: 0,
  },
  image: {
    width: '92%',
    height: 180,
    resizeMode: 'cover',
    borderRadius: 15,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
