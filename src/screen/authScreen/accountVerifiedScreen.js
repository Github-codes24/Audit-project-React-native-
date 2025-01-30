import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Modal } from "react-native";
import BackgroundLayout from "../../reusableComponent/backgroundLayout/backgroundLayout";
import { theme } from "../../utils";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import { useDispatch } from "react-redux";
import { setLoginResponse } from "../../redux/stateSlice/authStateSlice";


const AccountVerifiedScreen = ({ navigation, route }) => {
  const { verifyOtpApiData } = route.params || {};
  const [isModalVisible, setModalVisible] = useState(true);
  const [countdown, setCountdown] = useState(5); 

  const dispatch=useDispatch()

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval); 
          setModalVisible(true); 
         dispatch(setLoginResponse(verifyOtpApiData));
         navigation.navigate('Home')
        }
        return prev - 1; 
      });
    }, 1000); 

    return () => clearInterval(interval); 
  }, [navigation]);

  return (
    <BackgroundLayout>
      <View style={style.Main}>
        {/* Bottom Sheet Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={style.modalOverlay}>
            <View style={style.modalContent}>
              <Text style={style.modalTitle}>Redirecting...</Text>
              <Text style={style.modalDescription}>
                Redirecting to home screen in {countdown} second{countdown > 1 ? "s" : ""}...
              </Text>
            </View>
          </View>
        </Modal>

        <Image
          style={style.imageStyle}
          source={require("../../asstets/images/emailverification.png")}
        />
        <Text style={style.successTitle}>Verification Successful!</Text>
        <Text style={style.successDescription}>
          Your verification has been successfully done!
        </Text>
      </View>

      <View style={style.bottomSection}></View>
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
  successTitle: {
    fontWeight: "700",
    fontSize: theme.fontSizes.size_30,
  },
  successDescription: {
    marginTop: 10,
    color: "gray",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end", // Align the modal at the bottom
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
  },
  modalContent: {
    width: "100%", // Full width
    height: 258,
    backgroundColor: theme.lightColor.brownColor,
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    color: "white",
    fontSize: theme.fontSizes.size_24,
    fontWeight: "700",
    lineHeight: 29.5,
  },
  modalDescription: {
    width:208,
    fontSize: theme.fontSizes.size_16,
    color: "white",
    marginVertical: 15,
    textAlign: "center",
    lineHeight: 20,
    fontWeight: "400",
    letterSpacing: 0.5,
    marginTop: theme.verticalSpacing.space_50,
  },
  bottomSection: {
    height: theme.verticalSpacing.space_260,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default AccountVerifiedScreen;
