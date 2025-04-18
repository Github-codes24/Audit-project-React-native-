import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView, StatusBar } from "react-native";
import * as Svg from '../../assets/images/svg';
import { theme } from "../../utils";
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { getLoginResponse } from "../../redux/stateSelector/authStateSelector";
import { useSelector } from "react-redux";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import { useGetuserApiQuery } from "../../redux/apiSlice/profileApiSlice";
import { useGet10UserUnReadApiSliceQuery } from "../../redux/apiSlice/notificationApiSlice";

const Header = () => {
  const navigation = useNavigation();
  const userData = useSelector(getLoginResponse);
  const userId = userData?.data?.id;
    

  console.log('userData',userData)

const { 
      data: get10userUnReadApiNotificationApidata, 
      error: get10userUnReadApiNotificationApiError, 
      isLoading:get10userUnReadApiNotificationApiIsLoading ,
    } = useGet10UserUnReadApiSliceQuery(userId); 

  console.log('get10userUnReadApiNotificationApidata36645',get10userUnReadApiNotificationApidata)

  const { 
    data: getuserdata, 
    error: getUserdataApiError, 
    isLoading: getUserdataApiIsLoading 
  } = useGetuserApiQuery(userId); 

  const { firstName, lastName, image } =
    getuserdata?.getUser || {};


  console.log('data366868689',firstName,lastName,image)


  return (
    <SafeAreaView>
      {/* Set the StatusBar */}
      <StatusBar backgroundColor="#592951"/>

      <View style={styles.headerView}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
          <View style={{ flexDirection: "row", alignItems: "center", height: theme.verticalSpacing.space_70 }}>
            <TouchableOpacity 
              style={{ flexDirection: 'row', alignItems: "center" }} 
              onPress={() => navigation.navigate(MainRoutes?.PROFILE_SCREEN)}
            >
              <View style={styles.profileImageContainer}>
                <Image
                  style={styles.profileImage}
                  source={
                    image?.length > 0
                      ? { uri: image } 
                      : require('../../assets/images/manImage.png') 
                  }
                />
              </View>
              <View style={{ marginLeft: theme.horizontalSpacing.space_10 }}>
                <Text style={styles.welcomeText}>Hello,</Text>
                <Text style={styles.userName}>{firstName} {lastName}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate(MainRoutes.NOTIFICATION_SCREEN)}
          >
            <View>
             {get10userUnReadApiNotificationApidata?.notifications?.length >0 && (
      <View
        style={{
          width:5,
          height:5,
          backgroundColor: "red",
          borderRadius:2.5,
          position: "absolute",
          right:0,
         
        }}
      />
    )}
            <Svg.BellIcon />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerView: {
    height:105,
    backgroundColor: "#592951",
    paddingHorizontal:19,
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
    borderRadius: 30,
  },
  welcomeText: {
    color: theme.lightColor.whiteColor,
    fontSize: theme.fontSizes.size_14,
    fontWeight: '500',
   
  },
  userName: {
    color: theme.lightColor.whiteColor,
    fontSize: theme.fontSizes.size_24,
    fontWeight: '700',
  },
});

export default Header;
