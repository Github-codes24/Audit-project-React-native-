import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, StatusBar, TextInput, ScrollView, TouchableOpacity, Linking } from "react-native";
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
import * as Svg from '../../assets/images/svg'
import CustomDropDown from "../../reusableComponent/customDropDown/customDropDown";
import { Dropdown } from "react-native-element-dropdown";

const ContactScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [emailEnquiry, setEmailEnquiry] = useState('');
  const [message, setMessage] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [value, setValue] = useState('');
  const [messageError,setMessageError]=useState('')


const navigation=useNavigation()

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

  const { email, phoneNumber, firstName, lastName } = getcontactusData?.data || {};

  const closeModal = () => {
    setModalVisible(false);
  };

  const validateMobileNumber = (number) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(number);
  };

 const handleFormSubmit = () => {
  setMobileError('');
  setMessageError('');
  if (!mobileNumber.trim()) {
    setMobileError('Mobile number is required.');
    return;
  }

  if (!validateMobileNumber(mobileNumber)) {
    setMobileError('Mobile number must be exactly 10 digits.');
    return;
  }
  if (!message.trim()) {
    setMessageError('Message cannot be empty.');
    return;
  }

  // Submit API request
  contactUsApi({ name, email: emailEnquiry, message, contactNumber: mobileNumber, iWantTo: value })
    .then((response) => {
      console.log('response:', response);
      if (response?.data) {
        setModalVisible(true);
        setMessage('');
        setMobileNumber(''); // Clear mobile number on success
      } else {
        console.log("No data received from API");
      }
    })
    .catch((error) => {
      alertError("Failed to submit the form. Please try again.");
    });
};



  
  const data = [
    { label: "Book consultation for sponsor licence", value: "Book consultation for sponsor licence" },
    { label: "Book consultation for compliance audit.", value: "Book consultation for compliance audit." },
    { label: "Consultation for something else", value: "Consultation for something else" },
    { label: "Want to share feedback", value: "Want to share feedback" },
  ];

  return (
    <ScrollView style={{ marginBottom: theme.verticalSpacing.space_100 }} showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, backgroundColor: "#F2F3F5", }}>
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

        <View style={{ marginHorizontal: theme.horizontalSpacing.space_18, marginTop: theme.verticalSpacing.space_20 }}>
          <Text
            style={{
              color: theme.lightColor.blackColor,
              fontSize: theme.fontSizes.size_20,
              fontWeight: "700",
              marginLeft: -3
            }}
          >
            {"Book a consulation/contact us"}
          </Text>
          <Text style={[style.textBox,{marginBottom:5}]}>{'I want to'}</Text>
          <Dropdown
           placeholderStyle={{
        color:'gray',
    fontSize:theme.fontSizes.size_16,
    fontWeight: "400",
  }}
          selectedTextStyle={{
    fontSize:theme.fontSizes.size_16,
    fontWeight: "400",
    color: "black", 
  }} 
  itemTextStyle={{
    fontSize: theme.fontSizes.size_16,
    fontWeight: "400",
    color: "black",
  }} 
            data={data}
            labelField="label"
            valueField="value"
            placeholder="Select"
           
            containerStyle={{borderRadius:10}}
            value={value}
            onChange={item => setValue(item.value)}
            style={{
              height: theme.verticalSpacing.space_50,
              width: theme.horizontalSpacing.space_374,
              borderColor: 'gray',
              backgroundColor: 'white',
              borderRadius: 10,
              paddingHorizontal: 10,
            }}
          />

          <Text style={style.textBox}>Name</Text>
          <TextInput
            value={`${getuserdata?.getUser?.firstName} ${getuserdata?.getUser?.lastName}`}
            editable={false}
            style={{
              width: theme.horizontalSpacing.space_374,
              height: theme.verticalSpacing.space_50,
              backgroundColor: 'white',
              borderRadius: 10,
              paddingLeft: 10,
              marginTop:5
            }}
          />
             

  
          <Text style={style.textBox}>Email</Text>
          <TextInput
            value={getuserdata?.getUser?.email}
            editable={false}
            style={{
              width: theme.horizontalSpacing.space_374,
              height: theme.verticalSpacing.space_50,
              backgroundColor: 'white',
              borderRadius: 10,
              paddingHorizontal: 10,
               marginTop:5
            }}
          />

          <Text style={style.textBox}>Contact number</Text>
          <TextInput
            keyboardType="numeric"
            maxLength={10}
            value={mobileNumber}
            placeholder="Enter contact number"
            onChangeText={(text) => setMobileNumber(text)}
            style={{
              width: theme.horizontalSpacing.space_374,
              height: theme.verticalSpacing.space_50,
              backgroundColor: 'white',
              borderRadius: 10,
              paddingHorizontal: 10,
               marginTop:5
            }}
          />
          {mobileError ? (
            <Text style={style.errorText}>{mobileError}</Text>
          ) : null}
          <Text style={style.textBox}>Message</Text>
          <TextInput
            style={{
              height: theme.verticalSpacing.space_156,
              backgroundColor: "white",
              borderRadius: 10,
              padding: 10,
              textAlignVertical: "top",
              width: theme.horizontalSpacing.space_374,
              marginTop:5
            }}
            placeholder="Enter your query........."
            placeholderTextColor={'#BABABA'}
            multiline
            value={message}
            onChangeText={(text) => setMessage(text)}
          />
          {messageError ? (
  <Text style={style.errorText}>{messageError}</Text>
) : null}


        </View>

        <View style={{ marginTop: theme.verticalSpacing.space_30 }}>
          <CustomButton
            onPress={handleFormSubmit}
            title={isLoading ? "Submitting..." : "Submit"}
            disabled={isLoading}
          />
        </View>

        <View style={{ marginHorizontal: theme.horizontalSpacing.space_20 }}>

          <Text style={{fontWeight:"700",marginTop:10,fontSize:theme.fontSizes.size_20,}}>Nara solicitors contact details</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: theme.verticalSpacing.space_10, }}>
            <Text style={[style.textStyle, {  }]}>Email</Text>
          </View>
          <TouchableOpacity onPress={() => Linking.openURL('mailto:admin@narasolicitors.com')}>
            
            <Text style={{
              color: 'black',
              fontSize: theme.fontSizes.size_16,
              fontWeight: '500',
            }}>
              {'admin@narasolicitors.com'}
            </Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: theme.verticalSpacing.space_10, }}>
            <Text style={[style.textStyle, {}]}>Contact</Text>
          </View>
          <TouchableOpacity onPress={() => Linking.openURL('tel:+442045764977')}>
            <Text style={{
              color: 'black',
              fontSize: theme.fontSizes.size_16,
              fontWeight: '500',
            }}>
              {'+44 204 576 4977'}
            </Text>
          </TouchableOpacity>

          <View style={{ marginTop: 10 }}>
            <Text style={style.textStyle}>{'Website'}</Text>
            <TouchableOpacity  onPress={() => Linking.openURL('https://www.narasolicitors.com')}>
              <Text style={{
                color: 'black',
                fontSize: theme.fontSizes.size_16,
                fontWeight: '500',
              }}>
                {'www.narasolicitors.com'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  textStyle: {
    fontSize: theme.fontSizes.size_16,
    fontWeight: "500",
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
