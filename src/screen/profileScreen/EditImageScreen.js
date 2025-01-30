import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { theme } from "../../utils";
import CustomHeader from "../../reusableComponent/customHeader/customHeader";
import * as Svg from '../../asstets/images/svg';
import BackgroundLayout from "../../reusableComponent/backgroundLayout/backgroundLayout";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const EditImage = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);




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
        }
      }
    );
  };

  const handleSave = () => {
    alert("Changes saved successfully!");
  };

  const supportItems = [
    {
      label: 'Upload from gallery',
      icon: <Svg.GalleryIcon />,
      onPress: pickImageFromGallery, 
    },
    {
      label: 'Open camera',
      icon: <Svg.CameraIcon />,
      onPress: captureImageFromCamera,
    },
  ];

  return (
    <BackgroundLayout>
      <View style={{ marginRight: 230 }}>
        <CustomHeader
          titleColor=""
          title={'Edit image'}
          leftIcon={<Svg.ArrowBack />}
          onBackPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.profileSection}>
        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          <Image
            source={
              imageUri
                ? { uri: imageUri } 
                : require('../../asstets/images/manImage.png') 
            }
            style={styles.profileImage}
          />
        </View>

        <View>
          {supportItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.supportItem}
              onPress={item.onPress} // Call the respective function
            >
              <View style={styles.iconTextContainer}>
                <Text style={styles.supportIcon}>{item.icon}</Text>
                <Text style={styles.supportText}>{item.label}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.SavechangesButton} onPress={handleSave}>
            <Text style={styles.actionText}>Save changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BackgroundLayout>
  );
};

const styles = StyleSheet.create({
  profileSection: {
    padding: 10,
  },

  profileImageContainer: {
    marginTop: theme.verticalSpacing.space_10,
  },

  profileImage: {
    width: theme.horizontalSpacing.space_100,
    height: theme.horizontalSpacing.space_110,
    borderRadius: 10,
    marginBottom: theme.verticalSpacing.space_10,
    marginTop: theme.verticalSpacing.space_10,
  },

  supportIcon: {
    marginRight: 8,
  },

  supportText: {
    fontSize: theme.fontSizes.size_16,
    fontWeight: 'bold',
    color: '#000',
  },

  iconTextContainer: {
    flexDirection: 'row',
  },

  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    marginBottom: theme.verticalSpacing.space_10,
    marginTop: theme.verticalSpacing.space_10,
    borderRadius: 10,
  },

  actions: {
    marginTop: theme.verticalSpacing.space_34,
    alignItems: 'center',
  },

  SavechangesButton: {
    width: 374,
    height: theme.horizontalSpacing.space_50,
    borderRadius: 10,
    backgroundColor: 'rgba(89, 41, 81, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 300,
  },

  actionText: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: theme.fontSizes.size_16,
    lineHeight: 20,
    color: theme.lightColor.whiteColor,
    textAlign: 'center',
  },
});

export default EditImage;
