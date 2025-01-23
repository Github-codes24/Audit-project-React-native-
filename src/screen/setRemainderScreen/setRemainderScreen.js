import React, { useState,useEffect } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View,ScrollView } from "react-native";
import Header from "../../reusableComponent/header/header";
import { theme } from "../../utils";
import CustomTextInput from "../../reusableComponent/customTextInput/customTextInput";
import * as Svg from "../../asstets/images/svg";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import CustomDropDown from "../../reusableComponent/customDropDown/customDropDown";
import CustomButton from "../../reusableComponent/button/button";
import { useSetRemainderApiMutation } from "../../redux/apiSlice/reminderApiSlice";
import { getLoginResponse } from "../../redux/stateSelector/authStateSelector";
import { useSelector } from "react-redux";
import { alertError, alertSuccess } from "../../utils/Toast";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import { useNavigation } from "@react-navigation/native";


const SetRemainderScreen = ({navigation}) => {

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [reminderName, setReminderName] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [reminderFor, setReminderFor] = useState("");
  const [description, setDescription] = useState("");

  const data = [
    { label: "Visa expiry date", value: "Visa expiry date" },
    { label: "Right to work check", value: "Right to work check" },
    { label: "Other", value: "Other" },
  ];

  const response = useSelector(getLoginResponse);
  const userId = response?.data?.id;

  const [
    setRemainderApi,
    { isLoading: isSetRemainderApiMutationLoading, isSuccess: isSetRemainderApiMutationSuccess },
  ] = useSetRemainderApiMutation();

 const handleSetReminder = () => {
    const body = {
      reminderName,
      employeeName,
      employeeEmail,
      date: moment(date).format("YYYY-MM-DD"),
      reminderFor: reminderFor,
      description,
    };

    setRemainderApi({ userId, body })
      .unwrap()
      .then((response) => {
        console.log("Reminder set successfully:", response);
        alertSuccess("Reminder set successfully!");
      })
      .catch((err) => {
        alertError(err?.data?.message || "Error setting reminder.");
      });
  };

  useEffect(() => {
    if (isSetRemainderApiMutationSuccess) {
      alertSuccess("Reminder set successfully!");
      navigation.navigate(MainRoutes.DASHBOARD_SCREEN, {
        screen: 'Remainder', 
      });
    }
  }, [isSetRemainderApiMutationSuccess]);

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const showDatePicker = () => {
    setShow(true);
  };
  return (
    <ScrollView style={{flex:1}}>
       <Header />
    <View style={{ flex: 1, backgroundColor: "#F5F5F5",alignItems:"center",paddingHorizontal:10 }}>
      <View style={{marginVertical:theme.horizontalSpacing.space_10,}}>
        <Text style={style.remainderText}>{"Reminder"}</Text>
        <Text style={style.textStyle}>{"Reminder name"}</Text>
        <TextInput
          value={reminderName}
          onChangeText={(text) => setReminderName(text)}
          placeholderTextColor="#BABABA"
          placeholder="Enter reminder name"
          style={style.textInput}
        />

        <Text style={style.textStyle}>{"Employee name"}</Text>
        <TextInput
          value={employeeName}
          onChangeText={(text) => setEmployeeName(text)}
          placeholderTextColor="#BABABA"
          placeholder="Enter employee name"
          style={style.textInput}
        />

        <Text style={style.textStyle}>{"Employee email (optional)"}</Text>
        <TextInput
          value={employeeEmail}
          onChangeText={(text) => setEmployeeEmail(text)}
          placeholderTextColor="#BABABA"
          placeholder="Enter employee email"
          style={style.textInput}
        />

        <Text style={style.textStyle}>{"Date"}</Text>
        <View style={[style.textInput, { alignItems: "center", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10 }]}>
          <TextInput
            placeholderTextColor="#BABABA"
            style={{ color: "black" }}
            placeholder="Enter date"
            editable={false}
            value={moment(date).format("DD/MM/YYYY")}
          />
          <TouchableOpacity onPress={showDatePicker}>
            <Svg.DateIcon />
          </TouchableOpacity>
      
          {show && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === "ios" ? "default" : "default"}
              onChange={onChange}
            />
          )}

        </View>

        <Text style={style.textStyle}>{"Reminder for"}</Text>
        <CustomDropDown
          data={data}
          value={reminderFor}
          onSelect={(item) => setReminderFor(item)} 
          placeholder="Select an Option"
          isShowLabel={true}
        />
        <Text style={style.textStyle}>{"Description (optional)"}</Text>
        <TextInput
          value={description}
          onChangeText={(text) => setDescription(text)}
          placeholderTextColor="#BABABA"
          placeholder="Custom info for reminder"
          multiline
          style={[style.textInput, { height: theme.verticalSpacing.space_114, textAlignVertical: "top" }]}
        />
      </View>
      <CustomButton
        title={"Set reminder"}
        onPress={handleSetReminder} 
        isLoading={isSetRemainderApiMutationLoading} 
      />
    </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  remainderText: {
    fontSize: theme.fontSizes.size_20,
    fontWeight: "700",
    color: theme.lightColor.blackColor,
  },
  textStyle: {
    marginTop: theme.verticalSpacing.space_10,
    fontWeight: "400",
    fontSize: theme.fontSizes.size_16,
  },
  textInput: {
    width:theme.horizontalSpacing.space_374,
    height: theme.verticalSpacing.space_50,
    backgroundColor: theme.lightColor.whiteColor,
    borderRadius: 10,
    paddingHorizontal: theme.horizontalSpacing.space_16,
    marginVertical: 4,
  },
});

export default SetRemainderScreen;
