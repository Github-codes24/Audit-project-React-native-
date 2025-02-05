import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import ImageSwiper from '../../reusableComponent/ImageSlider/imageSwiper';
import Header from '../../reusableComponent/header/header';
import * as Svg from '../../asstets/images/svg';
import moment from 'moment';
import { theme } from '../../utils';

const NotificationDetailsScreen = ({ route }) => {
  const { item } = route?.params || {};

  console.log('itemmmmm',item)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Header />
        <View style={styles.detailsContainer}>
          <View style={{ position: 'relative' }}>
            {item?.image?.length > 0 && (
              <ImageSwiper
                images={Array.isArray(item?.image) ? item?.image : [item?.image]}
                // showNavigation={true}
                imageStyle={{
                  width:'100%',
                  height:400,
                  resizeMode: 'contain', 
                }}
                containerStyle={{height:theme.verticalSpacing.space_388}}
              />
            )}

            {/* <TouchableOpacity style={styles.svgIconContainer} onPress={() => console.log('SVG Icon Pressed')}>
              <Svg.ShareIcon />
            </TouchableOpacity> */}
          </View>

          <ScrollView style={{ flex: 1, marginBottom: 100 }}>
            <View style={{ paddingHorizontal: 19 }}>
              <Text style={styles.detailsTitle}>{item?.title || ''}</Text>
            </View>

            <Text style={styles.detailsContent}>{item?.description || ''}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 19 }}>
              {/* Add navigation buttons here if needed */}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 10,
  },
  detailsContent: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 20,
    paddingHorizontal: 19,
    lineHeight: 20,
    color: 'black',
    fontWeight: '400',
  },
  svgIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    borderRadius: 12,
    padding: 5,
  },
});

export default NotificationDetailsScreen;
