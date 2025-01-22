import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import theme from './theme';
const ImageCard = ({ 
  image, 
  profileImage, 
  title, 
  date, 
  name, 
  field, 
  onPress 
}) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
       
      <Image source={image} style={styles.cardImage} resizeMode="cover" />
      
      <View style={styles.overlay}>
         <View style={{padding:5}}>
         <Text style={styles.field}>{field}</Text>
       </View>

         <View style={{flexDirection:"row",alignItems:"center"}}>
        <Image source={profileImage} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <View>
          
          </View>
                <Text style={styles.title}>{title}</Text>
          <Text style={styles.meta}>
            {name} · {moment(date).format("DD-MMM-YYYY")} 
          </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
   
    width: 200,
    height: 250,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 8,
    position: 'relative',
  },
  cardImage: {
    
    width: '100%',
    height: '100%',
  },
  overlay: {
    // backgroundColor:"red",
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: 'rgba(0, 0, 0, 0.6)',
    // flexDirection: 'row',
    // alignItems: 'center',
    padding: 12,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 12,
  },
  textContainer: {
    // backgroundColor:"red",
   
  },
  field: {
    color:theme.lightColor.brownColor, 
    fontSize:theme.fontSizes.size_18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  meta: {
    color: theme.lightColor.whiteColor,
    fontSize: 12,
  },
});

export default ImageCard;
