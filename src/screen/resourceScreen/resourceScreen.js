import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from 'react-native';
import Video from 'react-native-video';

import * as Svg from '../../assets/images/svg';
import { theme } from '../../utils';
import { MainRoutes } from '../../navigation/routeAndParamsList';
import Header from '../../reusableComponent/header/header';
import { useGetAllBlogsQuery } from '../../redux/apiSlice/blogApiSlice';
import Loader from '../../reusableComponent/loader/loader';

const ResourceScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const [refreshing, setRefreshing] = useState(false);

  const {
    data: categoryApiData,
    isLoading: isCategoryDataLoading,
    isSuccess: isCategoryApiDataSuccess,
    refetch: refetchCategoryData,
  } = useGetAllBlogsQuery({});

  const {
    data: selectedCategoryApidata,
    isLoading: isSelectedCategoryApiLoading,
    refetch: selectedCategoryApiData,
  } = useGetAllBlogsQuery(
    selectedCategory && selectedCategory !== 'Recent Blogs'
      ? { category: selectedCategory }
      : {}
  );

  // Set default category once the data is available
  useEffect(() => {
    if (isCategoryApiDataSuccess && categoryApiData?.data?.length > 0) {
      setSelectedCategory('Recent Blogs');
    }
  }, [isCategoryApiDataSuccess, categoryApiData]);

  const uniqueCategories = [
    'Recent Blogs',
    ...new Set(categoryApiData?.data?.map((item) => item?.category)),
  ];

  const onRefresh = async () => {
    setRefreshing(true);
    await refetchCategoryData();
    setRefreshing(false);
  };

  const handleCategorySelect = (item) => {
    setSelectedCategory(item);
  };

  const renderMedia = (uri) => {
    if (!uri) return null;
    const isVideo = uri.match(/\.(mp4|mov|avi|mkv|webm)$/i);
    return isVideo ? (
      <Video
        source={{ uri }}
        style={styles.blogMedia}
        controls={false}
        resizeMode="cover"
        paused={true}
      />
    ) : (
      <Image source={{ uri }} style={styles.blogMedia} />
    );
  };

  const renderBlogItem = ({ item }) => (
    <TouchableOpacity
      style={styles.blogItem}
      onPress={() =>
        navigation.navigate(MainRoutes.BLOG_DETAILS_SCREEN, { id: item?._id })
      }
    >
      {renderMedia(item?.image)}
      <View style={styles.blogInfo}>
        <View style={styles.blogHeader}>
          <Text style={styles.blogTitle}>{item?.title}</Text>
          <Text style={styles.readTime}>{item?.readTime}</Text>
        </View>
        <View style={styles.blogDetails}>
          <Text style={styles.blogDescription}>{item?.shortDescription}</Text>
          <View style={styles.readMoreContainer}>
            <Text style={styles.readMoreText}>{'Read more'}</Text>
            <Svg.Arrow style={styles.arrowIcon} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.container}>
        <Loader isLoading={isCategoryDataLoading || isSelectedCategoryApiLoading} />
        <Header />
        <Text style={styles.header}>Blogs</Text>
        <View style={styles.categoryContainer}>
          <FlatList
            data={uniqueCategories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => `category-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleCategorySelect(item)}
                style={[
                  styles.categoryItem,
                  selectedCategory === item && styles.categoryItemSelected,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === item && styles.categoryTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <FlatList
          contentContainerStyle={styles.blogList}
          data={selectedCategoryApidata?.data}
          renderItem={renderBlogItem}
          keyExtractor={(item) => item?._id}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: theme.fontSizes.size_20,
    fontWeight: 'bold',
    marginHorizontal: theme.horizontalSpacing.space_20,
    marginTop: theme.verticalSpacing.space_20,
  },
  categoryContainer: {
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 1,
  },
  categoryItem: {
    marginTop: 10,
    paddingVertical: theme.verticalSpacing.space_10,
  },
  categoryItemSelected: {
    borderBottomWidth: 2,
    borderBottomColor: theme.lightColor.brownColor,
  },
  categoryText: {
    marginHorizontal: theme.horizontalSpacing.space_20,
    fontSize: theme.fontSizes.size_14,
    fontWeight: '500',
    color: 'black',
  },
  categoryTextSelected: {
    color: 'gray',
  },
  blogList: {
    paddingBottom: theme.verticalSpacing.space_100,
  },
  blogItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginHorizontal: theme.horizontalSpacing.space_20,
    alignItems: 'center',
    marginTop: theme.verticalSpacing.space_20,
    padding: theme.horizontalSpacing.space_10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  blogMedia: {
    width: theme.horizontalSpacing.space_50,
    height: theme.verticalSpacing.space_50,
    borderRadius: 8,
    marginRight: theme.horizontalSpacing.space_12,
  },
  blogInfo: {
    flex: 1,
  },
  blogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginLeft: theme.horizontalSpacing.space_10,
    paddingRight: theme.horizontalSpacing.space_20,
  },
  blogTitle: {
    fontSize: theme.fontSizes.size_16,
    fontWeight: 'bold',
  },
  readTime: {
    color: 'gray',
    fontSize: theme.fontSizes.size_12,
  },
  blogDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    marginLeft: theme.horizontalSpacing.space_10,
    paddingRight: theme.horizontalSpacing.space_20,
  },
  blogDescription: {
    fontSize: theme.fontSizes.size_16,
    width: theme.horizontalSpacing.space_187,
    color: theme.lightColor.blackColor,
  },
  readMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMoreText: {
    color: theme.lightColor.borderColor,
    fontSize: theme.fontSizes.size_12,
  },
  arrowIcon: {
    marginLeft: theme.horizontalSpacing.space_10,
  },
});

export default ResourceScreen;
