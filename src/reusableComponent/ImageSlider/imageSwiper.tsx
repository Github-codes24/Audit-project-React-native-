import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../../utils';

const { width: screenWidth } = Dimensions.get('window');

const ImageSwiper = ({ images, showNavigation = false, imageStyle = {}, containerStyle = {}, borderRadius = 0}) => {
  const swiperRef = useRef(null);
  const [imageHeights, setImageHeights] = useState([]);
  const [maxHeight, setMaxHeight] = useState(200); // Default height

  useEffect(() => {
    if (imageHeights.length > 0) {
      setMaxHeight(Math.max(...imageHeights)); 
    }
  }, [imageHeights]);

  const onImageLoad = (imageUrl, index) => {
    Image.getSize(imageUrl, (imgWidth, imgHeight) => {
      const calculatedHeight = (screenWidth * imgHeight) / imgWidth;
      setImageHeights((prev) => {
        const newHeights = [...prev];
        newHeights[index] = calculatedHeight;
        return newHeights;
      });
    });
  };

  const goToPrevious = () => swiperRef.current?.scrollBy(-1, true);
  const goToNext = () => swiperRef.current?.scrollBy(1, true);

  return (
    <View style={[styles.container, containerStyle, { height: maxHeight }]}>
      {showNavigation && (
        <>
          <TouchableOpacity onPress={goToPrevious} style={styles.prevButton}>
            <Svg height="30" width="30" viewBox="0 0 24 24" fill="none">
              <Path d="M15 19l-7-7 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </TouchableOpacity>

          <TouchableOpacity onPress={goToNext} style={styles.nextButton}>
            <Svg height="30" width="30" viewBox="0 0 24 24" fill="none">
              <Path d="M9 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </TouchableOpacity>
        </>
      )}

      <Swiper
        ref={swiperRef}
        autoplay={true}
        autoplayTimeout={5}
        activeDotStyle={styles.activeDot}
        paginationStyle={styles.pagination}
        loop={false}
      >
        {images?.map((imageUrl, index) => (
          <View key={index} style={[styles.slide, { height: maxHeight }]}>
            <View style={[styles.imageWrapper, { borderRadius, overflow: 'hidden' }]}>
              <Image
                style={[
                  styles.image,
                  imageStyle,
                  { height: imageHeights[index] || maxHeight, borderRadius }
                ]}
                source={{ uri: imageUrl }}
                onLoad={() => onImageLoad(imageUrl, index)}
              />
            </View>
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  imageWrapper: {
    width: '100%',
  },
  image: {
    width: '100%',
    resizeMode: 'cover',
  },
  activeDot: {
    backgroundColor: '#000',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  pagination: {
    position: 'absolute',
    bottom: theme.verticalSpacing.space_24,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  prevButton: {
    position: 'absolute',
    top: '50%',
    left: 10,
    zIndex: 1,
  },
  nextButton: {
    position: 'absolute',
    top: '50%',
    right: 10,
    zIndex: 1,
  },
});

export default ImageSwiper;
