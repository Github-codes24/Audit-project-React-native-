import React, { useState,useEffect } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import { theme } from "../../utils";
import * as Svg from '../../asstets/images/svg';
import LicenseCard from "../../utils/licenceCard";
import HorizontalCardList from "../../utils/imageCardList";
import { imageCarddata } from "../../utils/imageCardData";
import CustomModal from "../../reusableComponent/customModal/customModal";
import Header from "../../reusableComponent/header/header";
import ImageSwiper from "../../reusableComponent/ImageSlider/imageSwiper";
import { useAboutUsQuery } from "../../redux/apiSlice/customerSupportApiSlice";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import { useGetAllBlogsQuery } from "../../redux/apiSlice/blogApiSlice";
import { useDispatch,useSelector } from "react-redux";
import { acceptCookies,rejectCookies,customizeCookies } from "../../redux/stateSlice/cookiesStateSlice";
import { getCookiesStatus } from "../../redux/stateSelector";
import { AboutUsContent } from "../../reusableComponent/aboutUsContent/aboutUsContent";
const DashBoardScreen = ({ navigation }) => {
 
 
 
  const [isModalVisible, setModalVisible] = useState(true);
const cookiesStatus= useSelector(getCookiesStatus);
// console.log('cookiesStatus',cookiesStatus)
  const [refreshing, setRefreshing] = useState(false); 
 const [showFullText, setShowFullText] = useState(false);



const dispatch = useDispatch();
  const {
    data: aboutUsData,
    isLoading: isAboutUsLoading,
    refetch: refetchAboutUs, h
  } = useAboutUsQuery({});

  const closeModal = () => {
    setModalVisible(false);
  };

  const onRefresh = async () => {
    setRefreshing(true); 
    refetchAboutUs();
    setRefreshing(false); 
  };

  useEffect(() => {
    if(cookiesStatus=='accepted'||cookiesStatus=='customized'||cookiesStatus=='rejected'){
      setModalVisible(false);
    }
  }, [cookiesStatus]);


const {
  data: blogApiData,
  isLoading: isblogApiDataLoading,
  isSuccess:isblogApiDataSuccess,
  error: isblogApiDataError,
  refetch: refetchCategoryData,
} = useGetAllBlogsQuery({});


console.log('blogApiData',blogApiData)



  return (
    <ScrollView
      style={{ flex: 1,marginBottom:30 }}
      refreshControl={
       <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={style.main}>
        <StatusBar backgroundColor={"#592951"} />
        <CustomModal
          visible={isModalVisible}
          onClose={closeModal}
          title="Privacy & Cookie Settings"
          // onPress={() => navigation.navigate("compliance")}
          description={
            "We use cookies and similar technologies to provide our Service, to give you the best experience, to improve and advertise the Service, to ensure it is safe and secure for users, and to measure the effectiveness of advertising campaigns. If you select 'Accept All', you agree to us and the partners we work with storing cookies and similar technologies on your device for advertising purposes.You can also 'Reject All' non-essential cookies or choose which types of cookies you'd like to accept or disable by clicking 'Customise Cookies' below or at any time in your privacy settings. We do not collect cookies for tracking purposes on iOS App. For more details, see our Cookies and Similar Technologies Policy."
          }
          buttons={[
            {
              label: "Accept all",
              type: "primary",
              onPress: () => {
                console.log("Accepted all");
                dispatch(acceptCookies());
               
              },
            },
            {
              label: "Reject all",
              type: "secondary",
              onPress: () => {
                console.log("Rejected all");
                dispatch(rejectCookies());
                
              },
            },
            {
              label: "Customize cookie",
              type: "secondary",
              onPress: () => {
                dispatch(customizeCookies());
                console.log("Customizing cookies");
              },
            },
          ]}
        />
        <Header userName={"John Doe"} />
        <Text style={style.sponsorText}>{"Sponsor License Checker"}</Text>
        <LicenseCard
          title={"Sponsor License Compliance Checker"}
          description={"Check your score "}
          icon={require("../../asstets/images/Compliance.png")}
          onPress={() => navigation.navigate("Compliance")}
        />
        <LicenseCard
          title={"Sponsor License Eligibility Checker "}
          description={"Check if you are eligible or not "}
          icon={require("../../asstets/images/Checklist.png")}
          onPress={() => navigation.navigate("Eligibity")}
        />
         <LicenseCard
          title={"Reminder"}
          description={"Check or mark some important dates"}
          icon={require("../../asstets/images/Calendr.png")}
          onPress={() => navigation.navigate('Remainder')}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "600",
              fontSize: theme.fontSizes.size_20,
              color: theme.lightColor.blackColor,
            }}
          >
            {"Latest Blog"}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Resource")}>
            <Text style={{ fontSize: theme.fontSizes.size_14,fontWeight:'400',fontFamily:'inter' }}>{"See all"}</Text>
          </TouchableOpacity>
        </View>
        <HorizontalCardList data={blogApiData?.data||{}} />

        <Text
          style={{
            marginLeft: 10,
            fontSize: theme.fontSizes.size_20,
            color: theme.lightColor.blackColor,
            fontWeight: "500",
          }}
        >
          {"About us"}
        </Text>
<AboutUsContent content={aboutUsData?.aboutUs?.[0]?.content} />

        <View style={{ paddingBottom: 100 }}>

          
          <View
  style={{
    height: theme.verticalSpacing.space_230,
    marginHorizontal: theme.horizontalSpacing.space_10,
    marginTop: theme.verticalSpacing.space_10,
    borderRadius:theme.horizontalSpacing.space_10, 
    overflow: 'hidden', 
    }}
>
  <TouchableOpacity
    onPress={() => navigation.navigate(MainRoutes.ABOUTUS_SCREEN)}
  >
    <ImageSwiper images={aboutUsData?.aboutUs?.[0]?.image || []} />
  </TouchableOpacity>
</View>
      
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  main: {
    flex: 1,
  },
  sponsorText: {
    fontSize: theme.fontSizes.size_24,
    marginTop: theme.verticalSpacing.space_10,
    paddingHorizontal: 20,
    fontWeight: "600",
    color: theme.lightColor.blackColor,
  },
});
export default DashBoardScreen;
