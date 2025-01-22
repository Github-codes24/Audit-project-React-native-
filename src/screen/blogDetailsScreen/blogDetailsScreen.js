
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { theme } from '../../utils';
import { useGetblogsByIdQuery } from '../../redux/apiSlice/blogApiSlice';
import ImageSwiper from '../../reusableComponent/ImageSlider/imageSwiper';
import Header from '../../reusableComponent/header/header';
import { useNavigation } from '@react-navigation/native';

const BlogDetailsScreen = ({route}) => {
    const navigation = useNavigation();
const { id } = route.params;
console.log('id53554367',id)

 const { 
    data: getBlogDetailsdata, 
    error: getCategoryDetailsApiError, 
    isLoading: getCategoryDetailsApiIsLoading 
  } = useGetblogsByIdQuery({id}); 

  console.log('getBlogDetailsdata',getBlogDetailsdata)

 const renderBlogItem = ({ item }) => (
     console.log('Blog Item:', item),
    <View style={styles.detailsContainer}>
     {item?.image?.length > 0 && (
  <ImageSwiper
    images={Array.isArray(item?.image) ? item?.image : [item?.image]}
  />
)}

      {/* <Image
        source={{ uri: item?.image || '' }} 
        style={styles.detailsImage}
      /> */}

      <ScrollView style={{ flex: 1, marginBottom: 100 }}>
        <Text style={styles.detailsTitle}>{item?.title}</Text>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderWidth: 0.3,
              borderRadius: 20,
              marginLeft: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              style={{ width: 40, height: 40 }}
              source={require('../../asstets/images/manImage.png')}
            />
          </View>
          <View style={{ marginLeft: 15 }}>
            {/* <Text style={styles.detailsAuthor}> -{item.author || ''}</Text> */}
            <Text style={styles.detailsDate}>{item?.createdAt}</Text>
          </View>
        </View>
        <Text style={styles.detailsContent}>{item?.description || ''}</Text>
        <TouchableOpacity
          style={styles.backButton}
         onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back to Blogs</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  return (
    <View style={{}}>
        <Header/>
    <FlatList
      data={[getBlogDetailsdata?.blog]}  
      renderItem={renderBlogItem}  
    //   keyExtractor={(item) => item._id.toString()}  
    />
    </View>
  )
};
  
const styles = StyleSheet.create({
  container: {
   flex:1,
    backgroundColor: '#F5F5F5',
  },
  headerView:{
        height:105,
        backgroundColor:"#592951",
        // borderBottomLeftRadius:60,
        // borderBottomRightRadius:60,
        paddingHorizontal:30,
        justifyContent:'center'
      
    },
  header: {
    fontSize:theme.fontSizes.size_20,
    fontWeight: 'bold',
    // marginBottom: 16,
    padding:10
  },
  blogItem: {
    flex:1,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingHorizontal:10,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // elevation: 2,
    marginHorizontal:theme.horizontalSpacing.space_10,
    alignItems:"center",
    // justifyContent:"center",
    padding:theme.horizontalSpacing.space_10,
    marginTop:theme.verticalSpacing.space_10
    // marginBottom:100
  },
  blogImage: {
    width:theme.horizontalSpacing.space_50,
    height:theme.verticalSpacing.space_50,
    borderRadius: 8,
    marginRight:theme.horizontalSpacing.space_12,
  },
  blogInfo: {
    justifyContent: 'center',
  },
  blogTitle: {
    fontSize:theme.fontSizes.size_16,
    fontWeight: 'bold',
  },
  blogAuthor: {
    fontSize:theme.fontSizes.size_14,
    color:theme.lightColor.blackColor,
  },
  blogDiscription: {
    fontSize:theme.fontSizes.size_14,
    color:theme.lightColor.blackColor,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  detailsImage: {
    width: '100%',
    height: 200,   
    marginBottom: 16,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingLeft:10
  },
  detailsAuthor: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  detailsDate: {
    fontSize: 14,
    color: '#AAA',
    marginBottom: 16,
  },
  detailsContent: {
    fontSize: 16,
    textAlign: 'justify', // Makes the text evenly aligned on both sides
    marginBottom: 20,
    paddingHorizontal: 15, // Adds some padding for better readability
    lineHeight: 26, // Increases space between lines for clarity
    color: '#333', // Optional: Adjusts text color for better contrast
},
  backButton: {
    backgroundColor: '#673AB7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems:'center',
    justifyContent:"center",
    marginHorizontal:20
  },
  backButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

  export default BlogDetailsScreen;