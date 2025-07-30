import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ImageCard from './imageCard';

const HorizontalCardList = ({ data }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ImageCard
            mediaUrl={item?.image}
            profileImage={{uri:item?.authorImage}}
            title={item?.title || ''}
            date={item?.createdAt}
            name={item?.authorName}
            field={item?.category}
            onPress={() =>
              navigation.navigate('BlogDetailsScreen', { id: item?._id})
            } 
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical:20,
  },
});

export default HorizontalCardList;
