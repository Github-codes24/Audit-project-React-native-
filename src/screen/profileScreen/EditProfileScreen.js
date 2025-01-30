import React, { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Modal, ScrollView } from "react-native";
import { theme } from "../../utils";
import CustomHeader from "../../reusableComponent/customHeader/customHeader";
import * as Svg from '../../asstets/images/svg';
import CustomTextInput from "../../reusableComponent/customTextInput/customTextInput";
import BackgroundLayout from "../../reusableComponent/backgroundLayout/backgroundLayout";
import { MainRoutes } from '../../navigation/routeAndParamsList';
import { alertError, alertSuccess } from "../../utils/Toast";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { getLoginResponse } from "../../redux/stateSelector/authStateSelector";
import { useSelector } from "react-redux";
import { useUpdateUserProfileApiSliceMutation } from "../../redux/apiSlice/profileApiSlice";
import Loader from "../../reusableComponent/loader/loader";

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

    const response = useSelector(getLoginResponse);
    const userId = response?.data?.id;

    const [updateUserProfile, { isLoading, error, data }] = useUpdateUserProfileApiSliceMutation();


    const validatePhoneNumber = (phone) => {
        const phoneRegEx = /^[0-9]{10}$/; 
        return phoneRegEx.test(phone);
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

    const captureImageFromCamera = () => {
        launchCamera(
            {
                mediaType: 'photo',
                quality: 1,
            },
            (response) => {
                if (response.didCancel) {
                    console.log('User cancelled camera');
                } else if (response.errorMessage) {
                    console.error('Camera Error:', response.errorMessage);
                } else if (response.assets && response.assets.length > 0) {
                    setImageUri(response.assets[0].uri);
                    setIsModalVisible(false);
                }
            }
        );
    };

    const handleSubmit = () => {
        // Validate phone number before submission
        if (!validatePhoneNumber(phoneNumber)) {
            setPhoneError('Please enter a valid 10-digit phone number.');
            return; // Exit if validation fails
        }

        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        formData.append('phoneNumber', phoneNumber);
        formData.append('Company', companyName);
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
                alertError('Failed to update profile');
            });
    };

    const supportItems = [
        { label: 'Edit Image', icon: <Svg.EditImage />, route: MainRoutes.EDITIMAGE_SCREEN }
    ];

    return (
        <ScrollView style={{ marginBottom: theme.verticalSpacing.space_30 }}>
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
                            : require('../../asstets/images/manImage.png')
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
                                placeholder="John"
                            />
                        </View>
                        <View style={styles.halfWidth}>
                            <Text style={styles.TextStyle}>Last name</Text>
                            <TextInput
                                value={lastName}
                                onChangeText={(text) => setLastName(text)}
                                style={styles.nameTextInput}
                                placeholder="Weak"
                            />
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.TextStyle}>Password</Text>
                    <CustomTextInput
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholder={'.  .  .  .  .  .  .  .  .  .'}
                        secureTextEntry={true}
                    />
                    <Text style={styles.TextStyle}>Confirm password</Text>
                    <CustomTextInput
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                        placeholder={'.  .  .  .  .  .  .  .  .  .'}
                        secureTextEntry={true}
                    />
                    <Text style={styles.TextStyle}>Phone number</Text>
                    <CustomTextInput
                        value={phoneNumber}
                        onChangeText={(text) => {
                            const formattedText = text.replace(/\D/g, '').slice(0, 10);
                            setPhoneNumber(formattedText);
                            setPhoneError(''); 
                        }}
                        maxLength={10}
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
                                <Text style={{ fontSize: 16, marginVertical: 10, marginLeft: 10 }}>Upload from gallery</Text>
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
    supportText: {
        fontSize: theme.fontSizes.size_16,
        fontWeight: '600',
        color: '#000',
    },
    nameView: {
        marginTop: theme.verticalSpacing.space_10,
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
        borderWidth: 1,
        borderRadius: 8,
        borderColor: theme.lightColor.grayColor,
        paddingHorizontal: 10,
        backgroundColor: theme.lightColor.whiteColor,
        marginBottom: theme.verticalSpacing.space_10,
        
    },
    TextStyle: {
        marginTop: theme.verticalSpacing.space_10,
        fontSize: theme.fontSizes.size_16,
        fontWeight: '600',
    },
    actions: {
        marginTop: theme.verticalSpacing.space_34,
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
        fontWeight: '500',
        fontSize: theme.fontSizes.size_16,
        lineHeight: 20,
        color: theme.lightColor.whiteColor,
        textAlign: 'center',
    },
});

export default EditProfile;
