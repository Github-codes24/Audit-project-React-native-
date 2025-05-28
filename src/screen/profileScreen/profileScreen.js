import React,{useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,Alert, SafeAreaView,ScrollView } from 'react-native';
import * as Svg from '../../assets/images/svg'
import { theme } from '../../utils';
import { resetAuth } from '../../redux/stateSlice/authStateSlice';
import { useDispatch } from 'react-redux';
import ConfirmationDialog from '../../utils/confirmationDialog';
import { MainRoutes } from '../../navigation/routeAndParamsList';
import { getLoginResponse } from '../../redux/stateSelector/authStateSelector';
import { useSelector } from 'react-redux';
import { useGetuserApiQuery, useLogoutApiMutation } from '../../redux/apiSlice/profileApiSlice';
import { resetCookies } from '../../redux/stateSlice/cookiesStateSlice';
import { useLoginApiMutation } from '../../redux/apiSlice/authApiSlice';
import { apiEndPoints } from '../../constants/apiConstants';



const ProfileScreen = ({navigation}) => {
 const [isDialogVisible, setIsDialogVisible] = useState(false);
const dispatch=useDispatch()
 
const response=useSelector(getLoginResponse)
 const userId=response?.data?.id
// console.log('userId',userId)
 const { 
    data: getuserdata, 
    error: getUserdataApiError, 
    isLoading: getUserdataApiIsLoading 
  } = useGetuserApiQuery(userId); 

  const [logOutApi,{isLoading:logoutApiisLoading}] = useLogoutApiMutation();

const { firstName, lastName, email, phoneNumber, createdAt, updatedAt,image } =
    getuserdata?.getUser||{}


 const handleLogOut = async () => {
  setIsDialogVisible(false); 

  if (!userId) {
    Alert.alert('Error', 'User ID not found');
    return;
  }

  try {
    console.log('Calling Logout API:', `${apiEndPoints?.logOutApi}/${userId}`);

    const response = await logOutApi(userId).unwrap();

    if (response?.success) {
      dispatch(resetAuth());
      dispatch(resetCookies());
    } else {
      Alert.alert('Error', 'Logout failed. Please try again.');
    }
  } catch (error) {
    console.error('Logout API Error:', error);
    Alert.alert('Error', 'Something went wrong. Please try again.');
  }
};

const supportItems = [
    { label: 'Edit profile', icon: <Svg.ProfileEdit/>,route: MainRoutes.EDITPROFILE_SCREEN,
      params:{
        profileData:getuserdata?.getUser||{}
      },
  },
    { label: 'Contact us', icon: <Svg.supportIcon/>, route:MainRoutes.CONTACTUS_SCREEN  },
      { label: 'Terms and conditions', icon: <Svg.Termsofuse />, route:`${MainRoutes.TERMANDCONDITION_SCREEN}`  },
    { label: 'Privacy policy', icon: <Svg.Privacy/> ,route:`${MainRoutes.PRIVACYPOLICY_SCREEN}` },
    { label: 'About us', icon: <Svg.AboutUs/>,route:MainRoutes.ABOUTUS_SCREEN },
    { label: 'Notification', icon: <Svg.Notification/>,route:MainRoutes.NOTIFICATION_SCREEN  },
  ];
  return (
    <SafeAreaView>
      <ScrollView style={{}}>
    <View style={styles.container}>
      {/* <CustomHeader
        leftIcon={<Svg.ArrowBack/>}
        /> */}
      {/* Header */}
      <TouchableOpacity style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Svg.ArrowBack />
      </TouchableOpacity>

      {/* Profile Section */}
      <View style={styles.profileSection}>

        <Image
      source={
    image?.length > 0
      ? { uri:image } 
      : require('../../assets/images/narasolicitor.jpeg') 
     }
           style={styles.profileImage}
      />

        <View style={{marginLeft:10}}>
        <Text style={styles.profileName}>{firstName} {lastName}</Text>
        <Text style={styles.profileInfo}>
          +{phoneNumber}</Text>
        <Text style={styles.profileInfo}>{email}</Text>
       
        </View>
      </View>

      {/* Support Board */}
      <View style={styles.supportBoard}>
       
      {supportItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.supportItem} onPress={()=> navigation?.navigate?.(item?.route,item?.params)} >
            <Text style={styles.supportIcon}>{item.icon}</Text>
            <Text style={styles.supportText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.logoutButton}
          onPress={() => setIsDialogVisible(true)}
        >
          <Text style={styles.actionText}>Log out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteAccountButton}
          onPress={() => navigation.navigate(MainRoutes.DELETE_SCREEN)}
        >
          <Text style={styles.actionText}>Delete account</Text>
        </TouchableOpacity>

        <ConfirmationDialog
          visible={isDialogVisible}
          title="Confirm Logout"
          onCancel={() => setIsDialogVisible(false)} 
          onConfirm={handleLogOut} 
          cancelText="Cancel"
          confirmText="Yes"
        />
      </View>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding:theme.horizontalSpacing.space_20,
  },
  backButton: {
    marginBottom:theme.verticalSpacing.space_20,
  },
  backArrow: {
    fontSize:theme.fontSizes.size_18 ,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
   
  },
  profileImage: {
   
    width: theme.horizontalSpacing.space_100,
    height: theme.horizontalSpacing.space_100,
    borderRadius: 10,
    marginBottom: theme.verticalSpacing.space_10,
    marginTop: theme.verticalSpacing.space_10,
  },
  profileName: {
    fontSize: theme.fontSizes.size_20,
    fontWeight: '700',
  },
  profileInfo: {
    color: theme.lightColor.blackColor,
    fontSize:theme.fontSizes.size_14,

    marginTop:5,
    fontWeight:'400'
  },
  personalDetails: {
    marginTop: 10,
    color: theme.lightColor.blackColor,
    fontWeight: '600',
  },
  supportBoard: {
    marginBottom: theme.verticalSpacing.space_30,
  },
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height:theme.verticalSpacing.space_48,
     paddingHorizontal:theme.horizontalSpacing.space_16,
    borderRadius: 10,
    marginTop:theme.verticalSpacing.space_20
  },
  supportIcon: {
    marginRight: 15,
    fontSize: theme.fontSizes.size_18,
  },
  supportText: {
    fontSize: theme.fontSizes.size_16,
    fontWeight: '500',
  },
 actions: {
  flexDirection: 'row',
  justifyContent: "center",
  alignItems: "center",
 marginTop:theme.verticalSpacing.space_50
},
logoutButton: {
  backgroundColor: theme.lightColor.brownColor,
 height:theme.verticalSpacing.space_50,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 10,
  width: theme.horizontalSpacing.space_173,
  marginHorizontal: 5, 
},
deleteAccountButton: {
  backgroundColor: theme.lightColor.brownColor, 
height:theme.verticalSpacing.space_50,
  borderRadius: 10,
  width: theme.horizontalSpacing.space_173,
  alignItems: "center",
  justifyContent: "center",
  marginHorizontal: 5, 
},
actionText: {
  color: "white",
  fontSize: theme.fontSizes.size_16,
  fontWeight: "500",
},

});

export default ProfileScreen;
