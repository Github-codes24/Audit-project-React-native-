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
            image={{ uri: item?.image }}
            profileImage={item?.profileImage}
            title={item?.title || ''}
            date={item?.createdAt}
            name={item?.name}
            field={item?.category}
            onPress={() =>
              navigation.navigate('BlogDetailsScreen', { id: item?._id})
            } // Navigate with the `id` parameter
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
});

export default HorizontalCardList;
