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
          <Text style={styles.buttonText}>Get started </Text>
          <View style={{marginLeft:5}}>
          <Svg.RightArrow/>
          </View>
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
    marginVertical:8,
   
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
    width:231
  },
  description: {
    fontSize: 14,
    color:'gray',
    marginBottom: 12,
  },
  button: {
    // backgroundColor:'pink',
    borderRadius: 8,  
  // justifyContent:'center',
width:130,
flexDirection:'row',
alignItems:'center',
height:theme.verticalSpacing.space_40

  },
  buttonText: {
    // backgroundColor:"red",
    fontSize:theme.fontSizes.size_16,
    fontWeight: '700',
    color:theme.lightColor.blackColor,
    
  },
  icon: {
    width: 64,
    height: 64,
  },
});

export default Card;
