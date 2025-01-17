import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import * as Svg from '../../asstets/images/svg';
import { theme } from "../../utils";
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { getLoginResponse } from "../../redux/stateSelector/authStateSelector";
import { useSelector, UseSelector } from "react-redux";
import { MainRoutes } from "../../navigation/routeAndParamsList";
const Header = () => {
  const navigation = useNavigation();
  const userData = useSelector(getLoginResponse);


  return (
    <View style={styles.headerView}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, alignItems: 'center' }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity 
            style={{ flexDirection: 'row' }} 
            onPress={() => navigation.navigate(MainRoutes.PROFILE_SCREEN)} // Use navigation to navigate
          >
            <View style={styles.profileImageContainer}>
              <Image
                style={styles.profileImage}
                source={require('../../asstets/images/manImage.png')}
              />
            </View>
            <View style={{ marginLeft: theme.horizontalSpacing.space_10 }}>
              <Text style={styles.welcomeText}>Hello, Welcome 🎉</Text>
              <Text style={styles.userName}>{userData?.data?.name}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Svg.BellIcon />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    height: 105,
    backgroundColor: "#592951",
    paddingHorizontal: 30,
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
  },
  welcomeText: {
    color: theme.lightColor.whiteColor,
  },
  userName: {
    color: theme.lightColor.whiteColor,
    fontSize: theme.fontSizes.size_24,
  },
});

export default Header;
