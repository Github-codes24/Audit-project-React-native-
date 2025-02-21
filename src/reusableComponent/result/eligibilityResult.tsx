import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../button/button";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import { theme } from "../../utils";

const EligibityResult = ({ onPressRetakeExam, isEligible,eligibilityImage }) => {
  const navigation = useNavigation();
  const isValidImage = eligibilityImage && eligibilityImage.startsWith('http');
   const [showText, setShowText] = useState(false);
  
  useEffect(() => {
    
    const timer = setTimeout(() => {
      setShowText(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <ScrollView style={{ flex: 1, marginBottom: theme.verticalSpacing.space_100 }}>
      <View style={styles.container}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
         
          <Text style={styles.resultHeader}>Result</Text>

          {/* Eligibility Image */}
         {isValidImage && (
            <Image
              source={{ uri: eligibilityImage }} 
              style={styles.image}
              resizeMode="contain"
            />
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
              ? "Your business is potentially eligible for sponsor licence*. CTA: Book a consultation with our experts."
              : "Book a consultation for tailored advice."}
     </Text>

          {/* Contact Us Button */}
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => navigation.navigate(MainRoutes.CONTACTUS_SCREEN)}
          >
            <Text style={styles.contactText}>Contact us</Text>
          </TouchableOpacity>

          {/* Retake Exam Button */}
          <CustomButton title={"Retake the exam"} onPress={onPressRetakeExam} />
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
  resultHeader: {
    color: "black",
    fontSize: theme.fontSizes.size_24,
    fontWeight: "600",
    marginTop: 10,
  },
  image: {
    width: theme.horizontalSpacing.space_222,
    height: theme.verticalSpacing.space_290,
    marginTop: theme.verticalSpacing.space_50,
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
    marginHorizontal:20
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
    fontSize:theme.fontSizes.size_16
  },
});

export default EligibityResult;
