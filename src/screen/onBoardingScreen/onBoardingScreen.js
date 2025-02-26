import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { MainRoutes } from '../../navigation/routeAndParamsList';
import CustomButton from '../../reusableComponent/button/button';
import { theme } from '../../utils';
import BackgroundLayout from '../../reusableComponent/backgroundLayout/backgroundLayout';

const OnboardingScreen = ({ navigation }) => {
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < 2) {
      swiperRef.current.scrollBy(1); 
    } else {
      navigation.navigate(MainRoutes.WELCOME_SCREEN); 
    }
  };

  const handleIndexChanged = (index) => {
    setCurrentIndex(index); // Update the current index when swiping
  };

  return (
    <BackgroundLayout>
    <Swiper
      loop={false}
      showsPagination={true}
      ref={swiperRef}
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
      onIndexChanged={handleIndexChanged} 
    >
      {/* Slide 1 */}
      <View style={styles.slide}>
        <Image
          // Replace with your image source
          source={require('../../assets/images/onboarding1.png')}
          style={styles.image}
        />
        <Text style={styles.title}>All in One Place!</Text>
        <Text style={styles.description}>
          Efficient tools for all your compliance needs. Manage audits and Licence with confidence.
        </Text>
         <View style={{marginTop:50,alignItems:"center"}}>
        <CustomButton onPress={handleNext} title="Next" />
          <TouchableOpacity
          onPress={()=>navigation.navigate(MainRoutes.WELCOME_SCREEN)}
          >
            <Text style={{marginTop:10,color:'#646982'}}>{'Skip'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Slide 2 */}
      <View style={styles.slide}>
        <Image
          // Replace with your image source
          // source={require('./assets/slide2.png')}
          style={styles.image}
        />
        <Text style={styles.title}>Stay Organized</Text>
        <Text style={styles.description}>
          Track, manage, and organize all your tasks efficiently in one app.
        </Text>
        <View style={{marginTop:30}}>
        <CustomButton onPress={()=>navigation.navigate(MainRoutes.WELCOME_SCREEN)} title="Next" />
        </View>
      </View>

    </Swiper>
    </BackgroundLayout>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    
  },
  image: {
    width: 290,
    height:190,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.lightColor.brownColor,
    marginBottom:theme.verticalSpacing.space_20,
  },
  description: {
    lineHeight:24,
    width:300,
    fontSize: theme.fontSizes.size_14,
    textAlign: 'center',
    color: '#7d7d7d',
    marginHorizontal: 10,
    fontWeight:'600'
  },
  dot: {
    backgroundColor: '#c4c4c4',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#4a4a8a',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
});

export default OnboardingScreen; 