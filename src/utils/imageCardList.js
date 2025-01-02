import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ImageCard from './imageCard';

const HorizontalCardList = ({ data }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ImageCard
            image={item.image}
            profileImage={item.profileImage}
            title={item.title}
            date={item.date}
            name={item.name}
            field={item.field}
            onPress={item.onPress}
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
