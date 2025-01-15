import React from "react";
import { Text, View,StyleSheet,Image,TouchableOpacity,StatusBar } from "react-native";
import { theme } from "../../utils";
import * as Svg from '../../asstets/images/svg'
import CustomButton from "../button/button";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import CircularProgress from "../progressIndicator/circularProgressIndicator";
const ComplianceResult=({onPressRetakeExam,isEligible,scorePercentage})=>{
   return (
    <View style={styles.container}>
      
      <View style={{alignItems:"center",justifyContent:"center"}}>  
      <Text
        style={{
          fontSize:theme.fontSizes.size_24,
          color:theme.lightColor.blackColor,
          marginTop:theme.verticalSpacing.space_8
        }}
        >Result</Text>
        <CircularProgress percentage={scorePercentage} />
        <Text
        style={{
          fontSize:theme.fontSizes.size_18,
          color:theme.lightColor.blackColor,
          marginTop:theme.verticalSpacing.space_8,
          
        }}
        >
            {
                `You Scored ${scorePercentage}% in Sponsor lince Compliance`
            }
        </Text>
      <Text style={styles.subtitle}>mbjksdbv ijshvsw</Text>
      <TouchableOpacity style={styles.contactButton}>
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
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize:theme.fontSizes.size_16,
    color:theme.lightColor.blackColor,
    textAlign: 'center',
    marginTop:20
  },
  contactButton: {
    borderWidth:.3,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    margin:theme.verticalSpacing.space_30,
    marginTop:theme.verticalSpacing.space_46
  },
  contactText: {
    color: theme.lightColor.brownColor,
    fontWeight: 'bold',
  },
  retakeButton: {
    backgroundColor: '#673AB7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retakeText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default ComplianceResult;