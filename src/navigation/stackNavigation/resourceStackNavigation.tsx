import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../../screen/profileScreen/profileScreen';
import DeleteScreen from '../../screen/deletAccountScreen';
import EditProfile from '../../screen/profileScreen/EditProfileScreen';
import EditImage from '../../screen/profileScreen/EditImageScreen';
import { Notification } from '../../assets/images/svg';
import NotificationScreen from '../../screen/NotificationScreen/NotificationScreen';
import TermsAndConditionScreen from '../../screen/TermsAndConditionScreen/TermsAndConditionScreen';
import PrivacyPolicyScreen from '../../screen/PrivacyPolicyScreen/PrivacyPolicyScreen';
import AboutUsScree from '../../screen/aboutUsScreen/aboutUsScreen';
import ContactScreen from '../../screen/contactScreen/contactScreen';
import BlogDetailsScreen from '../../screen/blogDetailsScreen/blogDetailsScreen';
import SetRemainderScreen from '../../screen/setRemainderScreen/setRemainderScreen';
import DeleteSuccessFully from '../../screen/DeleteSuccessfully/deleteSuccessfully';
import UpdateSuccessFully from '../../screen/updateSuccessfully/updateSuccessfully';
import DashBoardScreen from '../../screen/dashboardScreen/dashboardScreen';
import { MainRoutes } from '../routeAndParamsList';
import ComplianceScreen from '../../screen/complianceScreen/complianceScreen';
import EligibilityScreen from '../../screen/eligibilityScreen/eligibilityScreen';
import ResourceScreen from '../../screen/resourceScreen/resourceScreen';
const Stack = createStackNavigator();

const ResourceStack = () => {
  return (
    <Stack.Navigator 
    screenOptions={{
    headerShown: false, 
  }}
  >
      <Stack.Screen
  name={MainRoutes.RESOURCE_SCREEN}
  component={ResourceScreen} 
/>
    <Stack.Screen
  name={MainRoutes.ELIGIBILITY_SCREEN}
  component={EligibilityScreen} 
/>
  <Stack.Screen
  name={MainRoutes.COMPLIANCE_SCREEN}
  component={ComplianceScreen} 
/>
      
        <Stack.Screen
        name={MainRoutes.DASHBOARD_SCREEN}
        component={DashBoardScreen} 
      />
      <Stack.Screen
        name={MainRoutes.PROFILE_SCREEN}
        component={ProfileScreen} 
      />
      <Stack.Screen
      name={MainRoutes.EDITPROFILE_SCREEN}
      component={EditProfile}
      />
       <Stack.Screen
      name={MainRoutes.TERMANDCONDITION_SCREEN}
      component={TermsAndConditionScreen}
      />
      <Stack.Screen
      name={MainRoutes.EDITIMAGE_SCREEN}
      component={EditImage}
      />
      <Stack.Screen
        name={MainRoutes.PRIVACYPOLICY_SCREEN}
        component={PrivacyPolicyScreen} 
      />
       <Stack.Screen
        name={MainRoutes.DELETE_SCREEN}
        component={DeleteScreen} 
      />
      
       <Stack.Screen
        name={MainRoutes.NOTIFICATION_SCREEN}
        component={NotificationScreen} 
      />
      <Stack.Screen
        name={MainRoutes.ABOUTUS_SCREEN}
        component={AboutUsScree} />
        <Stack.Screen
        name={MainRoutes.CONTACTUS_SCREEN}
        component={ContactScreen} 
      />

 <Stack.Screen
        name={MainRoutes.BLOG_DETAILS_SCREEN}
        component={BlogDetailsScreen} 
      />
    <Stack.Screen
      name={MainRoutes.SET_REMAINDER_SCREEN}
       component={SetRemainderScreen} 
      />

    {/* <Stack.Screen name={MainRoutes.DASHBOARD_SCREEN} component={DashBoardScreen}/>     */}
   <Stack.Screen
        name={MainRoutes.DELETE_SUCCESSFULLY}
        component={DeleteSuccessFully} 
      />
<Stack.Screen
        name={MainRoutes.UPDATE_SUCCESSFULLY}
        component={UpdateSuccessFully} 
      />
      </Stack.Navigator>
  );
};

export default ResourceStack;
