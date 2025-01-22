import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, StatusBar, TextInput, ScrollView } from "react-native";
import { theme } from "../../utils";
import CustomTextInput from "../../reusableComponent/customTextInput/customTextInput";
import CustomButton from "../../reusableComponent/button/button";
import CustomModal from "../../reusableComponent/customModal/customModal";
import { useNavigation } from "@react-navigation/native";
import Header from "../../reusableComponent/header/header";
import { useContactUsApiMutation } from "../../redux/apiSlice/customerSupportApiSlice";
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

  const { email, phoneNumber } = getuserdata?.getUser || {};

  const closeModal = () => {
    setModalVisible(false);
  };

 const handleFormSubmit = () => {
  contactUsApi({ name, email: emailEnquiry, message })
    .then((response) => {
      if (response?.data) {
        setModalVisible(true);
        setName('');
        setEmailEnquiry('');
        setMessage('');
      } else {
        console.log("No data received from API");
        alert("Something went wrong. Please try again.");
      }
    })
    .catch((error) => {
      alertError("Failed to submit the form. Please try again.");
    });
};


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
              navigation.navigate(MainRoutes.DASHBOARD_SCREEN, {
                     screen: 'Home', 
                   });
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
        <Text style={{letterSpacing:1,color:'black',fontSize:theme.fontSizes.size_16}}>{email}</Text>
        
         <View style={{flexDirection:'row',alignItems:'center',marginTop:theme.verticalSpacing.space_10}}>
        <Svg.PhoneIcon/>
        <Text style={[style.textStyle, {marginTop:10,marginLeft:5 }]}>Phone No.</Text>
        </View>
        
        <Text style={{letterSpacing:1,color:'black',fontSize:theme.fontSizes.size_16,marginLeft:5}}>{phoneNumber}</Text>

        <Text style={style.textBox}>Name</Text>
        <CustomTextInput
          placeholder={"Enter your name"}
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <Text style={style.textBox}>Email</Text>
        <CustomTextInput
          placeholder={"Enter your email address"}
          value={emailEnquiry}
          onChangeText={(text) => setEmailEnquiry(text)}
        />

        <Text style={style.textBox}>Message</Text>
        <TextInput
          style={{
            height: theme.verticalSpacing.space_156,
            backgroundColor: "white",
            borderRadius: 10,
            padding: 10,
            textAlignVertical: "top",
          }}
          placeholder="Enter your query...."
          multiline
          value={message}
          onChangeText={(text) => setMessage(text)}
        />

        <View style={{ marginTop: theme.verticalSpacing.space_10 }}>
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
