import React from "react";
import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import BackgroundLayout from "../../reusableComponent/backgroundLayout/backgroundLayout";
import { theme } from "../../utils";
import * as Svg from '../../asstets/images/svg'
import LicenseCard from "../../utils/licenceCard";
import ImageCard from "../../utils/imageCard";
import HorizontalCardList from "../../utils/imageCardList";
import { imageCarddata } from "../../utils/imageCardData";
const DashBoardScreen=()=>{
    return(
        // <BackgroundLayout>
        <View style={style.main}>
            <StatusBar backgroundColor={'#592951'}/>
            <View style={style.headerView}>

           <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20,alignItems:'center'}}>
            <View style={{flexDirection:"row"}}>
           <View style={{width:60,height:60,borderWidth:1,borderRadius:30,alignItems:"center",justifyContent:"center"}}>
            <Image
            style={{width:60,height:60}}
            source={require('../../asstets/images/manImage.png')}
            />
           </View>
           <View style={{marginLeft:20}}>
            <Text style={{color:theme.lightColor.whiteColor}}>Hello, Welcome 🎉</Text>
            <Text style={{color:theme.lightColor.whiteColor,fontSize:theme.fontSizes.size_24}}>{'NAYAN Moudekar'}</Text>
           </View>
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
        </View>
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
    sponsorText:{
        fontSize:theme.fontSizes.size_24,
        marginTop:theme.verticalSpacing.space_10,
        paddingHorizontal:20,
        fontWeight:'600',
        color:theme.lightColor.blackColor
    }
})
export default DashBoardScreen