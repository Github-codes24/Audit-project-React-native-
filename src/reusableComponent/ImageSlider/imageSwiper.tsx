import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";

const ImageSwiper = ({ images }) => {
  return (
    <View style={styles.container}>
      <Swiper
        autoplay={true}
        autoplayTimeout={5}
        activeDotStyle={styles.activeDot}
        paginationStyle={styles.pagination}
      >
        {images.map((imageUrl, index) => (
          <View style={styles.slide} key={index}>
            <Image style={styles.image} source={{ uri: imageUrl }} />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 230, // Adjust based on your requirements
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  image: {
    height: 230,
    width: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  activeDot: {
    backgroundColor: "#000",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  pagination: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});

export default ImageSwiper;
