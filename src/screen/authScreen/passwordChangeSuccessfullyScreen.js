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
            source={require('../../asstets/images/passwordChange.png')}
          />
          <View style={{alignItems:"center"}}>
          <View style={{}}>
          <Text style={styles.title}>Password Changed Successfully</Text>
          <Text style={styles.description}>
            Your password has been changed successfully  
          </Text>
          <Text style={{fontSize:theme.fontSizes.size_16}}>{'You can now use your new password to log in'}</Text>
          <Text style={{fontSize:theme.fontSizes.size_16,}}>{'to your account.'}</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    
    
   
    paddingHorizontal: theme.horizontalSpacing.space_16,
  },
  image: {
    width: theme.horizontalSpacing.space_327,
    height: 273,
    resizeMode: "contain",
  },
  title: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: theme.fontSizes.size_30,
    marginVertical: theme.verticalSpacing.space_16,
    color: theme.lightColor.blackColor,
  },
  description: {
   
 
    lineHeight: 20,
    fontSize: theme.fontSizes.size_16,
    fontWeight:'400',
    color: theme.lightColor.blackColor,
    // marginVertical: theme.verticalSpacing.space_16,
  },
  buttonContainer: {
    marginTop: theme.verticalSpacing.space_30,
  },
});

export default PasswordChangeSuccessfullyScreen;
