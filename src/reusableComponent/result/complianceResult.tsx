import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../../utils";
import CustomButton from "../button/button";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import CircularProgress from "../progressIndicator/circularProgressIndicator";
import { useNavigation } from "@react-navigation/native";

const ComplianceResult = ({ onPressRetakeExam, scorePercentage, displayScore }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <View style={{ marginTop: theme.verticalSpacing.space_14 }}>
          <CircularProgress percentage={scorePercentage} />
        </View>
        <Text
          style={{
            fontSize: theme.fontSizes.size_20,
            color: theme.lightColor.blackColor,
            marginTop: theme.verticalSpacing.space_8,
            textAlign: 'center',
            fontWeight: '700',
            width: theme.horizontalSpacing.space_285,
          }}
        >
          {`You scored ${displayScore}% in sponsor licence compliance`}
        </Text>
        <Text style={styles.subtitle}>
          Your sponsor licence compliance can be at potential risk.
          Book a consultation with our experts.
        </Text>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => {
            navigation.navigate(MainRoutes.CONTACTUS_SCREEN);
          }}
        >
          <Text style={styles.contactText}>Book a Consultation</Text>
        </TouchableOpacity>
        <CustomButton
          title={'Retake the test'}
          onPress={onPressRetakeExam}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  subtitle: {
    fontSize: theme.fontSizes.size_16,
    color: theme.lightColor.blackColor,
    textAlign: 'center',
    marginTop: theme.verticalSpacing.space_20,
    marginHorizontal: 20,
  },
  contactButton: {
    backgroundColor: theme.lightColor.whiteColor,
    borderWidth: 0.3,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    margin: theme.verticalSpacing.space_30,
    marginTop: theme.verticalSpacing.space_46,
  },
  contactText: {
    color: theme.lightColor.brownColor,
    fontWeight: '500',
    fontSize: theme.fontSizes.size_16,
  },
});

export default ComplianceResult;
