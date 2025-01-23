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
          <Text style={styles.title}>Password Change Successfully</Text>
          <Text style={styles.description}>
            Your password has been changed successfully. You can now use your new password to log in to your account.
          </Text>
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
    alignItems: "center",
    justifyContent: "center",
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
    textAlign: "center",
    width: theme.horizontalSpacing.space_260,
    lineHeight: 20,
    fontSize: theme.fontSizes.size_16,
    letterSpacing: 1,
    color: theme.lightColor.blackColor,
    marginVertical: theme.verticalSpacing.space_16,
  },
  buttonContainer: {
    marginTop: theme.verticalSpacing.space_30,
  },
});

export default PasswordChangeSuccessfullyScreen;
