import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useGetAllBlogsQuery, useGetblogsByIdQuery } from '../../redux/apiSlice/blogApiSlice';
import { useNavigation } from '@react-navigation/native';
import * as Svg from '../../asstets/images/svg';
import moment from 'moment';
import Loader from '../../reusableComponent/loader/loader';
import ImageSwiper from '../../reusableComponent/ImageSlider/imageSwiper';
import Header from '../../reusableComponent/header/header';
import { theme } from '../../utils';
import { MainRoutes } from '../../navigation/routeAndParamsList';
import RenderHTML from 'react-native-render-html';


const BlogDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { id } = route?.params; 

  const [selectedBlogId, setSelectedBlogId] = React.useState(id);

  // Fetching all blogs for navigation
  const {
    data: blogApiData,
    isLoading: isBlogApiDataLoading,
    isSuccess: isBlogApiDataSuccess,
    error: blogApiDataError,
  } = useGetAllBlogsQuery({});

  // Fetching details of the selected blog
  const {
    data: getBlogDetailsData,
    error: blogDetailsError,
    isLoading: blogDetailsIsLoading,
    isFetching: blogDetailsIsFetching
  } = useGetblogsByIdQuery({ id: selectedBlogId });

  const { blog = {} } = getBlogDetailsData || {};

  const {
    image = [],
    category = '',
    title = '',
    description = '',
    shortDescription = '',
    content = '',
    authorImage = '',
    authorName = '',
    createdAt = '',
    readTime=''
  } = blog || {};


 const isHtml = /<[^>]+>/g.test(description)
const htmlStyles = {
    p: {
      marginTop: theme.verticalSpacing.space_10,
      fontSize: theme.fontSizes.size_16,
      textAlign: 'justify',
      marginBottom:theme.verticalSpacing.space_20,
      paddingHorizontal: 19,
      lineHeight: 20,
      color: 'black',
      fontWeight: '400',
    },
  };


  const handleNavigation = (direction) => {
    if (!blogApiData || !Array.isArray(blogApiData.data)) return;
    const blogs = blogApiData.data; 
    const currentIndex = blogs.findIndex((item) => item._id === selectedBlogId);
    if (direction === 'next' && currentIndex < blogs.length - 1) {
      // Navigate to the next blog
      setSelectedBlogId(blogs[currentIndex + 1]._id);
    } else if (direction === 'previous' && currentIndex > 0) {
      // Navigate to the previous blog
      setSelectedBlogId(blogs[currentIndex - 1]._id);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Loader isLoading={blogDetailsIsLoading || isBlogApiDataLoading||blogDetailsIsFetching} />
      <ScrollView>
        <Header />
        <View style={styles.detailsContainer}>
          <View style={{ position: 'relative' }}>
            {image?.length > 0 && (
              <ImageSwiper images={Array.isArray(image) ? image : [image]} showNavigation={true} />
            )}

            <View style={styles.categoryContainer}>
              <Text style={styles.categoryText}>{category}</Text>
            </View>

            <TouchableOpacity style={styles.svgIconContainer} onPress={() => console.log('SVG Icon Pressed')}>
              <Svg.ShareIcon />
            </TouchableOpacity>
          </View>

          <ScrollView style={{ flex: 1, marginBottom: 100 }}>
            <View style={{paddingHorizontal:19}}>
            <Text style={styles.detailsTitle}>{title}</Text>
            </View>
            
            <View style={[styles.authorContainer, { marginTop: theme.verticalSpacing.space_10,flexDirection:"row",justifyContent:'space-between', }]}>
              
              <View style={{flexDirection:"row",}}>
              <Image style={styles.authorImage} source={{ uri: authorImage }} />
              <View style={[styles.authorTextContainer, {  }]}>
                <Text style={styles.detailsAuthor}>{authorName || ''}</Text>
               <Text style={{ color: 'gray' }}>
          {moment(createdAt, moment.ISO_8601, true).isValid() ? moment(createdAt).format('DD MMMM, YYYY') : ''}
              </Text>
                </View>
              </View>
                  <Text style={{textAlign:'right',color:'gray'}}>{readTime}</Text>
            </View>
         
             {isHtml ? (
            <RenderHTML  source={{ html: description }} tagsStyles={htmlStyles}/>
          ) : (
         
            <Text style={styles.description}>{description}</Text>
          )}

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',marginHorizontal:19 }}>
              <TouchableOpacity
                style={[styles.backButton, { flexDirection: 'row' }]}
                onPress={() => handleNavigation('previous')}
              >
                <View style={{ marginRight: 8 }}>
                  <Svg.ArrowLeftDown />
                </View>

               
                <Text style={styles.buttonText}>Previous</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.backButton}
              onPress={() => navigation.navigate(MainRoutes.RESOURCE_SCREEN)}
              >
                <Text style={styles.buttonText}>Recent Blogs</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.backButton, { flexDirection: 'row' }]}
                onPress={() => handleNavigation('next')}
              >
                <Text style={styles.buttonText}>Next</Text>
               
                <View style={{ marginLeft: 8 }}>
                  <Svg.ArrowRight />
                </View>
              </TouchableOpacity>
             
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
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: theme.fontSizes.size_16,
    fontWeight: '500',
    color: 'white',
  },
  detailsTitle: {
    fontSize: theme.fontSizes.size_20,
    fontWeight: '700',
    marginBottom: 8,
    
    marginTop: theme.verticalSpacing.space_10,
  },
  description: {
    marginTop: theme.verticalSpacing.space_10,
    fontSize: theme.fontSizes.size_16,
    textAlign: 'justify',
    marginBottom:theme.verticalSpacing.space_20,
    paddingHorizontal:19,
    lineHeight: 20,
    color: 'black',
    fontWeight:'400'
 
  },
  backButton: {
    backgroundColor: theme.lightColor.brownColor,
    paddingVertical: theme.verticalSpacing.space_16,
     width:theme.horizontalSpacing.space_110,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal: theme.horizontalSpacing.space_10,
  },
  categoryContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FFF9F0',
    paddingHorizontal: 10,
    // paddingVertical: 5,
    borderRadius: 8,
  },
  categoryText: {
    color: '#592951',
    fontSize: theme.fontSizes.size_16,
    fontWeight: '600',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor:"red",
    marginHorizontal:19
  },
  authorImage: {
    width:37,
    height:37,
    borderRadius: 20,
    
  },
  authorTextContainer: {
    marginLeft: 10,
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

export default BlogDetailsScreen;
