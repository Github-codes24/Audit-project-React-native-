import React, { useRef, useEffect } from "react";
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

  const { 
    data: getAboutdata, 
    isLoading: getGetAboutApiIsLoading 
  } = useGetAboutUsApiQuery({}); 

  const content = getAboutdata?.aboutUs?.[0]?.content || '';

  useEffect(() => {
    // Ensure that the swiper scrolls automatically every 3 seconds
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1, true);
    }
  }, [swiperRef.current]);

  return (
    <SafeAreaView style={{ flex: 1,marginBottom:theme.verticalSpacing.space_80 }}>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <Header />
          <Loader isLoading={getGetAboutApiIsLoading} />
          <Text style={styles.title}>About Us</Text>

          <View style={{ marginHorizontal: 10 }}>
            {/* Image Slider */}
            <View style={{ height: 300 }}>
              <Swiper
                ref={swiperRef}
                style={styles.wrapper}
                autoplay={true}
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
                onPress={() => swiperRef.current?.scrollBy(1)}
              >
                <Svg.ArrowRight />
              </TouchableOpacity>
            </View>

            {/* About Us Content */}
            {/<[a-z][\s\S]*>/i.test(content) ? (
              <RenderHtml contentWidth={width} source={{ html: content }} />
            ) : (
              <Text style={styles.contentText}>{content}</Text>
            )}
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
    marginVertical: 15,
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
    backgroundColor: "red"
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
