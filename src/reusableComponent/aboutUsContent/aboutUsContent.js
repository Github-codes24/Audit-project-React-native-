import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { theme } from "../../utils";
import { MainRoutes } from "../../navigation/routeAndParamsList";

const stripHtmlTags = (html) => {
  return html?.replace(/<\/?[^>]+(>|$)/g, "") || "";
};

export const AboutUsContent = ({ content, aboutUsData }) => { 
  const navigation = useNavigation(); // Use navigation hook
  const [showFullText, setShowFullText] = useState(false);
  const plainText = stripHtmlTags(content);

  return (
    <View style={{ marginTop: 10 }}>
      <Text
        style={{ lineHeight: 20, fontSize: theme.fontSizes.size_16 }}
        numberOfLines={showFullText ? undefined : 3}
      >
        {plainText}
      </Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(MainRoutes.ABOUTUS_SCREEN, {
            images: aboutUsData?.aboutUs?.[0]?.image || [],
          })
        }
        style={{ marginTop: 5 }}
      >
        <Text
          style={{
            color: theme.lightColor.brownColor,
            fontWeight: "400",
            fontSize: theme.fontSizes.size_14,
          }}
        >
          {"Read more"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
