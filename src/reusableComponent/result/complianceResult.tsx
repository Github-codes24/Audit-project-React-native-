import React from "react";
import { Text, View,StyleSheet,Image,TouchableOpacity,StatusBar } from "react-native";
import { theme } from "../../utils";
import * as Svg from '../../assets/images/svg'
import CustomButton from "../button/button";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import CircularProgress from "../progressIndicator/circularProgressIndicator";
import { useNavigation } from "@react-navigation/native";


const ComplianceResult=({onPressRetakeExam,isEligible,scorePercentage})=>{
  const navigation= useNavigation();
   return (
    <View style={styles.container}>
      
      <View style={{alignItems:"center",justifyContent:"center"}}>  
      <Text
        style={{
          fontSize:theme.fontSizes.size_24,
          color:theme.lightColor.blackColor,
          marginTop:theme.verticalSpacing.space_8,
          fontWeight:'600'
        }}
        >Result</Text>
        <View style={{marginTop:40,}}>
        <CircularProgress percentage={scorePercentage} />
        </View>
        <Text
        style={{
          fontSize:theme.fontSizes.size_20,
          color:theme.lightColor.blackColor,
          marginTop:theme.verticalSpacing.space_8,
          textAlign: 'center',
          fontWeight:'700',
          width:theme.horizontalSpacing.space_285,
          
        }}
        >
            {
                `You scored ${scorePercentage}% in sponsor licence  compliance`
            }
        </Text>
      <Text style={styles.subtitle}>Your sponsor licence compliance can be at potential risk*
. Book a consultation with our experts.</Text>
      <TouchableOpacity style={styles.contactButton}
      onPress={()=>{
        navigation.navigate(MainRoutes.CONTACTUS_SCREEN)
      }}
      >
        <Text style={styles.contactText}>Contact us</Text>
      </TouchableOpacity>
      <CustomButton
      title={'Retake the exam'}
      onPress={onPressRetakeExam}
      />
       </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  
    backgroundColor: '#F5F5F5',
    // borderRightColor:'red'
  },
  image: {
    width:222,
    height: 220,
    marginTop:theme.verticalSpacing.space_80
  },
   headerView:{
        height:105,
        backgroundColor:"#592951",
        // borderBottomLeftRadius:60,
        // borderBottomRightRadius:60,
        paddingHorizontal:30,
        justifyContent:'center'
      
    },
  title: {
    fontSize:theme.fontSizes.size_20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize:theme.fontSizes.size_16,
    color:theme.lightColor.blackColor,
    textAlign: 'center',
    marginTop:theme.verticalSpacing.space_20,
    marginHorizontal:20
  },
  contactButton: {
    backgroundColor:theme.lightColor.whiteColor,
    borderWidth:.3,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius:10,
    margin:theme.verticalSpacing.space_30,
    marginTop:theme.verticalSpacing.space_46
  },
  contactText: {
    color: theme.lightColor.brownColor,
    fontWeight: '500',
    fontSize:theme.fontSizes.size_16
  },
  retakeButton: {
    backgroundColor: '#673AB7',
    paddingVertical:10,
    paddingHorizontal:20,
    borderRadius: 5,
  },
  retakeText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default ComplianceResult;