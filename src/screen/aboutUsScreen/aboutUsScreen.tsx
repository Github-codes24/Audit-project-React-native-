import React, { useRef, useEffect, useState, useCallback } from "react";
import { 
  Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView 
} from "react-native";
import { useGetAboutUsApiQuery } from "../../redux/apiSlice/profileApiSlice";
import Swiper from "react-native-swiper";
import { theme } from "../../utils";
import Loader from "../../reusableComponent/loader/loader";
import Header from "../../reusableComponent/header/header";
import * as Svg from '../../asstets/images/svg';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

const AboutUsScreen = () => {
  const swiperRef = useRef(null);
  const { width } = useWindowDimensions();
  const [isAutoplay, setIsAutoplay] = useState(true);  // To control autoplay
  const [clickCount, setClickCount] = useState(0);  // Track number of clicks
  const [lastClickedTime, setLastClickedTime] = useState(null);  // Track last click time
  const [intervalId, setIntervalId] = useState(null);  // To store interval reference
  const [debounceTimeout, setDebounceTimeout] = useState(null); // To store debounce timeout reference

  const { 
    data: getAboutdata, 
    isLoading: getGetAboutApiIsLoading 
  } = useGetAboutUsApiQuery({}); 

  const content = getAboutdata?.aboutUs?.[0]?.content || '';


  useEffect(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    if (isAutoplay) {
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
  }, [isAutoplay]);  
 
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
            <View style={{ height: 300,marginTop:theme.verticalSpacing.space_20 }}>
              <Swiper
                ref={swiperRef}
                style={styles.wrapper}
                autoplay={isAutoplay}  // Control autoplay dynamically
                autoplayTimeout={3} 
                loop={true}
                showsPagination={true} 
                dotColor={"#A7A7A7"}
                activeDotColor={"white"} 
              >
                {getAboutdata?.aboutUs?.[0]?.image?.length > 0 && (
                  getAboutdata.aboutUs[0].image.map((slide, index) => (
                    <View style={styles.slide} key={index}>
                      <Image style={styles.image} source={{ uri: slide }} />
                    </View>
                  ))
                )}
              </Swiper>

              {/* Right Arrow Button */}
              <TouchableOpacity 
                style={styles.nextButton} 
                onPress={handleArrowPress}
              >
                <Svg.ArrowRight />
              </TouchableOpacity>
            </View>

             <View style={{marginHorizontal:3}}>
            {/<[a-z][\s\S]*>/i.test(content) ? (
              <RenderHtml contentWidth={width} source={{ html: content }} />
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
   marginTop:theme.verticalSpacing.space_20
  },
  wrapper: {
    // backgroundColor: 'red',
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: theme.verticalSpacing.space_390,
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
    lineHeight: 20,
    fontWeight: "400",
  },
});
