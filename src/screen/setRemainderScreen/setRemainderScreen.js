import React,{useState} from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Header from "../../reusableComponent/header/header";
import { theme } from "../../utils";
import CustomTextInput from "../../reusableComponent/customTextInput/customTextInput";
import * as Svg from '../../asstets/images/svg'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import CustomDropDown from "../../reusableComponent/customDropDown/customDropDown";


const SetRemainderScreen=()=>{

 const [date, setDate] = useState(new Date());
 const [show, setShow] = useState(false);

const data = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];


console.log('Date44444',date)




 const onChange = (event, selectedDate) => {
    setShow(false); 
    if (selectedDate) {
      setDate(selectedDate); 
    }
  };

const showDatePicker = () => {
    setShow(true); 
  };


return(
    <View style={{flex:1, backgroundColor: '#F5F5F5',}}>
        <Header/>
        <View style={{padding:10}}>
        <Text style={style.remainderText}>{'Reminder'}</Text>
         <Text style={style.textStyle}>{'Reminder name'}</Text>
         <TextInput
         placeholder="Enter reminder name"
         style={style.textInput}
         />


     <Text style={style.textStyle}>{'Employee name'}</Text>
         <TextInput
         placeholder="Enter employee name"
         style={style.textInput}
         />


 <Text style={style.textStyle}>{'Employee email (optional)'}</Text>
         <TextInput
         placeholder="Enter employee email"
         style={style.textInput}
         />


 <Text style={style.textStyle}>{'Date'}</Text>
       <View style={[style.textInput,{alignItems:'center',flexDirection:'row',justifyContent:'space-between',paddingHorizontal:10}]}>
         <TextInput
         style={{color:'black'}}
         placeholder="Enter date"
          editable={false}
         value={moment(date).format('DD/MM/YYYY')}
         />
         <TouchableOpacity
         onPress={showDatePicker}
         >
         <Svg.DateIcon/>
         </TouchableOpacity>

         {show && (
        <DateTimePicker
          value={date} 
          mode="date" 
          display={Platform.OS === 'ios' ? 'inline' : 'default'} // Adjust display based on platform
          onChange={onChange} 
        />
      )}
     
</View>
<Text style={style.textStyle}>{'Reminder for'}</Text>
  <CustomDropDown
        data={data}  // Pass the data for dropdown options
        // value={selectedValue}  // Pass the selected value
        // onSelect={handleSelect}  // Pass the callback function to handle selection
        placeholder="Select an Option"  // Placeholder text
        isShowLabel={true}  // Show label (optional)
      />
        </View>
    </View>
)
}
const style=StyleSheet.create({
    remainderText:{
        fontSize:theme.fontSizes.size_20,
        fontWeight:"700",
        color:theme.lightColor.blackColor

    },
    textStyle:{
        marginTop:theme.verticalSpacing.space_10,
        fontWeight:'400',
        fontSize:theme.fontSizes.size_16
    },
    textInput:{
        width:374,
        height:theme.verticalSpacing.space_50,
        backgroundColor:theme.lightColor.whiteColor,
        borderRadius:10,
        paddingHorizontal:theme.horizontalSpacing.space_16,
        marginVertical:4
    }
})
export default SetRemainderScreen;