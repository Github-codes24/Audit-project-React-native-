import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../button/button";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import { theme } from "../../utils";

const EligibityResult = ({ onPressRetakeExam, isEligible }) => {
  const navigation = useNavigation();

  return (
    <ScrollView style={{ flex: 1, marginBottom: theme.verticalSpacing.space_100 }}>
      <View style={styles.container}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
         
          <Text style={styles.resultHeader}>Result</Text>

          {/* Eligibility Image */}
          <Image
            source={
              isEligible
                ? require("../../asstets/images/elegable.png")
                : require("../../asstets/images/non-Elegable.png")
            }
            style={styles.image}
            resizeMode="contain"
          />

          {/* Eligibility Message */}
          <Text style={styles.title}>
            {isEligible
              ? "Congratulations 🎉\nyou are eligible!"
              : "Sorry\nyou are not eligible!"}
          </Text>
          <Text style={styles.subtitle}>mbjksdbv ijshvsw </Text>

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
    fontWeight: "bold",
  },
});

export default EligibityResult;
