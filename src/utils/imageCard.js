import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

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
      {/* Main Image */}
      <Image source={image} style={styles.cardImage} resizeMode="cover" />
      
      {/* Details Overlay */}
      <View style={styles.overlay}>
        {/* Profile Image */}
        <Image source={profileImage} style={styles.profileImage} />
        
        {/* Text Details */}
        <View style={styles.textContainer}>
          <Text style={styles.field}>{field}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.meta}>
            {name} · {date}
          </Text>
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flexDirection: 'row',
    alignItems: 'center',
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
    flex: 1,
  },
  field: {
    color: '#FFC107', 
    fontSize: 12,
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
    color: '#ccc',
    fontSize: 12,
  },
});

export default ImageCard;
