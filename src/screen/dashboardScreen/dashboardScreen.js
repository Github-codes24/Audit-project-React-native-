import React, { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  Linking,
} from "react-native";
import { theme } from "../../utils";
import LicenseCard from "../../utils/licenceCard";
import HorizontalCardList from "../../utils/imageCardList";
import CustomModal from "../../reusableComponent/customModal/customModal";
import Header from "../../reusableComponent/header/header";
import ImageSwiper from "../../reusableComponent/ImageSlider/imageSwiper";
import { useAboutUsQuery } from "../../redux/apiSlice/customerSupportApiSlice";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import { useGetAllBlogsQuery } from "../../redux/apiSlice/blogApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { acceptCookies, rejectCookies, customizeCookies } from "../../redux/stateSlice/cookiesStateSlice";
import { getCookiesStatus } from "../../redux/stateSelector";
import { AboutUsContent } from "../../reusableComponent/aboutUsContent/aboutUsContent";

const DashBoardScreen = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const cookiesStatus = useSelector(getCookiesStatus);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const {
    data: aboutUsData,
    isLoading: isAboutUsLoading,
    refetch: refetchAboutUs,
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
    if (cookiesStatus === "accepted" || cookiesStatus === "customized" || cookiesStatus === "rejected") {
      setModalVisible(false);
    }
  }, [cookiesStatus]);

  const {
    data: blogApiData,
    isLoading: isBlogApiDataLoading,
    refetch: refetchCategoryData,
  } = useGetAllBlogsQuery({});


const openVerificationLink = () => {
    const url = "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=8006464";
    Linking.openURL(url).catch(err => console.error("Error opening link: ", err));
  };

  return (
    <ScrollView
      style={{ flex:1, }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={style.main}>
        <StatusBar backgroundColor={"#592951"} />
        <CustomModal
          visible={isModalVisible}
          size='80%'
          onClose={closeModal}
          title="Privacy & cookies setting"
          titleTextStyle={{
            textalign: "left",
            alignSelf: "flex-start",
          }}
         description={
        "We use cookies and similar technologies to provide our Service, to give you the best experience, to improve and advertise the Service, to ensure it is safe and secure for users, and to measure the effectiveness of advertising campaigns. If you select 'Accept All', you agree to us and the partners we work with storing cookies and similar technologies on your device for advertising purposes.\n\nYou can also 'Reject All' non-essential cookies or choose which types of cookies you'd like to accept or disable by clicking 'Customise Cookies' below or at any time in your privacy settings. We do not collect cookies for tracking purposes on iOS App. For more details, see our Cookies and Similar Technologies Policy."
         }
          descriptionTextStyle={{
            textAlign: "left",
          }}
          buttons={[
            {
              label: "Accept all",
              type: "primary",
              onPress: () => {
                dispatch(acceptCookies());
              },
            },
            {
              label: "Reject all",
              type: "secondary",
              onPress: () => {
                dispatch(rejectCookies());
              },
            },
            {
              label: "Customize cookies",
              type: "text",
              onPress: () => {
                dispatch(customizeCookies());
              },
            },
          ]}
        />
        <Header userName={"John Doe"} />
        <View style={{paddingHorizontal:19}}>
        <Text style={style.sponsorText}>{"Welcome to Sponsor Licence Compliance Guru"}</Text>
         <View style={{marginTop:theme.verticalSpacing.space_10}}>
        <LicenseCard
          title={"Check Your Sponsor Licence Compliance Score"}
          description={"Use this tool to check your compliance with sponsor licence duties."}
          icon={require("../../assets/images/Compliance.png")}
          onPress={() => navigation.navigate('Compliance')}
        />

        <LicenseCard
          title={"Check Your Eligibility for Sponsor Licence"}
          description={"Check if your business is eligible for a sponsor licence in the UK "}
          icon={require("../../assets/images/Checklist.png")}
          onPress={() => navigation.navigate('Eligibility')}
        />
    
        <LicenseCard
          title={"Monitor Visa Status"}
          description={"Set reminders and receive notifications for your employee visa expiries."}
          icon={require("../../assets/images/Calendr.png")}
          onPress={() => navigation.navigate("Reminder")}
        />
        </View>
        <View style={[style.horizontalAlignContainer, { marginTop: 10 }]}>
          <Text style={style.latestBlogText}>{"Latest Blog"}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Resource")}>
            <Text style={style.seeAllText}>{"See all"}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginHorizontal:-10}}>
          <HorizontalCardList data={blogApiData?.data || {}} />
        </View>
        <Text style={style.aboutUsText}>{"About Us"}</Text>
        <View style={{}}>
          <AboutUsContent content={aboutUsData?.aboutUs?.[0]?.content} />
        </View>
        <View style={{ paddingBottom:theme.verticalSpacing.space_100 }}>
          <View style={style.imageSwiperContainer}>
            <TouchableOpacity onPress={() => navigation.navigate(MainRoutes.ABOUTUS_SCREEN)}>
              <ImageSwiper images={aboutUsData?.aboutUs?.[0]?.image || []} />
            </TouchableOpacity>
          </View>
           <TouchableOpacity style={{flexDirection:"row"}} onPress={openVerificationLink}>
          <Text style={{marginTop:theme.verticalSpacing.space_30,color:'gray',textAlign:"center",fontSize:theme.fontSizes.size_16}}>{'Authorised and regulated by the Solicitors Regulation.\n SRA No. 8006464.'}<Text style={{color:theme.lightColor.brownColor,lineHeight:20,}}>{'Verify here'}</Text> </Text>
          
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
    fontSize: theme.fontSizes.size_20,
    marginTop: theme.verticalSpacing.space_20,
    fontWeight: "600",
    color: theme.lightColor.blackColor,
  },
  horizontalAlignContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

  },
  latestBlogText: {
    fontWeight: "600",
    fontSize: theme.fontSizes.size_20,
    color: theme.lightColor.blackColor,
  },
  seeAllText: {
    fontSize: theme.fontSizes.size_16,
    fontWeight: "400",
    fontFamily: "inter",
  },
  aboutUsText: {
   
    fontSize: theme.fontSizes.size_20,
    color: theme.lightColor.blackColor,
    fontWeight: "500",
  },
  imageSwiperContainer: {
    height: theme.verticalSpacing.space_260,
  //  backgroundColor:"red",
    marginTop: theme.verticalSpacing.space_10,
    borderRadius: theme.horizontalSpacing.space_10,
    overflow: "hidden",
  },
});

export default DashBoardScreen;
