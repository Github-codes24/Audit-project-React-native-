import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { theme } from '../../utils';
import { useGetblogsByIdQuery } from '../../redux/apiSlice/blogApiSlice';
import ImageSwiper from '../../reusableComponent/ImageSlider/imageSwiper';
import Header from '../../reusableComponent/header/header';
import { useNavigation } from '@react-navigation/native';
import * as Svg from '../../asstets/images/svg';
import moment from 'moment';

const BlogDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { id } = route.params;

  const { data: getBlogDetailsdata, error: getCategoryDetailsApiError, isLoading: getCategoryDetailsApiIsLoading } = useGetblogsByIdQuery({ id });

  const renderBlogItem = ({ item }) => (
    <View style={styles.detailsContainer}>
      <View style={{ position: 'relative' }}>
        {item?.image?.length > 0 && (
          <ImageSwiper
            images={Array.isArray(item?.image) ? item?.image : [item?.image]}
            showNavigation={true} 
          />
        )}

        <View style={styles.categoryContainer}>
          <Text style={styles.categoryText}>{item?.category}</Text>
        </View>

        <TouchableOpacity style={styles.svgIconContainer} onPress={() => console.log('SVG Icon Pressed')}>
          <Svg.ShareIcon />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1, marginBottom: 100 }}>
        <Text style={styles.detailsTitle}>{item?.title}</Text>
        <View style={[styles.authorContainer,{marginTop:theme.verticalSpacing.space_10}]}>
          <Image style={styles.authorImage} source={{ uri: item?.authorImage }} />
          <View style={[styles.authorTextContainer,{marginLeft:10}]}>
            <Text style={styles.detailsAuthor}>{item?.authorName || ''}</Text>
            <Text style={{color:"gray"}}>{moment(item?.createdAt).format(' DD MMMM, YYYY')}</Text> 
          </View>
           {/* <Text style={{}}>{'5 min'}</Text> */}
        </View>
        <Text style={styles.detailsContent}>{item?.description || ''}</Text>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
        <TouchableOpacity style={[styles.backButton,{flexDirection:'row'}]} onPress={() => navigation.goBack()}>
       <View style={{marginRight:8}}>
        <Svg.ArrowLeftDown/>
        </View>
          <Text style={styles.buttonText}>{'Previous'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton}>
        <Text style={styles.buttonText}>{'Blog deatails'}</Text>
        </TouchableOpacity>

     <TouchableOpacity style={[styles.backButton,{flexDirection:'row'}]}>
   <Text style={styles.buttonText}>{'Next'}</Text>
   <View style={{marginLeft:8}}>
      <Svg.ArrowRight/>
     </View>
     </TouchableOpacity>


        </View>
      </ScrollView>
    </View>
  );

  return (
    <View style={{}}>
      <Header />
      <FlatList data={[getBlogDetailsdata?.blog]} renderItem={renderBlogItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  svgIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    borderRadius: 12,
    padding: 5,
  },
  categoryContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FFF9F0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  categoryText: {
    color: '#592951',
    fontSize: theme.fontSizes.size_16,
    fontWeight: '600',
  },
  headerView: {
    height: 105,
    backgroundColor: '#592951',
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  header: {
    fontSize: theme.fontSizes.size_20,
    fontWeight: 'bold',
    padding: 10,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  buttonText:{
 fontSize:theme.fontSizes.size_16,
 fontWeight:'500',
 color:'white'
  },
  detailsTitle: {
    fontSize:theme.fontSizes.size_20,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingLeft: 10,
    marginTop:theme.verticalSpacing.space_10
  },
  detailsAuthor: {
    fontSize: 16,
    color:theme.lightColor.blackColor,
    marginBottom: 4,
  },
  detailsDate: {
    fontSize: 14,
    color: '#AAA',
    marginBottom: 16,
  },
  detailsContent: {
    marginTop:theme.verticalSpacing.space_10,
    fontSize:theme.fontSizes.size_16,
    textAlign: 'justify',
    marginBottom: 20,
    paddingHorizontal: 15,
    lineHeight: 26,
    color: '#333',
  },
  authorContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between', 
    alignItems: 'center', 
    // padding: 10,
  },
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authorTextContainer: {
    // marginLeft: 15,
  },
  backButton: {
    backgroundColor: theme.lightColor.brownColor,
    paddingVertical:theme.verticalSpacing.space_16,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  
    marginHorizontal:theme.horizontalSpacing.space_10,
  },
  backButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default BlogDetailsScreen;
