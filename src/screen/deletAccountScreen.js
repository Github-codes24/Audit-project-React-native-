import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import CustomButton from '../reusableComponent/button/button';
import CustomHeader from '../reusableComponent/customHeader/customHeader';
import * as Svg from '../asstets/images/svg'
import { theme } from '../utils';
import { MainRoutes } from '../navigation/routeAndParamsList';
import { getLoginResponse } from '../redux/stateSelector/authStateSelector';
import { useDispatch, useSelector } from 'react-redux';
import { useDeleteAccountApiMutation } from '../redux/apiSlice/authApiSlice';
import { resetAuth } from '../redux/stateSlice/authStateSlice';
const DeleteScreen = ({navigation}) => {

const response=useSelector(getLoginResponse)

 const [deleteAccount, { isLoading, isSuccess, isError }] = useDeleteAccountApiMutation();
   
   const dispatch=useDispatch()

 const handleDelete = () => {
  const userId = response?.data?.id;

  if (userId) {
    Alert.alert(
      '⚠️ Are you sure?', 
      'This action cannot be undone.', 
      [
        {
          text: 'No', 
          onPress: () => console.log('Account deletion was canceled'), 
          style: 'cancel', 
        },
        {
          text: 'Yes', 
          onPress: () => {
            deleteAccount(userId); 
             dispatch(resetAuth()); 
          },
        },
      ],
      { cancelable: false } 
    );
  } else {
    console.error('User ID is not available in the login response');
  }
};

  return (
    <View style={styles.container}>
      {/* Header Section */}
     <TouchableOpacity
     onPress={()=>navigation.goBack()}
     >
      <Svg.ArrowBack/>
      </TouchableOpacity>
      
      {/* User Information Card */}
      <View style={styles.userCard}>
        <Image 
          source={require('../asstets/images/manImage.png')} // Replace with actual image URL
          style={styles.userImage} 
        />
        <View>
          <Text style={styles.userName}>John Weak</Text>
          <Text style={styles.userEmail}>workforreings@gmail.com</Text>
        </View>
      </View>
      
      {/* Illustration and Message */}
      <View style={styles.warningSection}>
        <Image 
          source={require('../asstets/images/delete.png')} // Replace with actual image URL
          style={styles.warningImage} 
        />
        <Text style={styles.warningText}>
          If you confirm the deletion of your account, it will be permanently 
          removed from our database and cannot be recovered.
        </Text>
      </View>
      
      {/* Confirm Button */}
      <View style={{marginTop:theme.verticalSpacing.space_50}}>
      <CustomButton
      onPress={handleDelete}
      title={'Confirm delete'}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  userCard: {
    
    // alignItems: 'center',
    
   marginTop:theme.verticalSpacing.space_20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  userName: {
    marginTop:theme.verticalSpacing.space_10,
    fontSize:theme.fontSizes.size_18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#555',
    marginTop:theme.verticalSpacing.space_10
  },
  warningSection: {
    alignItems: 'center',
    marginBottom: 24,
   
    height:375
  },
  warningImage: {
    width: 275,
    height: 178,
    marginBottom: 16,
  },
  warningText: {
    fontSize:theme.fontSizes.size_16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
    marginVertical:30
  },
  confirmButton: {
    backgroundColor: '#6A1B9A',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DeleteScreen;
