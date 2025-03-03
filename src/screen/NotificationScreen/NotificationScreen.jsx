import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, RefreshControl,ScrollView } from 'react-native';
import * as Svg from '../../assets/images/svg';
import { theme } from '../../utils';
import Header from '../../reusableComponent/header/header';
import { useSelector } from 'react-redux';
import { getLoginResponse } from '../../redux/stateSelector/authStateSelector';
import {  
  useGet10UserUnReadApiSliceQuery, 
  useGetAlluserApiNotificationQuery, 
  useGet10UserReadApiSliceQuery, 
  useMarkNotificationAsReadMutation  
} from '../../redux/apiSlice/notificationApiSlice';
import Loader from '../../reusableComponent/loader/loader';
import { MainRoutes } from '../../navigation/routeAndParamsList';
import moment from 'moment';


const NotificationScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('Unread'); 
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  
  const response = useSelector(getLoginResponse);
  const userId = response?.data?.id;

  const { 
    data: getAllUserNotificationApidata, 
    isLoading: getAllUserNotificationApiIsLoading, 
    refetch: refetchAll 
  } = useGetAlluserApiNotificationQuery(userId);

  const { 
    data: get10userUnReadApiNotificationApidata, 
    isLoading: get10userUnReadApiNotificationApiIsLoading,
    refetch: refetchUnread 
  } = useGet10UserUnReadApiSliceQuery(userId);

  const { 
    data: get10userReadApiNotificationApidata, 
    isLoading: get10userReadApiNotificationApiIsLoading,
    refetch: refetchRead 
  } = useGet10UserReadApiSliceQuery(userId);

  const [markNotificationAsRead, { isLoading: markNotificationAsReadApiIsLoading }] = useMarkNotificationAsReadMutation();

  const getFilteredNotifications = () => {
    if (!getAllUserNotificationApidata?.notifications) return [];
    if (selectedTab === 'Unread') return get10userUnReadApiNotificationApidata?.notifications || [];
    return getAllUserNotificationApidata?.notifications || [];
  };

  const formatDate = (date) => {
    const createdAt = moment(date);
    if (createdAt.isSame(moment(), 'day')) return `Today at ${createdAt.format('hh:mm A')}`;
    if (createdAt.isSame(moment().subtract(1, 'day'), 'day')) return `Yesterday at ${createdAt.format('hh:mm A')}`;
    return createdAt.format('MMMM D, YYYY [at] hh:mm A');
  };

 const handleRefresh = async () => {
  setRefreshing(true);
  const prevData =
    selectedTab === 'Unread'
    ? get10userUnReadApiNotificationApidata?.notifications
    : getAllUserNotificationApidata?.notifications;

  const { data } =
  selectedTab === 'Unread' ? await refetchUnread() : await refetchAll();

  setRefreshing(JSON.stringify(prevData) !== JSON.stringify(data?.notifications));
};

  const NotificationItem = ({ item }) => (
    <TouchableOpacity  
      style={[
        styles.notificationItem,
        selectedTab === 'Unread' ? styles.unreadNotificationItem : null,
        !item?.isRead ? styles.unreadBackground : null
      ]}
      onPress={() => {
        setSelectedNotificationId(item?._id);
        if (!item?.isRead) {
          markNotificationAsRead(item?._id);
        }
        const route = item?.type === 'BLOG' ? MainRoutes.BLOG_DETAILS_SCREEN : MainRoutes.NOTIFICATION_DETAILS_SCREEN;
        navigation.navigate(route, { id: item?.blogId, item });
      }}
    >
      <Image style={styles.NotificationImage} source={require('../../assets/images/manImage.png')} />
      <View>
        <Text style={styles.NotificationMsg}>{item.title}</Text>
        <Text style={styles.timestamp}>{formatDate(item?.createdAt)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{ marginBottom: theme.verticalSpacing.space_100 }}>
      <View style={styles.container}>
        <Loader isLoading={getAllUserNotificationApiIsLoading || get10userUnReadApiNotificationApiIsLoading || get10userReadApiNotificationApiIsLoading || markNotificationAsReadApiIsLoading} />
        <Header />
        <Text style={styles.headerText}>{'Notifications'}</Text>
        
        <View style={styles.tabContainer}>
          {['Unread', 'All'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabButton, selectedTab === tab && styles.activeTab]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={getFilteredNotifications()}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <NotificationItem item={item} />}
          ListEmptyComponent={<Text style={styles.emptyText}>No notifications available.</Text>}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
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
  headerText: {
    fontSize: theme.fontSizes.size_20,
    fontWeight: '700',
    color: theme.lightColor.blackColor,
    marginHorizontal: 20,
    marginTop: theme.verticalSpacing.space_20
  },
  unreadNotificationItem: {
    borderLeftWidth: 4,
    borderLeftColor: 'blue',
  },
  unreadBackground: {
    backgroundColor: '#EAF3FF',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  tabButton: {
    paddingVertical: theme.verticalSpacing.space_8,
    paddingHorizontal: theme.horizontalSpacing.space_14,
  },
  activeTab: {
    borderBottomWidth: 2,
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
    flexDirection: 'row',
    gap: theme.horizontalSpacing.space_12,
  },
  NotificationMsg: {
    fontWeight: '400',
    fontSize: theme.fontSizes.size_16,
    marginBottom: theme.verticalSpacing.space_6,
  },
  NotificationImage: {
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
    fontSize:theme.fontSizes.size_16,
  },
});
