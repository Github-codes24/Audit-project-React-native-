import React,{useState,useEffect,useRef} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView,Share,AppState, useWindowDimensions } from 'react-native';
import Video from 'react-native-video'; 
import YoutubePlayer from 'react-native-youtube-iframe'; 
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
import he from 'he';
import { useIsFocused } from '@react-navigation/native';


const BlogDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { id } = route?.params;
  const [selectedBlogId, setSelectedBlogId] = React.useState(id);
  const [paused, setPaused] = useState(true)
 const isFocused = useIsFocused();
 const scrollViewRef = useRef(null);
   const { width } = useWindowDimensions();


  console.log('id436475',id)
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

  // ✅ Check if the URL is a video file
  const isVideoFile = (url) => /\.(mp4|mkv|mov|avi|webm)$/i.test(url);
  const videoUrl = image?.length > 0 && isVideoFile(image[0]) ? image[0] : null;
  
  
  // ✅ Check if `addLink` is a YouTube link
  
  const isYouTubeLink = (url) => /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(url);
  const getYouTubeId = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

 const isVimeoLink = (url) => /^(https?:\/\/)?(www\.)?vimeo\.com/.test(url);
const isVideoLink = (url) => /\.(mp4|mov|mkv|webm|avi|flv)$/i.test(url);


  const handleNavigation = (direction) => {
    if (!blogApiData || !Array.isArray(blogApiData.data)) return;
    const blogs = blogApiData.data;
    const currentIndex = blogs.findIndex((item) => item._id === selectedBlogId);
    if (direction === 'next' && currentIndex < blogs.length - 1) {
      setSelectedBlogId(blogs[currentIndex + 1]._id);
    } else if (direction === 'previous' && currentIndex > 0) {
      setSelectedBlogId(blogs[currentIndex - 1]._id);
    }

  if (scrollViewRef.current) {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  }


  };

  const handleShare = async () => {
    try {
      const cleanTitle = he.decode(title); 
      const cleanDescription = description.replace(/<[^>]+>/g, ''); 
      const shareMessage = `${cleanTitle}\n\n${cleanDescription}\n\nRead more: ${addLink || 'Check out this blog!'}`;

      await Share.share({
        message: shareMessage,
        title: cleanTitle,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
 
 useEffect(() => {
    if (!isFocused) {
      setPaused(true); 
    }
  }, [isFocused]);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        setPaused(true); 
      }
    };

    const appStateListener = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      appStateListener.remove();
    };
  }, []);




 const isHTML = /<\/?[a-z][\s\S]*>/i.test(description);
  
  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:'#FFF' }}>
      <Loader isLoading={blogDetailsIsLoading || isBlogApiDataLoading} />
      <ScrollView
      ref={scrollViewRef}
      >
        <Header />
        <View style={styles.detailsContainer}>
          <View style={{ position: 'relative' }}>
     {isYouTubeLink(addLink) ? (
  <YoutubePlayer height={220} play={false} videoId={getYouTubeId(addLink)} />
   ) : isVimeoLink(addLink) ? (
        <WebView
          source={{ uri: getVimeoEmbedUrl(addLink) }}
          style={{ flex: 1 }}
        />
      ) : isVideoLink(addLink) ? (
        <Video
          source={{ uri: addLink }}
          style={{ width: "100%", height: 220 }}
          controls
          resizeMode="contain"
        />
      ):
image && isVideoFile(image) ? (
  <Video
    source={{ uri: image }}
    style={styles.video}
    controls
    resizeMode="contain"
    ignoreSilentSwitch="ignore"
    paused={paused}
  />
) : image && (Array.isArray(image) || !isVideoFile(image)) ? (
  <View style={{}}>
  <ImageSwiper 
      imageStyle={{  }}
    images={Array.isArray(image) ? image : [image]} 
    showNavigation={Array.isArray(image) && image.length > 1} 
  />
  </View>
) : (
  <Text style={styles.noMediaText}>Oops🥺 No media available for this blog.</Text>
)}

            {/* <View style={styles.categoryContainer}>
              <Text style={styles.categoryText}>{category}</Text>
            </View> */}

            <TouchableOpacity style={styles.svgIconContainer} onPress={handleShare}>
              <Svg.ShareIcon />
            </TouchableOpacity>
          </View>

          <View style={{ paddingHorizontal: 19,
           }}>
            <Text style={styles.detailsTitle}>{title}</Text>
            <View style={[styles.authorContainer, { flexDirection: "row", justifyContent:"space-between" }]}>
              <View style={{ flexDirection: "row" }}>
                <Image style={styles.authorImage} source={{ uri: authorImage }} />
                <View style={styles.authorTextContainer}>
                  <Text style={styles.detailsAuthor}>{authorName || ''}</Text>
                  <Text style={{ color: 'gray' }}>
                    {moment(createdAt, moment.ISO_8601, true).isValid() ? moment(createdAt).format('DD MMMM, YYYY') : ''}
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate(MainRoutes.RESOURCE_SCREEN,{blogType:category})}>
              <Text style={{ textAlign: 'right', color: 'gray',padding:5,borderRadius:5,color:'black',textDecorationLine:'underline' }}>{category}</Text>
             </TouchableOpacity>
           
            </View>
             <View style={{marginTop:theme.verticalSpacing.space_14}}>
          {isHTML ? (
        <RenderHTML 
        contentWidth={width}
          source={{ html: description }}
           baseStyle={{
    fontSize:theme.fontSizes.size_16, 
    lineHeight:20, 
    fontWeight: '500',
    // marginVertical:5,
  }}/>
      ) : (
        <Text style={{
          marginVertical:8,
          lineHeight: 20,
          fontSize: theme.fontSizes.size_14,
          fontWeight: '400',
          
        }}> 
          {description}
        </Text>
      )}
            </View>
          </View>

          <View style={styles.navigationButtons}>
            {/* <TouchableOpacity style={styles.backButton} onPress={() => handleNavigation('previous')}>
              <Svg.ArrowLeftDown />
              <Text style={[styles.buttonText,{marginLeft:5}]}>Previous</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate(MainRoutes.RESOURCE_SCREEN)}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={() => handleNavigation('next')}>
              <Text style={[styles.buttonText, { marginRight: 5 }]}>Next post</Text>
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
    borderRadius: 8,
    backgroundColor:'#FFF',

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
    marginLeft: 5,
  },
  detailsTitle: {
    fontSize: theme.fontSizes.size_22,
    fontWeight: '700',
    // marginBottom: 8,
    marginTop: theme.verticalSpacing.space_20,
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
    marginTop: theme.verticalSpacing.space_20,
  },
  authorImage: {
    width:theme.horizontalSpacing.space_50,
    height:theme.verticalSpacing.space_54,
    borderRadius:theme.horizontalSpacing.space_24,
  },
  authorTextContainer: {
    marginLeft: 10,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal:19,
    marginVertical:theme.verticalSpacing.space_20
  },
  backButton: {
    backgroundColor: theme.lightColor.brownColor,
    paddingVertical: theme.verticalSpacing.space_16,
    width: theme.horizontalSpacing.space_110,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom:theme.verticalSpacing.space_100
  },
  svgIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    borderRadius: 12,
    padding: 5,
  },
  noMediaText: {
  fontSize: theme.fontSizes.size_16,
  color: 'black',
  textAlign: 'center',
  marginVertical: theme.verticalSpacing.space_50,
 
},


});



export default BlogDetailsScreen;
