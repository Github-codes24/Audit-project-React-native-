import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Video from 'react-native-video'; // ✅ Import Video component
import YoutubePlayer from 'react-native-youtube-iframe'; // ✅ For YouTube links
import { useGetAllBlogsQuery, useGetblogsByIdQuery } from '../../redux/apiSlice/blogApiSlice';
import { useNavigation } from '@react-navigation/native';
import * as Svg from '../../assets/images/svg';
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

  // Fetch blog data
  const { data: blogApiData, isLoading: isBlogApiDataLoading } = useGetAllBlogsQuery({});
  const { data: getBlogDetailsData, isLoading: blogDetailsIsLoading } = useGetblogsByIdQuery({ id: selectedBlogId });

  const { blog = {} } = getBlogDetailsData || {};
  const {
    image = [],
    category = '',
    title = '',
    description = '',
    authorImage = '',
    authorName = '',
    createdAt = '',
    readTime = '',
    addLink = '', 
  } = blog || {};

  // ✅ Check if `addLink` is a valid YouTube or video file link
  const isYouTubeLink = (url) => /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(url);
  const getYouTubeId = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };
  const isVideoFile = (url) => /\.(mp4|mkv|mov|avi|webm)$/i.test(url);

  const handleNavigation = (direction) => {
    if (!blogApiData || !Array.isArray(blogApiData.data)) return;
    const blogs = blogApiData.data;
    const currentIndex = blogs.findIndex((item) => item._id === selectedBlogId);
    if (direction === 'next' && currentIndex < blogs.length - 1) {
      setSelectedBlogId(blogs[currentIndex + 1]._id);
    } else if (direction === 'previous' && currentIndex > 0) {
      setSelectedBlogId(blogs[currentIndex - 1]._id);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Loader isLoading={blogDetailsIsLoading || isBlogApiDataLoading} />
      <ScrollView>
        <Header />
        <View style={styles.detailsContainer}>
          <View style={{ position: 'relative' }}>
            {/* ✅ Show Video if Valid, Otherwise Show Image */}
            {isYouTubeLink(addLink) ? (
              <YoutubePlayer
                height={220}
                play={false}
                videoId={getYouTubeId(addLink)}
              />
            ) : isVideoFile(addLink) ? (
              <Video
                source={{ uri: addLink }}
                style={styles.video}
                controls
                resizeMode="contain"
              />
            ) : image?.length > 0 ? (
              <ImageSwiper images={Array.isArray(image) ? image : [image]} showNavigation={true} />
            ) : null}

            <View style={styles.categoryContainer}>
              <Text style={styles.categoryText}>{category}</Text>
            </View>

            <TouchableOpacity style={styles.svgIconContainer} onPress={() => console.log('SVG Icon Pressed')}>
              <Svg.ShareIcon />
            </TouchableOpacity>
          </View>

          <View style={{ paddingHorizontal: 19 }}>
            <Text style={styles.detailsTitle}>{title}</Text>
            <View style={[styles.authorContainer, { flexDirection: "row",justifyContent:"space-between"  }]}>
              <View style={{ flexDirection: "row", }}>
                <Image style={styles.authorImage} source={{ uri: authorImage }} />
                <View style={styles.authorTextContainer}>
                  <Text style={styles.detailsAuthor}>{authorName || ''}</Text>
                  <Text style={{ color: 'gray' }}>
                    {moment(createdAt, moment.ISO_8601, true).isValid() ? moment(createdAt).format('DD MMMM, YYYY') : ''}
                  </Text>
                </View>
              </View>
              <Text style={{ textAlign: 'right', color: 'gray' }}>{readTime}</Text>
            </View>
            <RenderHTML source={{ html: description }} />
          </View>

          <View style={styles.navigationButtons}>
            <TouchableOpacity style={styles.backButton} onPress={() => handleNavigation('previous')}>
              <Svg.ArrowLeftDown />
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate(MainRoutes.RESOURCE_SCREEN)}>
              <Text style={styles.buttonText}>Recent Blogs</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={() => handleNavigation('next')}>
              <Text style={styles.buttonText}>Next</Text>
              <Svg.ArrowRight />
            </TouchableOpacity>
          </View>
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
  video: {
    width: '100%',
    height: 220,
    backgroundColor: 'black',
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
  categoryContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FFF9F0',
    paddingHorizontal: 10,
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
    
    
  },
  authorImage: {
    width: 37,
    height: 37,
    borderRadius: 20,
  },
  authorTextContainer: {
    marginLeft: 10,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 19,
  },
  backButton: {
    backgroundColor: theme.lightColor.brownColor,
    paddingVertical: theme.verticalSpacing.space_16,
    width: theme.horizontalSpacing.space_110,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
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
