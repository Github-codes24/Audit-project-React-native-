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
import * as Svg from '../../asstets/images/svg'
import { theme } from '../../utils';
import { MainRoutes } from '../../navigation/routeAndParamsList';
import Header from '../../reusableComponent/header/header';

const blogs = [
  {
    id: '1',
    blog:'cricket',
    uplaodTime:'2 sec ago',
    title: "Whispers of the Wild: Exploring Nature's Timeless Wonders",
    author: 'Geo',
    date: 'Wed, 30 Dec 2024',
    image:require('../../asstets/images/manImage.png'),
    content: 'Nature is the ultimate storyteller...',
  },
  {
    id: '2',
    blog:'nature',
     uplaodTime:'4 min ago',
    title: "Whispers of the Wild: Exploring Nature's Timeless Wonders",
    author: 'William',
    date: 'Sat, 27 Dec 2024',
    image: require('../../asstets/images/manImage.png'),
    content: "Nature is the ultimate storyteller, weaving tales of resilience, beauty, and interconnectedness over billions of years. From the tiniest dewdrop on a morning leaf to the towering majesty of ancient redwoods, every facet of the natural world holds a lesson waiting to be uncovered.The Symphony of Seasons Each season carries its own rhythm and charm. Sping bursts forth with life, as flowers bloom and rivers swell with snowmelt. Summer brings golden sunsets, the hum of cicadas, and long days for exploration. Autumn paints the world in fiery hues, a fleeting spectacle of change. Winter, with its quiet stillness, invites reflection and renewal. These cycles remind us of the impermanence of life and the beauty of transformation.The Hidden World Beneath Our FeetBeneath the soil lies an intricate web of life. Mycorrhizal fungi form vast underground networks, connecting trees and plants in what scientists call the Wood Wide Web. These networks share nutrients, communicate warnings about pests, and create a symbiotic relationship that sustains entire ecosystems. It's a reminder that even the smallest, unseen connections can have a profound impact on the world.Lessons from WildlifeAnimals embody resilience and adaptability. Monarch butterflies travel thousands of miles during migration, an epic journey across generations. Wolves, once hunted to near extinction, have shown us the importance of apex predators in maintaining ecological balance. Meanwhile, the simple determination of an ant carrying a leaf ten times its size speaks volumes about persistence and teamwork. The Healing Power of Nature",
  },
  {
    id: '3',
    uplaodTime:'1 min ago',
    blog:'nature',
    title: "Whispers of the Wild: Exploring Nature's Timeless Wonders",
    author: 'Benjamin',
    date: 'Mon, 09 Dec 2024',
    image:require('../../asstets/images/manImage.png'),
    content: 'Exploring the beauty of nature...',
  },
   {
    id: '133',
    blog:'cricket',
    uplaodTime:'2 sec ago',
    title: "Whispers of the Wild: Exploring Nature's Timeless Wonders",
    author: 'Geo',
    date: 'Wed, 30 Dec 2024',
    image:require('../../asstets/images/manImage.png'),
    content: 'Nature is the ultimate storyteller...',
  },
   {
    id: '14',
    blog:'cricket',
    uplaodTime:'2 sec ago',
    title: "Whispers of the Wild: Exploring Nature's Timeless Wonders",
    author: 'Geo',
    date: 'Wed, 30 Dec 2024',
    image:require('../../asstets/images/manImage.png'),
    content: 'Nature is the ultimate storyteller...',
  },
   {
    id: '10',
    blog:'cricket',
    uplaodTime:'2 sec ago',
    title: "Whispers of the Wild: Exploring Nature's Timeless Wonders",
    author: 'Geo',
    date: 'Wed, 30 Dec 2024',
    image:require('../../asstets/images/manImage.png'),
    content: 'Nature is the ultimate storyteller...',
  },
   
   
  // Add more items here...
];
const ResourceScreen=({navigation})=>{

const [selectedBlog, setSelectedBlog] = useState(null);

  const renderBlogItem = ({ item }) => (
    <TouchableOpacity
      style={styles.blogItem}
      onPress={() => setSelectedBlog(item)}
    >
      <Image source={item?.image} style={styles.blogImage} />
      <View style={styles.blogInfo}>
        <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%'}}>
        <Text style={styles.blogTitle}>{item.blog}</Text>
        <Text style={{color:'gray'}}>{item?.uplaodTime}</Text>
        </View>
        <View style={{flexDirection:"row",justifyContent:"space-between",width:'85%',marginTop:10}}>
            <View>
        <Text style={styles.blogAuthor}>-{item.author}</Text>
        <Text style={styles.blogDate}>{item.date}</Text>
        </View>
        <Svg.Arrow/>
        </View>
      </View>
    </TouchableOpacity>
  );

 const renderBlogDetails = () => (
    <View style={styles.detailsContainer}>
      <Image
        source={ selectedBlog.image }
        style={styles.detailsImage}
      />
      <ScrollView style={{flex:1,marginBottom:100}}>
      <Text style={styles.detailsTitle}>{selectedBlog.title}</Text>
      <View style={{flexDirection:'row'}}>

        <View style={{width:40,height:40,borderWidth:.3,borderRadius:20,marginLeft:10,alignItems:"center",justifyContent:'center'}}>
       <Image
       style={{width:40,height:40}}
       source={require('../../asstets/images/manImage.png')}
       />
        </View>
        <View style={{marginLeft:15}}>
      <Text style={styles.detailsAuthor}>- {selectedBlog.author}</Text>
      <Text style={styles.detailsDate}>{selectedBlog.date}</Text>
      </View>
        </View>
      <Text style={styles.detailsContent}>{selectedBlog.content}</Text>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setSelectedBlog(null)}
      >
        <Text style={styles.backButtonText}>Back to Blogs</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );


    return(
       <View style={[styles.container,{}]}>

      <Header/>

      {selectedBlog ? (
        renderBlogDetails()
      ) : (
        <>
          <Text style={styles.header}>Blogs</Text>
          <FlatList
            data={blogs}
            renderItem={renderBlogItem}
            keyExtractor={(item) => item.id}
          />
        </>
      )}
    </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginBottom:100,
    // padding: 16,
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
    margin:20
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
    elevation: 2,
    marginHorizontal:10,
    alignItems:"center",
    // justifyContent:"center",
    padding:10,
    // marginBottom:100
  },
  blogImage: {
    width:50,
    height:50,
    borderRadius: 8,
    marginRight: 12,
  },
  blogInfo: {
    justifyContent: 'center',
  },
  blogTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  blogAuthor: {
    fontSize: 14,
    color: '#888',
  },
  blogDate: {
    fontSize: 12,
    color: '#AAA',
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