import React,{useEffect, useState} from "react";
import { View,Text } from "react-native";
import CustomHeader from "../../reusableComponent/customHeader/customHeader";
import * as Svg from '../../asstets/images/svg'
import { theme } from "../../utils";
import BackgroundLayout from "../../reusableComponent/backgroundLayout/backgroundLayout";
import CustomTextInput from "../../reusableComponent/customTextInput/customTextInput";
import CustomButton from "../../reusableComponent/button/button";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import CustomCheckbox from "../../reusableComponent/customCheckBox/customCheckBox";
import { alertError } from "../../utils/Toast";
import { useRegisterMutation } from "../../redux/apiSlice/authApiSlice";
import { setLoginResponse } from "../../redux/stateSlice/authStateSlice";
import { useSelector,useDispatch } from "react-redux";
import { getLoginResponse } from "../../redux/stateSelector/authStateSelector";
const RegisterCompanyScreen=({navigation,route})=>{

const { email, password, firstName, lastName,confirmPassword} = route.params || {};



 const [isPrivacyChecked, setPrivacyChecked] = useState(false);
  const [isTermsChecked, setTermsChecked] = useState(false);
  const [companyName,setCompanyName]=useState('')
 const [phoneNumber,setPhoneNumber]=useState('')


console.log('dataaaa',{
  email, password, firstName, lastName,confirmPassword,companyName,phoneNumber
})

  const dispatch=useDispatch()
  
 const handleVerify = () => {
    if (!phoneNumber || !validatePhoneNumber(phoneNumber)) {
      alertError("Invalid phone number", "Please enter a valid 10-digit phone number.");
      return;
    }
    if (isPrivacyChecked && isTermsChecked) {
      registerApi({ email, password, firstName, lastName, companyName, phoneNumber,confirmPassword })
        .unwrap();
    } else {
      alertError('Please agree to both terms to continue.');
    }
  };
 const validatePhoneNumber = (number) => {
    const phonePattern = /^[0-9]{10}$/; 
    return phonePattern.test(number);
  };

const [registerApi,{
    isLoading: isRegisterApiLoading,
      isSuccess: isRegisterApiSuccess,
      error:registerApiError,
      data:registerApiData,
   }]=useRegisterMutation()
 
   useEffect(() => {
    if (registerApiError) {
      alertError(registerApiError?.data?.message || "An error occurred during registration.");
    }

    if (isRegisterApiSuccess) {
      navigation.navigate(MainRoutes.EMAIL_VERIFICATION_SCREEN,{email});
    }
  }, [isRegisterApiSuccess,registerApiError, registerApiData, dispatch, navigation]);

return(
    <BackgroundLayout>
    <View style={{padding:10}}>
        <CustomHeader
        leftIcon={<Svg.ArrowBack/>}
        title={'Register Account'}
        onBackPress={()=>navigation.goBack()}
        />
        <View style={{marginTop:theme.verticalSpacing.space_100}}>
            <Text>Company name {'(not required)'}</Text>
         <CustomTextInput
         value={companyName}
         onChangeText={(text)=>setCompanyName(text)}
         placeholder={'Company Name'}
         />
         <Text style={{marginTop:20}}>Phone Number</Text>
          <CustomTextInput
          value={phoneNumber}
          onChangeText={(text)=>setPhoneNumber(text)}
          keyboardType="numeric"
          placeholder={'Phone Number'}
          />
           {/* <CustomTextInput
           placeholder={'Type of company'}
           /> */}
           </View>

            <View style={{marginTop:theme.verticalSpacing.space_20}}>
          <CustomCheckbox
         isChecked={isPrivacyChecked}
         onPress={() => setPrivacyChecked(!isPrivacyChecked)}
          text={'I have read and understood the'}
          linkText={'Privacy Policy*'}
          link="https://drive.google.com/file/d/1SM4uLLNnwWuO4GNiBWIjCN_p0JMB1DOa/view?usp=drive_link"
          />

           <CustomCheckbox
            isChecked={isTermsChecked}
        onPress={() => setTermsChecked(!isTermsChecked)}
          text={'I agree to the '}
          linkText={'Terms and Conditions*'}
           link="https://drive.google.com/file/d/1SM4uLLNnwWuO4GNiBWIjCN_p0JMB1DOa/view?usp=drive_link"
          />

          </View>

        <View style={{marginTop:theme.verticalSpacing.space_165}}>
       <CustomButton
       onPress={handleVerify}
       title={'Verify Your Account'}
       />
       </View>
    </View>
    </BackgroundLayout>
)
}

export default RegisterCompanyScreen;