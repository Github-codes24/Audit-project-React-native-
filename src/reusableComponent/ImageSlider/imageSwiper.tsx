import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import Svg, { Path } from 'react-native-svg';

const ImageSwiper = ({ images, showNavigation = false , imageStyle = {},containerStyle={}}) => {
  const swiperRef = useRef(null);

  // Function to go to the previous slide
  const goToPrevious = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(-1, true);
    }
  };

  // Function to go to the next slide
  const goToNext = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1, true);
    }
  };

  return (
    <View style={[styles.container,containerStyle]}>
      {showNavigation && (
        <>
          {/* Previous button */}
          <TouchableOpacity onPress={goToPrevious} style={styles.prevButton}>
            <Svg height="30" width="30" viewBox="0 0 24 24" fill="none">
              <Path
                d="M15 19l-7-7 7-7"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>

          {/* Next button */}
          <TouchableOpacity onPress={goToNext} style={styles.nextButton}>
            <Svg height="30" width="30" viewBox="0 0 24 24" fill="none">
              <Path
                d="M9 5l7 7-7 7"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
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
      >
        {images?.map((imageUrl, index) => (
          <View style={styles.slide} key={index}>
             <Image style={[styles.image, imageStyle]}source={{ uri: imageUrl }} />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 230,
    position: 'relative',
    
  },
  slide: {
    
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 230,
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
    bottom: 10,
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
