import React,{useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,Alert } from 'react-native';
import * as Svg from '../../asstets/images/svg'
import { theme } from '../../utils';
import { resetAuth } from '../../redux/stateSlice/authStateSlice';
import { useDispatch } from 'react-redux';
import ConfirmationDialog from '../../utils/confirmationDialog';
import { MainRoutes } from '../../navigation/routeAndParamsList';
import { getLoginResponse } from '../../redux/stateSelector/authStateSelector';
import { useSelector } from 'react-redux';
import { useGetuserApiQuery } from '../../redux/apiSlice/profileApiSlice';


const ProfileScreen = ({navigation}) => {
 const [isDialogVisible, setIsDialogVisible] = useState(false);
const dispatch=useDispatch()
 
const response=useSelector(getLoginResponse)
  console.log('2222222',response)

 const userId=response?.data?.id
// console.log('userId',userId)
 const { 
    data: getuserdata, 
    error: getUserdataApiError, 
    isLoading: getUserdataApiIsLoading 
  } = useGetuserApiQuery(userId); 

  // console.log('getuserdata:', getuserdata); 
//   console.log('isLoading:', getUserdataApiIsLoading); 
//   console.log('error:', getUserdataApiError); 
 
 
const { firstName, lastName, email, phoneNumber, createdAt, updatedAt } =
    getuserdata?.getUser||{}




  
 const handleLogOut = () => {
    dispatch(resetAuth()); 
    setIsDialogVisible(false); 
  };
const supportItems = [
    { label: 'Edit profile', icon: <Svg.Edit/>,route:MainRoutes.EDITPROFILE_SCREEN },
    { label: 'Contact us', icon: <Svg.supportIcon/>, route:MainRoutes.CONTACTUS_SCREEN  },
      { label: 'Terms of use', icon: <Svg.Termsofuse />, route:`${MainRoutes.TERMANDCONDITION_SCREEN}`  },
    { label: 'Privacy policy', icon: <Svg.Privacy/> ,route:`${MainRoutes.PRIVACYPOLICY_SCREEN}` },
    { label: 'About us', icon: <Svg.AboutUs/>,route:MainRoutes.ABOUTUS_SCREEN },
    { label: 'Notification settings', icon: <Svg.Notification/>,route:MainRoutes.NOTIFICATION_SCREEN  },
  ];
  return (
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
          source={require('../../asstets/images/manImage.png')} // Replace with the actual image URL
          style={styles.profileImage}
        />
        <View style={{marginLeft:10}}>
        <Text style={styles.profileName}>{firstName} {lastName}</Text>
        <Text style={styles.profileInfo}>{phoneNumber}</Text>
        <Text style={styles.profileInfo}>{email}</Text>
        {/* <TouchableOpacity>
          <Text style={styles.personalDetails}>Personal details →</Text>
        </TouchableOpacity> */}
        </View>
      </View>

      {/* Support Board */}
      <View style={styles.supportBoard}>
        <Text style={{fontSize:theme.fontSizes.size_16,marginBottom:10,fontWeight:'500'}}>{'Support board'}</Text>
      {supportItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.supportItem} onPress={()=> navigation?.navigate?.(item?.route)} >
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
          message="Are you sure you want to log out?"
          onCancel={() => setIsDialogVisible(false)} // Close dialog
          onConfirm={handleLogOut} // Perform logout
          cancelText="Cancel"
          confirmText="Yes"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  backArrow: {
    fontSize: 18,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.verticalSpacing.space_30,
  },
  profileImage: {
    borderWidth: 1,
    width: theme.horizontalSpacing.space_100,
    height: theme.horizontalSpacing.space_110,
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
    letterSpacing:.6,
    marginTop:5
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
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
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
    justifyContent: 'space-between',
  },
  logoutButton: {
    backgroundColor: theme.lightColor.brownColor,
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  deleteAccountButton: {
    backgroundColor: theme.lightColor.brownColor,
    padding: 15,
    borderRadius: 10,
    flex: 1,
  },
  actionText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default ProfileScreen;
