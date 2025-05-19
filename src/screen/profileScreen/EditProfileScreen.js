import React, { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Modal, ScrollView, SafeAreaView, Alert, Platform, } from "react-native";
import { theme } from "../../utils";
import CustomHeader from "../../reusableComponent/customHeader/customHeader";
import * as Svg from '../../assets/images/svg';
import CustomTextInput from "../../reusableComponent/customTextInput/customTextInput";
import BackgroundLayout from "../../reusableComponent/backgroundLayout/backgroundLayout";
import { MainRoutes } from '../../navigation/routeAndParamsList';
import { alertError, alertSuccess } from "../../utils/Toast";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { getLoginResponse } from "../../redux/stateSelector/authStateSelector";
import { useSelector } from "react-redux";
import { useUpdateUserProfileApiSliceMutation } from "../../redux/apiSlice/profileApiSlice";
import Loader from "../../reusableComponent/loader/loader";
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';


const EditProfile = ({ navigation, route }) => {
    const { profileData = {} } = route?.params || {};
    const [imageUri, setImageUri] = useState(profileData?.image || '');

    console.log('profileData@@', profileData, route?.params);
    console.log('Phone Number:', profileData?.phoneNumber);
    
    const inputRef = useRef(null);
    const [firstName, setFirstName] = useState(profileData?.firstName || '');
    const [lastName, setLastName] = useState(profileData?.lastName || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(`${profileData?.phoneNumber}` || '');
    const [companyName, setCompanyName] = useState(profileData?.company || '');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [phoneError, setPhoneError] = useState(''); 
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');



    const response = useSelector(getLoginResponse);
    const userId = response?.data?.id;

    console.log('userId256654455',userId)


    const [updateUserProfile, { isLoading, error, data }] = useUpdateUserProfileApiSliceMutation();
    const validatePhoneNumber = (phone) => {
  const phoneRegEx = /^[0-9]{10,12}$/; 
  return phoneRegEx.test(phone);
};


 const validatePassword = (password) => {
        if (!password) return true; // Allow empty password
        const passwordRegEx = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
        return passwordRegEx.test(password);

 if (password && confirmPassword !== password) {
        console.log('Confirm password does not match the password.');
        return;
    }



    };

    const pickImageFromGallery = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                quality: 1,
            },
            (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorMessage) {
                    console.error('ImagePicker Error:', response.errorMessage);
                } else if (response.assets && response.assets.length > 0) {
                    setImageUri(response.assets[0].uri);
                    setIsModalVisible(false);
                }
            }
        );
    };

    const requestCameraPermission = async () => {
        try {
          const permission = Platform.select({
            ios: PERMISSIONS.IOS.CAMERA,
            android: PERMISSIONS.ANDROID.CAMERA,
          });
      
          const status = await check(permission);
      
          if (status === RESULTS.GRANTED) {
            return true;
          } else if (status === RESULTS.DENIED || status === RESULTS.LIMITED) {
            const result = await request(permission);
            return result === RESULTS.GRANTED;
          } else if (status === RESULTS.BLOCKED) {
            Alert.alert(
              'Camera Permission Required',
              'Please enable camera permission in settings to use this feature.',
              [{ text: 'OK' }]
            );
            return false;
          } else if (status === RESULTS.UNAVAILABLE) {
            Alert.alert('Camera Unavailable', 'Camera is not available on this device.');
            return false;
          }
      
          return false;
        } catch (error) {
          console.error('Permission check failed:', error);
          Alert.alert('Error', 'Failed to check camera permission.');
          return false;
        }
      };
      
      const captureImageFromCamera = async () => {
        const granted = await requestCameraPermission();
        if (!granted) return;
      
        launchCamera({ mediaType: 'photo', quality: 1 }, (response) => {
          if (response?.assets?.length > 0) {
            setImageUri(response.assets[0].uri);
            setIsModalVisible(false);
          } else if (response?.errorCode) {
            console.error('Camera Error:', response.errorMessage || response.errorCode);
            Alert.alert('Camera Error', response.errorMessage || 'Unknown error occurred');
          }
        });
      };


    const handleSubmit = () => {
        if (!validatePhoneNumber(phoneNumber)) {
            setPhoneError('Please enter a valid 10 to 12-digit phone number.');
            return; 
        }
         if (password && !validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters, include 1 uppercase letter, and 1 special character.');
            return;
        }
       if (password && confirmPassword !== password) {
        setConfirmPasswordError('Confirm password does not match.');
        return;
    }

        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        formData.append('phoneNumber', phoneNumber);
        formData.append('company', companyName);
        if (imageUri) {
            const file = {
                uri: imageUri,
                type: 'image/jpeg',
                name: 'profile_image.jpg',
            };

            console.log('File Object:', file);
            formData.append('image', file);
        }
        console.log('Form Data:', formData);
        updateUserProfile({
            id: userId,
            formData: formData,
        })
            .unwrap()
            .then((response) => {
                console.log('Profile updated successfully:', response);
                navigation.navigate(MainRoutes.UPDATE_SUCCESSFULLY);
            })
            .catch((error) => {
                console.error('Error updating profile:', error);
                console.log('Failed to update profile');
            });
    };

    const supportItems = [
        { label: 'Edit Image', icon: <Svg.EditImage />, route: MainRoutes.EDITIMAGE_SCREEN }
    ];

    return (
        <SafeAreaView style={{flex:1}}>
        <ScrollView style={{flex:1,marginBottom:theme.verticalSpacing.space_100 }}>
            <Loader isLoading={isLoading} />
            <View style={{ paddingHorizontal: 7 }}>
                <TouchableOpacity style={{ marginTop: theme.verticalSpacing.space_30, paddingHorizontal: 10 }}
                    onPress={() => navigation.goBack()}
                >
                    <Svg.ArrowBack />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontWeight: '700', fontSize: theme.fontSizes.size_20, marginTop: theme.verticalSpacing.space_30, paddingHorizontal: 10 }}>{'Edit profile'}</Text>
                </View>
            </View>
            <View style={styles.profileSection}>
                <View style={styles.profileImageContainer}>
                    <Image
                        source={
                            imageUri ? { uri: imageUri }
                            : require('../../assets/images/manImage.png')
                        }
                        style={styles.profileImage}
                    />
                </View>
                <View>
                    {supportItems.map((item, index) => (
                        <TouchableOpacity key={index}
                            onPress={() => setIsModalVisible(true)}
                        >
                            <View style={styles.iconTextContainer}>
                                <Text style={styles.supportIcon}>{item.icon}</Text>
                                <Text style={styles.supportText}>{item.label}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.nameView}>
                    <View style={styles.rowContainer}>
                        <View style={styles.halfWidth}>
                            <Text style={styles.TextStyle}>First name</Text>
                            <TextInput
                                ref={inputRef}
                                value={firstName}
                                onChangeText={(text) => setFirstName(text)}
                                style={styles.nameTextInput}
                                placeholder="First name"
                            />
                        </View>
                        <View style={styles.halfWidth}>
                            <Text style={styles.TextStyle}>Last name</Text>
                            <TextInput
                                value={lastName}
                                onChangeText={(text) => setLastName(text)}
                                style={styles.nameTextInput}
                                placeholder="Last name"
                            />
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.TextStyle}>Password</Text>
                    <CustomTextInput
                      textColor={theme.lightColor.blackColor}
                        value={password}
                    onChangeText={(text) => { setPassword(text); setPasswordError(''); }}
                        placeholder={'.  .  .  .  .  .  .  .  .  .'}
                        secureTextEntry={true}
                    />
                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                    <Text style={styles.TextStyle}>Confirm password</Text>
                    <CustomTextInput
                    textColor={theme.lightColor.blackColor}
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                        placeholder={'.  .  .  .  .  .  .  .  .  .'}
                        secureTextEntry={true}
                    />
               {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
                    <Text style={styles.TextStyle}>Phone number</Text>
                    <CustomTextInput
                        value={phoneNumber}
                        onChangeText={(text) => {
                         const formattedText = text.replace(/\D/g, '').slice(0, 12);
                            setPhoneNumber(formattedText);
                            setPhoneError(''); 
                        }}
                        maxLength={12}
                        placeholder={'+44 (0) XXXX XXX XXX'}
                    />
                    {phoneError ? <Text style={{ color: 'red', fontSize: 14 }}>{phoneError}</Text> : null} {/* Display error message */}

                    <Text style={styles.TextStyle}>Company name</Text>
                    <CustomTextInput
                        value={companyName}
                        onChangeText={(text) => setCompanyName(text)}
                        placeholder={'Enter your company name'}
                    />
                </View>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.SavechangesButton} onPress={handleSubmit}>
                        <Text style={styles.actionText}>Save changes</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0,0,0,0.5)",
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "white",
                            padding: 20,
                            borderRadius: 10,
                            alignItems: "center",
                            width: "80%",
                           
                        }}
                    >

                        <View style={{}}>
                        <TouchableOpacity onPress={pickImageFromGallery}>
                            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                <Svg.GalleryIcon />
                                <Text style={{ fontSize:theme.fontSizes.size_16, marginVertical: 10, marginLeft: 10 }}>Upload from gallery</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={captureImageFromCamera}>
                            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                <Svg.CameraIcon />
                                <Text style={{ fontSize: 16, marginVertical: 10, marginLeft: 10 }}>Open camera</Text>
                            </View>
                        </TouchableOpacity>
                      </View>
                        <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                            <Text style={{ fontSize: 16, marginVertical: 10, color: "red" }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    profileSection: {
        paddingHorizontal: 15,
    },
    profileImageContainer: {},
    profileImage: {
        width: theme.horizontalSpacing.space_100,
        height: theme.horizontalSpacing.space_110,
        borderRadius: 10,
        marginBottom: theme.verticalSpacing.space_10,
        marginTop: theme.verticalSpacing.space_10,
    },
    iconTextContainer: {
        flexDirection: 'row',
    },
    supportIcon: {
        marginRight: 8,
         
    },
    errorText: { color: 'red', fontSize:theme.fontSizes.size_14 },
    supportText: {
        fontSize: theme.fontSizes.size_16,
        fontWeight: '600',
        color: '#000',
    },
    nameView: {
        marginTop:5,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfWidth: {
        width: '48%',
    },
    nameTextInput: {
        height: theme.horizontalSpacing.space_50,
        borderWidth:.3,
        borderRadius:10,
        borderColor:'gray',
        paddingHorizontal: 10,
        backgroundColor: theme.lightColor.whiteColor,
        // marginBottom: theme.verticalSpacing.space_10,
        width:theme.horizontalSpacing.space_173,
        marginTop:5
    },
    TextStyle: {
        marginTop: theme.verticalSpacing.space_20,
        fontSize: theme.fontSizes.size_16,
        fontWeight: '500',
    },
    actions: {
        marginTop: theme.verticalSpacing.space_30,
        alignItems: 'center',
        
    },
    SavechangesButton: {
        width: theme.horizontalSpacing.space_374,
        height: theme.horizontalSpacing.space_50,
        borderRadius: 10,
        backgroundColor: 'rgba(89, 41, 81, 1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: theme.horizontalSpacing.space_10,
    },
    actionText: {
        fontWeight:'500',
        fontSize: theme.fontSizes.size_16,
        lineHeight: 20,
        color: theme.lightColor.whiteColor,
        textAlign: 'center',
    },
});

export default EditProfile;
