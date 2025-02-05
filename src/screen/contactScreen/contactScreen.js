import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, StatusBar, TextInput, ScrollView } from "react-native";
import { theme } from "../../utils";
import CustomTextInput from "../../reusableComponent/customTextInput/customTextInput";
import CustomButton from "../../reusableComponent/button/button";
import CustomModal from "../../reusableComponent/customModal/customModal";
import { useNavigation } from "@react-navigation/native";
import Header from "../../reusableComponent/header/header";
import { useContactUsApiMutation, useGetContactUsQuery } from "../../redux/apiSlice/customerSupportApiSlice";
import { useGetuserApiQuery } from "../../redux/apiSlice/profileApiSlice";
import { useSelector } from "react-redux";
import { getLoginResponse } from "../../redux/stateSelector/authStateSelector";
import Loader from "../../reusableComponent/loader/loader";
import { alertError } from "../../utils/Toast";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import * as Svg from '../../asstets/images/svg'

const ContactScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
   const [name, setName] = useState('');
  const [emailEnquiry, setEmailEnquiry] = useState('');
  const [message, setMessage] = useState('');
  
  const navigation = useNavigation();
  const [contactUsApi, { isLoading }] = useContactUsApiMutation();

  const response = useSelector(getLoginResponse);
  const userId = response?.data?.id;


const { 
    data: getuserdata, 
    error: getUserdataApiError, 
    isLoading: getUserdataApiIsLoading 
  } = useGetuserApiQuery(userId); 
  

const { 
    data: getcontactusData, 
    error: getcontactusDataApiError, 
    isLoading: getcontactusDataApiIsLoading 
  } = useGetContactUsQuery();


useEffect(() => {
    if (getcontactusData?.data) {
      const { firstName, lastName, email } = getcontactusData.data;
      setName(`${getuserdata?.getUser?.firstName} ${getuserdata?.getUser?.lastName}`);
      setEmailEnquiry(getuserdata?.getUser?.email);
    }
  }, [getcontactusData]);




  console.log('getcontactusData',getcontactusData)

  const { email, phoneNumber,firstName,lastName } = getcontactusData?.data || {};

  const closeModal = () => {
    setModalVisible(false);
  };

 const handleFormSubmit = () => {
  contactUsApi({ name,email: emailEnquiry, message })
    .then((response) => {
      console.log('response4354354',response)
      if (response?.data) {
        setModalVisible(true);
        setMessage('');
      } else {
        console.log("No data received from API");
        // alert("Something went wrong. Please try again.");
      }
    })
    .catch((error) => {
      alertError("Failed to submit the form. Please try again.");
    });
};
<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.62 7.79C5.06 10.62 7.38 12.93 10.21 14.38L12.41 12.18C12.68 11.91 13.08 11.82 13.43 11.94C14.55 12.31 15.76 12.51 17 12.51C17.55 12.51 18 12.96 18 13.51V17C18 17.55 17.55 18 17 18C7.61 18 0 10.39 0 1C0 0.45 0.45 0 1 0H4.5C5.05 0 5.5 0.45 5.5 1C5.5 2.25 5.7 3.45 6.07 4.57C6.18 4.92 6.1 5.31 5.82 5.59L3.62 7.79Z" fill="black"/>
</svg>


  return (
    <View style={{ flex: 1, backgroundColor: "#F2F3F5" }}>
      <Loader isLoading={isLoading} />
      <CustomModal
        visible={isModalVisible}
        
        onClose={closeModal}
        title="Thank You!"
        description="We will get back to you shortly"
        buttons={[
          {
            label: "Go to home page",
            type: "primary",
            onPress: () => {
              closeModal();
              navigation.navigate('Home');
            },
          },
        ]}
      />

      <StatusBar backgroundColor={"#592951"} />
      <Header />

      <ScrollView contentContainerStyle={{ padding: 10 }} showsVerticalScrollIndicator={false}>
        <Text
          style={{
            color: theme.lightColor.blackColor,
            fontSize: theme.fontSizes.size_20,
            fontWeight: "700",
          }}
        >
          {"Contact us"}
        </Text>
        <View style={{flexDirection:'row',alignItems:'center',marginTop:theme.verticalSpacing.space_10}}>
         <Svg.MessageIcon/>
        <Text style={[style.textStyle,{marginLeft:5}]}>Email</Text>
        </View>
        <Text style={{color:'black',fontSize:theme.fontSizes.size_16,fontWeight:'500'}}>{email}</Text>
         <View style={{flexDirection:'row',alignItems:'center',marginTop:theme.verticalSpacing.space_10,}}>
      
        <Svg.PhoneIcon/>
        
        <Text style={[style.textStyle, {marginLeft:5 }]}>Phone No.</Text>
        </View>
        
        <Text style={{color:'black',fontSize:theme.fontSizes.size_16,marginLeft:5,fontWeight:'500'}}>{phoneNumber}</Text>

        <Text style={style.textBox}>Name</Text>
        <TextInput
          value={`${getuserdata?.getUser?.firstName} ${getuserdata?.getUser?.lastName}`} 
          editable={false} 
        style={{width:theme.horizontalSpacing.space_374,height:theme.verticalSpacing.space_50,backgroundColor:'white',borderRadius:10,paddingLeft:10}}
        />
        {/* <CustomTextInput
          placeholder={"John Weak"}
          value={name}
          onChangeText={(text) => setName(text)}
        /> */}

        <Text style={style.textBox}>Email</Text>
        <TextInput
          value={getuserdata?.getUser?.email}
          editable={false}
        style={{width:theme.horizontalSpacing.space_374,height:theme.verticalSpacing.space_50,backgroundColor:'white',borderRadius:10,paddingHorizontal:10}}
        />


        {/* <CustomTextInput
          placeholder={"john@example.com"}
          value={emailEnquiry}
          onChangeText={(text) => setEmailEnquiry(text)}
        /> */}

        <Text style={style.textBox}>Message</Text>
        <TextInput
          style={{
            height: theme.verticalSpacing.space_156,
            backgroundColor: "white",
            borderRadius: 10,
            padding: 10,
            textAlignVertical: "top",
            width:theme.horizontalSpacing.space_374
          }}
          placeholder="Enter your query........."
          placeholderTextColor={'#BABABA'}
          multiline
          value={message}
          onChangeText={(text) => setMessage(text)}
        />

        <View style={{ marginTop: theme.verticalSpacing.space_30 }}>
          <CustomButton
            onPress={handleFormSubmit}
            title={isLoading ? "Submitting..." : "Submit"}
            disabled={isLoading}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  textStyle: {
    fontSize: theme.fontSizes.size_18,
    fontWeight: "600",
    // marginTop: 5,
  },
  textBox: {
    marginTop: theme.horizontalSpacing.space_14,
    color: theme.lightColor.blackColor,
    fontSize: theme.fontSizes.size_16,
    fontWeight: "500",
  },
  errorText: {
    color: "red",
    fontSize: theme.fontSizes.size_14,
    marginTop: 5,
  },
});

export default ContactScreen;
