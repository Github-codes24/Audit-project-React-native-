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

import * as Svg from '../../asstets/images/svg'
import { theme } from '../../utils';
import { MainRoutes } from '../../navigation/routeAndParamsList';
import Header from '../../reusableComponent/header/header';
import { useSelector,useDispatch } from 'react-redux';
import { useGetAllBlogsQuery } from '../../redux/apiSlice/blogApiSlice';
import Loader from '../../reusableComponent/loader/loader';


const ResourceScreen=({navigation})=>{
const [selectedBlog, setSelectedBlog] = useState(null);
 const [selectedCategory, setSelectedCategory] = useState('');

const [refreshing, setRefreshing] = useState(false);

//  console.log(selectedCategory)

useEffect(() => {
    if (isCategoryApiDataSuccess && categoryApiData?.data?.length > 0) {
      setSelectedCategory(categoryApiData?.data?.[0]?.category); 
    }
  }, [isCategoryApiDataSuccess]);


const {
  data: categoryApiData,
  isLoading: isCategoryDataLoading,
  isSuccess:isCategoryApiDataSuccess,
  error: isCategoryDataError,
  refetch: refetchCategoryData,
} = useGetAllBlogsQuery({});

const {
  data: selectedCategoryApidata,
  isLoading: isSelectedCategoryApiLoading,
  error: SelectedCategoryApiError,
  refetch: selectedCategoryApiData,
} = useGetAllBlogsQuery({category:selectedCategory});


console.log('categoryApiData',categoryApiData)

const uniqueCategories = categoryApiData?.data
  .map((item) => item?.category) 
  .filter((category, index, self) => self.indexOf(category) === index); 

// console.log('uniqueCategories',uniqueCategories);

const onRefresh = async () => {
    setRefreshing(true); 
    refetchCategoryData();
    setRefreshing(false); 
  };

const handleCategorySelect = (item) => {
  console.log('item',item)
    setSelectedCategory(item);
  };

  const renderBlogItem = ({ item }) => (
    <ScrollView
    style={{flex:1}}
      refreshControl={
       <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
       }
    >
    <TouchableOpacity
      style={styles.blogItem}
      onPress={() => {
        // console.log('idrrrrr',item?._id)
      navigation.navigate(MainRoutes.BLOG_DETAILS_SCREEN, {id: item?._id });
    }}
    >
      <Image source={{uri:item?.image}} style={styles.blogImage} />
      <View style={styles.blogInfo}>
        <View style={{flexDirection:'row',justifyContent:'space-between',width:'85%',marginLeft:theme.horizontalSpacing.space_10,paddingRight:theme.horizontalSpacing.space_20}}>
        <Text style={styles.blogTitle}>{item?.title}</Text>
        <Text style={{color:'gray',fontSize:theme.fontSizes.size_12}}>{item?.readTime}</Text>
        </View>
        <View style={{flexDirection:"row",justifyContent:"space-between",width:'95%',marginLeft:theme.horizontalSpacing.space_10,paddingRight:theme.horizontalSpacing.space_20}}>
            <View>
        {/* <Text style={styles.blogAuthor}>-{item?.content}</Text> */}
        <Text style={styles.blogDiscription}>{item?.shortDescription}</Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',width:theme.horizontalSpacing.space_100}}>
          <Text style={{color:theme.lightColor.borderColor,fontSize:theme.fontSizes.size_12}}>{'Read more'}</Text>
       <View style={{marginLeft:theme.horizontalSpacing.space_10}}>
        <Svg.Arrow/>
        </View>
        </View>
        </View>
      </View>
    </TouchableOpacity>
    </ScrollView>
  );

    return(
       <View style={[styles.container,{}]}>
        <Loader isLoading={isCategoryDataLoading||isSelectedCategoryApiLoading} />
      <Header/>
       <Loader isLoading={isCategoryDataLoading} />
      <Text style={styles.header}>Blogs</Text>
    <View style={{ flexDirection: "row", width: "100%",borderBottomWidth:1 }}>
      
      <FlatList
    data={uniqueCategories}
    horizontal
    showsHorizontalScrollIndicator={false}
    keyExtractor={(item, index) => `category-${index}`}
    renderItem={({ item }) => (
      <TouchableOpacity
        onPress={() => handleCategorySelect(item)}
        style={{
          marginHorizontal: theme.horizontalSpacing.space_10,
          paddingVertical: theme.verticalSpacing.space_10,
          borderBottomWidth: selectedCategory === item ? 2 : 0,
          borderBottomColor: selectedCategory === item ? theme.lightColor.brownColor : 'transparent',
        }}
      >
        <Text
          style={{
            marginHorizontal:theme.horizontalSpacing.space_20,
            fontSize: theme.fontSizes.size_14,
            fontWeight: '500',
            color: selectedCategory === item ? 'gray' : 'black',
          }}
        >
          {item}
        </Text>
      </TouchableOpacity>
    )}
  />
    </View>
          
{/* {selectedCategory===uniqueCategories && ( */}
 <FlatList
    contentContainerStyle={{ paddingBottom:theme.verticalSpacing.space_80 }}
            data={selectedCategoryApidata?.data}
            renderItem={renderBlogItem}
            keyExtractor={(item) => item?.id}
             refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
          />
  {/* )}   */}

{/* {selectedCategory==="local_news"&& (
 <FlatList
            data={blogs}
            renderItem={renderBlogItem}
            keyExtractor={(item) => item.id}
          />

)} */}



   {/* {selectedCategory==="sports" && (
    <FlatList
            data={blogs}
            renderItem={renderBlogItem}
            keyExtractor={(item) => item.id}
          />

)}       */}

    {/* {selectedCategory=== "lifestyles" && (
         <FlatList
            data={blogs}
            renderItem={renderBlogItem}
            keyExtractor={(item) => item.id}
          />

)}       */}
    </View>
    )
}
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
    padding:20
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
    
    // alignItems: 'center',
   
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
export default ResourceScreen;