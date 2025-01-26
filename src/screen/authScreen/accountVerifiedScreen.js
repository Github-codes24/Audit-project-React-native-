import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Modal, TouchableOpacity } from "react-native";
import BackgroundLayout from "../../reusableComponent/backgroundLayout/backgroundLayout";
import { theme } from "../../utils";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import { useDispatch } from "react-redux";
import { setLoginResponse } from "../../redux/stateSlice/authStateSlice";
import { getLoginResponse } from "../../redux/stateSelector/authStateSelector";
import { useSelector } from "react-redux";

const AccountVerifiedScreen = ({ navigation, route }) => {
  const { verifyOtpApiData } = route.params || {};
  const dispatch = useDispatch();

  console.log('verifyOtpApiData43636',verifyOtpApiData)
  const [isModalVisible, setModalVisible] = useState(true); 

  const closeModal = () => {
    setModalVisible(false);
    navigation.navigate(MainRoutes.DASHBOARD_SCREEN, {
      screen: "Home",
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setLoginResponse(verifyOtpApiData));
      // navigation.navigate('Home');
    }, 3000);
    return () => clearTimeout(timer);
  }, [dispatch, verifyOtpApiData, navigation]);

  return (
    <BackgroundLayout>
      <View style={style.Main}>
        {/* Bottom Sheet Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={closeModal}
        >
          <View style={style.modalOverlay}>
            <View style={style.modalContent}>
              <Text style={style.modalTitle}>Redirecting....</Text>
              <Text style={style.modalDescription}>
               Redirecting to home screen in 5 sec...
              </Text>
             
            </View>
          </View>
        </Modal>

        <Image
          style={style.imageStyle}
          source={require("../../asstets/images/emailverification.png")}
        />

      </View>

      <View
        style={{
          height: theme.verticalSpacing.space_260,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
      

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
    width: 342,
    height: 244,
  },
  textStyle: {
    fontSize: theme.fontSizes.size_30,
    color: theme.lightColor.blackColor,
    fontWeight: "600",
    marginTop: 30,
  },
  doneText: {
    fontSize: theme.fontSizes.size_14,
    color: "#475569",
    marginTop: theme.verticalSpacing.space_30,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end", // Align the bottom sheet to the bottom
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent overlay
  },
  modalContent: {
    width: "100%", // Full width
    height:258, 
    backgroundColor:theme.lightColor.brownColor,
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
  
  },
  modalTitle: {
    color:'white',
    fontSize: theme.fontSizes.size_24,
    fontWeight: "700",
    lineHeight:29.5
    
  },
  modalDescription: {
    fontSize: theme.fontSizes.size_16,
    color: "#475569",
    marginVertical: 15,
    textAlign: "center",
    width:200,
    height:40,
    lineHeight:20,
    fontWeight:'400',
    color:'white',letterSpacing:.5,
    marginTop:theme.verticalSpacing.space_50
  },
  modalButton: {
    backgroundColor: theme.lightColor.brownColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontSize: theme.fontSizes.size_16,
    fontWeight: "600",
  },
});

export default AccountVerifiedScreen;
