import React,{useEffect, useState} from "react";
import { View,Text, StyleSheet, TouchableOpacity } from "react-native";
import CustomHeader from "../../reusableComponent/customHeader/customHeader";
import * as Svg from '../../asstets/images/svg';
import { theme } from "../../utils";
import CustomTextInput from "../../reusableComponent/customTextInput/customTextInput";
import CustomButton from "../../reusableComponent/button/button";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import BackgroundLayout from "../../reusableComponent/backgroundLayout/backgroundLayout";
import CustomCheckbox from "../../reusableComponent/customCheckBox/customCheckBox";
import { useForgotPasswordApiMutation } from "../../redux/apiSlice/authApiSlice";
import { alertError } from "../../utils/Toast";
import CustomModal from "../../reusableComponent/customModal/customModal";
import { useNavigation } from "@react-navigation/native";


const ForgotPasswordScreen=()=>{
const navigation=useNavigation()
const [isModalVisible, setModalVisible] = useState(false);
const [email,setEmail]=useState('')
  
const closeModal = () => {
    setModalVisible(false);
  };
  const [
    forgotPasswordApi,{
        isLoading: isForgotPasswordApiLoading,
        isSuccess: isForgotPasswordApiSuccess,
        error: forgotPasswordApiError,
        data:forgotPasswordApiData,
        }
    ]=useForgotPasswordApiMutation()
   
    const handleNext=()=>{
   forgotPasswordApi({email})
    }
  useEffect(() => {
  if (isForgotPasswordApiSuccess) {
     setModalVisible(true);
  } else if (forgotPasswordApiError) {
    alertError(
      "Forgot Password Error",
      forgotPasswordApiError?.data?.message || "Something went wrong. Please try again."
    );
  }
}, [isForgotPasswordApiSuccess, forgotPasswordApiError]);
   

return(
    <BackgroundLayout>
    <View style={{}}>
        
        <CustomModal
        visible={isModalVisible}
        onClose={closeModal}
        title="Code sent!"
        description={"Code has been sent to your email please check your email"}
        buttons={[
          {
            label: "Verify code",
            type: "primary",
            onPress: () => {
             closeModal(); // Close the modal
              navigation.navigate(MainRoutes.OTP_SCREEN, { email });
            },
          },
        ]}
        />
        <CustomHeader
        onBackPress={()=>navigation.goBack()}
        leftIcon={<Svg.ArrowBack/>}
        title={'Forgot Password'}
        />
      <Text style={style.Textstyle}>No worries! Enter your email address below and we will send you a code to reset password.</Text>
      <View style={style.inputView}>
        <Text>E-mail</Text>
        <CustomTextInput
        value={email}
        onChangeText={(text)=>setEmail(text)}
        leftIcon={<Svg.MessageIcon/>}
        placeholder={'Enter your email address'}
        />
         <TouchableOpacity style={style.forgetView}
        onPress={()=>navigation.navigate(MainRoutes.LOGIN_SCREEN)}
             >
               
         <Text style={{ textAlign: 'right', padding: 10,color:theme.lightColor.blackColor,fontWeight:'600' }}>{'Back to login'}</Text>
            </TouchableOpacity>
        <View style={{width:'100%',height:"100%",marginTop:theme.verticalSpacing.space_269}}>
        <CustomButton
         onPress={handleNext}
        title={'Send Reset Instruction'}
        />
        </View>
    </View>
    </View>
    </BackgroundLayout>
)
}
const style=StyleSheet.create({
    main:{
     backgroundColor:"red",
        justifyContent:"center",
        
    },
     forgetView:{
        width: '100%', 
        // marginTop:theme.verticalSpacing.space_10
    },
Textstyle:{
width:theme.horizontalSpacing.space_358,
textAlign:"center",
marginTop:theme.verticalSpacing.space_70,
alignSelf:'center',
// backgroundColor:theme.lightColor.whiteColor,

    },
    
    inputView:{
        marginTop:theme.verticalSpacing.space_100,
        padding:10,
    //    backgroundColor:"white",
       
    }
})
export default ForgotPasswordScreen;