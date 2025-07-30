import React from "react";
import { Image, StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { theme } from "../../utils";
import CustomButton from "../../reusableComponent/button/button";
import { MainRoutes } from "../../navigation/routeAndParamsList";

const PasswordChangeSuccessfullyScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require('../../assets/images/passwordChanges.png')}
          />
          <View style={{alignItems:"center"}}>
          <View style={{}}>
          <Text style={styles.title}>Password Changed Successfully</Text>
          <Text style={styles.description}>
            Your password has been changed successfully  
          </Text>
          <Text style={{fontSize:theme.fontSizes.size_16,fontWeight:"400",marginLeft:5,alignSelf:"center"}}>{'You can now use your new password to log in'}</Text>
          <Text style={{fontSize:theme.fontSizes.size_16,fontWeight:"400",marginLeft:5,alignSelf:"center"}}>{'to your account.'}</Text>
         </View>
         </View>
         
          <View style={styles.buttonContainer}>
            <CustomButton
              onPress={() => navigation.navigate(MainRoutes.LOGIN_SCREEN)}
              title={'Login'}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff", // Ensure the background color is visible
  },
  scrollView: {
    flexGrow: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  container: {
    marginTop:theme.verticalSpacing.space_40,
    alignItems:"center",
    // justifyContent:"center",

    paddingHorizontal: theme.horizontalSpacing.space_20,
  },
  image: {
    width: theme.horizontalSpacing.space_327,
    height:327,
    resizeMode: "contain",
  },
  title: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: theme.fontSizes.size_30,
    marginVertical: theme.verticalSpacing.space_16,
    color: theme.lightColor.blackColor,
    marginTop:theme.verticalSpacing.space_40
  },
  description: {
    lineHeight: 20,
    fontSize: theme.fontSizes.size_16,
    fontWeight:'400',
    color: theme.lightColor.blackColor,
   marginLeft:5,
   alignSelf:"center"
    // marginVertical: theme.verticalSpacing.space_16,
  },
  buttonContainer: {
    marginTop: theme.verticalSpacing.space_30,
  },
});

export default PasswordChangeSuccessfullyScreen;
