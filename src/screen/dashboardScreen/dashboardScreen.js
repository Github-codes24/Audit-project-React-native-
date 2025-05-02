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
  Dimensions,
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
import { useHomeContentApiQuery } from "../../redux/apiSlice/importantLinkSlice";
import * as Svg from '../../assets/images/svg';
import he from 'he';
import RenderHTML from "react-native-render-html";

const screenWidth = Dimensions.get("window").width;

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

  const {
    data: homeContentData,
    isError: homeContentisError,
    refetch: homeContentrefetch,
  } = useHomeContentApiQuery();

  const {
    data: blogApiData,
    isLoading: isBlogApiDataLoading,
    refetch: refetchCategoryData,
  } = useGetAllBlogsQuery({});

  const homeContent = homeContentData?.data;

  const closeModal = () => {
    setModalVisible(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    homeContentrefetch();
    refetchAboutUs();
    setRefreshing(false);
  };

  useEffect(() => {
    if (
      cookiesStatus === "accepted" ||
      cookiesStatus === "customized" ||
      cookiesStatus === "rejected"
    ) {
      setModalVisible(false);
    }
  }, [cookiesStatus]);

  const openVerificationLink = () => {
    const url = "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=8006464";
    Linking.openURL(url).catch(err => console.error("Error opening link: ", err));
  };

  // Extract image src using regex
 const decodeHtml = (html) => {
  return he.decode(html || '');
};

const extractImageSrc = (html) => {
  const decoded = decodeHtml(html);
  const match = decoded.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
};

const stripHtmlTags = (html) => {
  const decoded = decodeHtml(html);
  return decoded.replace(/<[^>]*>?/gm, '');
};


  const imageUrl = extractImageSrc(homeContent?.description);
const plainTextDescription = stripHtmlTags(homeContent?.description);


console.log('imageUrl3264',imageUrl)


  return (
    <ScrollView
      style={{ flex: 1 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={style.main}>
        <StatusBar backgroundColor={"#592951"} />
        <CustomModal
          visible={isModalVisible}
          size='80%'
          onClose={closeModal}
          title="Privacy & cookies setting"
          titleTextStyle={{ textalign: "left", alignSelf: "flex-start" }}
          description={
            "We use cookies and similar technologies to provide our Service, to give you the best experience, to improve and advertise the Service, to ensure it is safe and secure for users, and to measure the effectiveness of advertising campaigns. If you select 'Accept All', you agree to us and the partners we work with storing cookies and similar technologies on your device for advertising purposes.\n\nYou can also 'Reject All' non-essential cookies or choose which types of cookies you'd like to accept or disable by clicking 'Customise Cookies' below or at any time in your privacy settings. We do not collect cookies for tracking purposes on iOS App. For more details, see our Cookies and Similar Technologies Policy."
          }
          descriptionTextStyle={{ textAlign: "left" }}
          buttons={[
            {
              label: "Accept all",
              type: "primary",
              onPress: () => dispatch(acceptCookies()),
            },
            {
              label: "Reject all",
              type: "secondary",
              onPress: () => dispatch(rejectCookies()),
            },
            {
              label: "Customize cookies",
              type: "text",
              onPress: () => dispatch(customizeCookies()),
            },
          ]}
        />
        <Header userName={"John Doe"} />
        <View style={{ paddingHorizontal: 19 }}>
          <Text style={style.sponsorText}>{"Welcome🎉"}</Text>

          <View style={{ marginTop: theme.verticalSpacing.space_10 }}>
            <LicenseCard
              title={"Check Your Eligibility for Sponsor Licence"}
              description={"Check if your business is eligible for a sponsor licence in the UK "}
              icon={require("../../assets/images/Checklist.png")}
              onPress={() => navigation.reset({
          index: 0, 
          routes: [{ name: MainRoutes.ELIGIBILITY }], 
          })}
            />      

            <LicenseCard
              title={"Check Your Sponsor Licence Compliance Score"}
              description={"Use this tool to check your compliance with sponsor licence duties."}
              icon={require("../../assets/images/Compliance.png")}
              onPress={()=>navigation.navigate(MainRoutes?.COMPLIANCE)}
        
            />

            <LicenseCard
              title={"Monitor Visa Status"}
              description={"Set reminders and receive notifications for your employee visa expiries."}
              icon={require("../../assets/images/Calendr.png")}
              onPress={() => navigation.navigate("Reminder")}
            />

            <LicenseCard
              title={"Important Link"}
              description={"Right to work checks and other important links from the home office."}
              SvgIcon={<Svg.LinkChain />}
              onPress={() => navigation.navigate(MainRoutes?.IMPORTANT_LINK_SCREEN)}
            />
          </View>

          <View style={[style.horizontalAlignContainer, { marginTop: 10 }]}>
            <Text style={style.latestBlogText}>{"Latest Resources"}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Resource")}>
              <Text style={style.seeAllText}>{"See all"}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginHorizontal: -10 }}>
            <HorizontalCardList data={blogApiData?.data || {}} />
          </View>
 <>
 {homeContent&&
     <View style={{ backgroundColor:"#FFF",borderRadius:10,marginBottom:10,paddingHorizontal:theme.horizontalSpacing.space_10 }}>
     
     {
     imageUrl && (
    <Image
    // source={{ uri: imageUrl }}
    // style={{
    
    // height: theme.verticalSpacing.space_230,
    // borderRadius: 10,
    //  }}
   
   />
              )}
       <RenderHTML
  contentWidth={screenWidth - 40}
  source={{ html: homeContent?.description }}
  baseStyle={{
    fontSize:theme.fontSizes.size_16,
    color: 'black',
    lineHeight: 20,
  }}
  tagsStyles={{
    img: {
      alignSelf: 'center', 
    },
  }}
  renderersProps={{
    img: {
      enableExperimentalPercentWidth: true,
      computeImagesMaxWidth: () => 358,
      imagesInitialDimensions: {
       width:theme.horizontalSpacing.space_358,
      height:theme.verticalSpacing.space_220,
      },
    },
  }}
  renderers={{
    img: ({ tnode }) => {
      const { src } = tnode.attributes;
      return (
        <Image
          source={{ uri: src }}
          style={{
            width:theme.horizontalSpacing.space_358,
            height:theme.verticalSpacing.space_220,
            borderRadius: 10,
            overflow: 'hidden',
            resizeMode: 'cover',
            alignSelf: 'center',
          }}
        />
      );
    },
  }}
/>
            </View>

}

            </>
        

          <Text style={style.aboutUsText}>{"About Us"}</Text>
          <View>
            <AboutUsContent content={aboutUsData?.aboutUs?.[0]?.content} />
          </View>

          <View style={{ paddingBottom: theme.verticalSpacing.space_100 }}>
            <View style={style.imageSwiperContainer}>
              <TouchableOpacity onPress={() => navigation.navigate(MainRoutes.ABOUTUS_SCREEN)}>
                <ImageSwiper images={aboutUsData?.aboutUs?.[0]?.image || []} borderRadius={10} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", justifyContent: 'center' }}
              onPress={openVerificationLink}
            >
              <Text style={{
                marginTop: theme.verticalSpacing.space_30,
                color: 'gray',
                textAlign: "center",
                fontSize: theme.fontSizes.size_14,
                alignSelf: 'center'
              }}>
                {'Authorised and regulated by the Solicitors Regulation.\n SRA No. 8006464.'}
                <Text style={{ color: theme.lightColor.brownColor, lineHeight: 20 }}>
                  {'Verify here'}
                </Text>
              </Text>
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
    marginTop: theme.verticalSpacing.space_10,
    borderRadius: theme.horizontalSpacing.space_10,
    overflow: "hidden",
  },
});

export default DashBoardScreen;
