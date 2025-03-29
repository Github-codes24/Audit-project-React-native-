import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import moment from 'moment';
import theme from './theme';

const ImageCard = ({ 
  mediaUrl,  
  profileImage, 
  title, 
  date, 
  name, 
  field, 
  onPress 
}) => {
  const [aspectRatio, setAspectRatio] = useState(1); // Default aspect ratio

  // Function to check if the URL is a video
  const isVideo = (url) => {
    if (typeof url !== 'string') return false;
    const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm'];
    return videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
  };

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      {/* Render video if it's a video URL, otherwise render image */}
      {isVideo(mediaUrl) ? (
        <Video 
          source={{ uri: mediaUrl }} 
          style={styles.cardMedia }
          controls={true} 
          paused={true}
          resizeMode="cover" // Ensures the video fits
        />
      ) : (
        <Image 
          source={{ uri: mediaUrl }} 
          style={[styles.cardMedia, { aspectRatio }]} 
          onLoad={(event) => {
            const { width, height } = event.nativeEvent.source;
            setAspectRatio(width / height); // Dynamically adjust aspect ratio
          }}
        />
      )}

      <View style={styles.overlay}>
        <View>
          {/* <View style={styles.fieldContainer}>
           
            <Text style={styles.field}>{field}</Text>
       
          </View>
         */}
          <Text style={styles.title}>{title}</Text>
       
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width:theme.horizontalSpacing.space_187,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 8,
    position: 'relative',
    backgroundColor: '#FFF',
  },
  cardMedia: {
    width: '100%',
    height:theme.horizontalSpacing.space_110
  },
  overlay: {
   paddingVertical:10,
   paddingHorizontal:12,
  //  backgroundColor:"red"
  },
  fieldContainer: {
    backgroundColor: '#FCEADE',
    borderRadius:5,
    paddingHorizontal: theme.horizontalSpacing.space_10,
    alignSelf: 'flex-start',
    alignItems: "center",
    justifyContent: "center",
   
  },
  field: {
    color: theme.lightColor.brownColor, 
    fontSize: theme.fontSizes.size_16,
    fontWeight: '400',
    alignItems:"center",
    justifyContent:"center"
  },
  title: {
    color: '#000',
    fontSize:theme.fontSizes.size_14,
    fontWeight: '600',
    marginTop:5,
    marginLeft:2,
    // backgroundColor:"red"
  },
});

export default ImageCard;
