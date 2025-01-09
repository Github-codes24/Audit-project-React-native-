import React,{useState} from "react";
import { Text, View,StyleSheet,StatusBar,Image, TextInput } from "react-native";
import { theme } from "../../utils";
import * as Svg from '../../asstets/images/svg'
import CustomTextInput from "../../reusableComponent/customTextInput/customTextInput";
import CustomButton from "../../reusableComponent/button/button";
import CustomModal from "../../reusableComponent/customModal/customModal";
import { useNavigation } from "@react-navigation/native";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import DashBoardScreen from "../dashboardScreen/dashboardScreen";
const ContactScreen=()=>{
   const [isModalVisible, setModalVisible] = useState(false);
 const navigation = useNavigation();
  const closeModal=()=>{
    setModalVisible(!isModalVisible)
  }
  
  const handleSubmit=()=>{
     setModalVisible(true)
  }


    return(
        <View style={{flex:1,backgroundColor:'#F2F3F5'}}>
      
     <CustomModal
        visible={isModalVisible}
        onClose={closeModal}
        title="Thank You !"
        description={"We will get back to you shortly"}
        buttons={[
          {
            label: "Go to home page",
            type: "primary",
            onPress: () => {
            closeModal()
            navigation.navigate('Home')
            },
          },
        ]}
      />


           <StatusBar backgroundColor={'#592951'}/>
            <View style={style.headerView}>

           <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20,alignItems:'center'}}>
            <View style={{flexDirection:"row"}}>
           <View style={{width:60,height:60,borderWidth:1,borderRadius:30,alignItems:"center",justifyContent:"center"}}>
            <Image
            style={{width:60,height:60}}
            source={require('../../asstets/images/manImage.png')}
            />
           </View>
           <View style={{marginLeft:theme.horizontalSpacing.space_10}}>
            <Text style={{color:theme.lightColor.whiteColor}}>Hello, Welcome 🎉</Text>
            <Text style={{color:theme.lightColor.whiteColor,fontSize:theme.fontSizes.size_24}}>{'NAYAN Moudekar'}</Text>
           </View>
           </View>
           <Svg.BellIcon/>
           </View>
            </View>

  <View style={{padding:10}}>
    <Text style={{color:theme.lightColor.blackColor,fontSize:theme.fontSizes.size_20,fontWeight:'700'}}>{'Contact us'}</Text>
     <Text style={style.textStyle}>Email</Text>
     <Text>{'Email222@gmail.com'}</Text>

     <Text style={[style.textStyle,{marginTop:10}]}>Phone No.</Text>
     <Text>{'9155071883'}</Text>

   <Text style={style.textBox}>Name</Text>
   <CustomTextInput
    placeholder={'Enter your name'}
   />
 <Text style={style.textBox}>Email</Text>
<CustomTextInput
placeholder={'Enter your email address'}
/>
 <Text style={style.textBox}>Phone No.</Text>
   <CustomTextInput
   placeholder={'Enter your Phone no.'}
   />
    <Text style={style.textBox}>Message</Text>
    <TextInput
    style={{height:theme.verticalSpacing.space_156,backgroundColor:"white",borderRadius:10}}
    // placeholder="Enter your query...."
    />
  <View style={{marginTop:theme.verticalSpacing.space_10}}>
    <CustomButton
    onPress={handleSubmit}
    title={'Submit'}
    />
    </View>
  </View>
    </View>
    )
}
const style=StyleSheet.create({
    main:{
        flex:1
    },
    headerView:{
        height:105,
        backgroundColor:"#592951",
        // borderBottomLeftRadius:60,
        // borderBottomRightRadius:60,
        paddingHorizontal:30,
        justifyContent:'center'
      
    },
  textStyle:{
    fontSize:theme.fontSizes.size_18,
    fontWeight:'600',
    marginTop:5
  },
  textBox:{
    marginTop:theme.horizontalSpacing.space_14,
    color:theme.lightColor.blackColor,
    fontSize:theme.fontSizes.size_16,
    fontWeight:'500'
  }
    
})
export default ContactScreen;