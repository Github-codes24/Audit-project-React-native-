import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useSelector, UseSelector } from "react-redux";
import { useGetAboutUsApiQuery } from "../../redux/apiSlice/profileApiSlice";
import Swiper from "react-native-swiper";
import { theme } from "../../utils";
import Loader from "../../reusableComponent/loader/loader";

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

const AboutUsScree=()=>{

const { 
    data: getAboutdata, 
    error: getAboutApiError, 
    isLoading: getGetAboutApiIsLoading 
  } = useGetAboutUsApiQuery({}); 

console.log('getAboutdata',getAboutdata)

return(
    <View style={{flex:1}}>
      <Loader isLoading={getGetAboutApiIsLoading} />
        <Text style={{fontWeight:'700',fontSize:theme.fontSizes.size_20,margin:theme.verticalSpacing.space_16}}>{'About us'}</Text>
         <View style={{height:theme.verticalSpacing.space_230,marginHorizontal:10}}>
                <Swiper   
                style={style.wrapper}
                autoplay={true}
                autoplayTimeout={5}
                activeDotStyle={style.activeDot} 
                // dotStyle={style.dot} // Dot styling
                paginationStyle={style.pagination} 
              >
                {getAboutdata?.aboutUs[0]?.image?.length > 0 ? (
  getAboutdata.aboutUs[0].image.map((slide, index) => (
    <View style={style.slide} key={index}>
      <Image style={style.image} source={{ uri: slide }} />
    </View>
  ))
) : (
  <Text>No images available</Text>
)}
              </Swiper>
              </View>
        <Text style={{margin:theme.horizontalSpacing.space_10}}>{getAboutdata?.aboutUs[0].content}</Text>
    </View>
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
// paddingHorizontal:20,
marginTop:30,
borderRadius:10,
borderColor:theme.lightColor.whiteColor
    },
     slide: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // padding:10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 20,
  },
   image: {
    
    height:theme.verticalSpacing.space_320,
    width:'100%',
    resizeMode: 'cover',
    borderRadius: 10,
    // position: 'relative', 
  },
   dot: {
    backgroundColor: 'white',
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
    // borderRadius: 4,
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
export default AboutUsScree