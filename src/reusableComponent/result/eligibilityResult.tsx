import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../button/button";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import { theme } from "../../utils";
import { useSelector } from "react-redux";
import { getEligibiltyResult } from "../../redux/stateSelector/eligibilityStateSelector";

const EligibityResult = ({ onPressRetakeExam}) => {
  const navigation = useNavigation();
  
const [isDataLoaded, setIsDataLoaded] = useState(false);
const [isImageLoading, setIsImageLoading] = useState(true);
const eligibilityResult= useSelector(getEligibiltyResult);
const { isEligible=false, eligibilityImage='', eligibleText1='', eligibleText2='' }= eligibilityResult||{}
const isValidImage = eligibilityImage && eligibilityImage.startsWith('http');

  
  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

 
  useEffect(() => {
    if (eligibilityImage && eligibleText1 && eligibleText2) {
      setIsDataLoaded(true);
    }
  }, [eligibilityImage, eligibleText1, eligibleText2]);

  if (!isDataLoaded) {
    return (
      <View style={styles.fullScreenLoader}>
        <ActivityIndicator size="large" color={theme.lightColor.brownColor} />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, marginBottom: theme.verticalSpacing.space_100 }}>
      <View style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.resultHeader}>{''}</Text>

          {/* Eligibility Image with Loader */}
        
            {isValidImage && (
              <View style={styles.imageContainer}>
                {isImageLoading && (
                  <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={theme.lightColor.brownColor} />
                  </View>
                )}
                <Image
                  source={{ uri: eligibilityImage }}
                  style={styles.image}
                  resizeMode="contain"
                  onLoad={handleImageLoad} 
                />
              </View>
            )}

            {/* Eligibility Message */}
            <Text style={styles.title}>
              {eligibleText2?.toLowerCase().includes("congratulations")
                ? `${eligibleText2} 🎉`
                : eligibleText2}
            </Text>

            <Text style={styles.subtitle}>
              {eligibleText1}
            </Text>
        

          {/* Contact Us Button */}
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => navigation.navigate(MainRoutes?.CONTACTUS_SCREEN)}
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
  fullScreenLoader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    zIndex: 10,
  },
});

export default EligibityResult;
