import React,{useEffect,useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,Alert, Modal } from 'react-native';
import { theme } from '../../utils';
import CustomButton from '../../reusableComponent/button/button';
import { MainRoutes } from '../../navigation/routeAndParamsList';
import { useNavigation } from '@react-navigation/native';

const UpdateSuccessFully = ({navigation}) => {

    const [isModalVisible, setModalVisible] = useState(true);

const closeModal = () => {
    setModalVisible(false);
    // navigation.navigate(MainRoutes.DASHBOARD_SCREEN, {
    //   screen: "Home",
    // });
  };

const onSubmit=()=>{
  navigation.navigate(MainRoutes.DASHBOARD_SCREEN);
}

    return (
    <View style={style.Main}>
      <View style={{marginTop:'30%',alignContent:"center",justifyContent:'center'}}>
        <View style={{width:'100%',justifyContent:"center",alignItems:"center"}}>
      <Image
      style={{width:252,height:375}}
      source={require('../../assets/images/updateSuccess.png')}
      />
      </View>
      <View style={{}}>
      <Text style={{fontWeight:'700',fontSize:theme.fontSizes.size_20,alignSelf:"center",textAlign:'center',marginTop:30,alignSelf:"center"}}>{'Your changes have'}</Text>
      <Text style={{fontWeight:'700',fontSize:theme.fontSizes.size_20,alignSelf:"center",textAlign:'center',alignSelf:"center"}}>been successfully saved!</Text>
     </View>
      </View>
      <View style={{position:'absolute',bottom:theme.verticalSpacing.space_100}}>
       <CustomButton
       onPress={onSubmit}
       title={'Go to home page'}
       />
    </View>
    </View>
  ); 
};

const style = StyleSheet.create({
  Main: {
   height:'100%',
    alignItems: "center",
     
  },
  imageStyle: {
    width: 342,
    height: 244,
  },
  textStyle: {
    fontSize:theme.fontSizes.size_30,
    color: theme.lightColor.blackColor,
    fontWeight: "600",
    marginTop: 30,
  },
  doneText: {
    fontSize: theme.fontSizes.size_14,
    color: "#475569",
    marginTop: theme.verticalSpacing.space_30,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end", // Align the bottom sheet to the bottom
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent overlay
  },
  modalContent: {
    width: "100%", 
    height:258, 
    backgroundColor:theme.lightColor.brownColor,
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
  
  },
  modalTitle: {
    color:'white',
    fontSize: theme.fontSizes.size_24,
    fontWeight: "700",
    lineHeight:29.5
    
  },
  modalDescription: {
    fontSize: theme.fontSizes.size_16,
    color: "#475569",
    marginVertical: 15,
    textAlign: "center",
    width:200,
    height:40,
    lineHeight:20,
    fontWeight:'400',
    color:'white',
    marginTop:theme.verticalSpacing.space_50
  },
  modalButton: {
    backgroundColor: theme.lightColor.brownColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontSize: theme.fontSizes.size_16,
    fontWeight: "600",
  },
});

export default UpdateSuccessFully;
