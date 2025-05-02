import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../../utils";
import CustomButton from "../button/button";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import CircularProgress from "../progressIndicator/circularProgressIndicator";
import { useNavigation } from "@react-navigation/native";
import { getComplianceResult } from "../../redux/stateSelector/complinceStateSelector";
import { useSelector } from "react-redux";
const ComplianceResult = ({ onPressRetakeExam,scorePercentage,displayScore}) => {
  const navigation = useNavigation();
  
  const complianceResult=useSelector(getComplianceResult)

  // const {
  //   scorePercentage='',

  // } = complianceResult||{}

//   let displayScore=0
// if (scorePercentage === 10) {
//   displayScore = 0;
// } else if (scorePercentage === 90) {
//   displayScore = 100;
// } else if (scorePercentage % 1 === 0) {
//   displayScore = scorePercentage;
// } else {
//   displayScore = scorePercentage?.toFixed(2);
// }


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
          Your sponsor licence compliance can be at potential risk,
          Book a consultation with our experts to discuss in detail.
        </Text>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => {
            navigation.navigate(MainRoutes?.CONTACTUS_SCREEN);
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
