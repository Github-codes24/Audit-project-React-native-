import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import * as Svg from '../../asstets/images/svg';
import { theme } from "../../utils";
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { getLoginResponse } from "../../redux/stateSelector/authStateSelector";
import { useSelector, UseSelector } from "react-redux";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import { useGetuserApiQuery } from "../../redux/apiSlice/profileApiSlice";
const Header = () => {
  const navigation = useNavigation();
  const userData = useSelector(getLoginResponse);
  const userId=userData?.data?.id

const { 
    data: getuserdata, 
    error: getUserdataApiError, 
    isLoading: getUserdataApiIsLoading 
  } = useGetuserApiQuery(userId); 

  const { firstName, lastName, image } =
    getuserdata?.getUser||{}

// console.log('getuserdata777777',getuserdata)

  return (
    <View style={styles.headerView}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
        <View style={{ flexDirection: "row",alignItems:"center",height:theme.verticalSpacing.space_70 }}>
          <TouchableOpacity 
            style={{ flexDirection: 'row',alignItems:"center" }} 
            onPress={() => navigation.navigate(MainRoutes.PROFILE_SCREEN)} // Use navigation to navigate
          >
            <View style={styles.profileImageContainer}>
              
              <Image
                style={styles.profileImage}
                     source={
                   image?.length > 0
                     ? { uri:image } 
                     : require('../../asstets/images/manImage.png') 
                    }
                
                     />

            </View>
            <View style={{ marginLeft: theme.horizontalSpacing.space_10, }}>
              <Text style={styles.welcomeText}>Hello, Welcome 🎉</Text>
              <Text style={styles.userName}>{firstName} {lastName}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
        onPress={()=>navigation.navigate(MainRoutes.NOTIFICATION_SCREEN)}
        >
        <Svg.BellIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    height: 105,
    backgroundColor: "#592951",
    paddingHorizontal: 30,
    justifyContent: 'center',
    
  },
  profileImageContainer: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
   
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius:30
  },
  welcomeText: {
    color: theme.lightColor.whiteColor,
    fontSize:theme.fontSizes.size_14,
    fontWeight:'500',
    letterSpacing:1
  },
  userName: {
    color: theme.lightColor.whiteColor,
    fontSize: theme.fontSizes.size_24,
    fontWeight:'700',
    // marginTop:theme.verticalSpacing.space_10
  },
});

export default Header;
