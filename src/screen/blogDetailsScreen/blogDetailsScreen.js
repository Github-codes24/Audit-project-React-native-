import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { theme } from '../../utils';
import { useGetblogsByIdQuery } from '../../redux/apiSlice/blogApiSlice';
import ImageSwiper from '../../reusableComponent/ImageSlider/imageSwiper';
import Header from '../../reusableComponent/header/header';
import { useNavigation } from '@react-navigation/native';
import * as Svg from '../../asstets/images/svg';

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
        <View style={styles.authorContainer}>
          <Image style={styles.authorImage} source={{ uri: item?.authorImage }} />
          <View style={styles.authorTextContainer}>
            <Text style={styles.detailsAuthor}>{item?.authorName || ''}</Text>
            <Text style={styles.detailsDate}>{item?.createdAt}</Text>
          </View>
        </View>
        <Text style={styles.detailsContent}>{item?.description || ''}</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back to Blogs</Text>
        </TouchableOpacity>
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
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingLeft: 10,
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
    textAlign: 'justify',
    marginBottom: 20,
    paddingHorizontal: 15,
    lineHeight: 26,
    color: '#333',
  },
  authorContainer: {
    flexDirection: 'row',
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
    marginLeft: 15,
  },
  backButton: {
    backgroundColor: '#673AB7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  backButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default BlogDetailsScreen;
