import React,{useState,useEffect} from "react";
import { Text, View,Modal, StyleSheet, SafeAreaView, Image } from "react-native";
import { useDispatch } from "react-redux";
import { resetAuth } from "../../redux/stateSlice/authStateSlice";
import { theme } from "../../utils";
import { MainRoutes } from "../../navigation/routeAndParamsList";

const DeleteSuccessFully=({navigation})=>{
  const dispatch = useDispatch();

  const [isModalVisible, setModalVisible] = useState(true); 
 const [countdown, setCountdown] = useState(5);

  const closeModal = () => {
    setModalVisible(false);
   navigation.navigate(MainRoutes.WELCOME_SCREEN)
  };

  useEffect(() => {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval); 
            setModalVisible(true); 
           dispatch(resetAuth());
           navigation.navigate(MainRoutes.WELCOME_SCREEN)
          }
          return prev - 1; 
        });
      }, 1000); 
  
      return () => clearInterval(interval); 
    }, [navigation]);

  return (
    <SafeAreaView>
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
                 Redirecting to Welcom screen in {countdown} second{countdown > 1 ? "s" : ""}...
                 </Text>
             
            </View>
          </View>
        </Modal>

        <Image
          style={style.imageStyle}
          source={require('../../asstets/images/deletesuccess.png')}
        />
  <Text style={{fontWeight:'700',width:290,alignSelf:'center',textAlign:"center",marginTop:20,fontSize:20,}}>{'Your account has been deleted successfully!'}</Text>
      </View>

      <View
        style={{
          height: theme.verticalSpacing.space_260,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
      

       
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  Main: {
   height:'100%',
    alignItems: "center",
    marginTop:'40%',
   
  },
  imageStyle: {
    width: 342,
    height: 244,
  },
  textStyle: {
    fontSize:theme.fontSizes.size_30,
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
    width: "100%", 
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

export default DeleteSuccessFully;