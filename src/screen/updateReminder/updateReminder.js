import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from "react-native";
import Header from "../../reusableComponent/header/header";
import { theme } from "../../utils";
import * as Svg from "../../asstets/images/svg";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import CustomDropDown from "../../reusableComponent/customDropDown/customDropDown";
import CustomButton from "../../reusableComponent/button/button";
import { useDeleteRemainderApiMutation, useSetRemainderApiMutation, useUpdateRemainderApiMutation } from "../../redux/apiSlice/reminderApiSlice";
import { alertError, alertSuccess } from "../../utils/Toast";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import { useDispatch } from "react-redux";
import Loader from "../../reusableComponent/loader/loader";

const UpdateReminderScreen = ({ navigation, route }) => {
  const { remainderdata } = route?.params || {};

  console.log('remainderdata',remainderdata?._id)


  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [reminderName, setReminderName] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [reminderFor, setReminderFor] = useState('');
  const [description, setDescription] = useState('');
    const [emailError, setEmailError] = useState("");

  const data = [
    { label: "Visa expiry date", value: "Visa expiry date" },
    { label: "Right to work check", value: "Right to work check" },
    { label: "Other", value: "Other" },
  ];

  useEffect(() => {
    if (remainderdata) {
      setDate(new Date(remainderdata?.date || Date.now()));
      setReminderName(remainderdata?.reminderName || "");
      setEmployeeName(remainderdata?.employeeName || "");
      setEmployeeEmail(remainderdata?.employeeEmail || "");
      setReminderFor(remainderdata?.reminderFor || "");
      setDescription(remainderdata?.description || "");
    }
  }, [remainderdata]);

  const [
    updateRemainderApi,
    { isLoading: isSetRemainderApiMutationLoading, isSuccess: isSetRemainderApiMutationSuccess },
  ] = useUpdateRemainderApiMutation();

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return false;
    }
    setEmailError("");
    return true;
  };




  const handleSetReminder = () => {
     if (employeeEmail && !validateEmail(employeeEmail)) {
      alertError("Please enter a valid email.");
      return;
    }

    const body = {
      reminderName,
      employeeName,
       employeeEmail: employeeEmail || "", 
      date: moment(date).format("YYYY-MM-DD"),
      reminderFor: reminderFor,
      description,
    };

    updateRemainderApi({ id: remainderdata?._id, body })
      .unwrap()
      .then(() => {
        console.log("Reminder updated successfully");
      })
      .catch((err) => {
        alertError(err?.data?.message || "Error setting reminder.");
      });
  };

  const [deleteReminder, { isLoading }] = useDeleteRemainderApiMutation();
  const dispatch = useDispatch();

  const handleDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this reminder?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            deleteReminder({ id: remainderdata?._id })
              .unwrap()
              .then(() => {
                 setEmployeeEmail(employeeEmail || "")
                // alertSuccess("Reminder deleted successfully!");
                navigation.navigate(MainRoutes.REMAINDERLIST_SCREEN);
              })
              .catch((error) => {
                alertError(error?.data?.message || "Error deleting reminder.");
              });
          },
          style: "destructive",
        },
      ]
    );
  };

  useEffect(() => {
    if (isSetRemainderApiMutationSuccess) {
      navigation.navigate(MainRoutes.REMAINDERLIST_SCREEN);
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
    <ScrollView style={{ flex: 1, marginBottom: theme.verticalSpacing.space_100 }}>
      <Header />
      <Loader isLoading={isSetRemainderApiMutationLoading} />
      <View style={{ flex: 1, backgroundColor: "#F5F5F5", alignItems: "center", paddingHorizontal: 10 }}>
        <View style={{ marginVertical: theme.horizontalSpacing.space_10 }}>
          <Text style={style.remainderText}>{"Reminder"}</Text>

          <Text style={style.textStyle}>{"Reminder name"}</Text>
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

          <Text style={style.textStyle}>{"Employee email"}</Text>
          <TextInput
            value={employeeEmail}
            onChangeText={setEmployeeEmail}
            placeholderTextColor="#BABABA"
            placeholder="Enter employee email"
            style={style.textInput}
          />
                  {emailError ? <Text style={style.errorText}>{emailError}</Text> : null}
          <Text style={style.textStyle}>{"Date"}</Text>
          <View style={[style.textInput, { flexDirection: "row", justifyContent: "space-between", paddingHorizontal:theme.horizontalSpacing.space_12,alignItems:"center" }]}>
            <TextInput
              placeholderTextColor="#BABABA"
              style={{ color: "black",alignItems:'center', }}
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

          <Text style={style.textStyle}>{"Reminder for"}</Text>
          <CustomDropDown data={data} value={reminderFor} onSelect={setReminderFor} isShowLabel={true} />

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

        <TouchableOpacity
          style={{
            width: theme.horizontalSpacing.space_374,
            backgroundColor: theme.lightColor.brownColor,
            height: theme.verticalSpacing.space_50,
            borderRadius: 10,
            marginVertical: 10,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
          onPress={handleDelete}
        >
          <Svg.DeleteIcon />
          <Text style={{ color: "white", fontWeight: "600", marginHorizontal: 10 }}>{"Delete"}</Text>
        </TouchableOpacity>

        <CustomButton title={"Update reminder"} onPress={handleSetReminder} isLoading={isSetRemainderApiMutationLoading} />
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
    paddingHorizontal: theme.horizontalSpacing.space_16,
    marginVertical: 4,
  },
  errorText:{
    color:"red",
    marginTop:5
  }
});

export default UpdateReminderScreen;
