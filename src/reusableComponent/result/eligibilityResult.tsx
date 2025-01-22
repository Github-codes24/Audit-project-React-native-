import React from "react";
import { Text, View,StyleSheet,Image,TouchableOpacity,StatusBar } from "react-native";
import { theme } from "../../utils";
import * as Svg from '../../asstets/images/svg'
import CustomButton from "../button/button";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const EligibityResult=({onPressRetakeExam,isEligible,})=>{
  const navigation = useNavigation();
   return (
  <ScrollView style={{flex:1,marginBottom:theme.verticalSpacing.space_100}}>
    <View style={styles.container}>
      <View style={{alignItems:"center",justifyContent:"center",}}>  
        <Text style={{color:'black',fontSize:theme.fontSizes.size_18,fontWeight:'600',marginTop:10}}>{'Result'}</Text>
     <View style={{}}>
      <Image

        source={
          isEligible
            ? require('../../asstets/images/elegable.png') 
            : require('../../asstets/images/non-Elegable.png') 
        }
        style={styles.image}
          resizeMode="contain"
      />
      </View>
      <Text style={styles.title}>
        {isEligible ? 'Congratulations 🎉\nYou are eligible!' : 'Sorry,\nYou are not eligible!'}
      </Text>
      <Text style={styles.subtitle}>mbjksdbv ijshvsw</Text>
      <TouchableOpacity style={styles.contactButton}
      onPress={()=>navigation.navigate(MainRoutes.CONTACTUS_SCREEN)}
      >
        <Text style={styles.contactText}>Contact us</Text>
      </TouchableOpacity>
      <CustomButton
      title={'Retake the exam'}
      onPress={onPressRetakeExam}
      />
       </View>
    </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRightColor:'red'
  },
  image: {
    // backgroundColor:"red",
    width:theme.horizontalSpacing.space_222,
    height:theme.verticalSpacing.space_290,
    marginTop:theme.verticalSpacing.space_50
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
    marginTop:theme.verticalSpacing.space_20,
    // marginBottom: 10,
  },
  subtitle: {
    fontSize:theme.fontSizes.size_16,
    color:theme.lightColor.blackColor,
    textAlign: 'center',
    marginTop:theme.verticalSpacing.space_20
  },
  contactButton: {
    backgroundColor:theme.lightColor.whiteColor,
    borderWidth:.3,
    paddingVertical: 10,
    paddingHorizontal:theme.horizontalSpacing.space_30,
    borderRadius:10,
    margin:theme.verticalSpacing.space_30,
    marginTop:theme.verticalSpacing.space_46
  },
  contactText: {
    backgroundColor:theme.lightColor.whiteColor,
    color: theme.lightColor.brownColor,
    fontWeight: 'bold',
  },
  retakeButton: {
    backgroundColor: '#673AB7',
    paddingVertical:theme.verticalSpacing.space_10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retakeText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default EligibityResult;