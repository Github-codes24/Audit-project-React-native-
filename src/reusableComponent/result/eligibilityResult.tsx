import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../button/button";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import { theme } from "../../utils";

const EligibityResult = ({ onPressRetakeExam, isEligible, eligibilityImage }) => {
  const navigation = useNavigation();
  const isValidImage = eligibilityImage && eligibilityImage.startsWith('http');
  const [showText, setShowText] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (imageLoaded) {
      const timer = setTimeout(() => {
        setShowText(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [imageLoaded]);

  return (
    <ScrollView style={{ flex: 1, marginBottom: theme.verticalSpacing.space_100 }}>
      <View style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.resultHeader}>{''}</Text>

          {/* Eligibility Image with Loader */}
          {isValidImage && (
            <View style={styles.imageContainer}>
              {!imageLoaded && (
                <View style={styles.loaderContainer}>
                  <ActivityIndicator size="large" color={theme.lightColor.brownColor} />
                </View>
              )}
              <Image
                source={{ uri: eligibilityImage }}
                style={styles.image}
                resizeMode="contain"
                onLoad={() => setImageLoaded(true)}
              />
            </View>
          )}

          {/* Eligibility Message */}
          {showText && (
            <Text style={styles.title}>
              {isEligible
                ? "Congratulations 🎉\nyou are eligible!"
                : "Sorry\nyou are not eligible!"}
            </Text>
          )}
          <Text style={styles.subtitle}>{isEligible
              ? "Your business is potentially eligible for sponsor licence*. Book a consultation with our experts."
              : "Book a consultation for tailored advice."}
          </Text>

          {/* Contact Us Button */}
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => navigation.navigate(MainRoutes.CONTACTUS_SCREEN)}
          >
            <Text style={styles.contactText}>Book a Consultation</Text>
          </TouchableOpacity>

          {/* Retake Exam Button */}
          <CustomButton title={"Retake the test"} onPress={onPressRetakeExam} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  resultHeader: {
    color: "black",
    fontSize: theme.fontSizes.size_24,
    fontWeight: "600",
    marginTop: 10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: theme.horizontalSpacing.space_222,
    height: theme.verticalSpacing.space_290,
    marginTop: theme.verticalSpacing.space_50,
  },
  loaderContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: theme.verticalSpacing.space_20,
  },
  subtitle: {
    fontSize: theme.fontSizes.size_16,
    color: theme.lightColor.blackColor,
    textAlign: "center",
    marginTop: theme.verticalSpacing.space_20,
    marginHorizontal: 20,
  },
  contactButton: {
    backgroundColor: theme.lightColor.whiteColor,
    borderWidth: 0.3,
    paddingVertical: 10,
    paddingHorizontal: theme.horizontalSpacing.space_30,
    borderRadius: 10,
    margin: theme.verticalSpacing.space_30,
    marginTop: theme.verticalSpacing.space_46,
  },
  contactText: {
    color: theme.lightColor.brownColor,
    fontWeight: "500",
    fontSize: theme.fontSizes.size_16,
  },
});

export default EligibityResult;
