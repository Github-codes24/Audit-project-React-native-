import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, StatusBar, TextInput, ScrollView } from "react-native";
import { theme } from "../../utils";
import CustomTextInput from "../../reusableComponent/customTextInput/customTextInput";
import CustomButton from "../../reusableComponent/button/button";
import CustomModal from "../../reusableComponent/customModal/customModal";
import { useNavigation } from "@react-navigation/native";
import Header from "../../reusableComponent/header/header";
import { useContactUsApiMutation } from "../../redux/apiSlice/customerSupportApiSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loader from "../../reusableComponent/loader/loader";
import { useGetuserApiQuery } from "../../redux/apiSlice/profileApiSlice";
import { useSelector } from "react-redux";
import { getLoginResponse } from "../../redux/stateSelector/authStateSelector";

const ContactScreen = () => {


  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [contactUsApi, { isLoading }] = useContactUsApiMutation();

const response=useSelector(getLoginResponse)
  // console.log('2222222',response)
 const userId=response?.data?.id
console.log('userId',userId)
 const { 
    data: getuserdata, 
    error: getUserdataApiError, 
    isLoading: getUserdataApiIsLoading 
  } = useGetuserApiQuery(userId); 
  const {  email, phoneNumber, } =
    getuserdata?.getUser||{}
  

  const closeModal = () => {
    setModalVisible(false);
  };

  // Validation schema
  const validationSchema = Yup.object().shape({
    Name: Yup.string().trim().required("Name is required"),
    email: Yup.string()
      .email("Enter a valid email address")
      .required("Email is required"),
    message: Yup.string()
      .trim()
      .min(10, "Message must be at least 10 characters")
      .required("Message is required"),
  });

  // Form submission handler
  const handleFormSubmit =  (values, { resetForm }) => {
    console.log("Form submitted:", values);
    contactUsApi(values)
  };

  // Initialize Formik
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {
      Name: "",
      message: "",
      email: ""
    },
    validationSchema,
    onSubmit: handleFormSubmit,
  });

  useEffect(() => {
    if (isModalVisible) {
      const timer = setTimeout(() => {
        closeModal();
      }, 3000); 
      return () => clearTimeout(timer); 
    }
  }, [isModalVisible]);

  return (
    <View style={{ flex: 1, backgroundColor: "#F2F3F5" }}>
      <Loader isLoading={isLoading} />
      <CustomModal
        visible={isModalVisible}
        onClose={closeModal}
        title="Thank You!"
        description={"We will get back to you shortly"}
        buttons={[
          {
            label: "Go to home page",
            type: "primary",
            onPress: () => {
              closeModal();
              navigation.navigate("Home");
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

        <Text style={style.textStyle}>Email</Text>
        <Text>{email}</Text>

        <Text style={[style.textStyle, { marginTop: 10 }]}>Phone No.</Text>
        <Text>{phoneNumber}</Text>

        <Text style={style.textBox}>Name</Text>
        <CustomTextInput
          placeholder={"Enter your name"}
          value={values.Name}
          onChangeText={handleChange("Name")}
          onBlur={handleBlur("Name")}
          error={touched.Name && errors.Name}
        />
        {touched.Name && errors.Name && (
          <Text style={style.errorText}>{errors.Name}</Text>
        )}

        <Text style={style.textBox}>Email</Text>
        <CustomTextInput
          placeholder={"Enter your email address"}
          value={values.email}
          onChangeText={handleChange("email")}
          onBlur={handleBlur("email")}
          error={touched.email && errors.email}
        />
        {touched.email && errors.email && (
          <Text style={style.errorText}>{errors.email}</Text>
        )}

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
          value={values.message}
          onChangeText={handleChange("message")}
          onBlur={handleBlur("message")}
        />
        {touched.message && errors.message && (
          <Text style={style.errorText}>{errors.message}</Text>
        )}

        <View style={{ marginTop: theme.verticalSpacing.space_10 }}>
          <CustomButton
            onPress={handleSubmit}
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
    marginTop: 5,
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
