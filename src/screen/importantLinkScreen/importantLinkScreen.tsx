import React from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useImporttantLinkApiSliceQuery } from "../../redux/apiSlice/importantLinkSlice";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";
import { theme } from "../../utils";
import * as Svg from '../../assets/images/svg'

const ImportantLinkScreen = ({navigation}) => {
  const { data: importantLinkData, isLoading, isError } = useImporttantLinkApiSliceQuery();
  const { width } = useWindowDimensions();

  if (isLoading) return <Text style={{alignSelf:"center",textAlign:"center"}}>Loading...</Text>;
  if (isError || !importantLinkData?.data) return <Text style={{alignSelf:"center",textAlign:"center",color:'red'}}>Error loading data</Text>;

  const item = importantLinkData.data;

  console.log('importantLinkData',importantLinkData)

  return (
    <ScrollView style={{ margin: 19, flex: 1 }}>
       <TouchableOpacity style={{marginBottom:theme.verticalSpacing.space_30}} onPress={() => navigation.goBack()}>
                 <Svg.ArrowBack />
               </TouchableOpacity>
       
      <Text style={{ fontSize:theme.fontSizes.size_20, fontWeight: '700', marginBottom: 10 }}>{item?.title}</Text>
      <RenderHtml contentWidth={width} 
       baseStyle={{
    fontSize:theme.fontSizes.size_16, 
    lineHeight:20, 
    fontWeight: '500',
    // marginVertical:5,
  }}
      source={{ html: item.description }} />
    </ScrollView>
  );
};

export default ImportantLinkScreen;
