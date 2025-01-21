import React, { useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import BackgroundLayout from "../../reusableComponent/backgroundLayout/backgroundLayout";
import { theme } from "../../utils";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import { useDispatch } from "react-redux";
import { setLoginResponse } from "../../redux/stateSlice/authStateSlice";
import { getLoginResponse } from "../../redux/stateSelector/authStateSelector";
import { useSelector } from "react-redux";

const AccountVerifiedScreen = ({ navigation,route }) => {
   const { verifyOtpApiData } = route.params || {}; 
  const dispatch = useDispatch();
  

// const response=useSelector(getLoginResponse)
// console.log('response1234445',response)
  


  useEffect(() => {
  const timer = setTimeout(() => {
    dispatch(setLoginResponse(verifyOtpApiData));
    navigation.navigate('Home');
  }, 3000); 
  return () => clearTimeout(timer);
}, [dispatch, verifyOtpApiData, navigation]);

  return (
    <BackgroundLayout>
      <View style={style.Main}>
        <Image
          style={style.imageStyle}
          source={require("../../asstets/images/mobileImage.png")}
        />

        <Text style={style.textStyle}>{"Verification successful"}</Text>
        <Text style={style.doneText}>
          {"Your verification has been successfully done!"}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: theme.lightColor.orangeColor,
          height: theme.verticalSpacing.space_260,
          borderTopLeftRadius: 110,
          borderTopRightRadius: 110,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: "600",
            marginTop: 20,
            fontSize: theme.fontSizes.size_24,
            color: theme.lightColor.brownColor,
          }}
        >
          {"Redirecting......."}
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "400",
            marginTop: 20,
            fontSize: theme.fontSizes.size_14,
            color: theme.lightColor.brownColor,
            width: 180,
            alignSelf: "center",
          }}
        >
          {"Redirecting to home screen in 5 sec..."}
        </Text>
      </View>
    </BackgroundLayout>
  );
};

const style = StyleSheet.create({
  Main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    width: theme.horizontalSpacing.space_187,
    height: theme.verticalSpacing.space_230,
  },
  textStyle: {
    fontSize: theme.fontSizes.size_30,
    color: theme.lightColor.brownColor,
    fontWeight: "600",
    marginTop: 30,
  },
  doneText: {
    fontSize: theme.fontSizes.size_14,
    color: "#475569",
    marginTop: theme.verticalSpacing.space_30,
  },
});

export default AccountVerifiedScreen;
