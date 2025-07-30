import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import ImageSwiper from '../../reusableComponent/ImageSlider/imageSwiper';
import Header from '../../reusableComponent/header/header';
import * as Svg from '../../assets/images/svg';
import moment from 'moment';
import { theme } from '../../utils';
import { useGetblogsByIdQuery } from '../../redux/apiSlice/blogApiSlice';

const NotificationDetailsScreen = ({ route }) => {


  const { id } = route?.params || {};

  const [selectedBlogId, setSelectedBlogId] = useState(id);


    
  console.log('id567687',id)
  
const { data: getBlogDetailsData, isLoading: blogDetailsIsLoading, error } = useGetblogsByIdQuery({ id })

   console.log('getBlogDetailsData3465757',getBlogDetailsData)
   
   
   const item = getBlogDetailsData?.data;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Header />
        <View style={styles.detailsContainer}>
          <View style={{ position: 'relative' }}>
            {item?.image?.length > 0 && (
              <ImageSwiper
                images={Array.isArray(item?.image) ? item?.image : [item?.image]}
                // showNavigation={true}
                // imageStyle={{
                //   width:'100%',
                //   height:400,
                //   resizeMode: 'contain', 
                //   backgroundColor:"pink"
                // }}
                // containerStyle={{height:theme.verticalSpacing.space_388}}
              />
            )}

            {/* <TouchableOpacity style={styles.svgIconContainer} onPress={() => console.log('SVG Icon Pressed')}>
              <Svg.ShareIcon />
            </TouchableOpacity> */}
          </View>

          <ScrollView style={{ flex: 1, marginBottom:100 }}>
            <View style={{ paddingHorizontal: 19 }}>
              <Text style={styles.detailsTitle}>{item?.title || ''}</Text>
            </View>

            <Text style={styles.detailsContent}>{item?.description || ''}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 19 }}>
              {/* Add navigation buttons here if needed */}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    // backgroundColor: 'red',
    borderRadius: 8,
  },
  detailsTitle: {
    fontSize:theme.fontSizes.size_20,
    fontWeight: '700',
    
    marginTop:theme.verticalSpacing.space_10,
  },
  detailsContent: {
    marginTop: 10,
    fontSize:theme.fontSizes.size_16,
    textAlign: 'justify',
    marginBottom: 20,
    paddingHorizontal: 19,
    lineHeight: 20,
    color: 'black',
    fontWeight: '400',
  },
  svgIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    borderRadius: 12,
    padding: 5,
  },
});

export default NotificationDetailsScreen;
