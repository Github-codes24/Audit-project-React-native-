import React,{useState} from "react";
import { Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import BackgroundLayout from "../../reusableComponent/backgroundLayout/backgroundLayout";
import { theme } from "../../utils";
import * as Svg from '../../asstets/images/svg'
import LicenseCard from "../../utils/licenceCard";
import ImageCard from "../../utils/imageCard";
import HorizontalCardList from "../../utils/imageCardList";
import { imageCarddata } from "../../utils/imageCardData";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import CustomModal from "../../reusableComponent/customModal/customModal";
import Swiper from "react-native-swiper";

const DashBoardScreen=({navigation})=>{


 const slides = [
    {
      image: require('../../asstets/images/nature2.png'), // Replace with your custom image
      content: 'Cricket is a game that unites millions of fans across the globe.',
    },
    {
      image: require('../../asstets/images/nature2.png'), // Replace with your custom image
      content:
        'Imagine diving into an in-depth review of last night\'s thrilling match.',
    },
    {
      image: require('../../asstets/images/nature2.png'), // Replace with your custom image
      content:
        'Cricket blogs celebrate the game’s spirit, drama, and the stories behind the scenes.',
    },
  ];




const [isModalVisible, setModalVisible] = useState(true);

const closeModal = () => {
    setModalVisible(false);
  };

    return(
        // <BackgroundLayout>
        <ScrollView style={{flex:1 }}>
        <View style={style.main}>
            <StatusBar backgroundColor={'#592951'}/>
            <View style={style.headerView}>
         <CustomModal
        visible={isModalVisible}
        onClose={closeModal}
        title="Privacy & Cookie Settings"
        description={"We use cookies and similar technologies to provide our Service, to give you the best experience, to improve and advertise the Service, to ensure it is safe and secure for users, and to measure the effectiveness of advertising campaigns. If you select 'Accept All', you agree to us and the partners we work with storing cookies and similar technologies on your device for advertising purposes.You can also 'Reject All' non-essential cookies or choose which types of cookies you'd like to accept or disable by clicking 'Customise Cookies' below or at any time in your privacy settings. We do not collect cookies for tracking purposes on iOS App. For more details, see our Cookies and Similar Technologies Policy."}
        buttons={[
          {
            label: "Accept all",
            type: "primary",
            onPress: () => {
              console.log("Accepted all");
              closeModal();
            },
          },
          {
            label: "Reject all",
            type: "secondary",
            onPress: () => {
              console.log("Rejected all");
              closeModal();
            },
          },
          {
            label: "Customize cookie",
            type: "secondary",
            onPress: () => {
              console.log("Customizing cookies");
            },
          },
        ]}
      />
           <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20,alignItems:'center'}}>
            <View style={{flexDirection:"row"}}>
                <TouchableOpacity style={{flexDirection:'row'}}
                onPress={()=>navigation.navigate(MainRoutes.PROFILE_SCREEN)}
                >
           <View style={{width:60,height:60,borderWidth:1,borderRadius:30,alignItems:"center",justifyContent:"center"}}>
            <Image
            style={{width:60,height:60}}
            source={require('../../asstets/images/manImage.png')}
            />
           </View>
           <View style={{marginLeft:theme.horizontalSpacing.space_10}}>
            <Text style={{color:theme.lightColor.whiteColor}}>Hello, Welcome 🎉</Text>
            <Text style={{color:theme.lightColor.whiteColor,fontSize:theme.fontSizes.size_24}}>{'NAYAN Moudekar'}</Text>
            
           </View>
           </TouchableOpacity>
           </View>
           <Svg.BellIcon/>

           

           </View>
            {/* <View style={style.searchView}>
               <Svg.SearchIcon/>
                <TextInput
                style={{marginLeft:30,alignSelf:'center',color:'white'}}
                placeholder="Search here ..."
                placeholderTextColor={'white'}
                />
            </View> */}

            </View>
            <Text style={style.sponsorText}>{'Sponsor License Checker'}</Text>
            <LicenseCard
            title={'Sponsor License Compliance Checker'}
            description={'Check your score '}
            icon={require('../../asstets/images/Compliance.png')}
            
            />
            <LicenseCard
             title={'Sponsor License Eligibility Checker '}
            description={'Check if you are eligible or not '}
            icon={require('../../asstets/images/Compliance.png')}
            />
            <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,marginTop:10}}>
           <Text style={{fontWeight:'600',fontSize:theme.fontSizes.size_20,color:theme.lightColor.blackColor}}>{'Latest Blog'}</Text>
           <TouchableOpacity>
            <Text style={{fontSize:theme.fontSizes.size_14}}>{'See all'}</Text>
            </TouchableOpacity>
            </View>
           <HorizontalCardList
           data={imageCarddata}
           />

           <Text style={{marginLeft:10,fontSize:theme.fontSizes.size_20,color:theme.lightColor.blackColor,fontWeight:'500'}}>{'About us'}</Text>
        
        
        <View style={{paddingBottom:100}}>
         <Text style={{padding:10,lineHeight:24}}>{"Cricket, often referred to as the gentleman’s game, is more than just a sport—it’s a passion that unites millions across the globe. A cricket blog serves as a sanctuary for fans who live and breathe the game, offering a blend of updates, analysis, and storytelling. From thrilling match reviews to heartwarming tales of perseverance, a well-crafted blog can capture the essence of cricket and connect fans worldwide.Imagine diving into an in-depth review of last night's nail-biting match, where every ball, boundary, and wicket is meticulously analyzed. Or exploring profiles of players who’ve risen against all odds to shine on the world stage. A cricket blog isn’t just about statistics; it’s about celebrating the spirit of the game, the drama on the pitch, and the stories that unfold behind the scenes.For die-hard enthusiasts, a blog can become a hub of knowledge, featuring historical recounts of iconic matches or a look at the evolution of cricketing techniques. Meanwhile, newer fans can find beginner-friendly guides explaining the nuances of the game, from the rules of an LBW decision to the art of spin bowling.Beyond the game itself, cricket blogs delve into the culture surrounding cricket. They highlight the camaraderie between fans, the passion of rivalries, and the moments that transcend sport to become part of history. Whether it’s a discussion on a controversial umpiring decision or a celebration of a new record, cricket blogs are where opinions spark lively debates and shared enthusiasm creates bonds.With engaging visuals, trivia-packed articles, and passionate storytelling, cricket blogs cater to everyone, from the casual watcher to the statistician at heart. They remind us why we love the game—the unpredictability, the excitement, and the sense of belonging to a global community of cricket lovers.A cricket blog isn’t just content; it’s an experience—a journey through the highs and lows, the triumphs and heartbreaks of a sport that continues to capture hearts across generations"}</Text>
           <View style={{height:theme.verticalSpacing.space_230}}>
            <Swiper
        style={style.wrapper}
        autoplay={true}
        autoplayTimeout={5}
        activeDotStyle={style.activeDot} 
        // dotStyle={style.dot} // Dot styling
        paginationStyle={style.pagination} 
      >
        {slides.map((slide, index) => (
          <View style={style.slide} key={index}>
            <Image style={style.image} source={slide.image} />
          </View>
        ))}
      </Swiper>
      </View>
         </View>
         
         
          </View>
        </ScrollView>
        // </BackgroundLayout>
    )
}
const style=StyleSheet.create({
    main:{
        flex:1
    },
    headerView:{
        height:105,
        backgroundColor:"#592951",
        // borderBottomLeftRadius:60,
        // borderBottomRightRadius:60,
        paddingHorizontal:30,
        justifyContent:'center'
      
    },
    wrapper: {
    // flex: 1,
    position: 'relative',
  },
searchView:{
width:theme.horizontalSpacing.space_328,height:40,
flexDirection:'row',
borderWidth:1,alignSelf:'center',
alignItems:"center",
paddingHorizontal:20,
marginTop:30,
borderRadius:10,
borderColor:theme.lightColor.whiteColor
    },
     slide: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 20,
  },
   image: {
    height: 230,
    width:'100%',
    resizeMode: 'cover',
    borderRadius: 10,
    // position: 'relative', 
  },
   dot: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
    position: 'absolute',
    bottom: 20, // Move the dots below the image
    zIndex: 100, // Ensure dots appear above other content
  },
  activeDot: {
    backgroundColor: '#000',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },

 pagination: {
    position: 'absolute',
    bottom: 10, // Adjust to position the dots inside the image area
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1, // Ensure the dots are above the image
  },


  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    sponsorText:{
        fontSize:theme.fontSizes.size_24,
        marginTop:theme.verticalSpacing.space_10,
        paddingHorizontal:20,
        fontWeight:'600',
        color:theme.lightColor.blackColor
    }
})
export default DashBoardScreen