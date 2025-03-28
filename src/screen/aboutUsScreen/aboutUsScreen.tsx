import React, { useRef, useEffect, useState, useCallback } from "react";
import { 
  Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView 
} from "react-native";
import { useGetAboutUsApiQuery } from "../../redux/apiSlice/profileApiSlice";
import Swiper from "react-native-swiper";
import { theme } from "../../utils";
import Loader from "../../reusableComponent/loader/loader";
import Header from "../../reusableComponent/header/header";
import * as Svg from '../../assets/images/svg';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

const AboutUsScreen = () => {
  const swiperRef = useRef(null);
  const { width } = useWindowDimensions();
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickedTime, setLastClickedTime] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const { 
    data: getAboutdata, 
    isLoading: getGetAboutApiIsLoading 
  } = useGetAboutUsApiQuery({}); 

  const content = getAboutdata?.aboutUs?.[0]?.content || '';
  const images = getAboutdata?.aboutUs?.[0]?.image || [];
  const hasMultipleImages = images.length > 1; // Check if multiple images exist

  useEffect(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    if (isAutoplay && hasMultipleImages) {
      const newIntervalId = setInterval(() => {
        if (swiperRef.current) {
          swiperRef.current.scrollBy(1, true); 
        }
      }, 3000);
      setIntervalId(newIntervalId);  
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);  
      }
    };
  }, [isAutoplay, hasMultipleImages]);  
 
  const handleArrowPress = useCallback(() => {
    const currentTime = Date.now();
    setClickCount((prevCount) => prevCount + 1);
    
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
      setIsAutoplay(false);
    }

    setLastClickedTime(currentTime);

    if (clickCount >= 2 && currentTime - lastClickedTime < 1000) {
      setIsAutoplay(false);
    }

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeoutId = setTimeout(() => {
      setClickCount(0);
      setIsAutoplay(true);
    }, 800);

    setDebounceTimeout(timeoutId);
  }, [clickCount, lastClickedTime, debounceTimeout]);

  return (
    <SafeAreaView>
      <ScrollView style={{ marginBottom: theme.verticalSpacing.space_100 }}>
        <View style={{ flex: 1 }}>
          <Header />
          <Loader isLoading={getGetAboutApiIsLoading} />
          <Text style={styles.title}>About Us</Text>

          <View style={{ marginHorizontal: 10 }}>
            {/* Image Slider */}
            <View style={{ height:300, marginTop: theme.verticalSpacing.space_20, }}>
              <Swiper
                ref={swiperRef}
                style={styles.wrapper}
                autoplay={isAutoplay && hasMultipleImages} 
                autoplayTimeout={3} 
                loop={hasMultipleImages} // Enable loop only if multiple images
                showsPagination={hasMultipleImages} // Show dots only if multiple images
                dotColor={"#A7A7A7"}
                activeDotColor={"white"} 
              >
                {images.length > 0 && (
                  images.map((slide, index) => (
                    <View style={styles.slide} key={index}>
                      <Image style={styles.image} source={{ uri: slide }} resizeMode='cover'  />
                    </View>
                  ))
                )}
              </Swiper>

              {/* Right Arrow Button (Only show when more than 1 image) */}
              {hasMultipleImages && (
                <TouchableOpacity 
                  style={styles.nextButton} 
                  onPress={handleArrowPress}
                >
                  <Svg.ArrowRight />
                </TouchableOpacity>
              )}
            </View>

            <View style={{ marginHorizontal: 3, marginTop: theme.verticalSpacing.space_10 }}>
              {/<[a-z][\s\S]*>/i.test(content) ? (
                <RenderHtml 
                  contentWidth={width} 
                  source={{ html: content }}  
                  tagsStyles={{
                    p: { 
                      marginVertical: 5, 
                      lineHeight: 20,
                      fontSize: theme.fontSizes.size_16,
                      fontWeight: '400',
                    }
                  }} 
                />
              ) : (
                <Text style={styles.contentText}>{content}</Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutUsScreen;

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    fontSize: theme.fontSizes.size_20,
    marginHorizontal: 10,
    marginTop: theme.verticalSpacing.space_20,
  },
  wrapper: {
    // backgroundColor: 'red',
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 300,
    width: '100%',
    borderRadius: 10,
  },
  customPagination: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 20, 
    width: "100%",
  },
  dot: {
    backgroundColor: "#A7A7A7",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5, 
  },
  activeDot: {
    backgroundColor: "white",
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  nextButton: {
    position: "absolute",
    alignSelf: "center",
    right: 10,
    top: "40%",
    zIndex: 1,
    borderRadius: 30,
    padding: 10,
  },
  contentText: {
    margin: theme.horizontalSpacing.space_10,
    fontSize: theme.fontSizes.size_16,
    lineHeight:20,
    fontWeight: "400",
  },
});
