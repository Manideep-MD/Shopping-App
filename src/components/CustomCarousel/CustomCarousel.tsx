import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

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

  const renderItem = ({item}) => (
    <Image source={{uri: item.uri}} style={styles.image} />
  );

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
                {backgroundColor: activeIndex === index ? '#333' : '#ccc'},
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
  image: {
    width: width,
    height: 180,
    resizeMode: 'cover',
    // borderRadius:15
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius:20
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
