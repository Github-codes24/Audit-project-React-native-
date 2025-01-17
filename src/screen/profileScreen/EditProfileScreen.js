import React, { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from "react-native";
import { theme } from "../../utils";
import CustomHeader from "../../reusableComponent/customHeader/customHeader";
import * as Svg from '../../asstets/images/svg';
import CustomTextInput from "../../reusableComponent/customTextInput/customTextInput";
import BackgroundLayout from "../../reusableComponent/backgroundLayout/backgroundLayout";
import { MainRoutes } from '../../navigation/routeAndParamsList';

const EditProfile = ({ navigation }) => {
    const inputRef = useRef(null);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [companyName, setCompanyName] = useState('');

    const handleSave = () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        alert("Profile updated successfully!");
    };

    const supportItems = [
        { label: 'Edit Image', icon: <Svg.EditImage />, route: MainRoutes.EDITIMAGE_SCREEN }
    ];

    return (
        <BackgroundLayout>
            <View style={{ marginRight: 230}}>
                <CustomHeader
                    titleColor="black"
                    title={'Edit Profile'}
                    leftIcon={<Svg.ArrowBack />}
                    onBackPress={() => navigation.goBack()}

                />
            </View>
            <View style={styles.profileSection}>
                {/* Profile Image */}
                <View style={styles.profileImageContainer}>
                    <Image
                        source={require('../../asstets/images/manImage.png')}
                        style={styles.profileImage}
                    />
                </View>

                {/* Edit Image Text and Icon */}
                <View>
                    {supportItems.map((item, index) => (
                        <TouchableOpacity key={index}
                            onPress={() => {
                                if (item.route) {
                                    navigation.navigate(item.route); // Navigate to the specified route
                                } else {
                                    Alert.alert(item.label, 'This feature is under development');
                                }
                            }}
                        >
                            <View style={styles.iconTextContainer}>
                                <Text style={styles.supportIcon}>{item.icon}</Text>
                                <Text style={styles.supportText}>{item.label}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* First Name and Last Name Inputs Side by Side */}
                <View style={styles.nameView}>
                    <View style={styles.rowContainer}>
                        {/* First Name Input */}
                        <View style={styles.halfWidth}>
                            <Text style={styles.TextStyle}>First Name</Text>
                            <TextInput
                                ref={inputRef}
                                value={firstName}
                                onChangeText={(text) => setFirstName(text)}
                                style={styles.nameTextInput}
                                placeholder="John"
                            />
                        </View>
                        {/* Last Name Input */}
                        <View style={styles.halfWidth}>
                            <Text style={styles.TextStyle}>Last Name</Text>
                            <TextInput
                                value={lastName}
                                onChangeText={(text) => setLastName(text)}
                                style={styles.nameTextInput}
                                placeholder="Weak"
                            />
                        </View>
                    </View>
                </View>

                {/* Other Inputs */}
                <View>
                    {/* Password Inputs */}
                    <Text style={styles.TextStyle}>Password</Text>
                    <CustomTextInput
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholder={'.  .  .  .  .  .  .  .  .  .'}
                        rightIcon={<Svg.CloseEye />}
                    />
                    {/* Confirm Password Input */}
                    <Text style={styles.TextStyle}>Confirm Password</Text>
                    <CustomTextInput
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                        placeholder={'.  .  .  .  .  .  .  .  .  .'}
                        rightIcon={<Svg.CloseEye />}
                    />
                    {/* Phone Number Input */}
                    <Text style={styles.TextStyle}>Phone Number</Text>
                    <CustomTextInput
                        value={phoneNumber}
                        onChangeText={(text) => setPhoneNumber(text)}
                        placeholder={'+44 (0) XXXX XXX XXX'}
                    />
                    {/* Company Name Input */}
                    <Text style={styles.TextStyle}>Company Name</Text>
                    <CustomTextInput
                        value={companyName}
                        onChangeText={(text) => setCompanyName(text)}
                        placeholder={'Enter your company name'}
                    />
                </View>

                {/* Save Button */}
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

    iconTextContainer: {
        flexDirection: 'row',
    },

    supportIcon: {
        marginRight: 8,
    },


    supportText: {
        fontSize: theme.fontSizes.size_16,
        fontWeight: 'bold',
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
        width: 374,
        height: theme.horizontalSpacing.space_50,
        borderRadius: 10,
        backgroundColor: 'rgba(89, 41, 81, 1)',
        alignItems: 'center',
        justifyContent: 'center',
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

export default EditProfile;