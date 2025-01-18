import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import * as Svg from '../../asstets/images/svg';
import { theme } from '../../utils';
import Header from '../../reusableComponent/header/header';
// Sample Notification Data
const notifications = [
  { id: '1', type: 'follow' , message: 'sent you a follow request', timestamp: 'Yesterday at 11:42 PM', read: false },
  { id: '2', type: 'comments', message: 'left 5 comments on Issa compliance report', timestamp: 'Yesterday at 11:30 PM', read: true },
  { id: '3', type: 'comments', message: 'left 2 comments on Issa compliance report', timestamp: 'Yesterday at 10:40 PM', read: false },
  { id: '4', type: 'comments', message: 'left 8 comments on Issa compliance report', timestamp: 'Yesterday at 10:30 PM', read: false },
  { id: '5', type: 'comments', message: 'left 4 comments on Issa compliance report', timestamp: 'Yesterday at 10:25 PM', read: true },
];

const NotificationScreen = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState('All'); // Default tab is "All"

  // Filtered data based on selected tab
  const getFilteredNotifications = () => {
    if (selectedTab === 'Unread') {
      return notifications.filter((item) => !item.read);
    }
    if (selectedTab === 'Read') {
      return notifications.filter((item) => item.read);
    }
    return notifications; // For "All" tab
  };

  // Notification Item Component
  const NotificationItem = ({ item }) => (
    <TouchableOpacity onPress={undefined} style={styles.notificationItem}>
        <Image style={styles.NotificationImage} source={require('../../asstets/images/manImage.png')} />
      <View >
      <Text style={styles.NotificationMsg}>{item.message}</Text>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        {/* header  */}
        <Header/>
      {/* Custom Tabs */}
      <View style={styles.tabContainer}>
        {['All', 'Unread', 'Read'].map((tab) => (
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
  );
};

export default NotificationScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
  },
  tabButton: {
    paddingVertical: theme.verticalSpacing.space_8,
    paddingHorizontal: theme.horizontalSpacing.space_14,
    // borderRadius: 20,
    // backgroundColor: '#e0e0e0',
  },
  activeTab: {
    // Color: 'purple',
    borderBottomWidth: 3,  // Paper-like underline
    borderBottomColor: 'purple', // Purple color
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
