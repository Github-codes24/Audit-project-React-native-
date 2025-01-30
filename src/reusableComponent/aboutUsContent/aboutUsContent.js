import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../utils';

  export  const AboutUsContent = ({ content }) => {
  const [showFullText, setShowFullText] = useState(false);

  return (
    <View style={{ marginTop: 10}}>
      <Text
        style={{ lineHeight: 20,fontSize:theme.fontSizes.size_16 }}
        numberOfLines={showFullText ? 0 : 3} 
      >
        {content}
      </Text>
      <TouchableOpacity
        onPress={() => setShowFullText(!showFullText)} 
        style={{ marginTop: 5 }}
      >
        <Text style={{ color:theme.lightColor.brownColor, fontWeight: '400',fontSize:theme.fontSizes.size_14 }}>
          {showFullText ? 'Read less' : 'Read more'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};


