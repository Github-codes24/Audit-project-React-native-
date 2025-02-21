import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import * as Svg from '../../asstets/images/svg';
import { theme } from '../../utils';
import Header from '../../reusableComponent/header/header';
import { useDispatch,useSelector } from 'react-redux';
import { getLoginResponse } from '../../redux/stateSelector/authStateSelector';
import {  useGet10UserUnReadApiSliceQuery, useGetAlluserApiNotificationQuery, useGet10UserReadApiSliceQuery,useMarkNotificationAsReadMutation  } from '../../redux/apiSlice/notificationApiSlice';
import Loader from '../../reusableComponent/loader/loader';
import { MainRoutes } from '../../navigation/routeAndParamsList';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';


const NotificationScreen = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState('Unread'); 
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);

  console.log('selectedNotificationId555555',selectedNotificationId)

const response=useSelector(getLoginResponse)
 const userId=response?.data?.id
console.log('userId5554546',userId)

  const { 
      data: getAllUserNotificationApidata, 
      error: getAllUserNotificationApiError, 
      isLoading:getAllUserNotificationApiIsLoading 
    } = useGetAlluserApiNotificationQuery(userId);
    
    
console.log('getAllUserNotificationApidata',getAllUserNotificationApidata)


const { 
      data: get10userUnReadApiNotificationApidata, 
      error: get10userUnReadApiNotificationApiError, 
      isLoading:get10userUnReadApiNotificationApiIsLoading ,
    } = useGet10UserUnReadApiSliceQuery(userId); 

const { 
      data: get10userReadApiNotificationApidata, 
      error: get10userReadApiNotificationApiError, 
      isLoading:get10userReadApiNotificationApiIsLoading ,
    } = useGet10UserReadApiSliceQuery(userId); 

const [markNotificationAsRead,{
  isLoading: markNotificationAsReadApiIsLoading,
  isSuccess: markNotificationAsReadApiSuccess
}] = useMarkNotificationAsReadMutation();

 const getFilteredNotifications = () => {
    
  if (!getAllUserNotificationApidata?.notifications) {
    return []; 
  }
 
  if (selectedTab ==='Unread') {
    return get10userUnReadApiNotificationApidata?.notifications}
  
  //   if (selectedTab ==='Read') {
  //   return get10userReadApiNotificationApidata?.notifications
  // }
  return getAllUserNotificationApidata?.notifications; 
};

const formatDate = (date) => {
    const createdAt = moment(date);
    if (createdAt.isSame(moment(), 'day')) {
      return `Today at ${createdAt.format('hh:mm A')}`;
    } else if (createdAt.isSame(moment().subtract(1, 'day'), 'day')) {
      return `Yesterday at ${createdAt.format('hh:mm A')}`;
    } else {
      return createdAt.format('MMMM D, YYYY [at] hh:mm A');
    }
  };


  const NotificationItem = ({ item }) => (

    console.log('item645646',item),
    <TouchableOpacity  style={[
      styles.notificationItem,
      selectedTab === 'Unread' ? styles.unreadNotificationItem :null,
       !item?.isRead ? styles.unreadBackground : null
    ]}
     onPress={() => {
      setSelectedNotificationId(item?._id)
       if (!item?.isRead) {
      markNotificationAsRead(item?._id)
        .unwrap()
        .catch((error) => console.error('Error marking notification as read:', error));
    }
    
      if (item?.type === 'BLOG') {
       
        navigation.navigate(MainRoutes.BLOG_DETAILS_SCREEN, { id: item?.blogId });
      } else {
        navigation.navigate(MainRoutes.NOTIFICATION_DETAILS_SCREEN, { item:item});
      }
    
     }} 
    >
        <Image style={styles.NotificationImage} source={require('../../asstets/images/manImage.png')} />
      <View >
      <Text style={styles.NotificationMsg}>{item.title}</Text>
           <Text style={styles.timestamp}>
      {formatDate(item?.createdAt)}
    </Text>

      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{marginBottom:theme.verticalSpacing.space_100}}>
    <View style={styles.container}>
      <Loader isLoading={getAllUserNotificationApiIsLoading || get10userUnReadApiNotificationApiIsLoading || get10userReadApiNotificationApiIsLoading || markNotificationAsReadApiIsLoading} />
        {/* header  */}
        <Header/>
      {/* Custom Tabs */}
      
      <Text style={{fontSize:theme.fontSizes.size_20,fontWeight:'700',color:theme.lightColor.blackColor,
        marginHorizontal:20,marginTop:theme.verticalSpacing.space_20}}>{'Notifications'}</Text>
      <View style={styles.tabContainer}>
        {[ 'Unread','All', ].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, selectedTab === tab && styles.activeTab]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Notifications List */}
      <FlatList
        data={getFilteredNotifications()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationItem item={item} />}
        ListEmptyComponent={<Text style={styles.emptyText}>No notifications available.</Text>}
      />
    </View>
    </ScrollView>
  );
};

export default NotificationScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  unreadNotificationItem: {
  backgroundColor: '#E3F2FD', 
},
  headerView: {
    height: 105,
    backgroundColor: "#592951",
    paddingHorizontal: theme.horizontalSpacing.space_30,
    justifyContent: "center",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "row",
  },
   unreadNotificationItem: {
    borderLeftWidth: 4,
    borderLeftColor: 'blue', 
  },
  unreadBackground: {
    backgroundColor: '#EAF3FF', 
  },
  imageWrapper: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  userImage: {
    width: 60,
    height: 60,
  },
  userText: {
    marginLeft:theme.horizontalSpacing.space_10,
   },
   welcomeText: {
     color: theme.lightColor.whiteColor,
   },
   userName: {
     color: theme.lightColor.whiteColor,
     fontSize: theme.fontSizes.size_24,
   },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor: '#f5f5f5',
    // paddingVertical: 10,
    borderBottomWidth:1,
    borderColor:"gray"
  },
  tabButton: {
    // backgroundColor:"red",
    paddingVertical: theme.verticalSpacing.space_8,
    paddingHorizontal: theme.horizontalSpacing.space_14,
    // borderRadius: 20,
    // backgroundColor: '#e0e0e0',
  },
  activeTab: {
    // Color: 'purple',
    borderBottomWidth:2, 
    borderBottomColor: 'purple', 
    paddingBottom: 2,
    
  },
  tabText: {
    color: '#333',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#000',
  },
  notificationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection:'row',
    gap: theme.horizontalSpacing.space_12,
  },
  NotificationMsg: {
    fontWeight: '400',
    fontSize: theme.fontSizes.size_16,
    marginBottom: theme.verticalSpacing.space_6,
    
  },
  NotificationImage:{
    height: theme.horizontalSpacing.space_36,
    width: theme.verticalSpacing.space_36,
  },
  timestamp: {
    color: 'gray',
    fontSize: 12,
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 20,
    color: 'gray',
    fontSize: 16,
  },
});
