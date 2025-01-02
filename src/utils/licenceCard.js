import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import theme from './theme';
import * as Svg from '../asstets/images/svg'
const Card = ({ title, description, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Get Started </Text>
          <Svg.RightArrow/>
        </TouchableOpacity>
      </View>
      <Image source={icon} style={styles.icon} resizeMode="contain" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginVertical: 8,
    marginHorizontal:15
  },
  content: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  button: {
    // backgroundColor: '#007BFF', 
    // paddingVertical: 8,
    // paddingHorizontal: 12,
    borderRadius: 8,
    // alignSelf: 'flex-start',
  justifyContent:'center',
width:130,
flexDirection:'row',
alignItems:'center',
height:40

  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color:theme.lightColor.blackColor,
    
  },
  icon: {
    width: 64,
    height: 64,
  },
});

export default Card;
