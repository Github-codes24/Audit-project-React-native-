import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Alert,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { theme } from "../../utils";
import * as Svg from '../../assets/images/svg';
import CustomTextInput from "../../reusableComponent/customTextInput/customTextInput";
import { MainRoutes } from '../../navigation/routeAndParamsList';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { getLoginResponse } from "../../redux/stateSelector/authStateSelector";
import { useSelector } from "react-redux";
import { useUpdateUserProfileApiSliceMutation } from "../../redux/apiSlice/profileApiSlice";
import Loader from "../../reusableComponent/loader/loader";
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import CountryPicker from "react-native-country-picker-modal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomButton from "../../reusableComponent/button/button";

const EditProfile = ({ navigation, route }) => {
  const { profileData = {} } = route?.params || {};
  const [imageUri, setImageUri] = useState(profileData?.image || '');
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
  const [countryCode, setCountryCode] = useState(`${profileData?.countryCode}` || '');
  const [selectedCountry, setSelectedCountry] = useState("GB");
  const [showModal, setShowModal] = useState(false);

  const response = useSelector(getLoginResponse);
  const userId = response?.data?.id;

  const [updateUserProfile, { isLoading }] = useUpdateUserProfileApiSliceMutation();

  const validatePhoneNumber = (phone) => /^[0-9]{10,12}$/.test(phone);
  const validatePassword = (password) => {
    if (!password) return true;
    return /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(password);
  };

  const pickImageFromGallery = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (response?.assets?.length > 0) {
        setImageUri(response.assets[0].uri);
        setIsModalVisible(false);
      }
    });
  };

  const requestCameraPermission = async () => {
    try {
      const permission = Platform.select({
        ios: PERMISSIONS.IOS.CAMERA,
        android: PERMISSIONS.ANDROID.CAMERA,
      });
      const status = await check(permission);
      if (status === RESULTS.GRANTED) return true;
      if (status === RESULTS.DENIED || status === RESULTS.LIMITED) {
        return (await request(permission)) === RESULTS.GRANTED;
      }
      if (status === RESULTS.BLOCKED) {
        Alert.alert('Camera Permission Required', 'Enable camera permission in settings.');
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
    formData.append('countryCode', countryCode);
    formData.append('company', companyName);
    if (imageUri) {
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'profile_image.jpg',
      });
    }

    updateUserProfile({ id: userId, formData })
      .unwrap()
      .then(() => navigation.navigate(MainRoutes.UPDATE_SUCCESSFULLY))
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView
         contentContainerStyle={styles.scrollContent}
                      keyboardShouldPersistTaps="handled"
                      enableOnAndroid
                      enableResetScrollToCoords={false}
                      extraScrollHeight={Platform.OS === 'ios' ? 80 :100}
                      scrollEnabled
                      
                      showsVerticalScrollIndicator={false}
        >
          <Loader isLoading={isLoading} />

          <View style={{ paddingHorizontal: 7 }}>
            <TouchableOpacity style={{ marginTop: 20, paddingHorizontal: 10 }} onPress={() => navigation.goBack()}>
              <Svg.ArrowBack />
            </TouchableOpacity>
            <Text style={{ fontWeight: '700', fontSize: 20, marginTop: 30, paddingHorizontal: 10 }}>
              Edit profile
            </Text>
          </View>

          <View style={styles.profileSection}>
            <Image
              source={imageUri ? { uri: imageUri } : require('../../assets/images/narasolicitor.jpeg')}
              style={styles.profileImage}
            />
            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
              <View style={styles.iconTextContainer}>
                <Text style={styles.supportIcon}><Svg.EditImage /></Text>
                <Text style={styles.supportText}>Edit Image</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.nameView}>
              <View style={styles.rowContainer}>
                <View style={styles.halfWidth}>
                  <Text style={styles.TextStyle}>First name</Text>
                  <TextInput value={firstName} onChangeText={setFirstName} style={styles.nameTextInput} placeholder="First name" />
                </View>
                <View style={styles.halfWidth}>
                  <Text style={styles.TextStyle}>Last name</Text>
                  <TextInput value={lastName} onChangeText={setLastName} style={[styles.nameTextInput,{marginRight:theme.horizontalSpacing.space_20}]} placeholder="Last name" />
                </View>
              </View>
            </View>

            <Text style={styles.TextStyle}>Password</Text>
            <CustomTextInput value={password} onChangeText={(text) => { setPassword(text); setPasswordError(''); }} placeholder="********" secureTextEntry />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

            <Text style={styles.TextStyle}>Confirm Password</Text>
            <CustomTextInput value={confirmPassword} onChangeText={(text) => { setConfirmPassword(text); setConfirmPasswordError(''); }} placeholder="********" secureTextEntry />
            {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

            <Text style={styles.TextStyle}>Phone number</Text>
            <View style={styles.phoneContainer}>
              <TouchableOpacity onPress={() => setShowModal(true)} style={styles.countryCodeBox}>
                <Text style={{ fontSize: 16 }}>{countryCode}</Text>
              </TouchableOpacity>
              <CountryPicker
                withCallingCode
                withFlag
                onSelect={(country) => {
                  setCountryCode(`+${country.callingCode[0]}`);
                  setSelectedCountry(country.cca2);
                  setShowModal(false);
                }}
                countryCode={selectedCountry}
                visible={showModal}
                onClose={() => setShowModal(false)}
                renderFlagButton={() => null}
              />
              <CustomTextInput value={phoneNumber} onChangeText={(text) => { setPhoneNumber(text); setPhoneError(''); }} keyboardType="numeric" placeholder="Enter phone number" style={styles.phoneInput} />
            </View>
            {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

            <Text style={styles.TextStyle}>Company name</Text>
            <CustomTextInput value={companyName} onChangeText={setCompanyName} placeholder="Enter your company name" />

            <View style={styles.actions}>
              <CustomButton
              title={'Save change'}
              onPress={handleSubmit}
              />
              {/* <TouchableOpacity style={styles.SavechangesButton} onPress={handleSubmit}>
                <Text style={styles.actionText}>Save changes</Text>
              </TouchableOpacity> */}
            </View>
          </View>

          {/* Image Picker Modal */}
          <Modal transparent visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <TouchableOpacity onPress={pickImageFromGallery}>
                  <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <Svg.GalleryIcon />
                    <Text style={styles.modalOption}>Upload from gallery</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={captureImageFromCamera}>
                  <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <Svg.CameraIcon />
                    <Text style={styles.modalOption}>Open camera</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileSection: { paddingHorizontal: 15 },
  profileImage: {
    width: 100,
    height: 110,
    borderRadius: 10,
    marginVertical: 10,
  },
  iconTextContainer: { flexDirection: 'row', alignItems: 'center' },
  supportIcon: { marginRight: 8 },
  supportText: {
    fontSize: theme.fontSizes.size_16,
    fontWeight: '600',
    color: '#000',
  },
  nameView: { marginTop: 5 },
  rowContainer: { 
    flexDirection: 'row',
    justifyContent: 'space-between' },
  halfWidth: {
     width: '48%'

   },
  nameTextInput: {
    height:theme.horizontalSpacing.space_46,
    borderWidth:1,
    borderRadius: 10,
     borderColor:theme.lightColor.borderColor,
    paddingHorizontal:theme.horizontalSpacing.space_10,
    backgroundColor: '#fff',
    marginTop: 5,
    width:theme.horizontalSpacing.space_173,
    // backgroundColor:"red"
  },
  TextStyle: {
     marginTop:theme.verticalSpacing.space_16,
   fontSize: theme.fontSizes.size_16,
      fontWeight: '500'
     },
  actions: {
     marginTop: theme.verticalSpacing.space_20, 
     alignItems: 'center' 
    },
  // SavechangesButton: {
  //   width: theme.horizontalSpacing.space_374,
  //   height:theme.horizontalSpacing.space_50,
  //   borderRadius: 10,
  //   backgroundColor: 'rgba(89, 41, 81, 1)',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginBottom:theme.verticalSpacing.space_100,
  // },
  actionText: { 
    fontWeight: '500', 
  fontSize: theme.fontSizes.size_16,
     color: '#fff' 
    },
  phoneInput: { marginLeft: 10, 
 width:'83%',

  },
  phoneContainer: {
     flexDirection: "row", 

     alignItems:"center",

  },
 countryCodeBox: {
  height: theme.verticalSpacing.space_50,
  borderWidth: 1,
  borderColor: theme.lightColor.borderColor,
  borderRadius: 8,
  backgroundColor: '#FFF',
  paddingHorizontal: 8,
  justifyContent: 'center',
  marginRight: -5,
  marginTop: 5,

  minWidth: 50,
  maxWidth:theme.horizontalSpacing.space_80,
},

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  modalOption: {
    fontSize: theme.fontSizes.size_16,
    marginVertical: 10,
    marginLeft: 10,
  },
  cancelText: {
    fontSize: theme.fontSizes.size_16,
    marginVertical: 10,
    color: "red",
  },
  errorText: {
    color: 'red',
    fontSize: theme.fontSizes.size_14,
    marginTop: 5,
  }
});

export default EditProfile;
