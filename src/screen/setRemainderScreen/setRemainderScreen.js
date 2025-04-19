import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, ActivityIndicator } from "react-native";
import Header from "../../reusableComponent/header/header";
import { theme } from "../../utils";
import * as Svg from "../../assets/images/svg";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import CustomDropDown from "../../reusableComponent/customDropDown/customDropDown";
import CustomButton from "../../reusableComponent/button/button";
import { useGetReminderForOptionApiQuery, useSetRemainderApiMutation } from "../../redux/apiSlice/reminderApiSlice";
import { getLoginResponse } from "../../redux/stateSelector/authStateSelector";
import { useSelector } from "react-redux";
import { alertError, alertSuccess } from "../../utils/Toast";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import { useNavigation } from "@react-navigation/native";
import Loader from "../../reusableComponent/loader/loader";

const SetRemainderScreen = ({ navigation, route }) => {
  const { remainderdata } = route?.params || {};

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [reminderName, setReminderName] = useState(remainderdata?.reminderName || "");
  const [employeeName, setEmployeeName] = useState(remainderdata?.employeeName || "");
  const [employeeEmail, setEmployeeEmail] = useState(remainderdata?.employeeEmail || "");
  const [reminderFor, setReminderFor] = useState(remainderdata?.reminderFor || "");
  const [description, setDescription] = useState(remainderdata?.description || "");
  const [loading, setLoading] = useState(false); 

  const data = [
    { label: "Visa expiry date", value: "Visa expiry date" },
    { label: "Right to work check", value: "Right to work check" },
    { label: "Passport validity", value: "Passport validity" },
    { label: "Other", value: "Other" },
  ];

   const { data: getReminderForOptionData, 
    error: getReminderForOptionDataApiError, 
    isLoading: getReminderForOptionDataApiIsLoading}=useGetReminderForOptionApiQuery()


const dataremainder = getReminderForOptionData?.data?.map(item => ({
  label: item,
  value: item.toLowerCase().replace(/\s+/g, '_'),
})) || [];


  const response = useSelector(getLoginResponse);
  const userId = response?.data?.id;

  const [setRemainderApi] = useSetRemainderApiMutation();

  const handleSetReminder = () => {
    if (loading) return; 
    setLoading(true);

    const body = {
      reminderName,
      employeeName,
      employeeEmail,
      date: moment(date).format("YYYY-MM-DD"),
      reminderFor,
      description,
    };

    setRemainderApi({ userId, body })
      .then((res) => {
        if (res?.error) {
          alertError(res.error.data?.message || "Error setting reminder.");
        } else {
          alertSuccess("Reminder set successfully!");
          navigation.navigate(MainRoutes.REMAINDERLIST_SCREEN);
        }
      })
      .finally(() => setLoading(false));
  };

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
    <ScrollView style={{ flex: 1, marginBottom: theme.verticalSpacing.space_100 }}>
      <Header />
      <View style={{ flex: 1, backgroundColor: "#F5F5F5", alignItems: "center",  }}>
        <View style={{ marginTop:theme.verticalSpacing.space_20 }}>
          <Text style={style.remainderText}>{"Reminder"}</Text>
         <Text style={style.textStyle}>{"Reminder for"}</Text>
          <CustomDropDown data={data} value={reminderFor} onSelect={setReminderFor} isShowLabel={true} 
          />

          <Text style={style.textStyle}>{"Reminder name (for your own reference)"}</Text>
          <TextInput
            value={reminderName}
            onChangeText={setReminderName}
            placeholderTextColor="#BABABA"
            placeholder="Enter reminder name"
            style={style.textInput}
          />

          <Text style={style.textStyle}>{"Employee name"}</Text>
          <TextInput
            value={employeeName}
            onChangeText={setEmployeeName}
            placeholderTextColor="#BABABA"
            placeholder="Enter employee name"
            style={style.textInput}
          />

          <Text style={style.textStyle}>{"Employee email (optional)"}</Text>
          <TextInput
            value={employeeEmail}
            onChangeText={setEmployeeEmail}
            placeholderTextColor="#BABABA"
            placeholder="Enter employee email"
            style={style.textInput}
          />

          <Text style={style.textStyle}>{" Reminder date"}</Text>
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
              <DateTimePicker value={date} mode="date" display="default" onChange={onChange} />
            )}
          </View>

          

          <Text style={style.textStyle}>{"Description (optional)"}</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholderTextColor="#BABABA"
            placeholder="Custom info for reminder"
            multiline
            style={[style.textInput, { height: theme.verticalSpacing.space_114, textAlignVertical: "top" }]}
          />
        </View>
        <View style={{marginTop:theme.verticalSpacing.space_10}}>
        <CustomButton
          title={ "Set reminder"}
          onPress={handleSetReminder}
          isLoading={loading}
          disabled={loading}
        />
        </View>
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
    width: theme.horizontalSpacing.space_374,
    height: theme.verticalSpacing.space_50,
    backgroundColor: theme.lightColor.whiteColor,
    borderRadius: 10,
    paddingHorizontal: theme.horizontalSpacing.space_10,
    marginVertical: 4,
  },
});

export default SetRemainderScreen;
