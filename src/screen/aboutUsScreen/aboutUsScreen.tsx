import React, { useRef } from "react";
import { 
Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView 
} from "react-native";
import { useSelector } from "react-redux";
import { useGetAboutUsApiQuery } from "../../redux/apiSlice/profileApiSlice";
import Swiper from "react-native-swiper";
import { theme } from "../../utils";
import Loader from "../../reusableComponent/loader/loader";
import Header from "../../reusableComponent/header/header";

import * as Svg from '../../asstets/images/svg';



const AboutUsScreen = () => {
  const swiperRef = useRef(null);

  const { 
    data: getAboutdata, 
    error: getAboutApiError, 
    isLoading: getGetAboutApiIsLoading 
  } = useGetAboutUsApiQuery({}); 

  // console.log("getAboutdata", getAboutdata);
  // Custom Dot Pagination
  
  const renderPagination = (index, total) => {
    return (
      <View style={styles.customPagination}>
        {[...Array(total)].map((_, i) => (
          <View key={i} style={i === index ? styles.activeDot : styles.dot} />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <Header />
          <Loader isLoading={getGetAboutApiIsLoading} />
          <Text style={styles.title}>About Us</Text>
          <View style={{ marginHorizontal: 10 }}>
            <View style={{ position: "relative" }}>
              <Swiper
                ref={swiperRef}
                style={styles.wrapper}
                autoplay={true}
                autoplayTimeout={5}
                renderPagination={renderPagination}
              removeClippedSubviews={false}
              >
                {getAboutdata?.aboutUs[0]?.image?.length > 0 ? (
                  getAboutdata.aboutUs[0].image.map((slide, index) => (
                    <View style={styles.slide} key={index}>
                      <Image style={styles.image} source={{ uri: slide }} />
                    </View>
                  ))
                ) : (
                  <Text>No images available</Text>
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

            <Text style={styles.contentText}>
              {getAboutdata?.aboutUs[0]?.content}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    fontSize: theme.fontSizes.size_20,
    marginHorizontal: 10,
    marginVertical: 15,
  },
  wrapper: {
    height: theme.horizontalSpacing.space_358,
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 322,
    width: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  customPagination: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom:theme.verticalSpacing.space_50, 
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

export default AboutUsScreen;
