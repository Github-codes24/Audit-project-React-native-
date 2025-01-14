import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";
import { theme } from "../../utils";
import * as Svg from '../../asstets/images/svg'
const ReminderListScreen = () => {
  const reminders = [
    {
      id: "1",
      date: "10-Jan-2025",
      title: "Happy Birthday!!!",
      description: "It's Michael's birthday! Give him a call",
    },
    {
      id: "2",
      date: "09-Jan-2025",
      title: "Visa will be expiring soon",
      description: "Michael's visa will be expiring soon",
    },
    {
      id: "3",
      date: "08-Jan-2025",
      title: "Meeting",
      description: "Meeting with client for new topics",
    },
  ];

  const renderReminderItem = ({ item }) => (
    <View style={styles.reminderCard}>
        <View style={{flexDirection:"row",justifyContent:'space-between'}}>
      <Text style={styles.date}>{item.date}</Text>
        <Svg.Arrow/>
        
       </View>
      
      <View style={styles.reminderContent}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
     
    </View>
  );

  return (
    <View style={styles.container}>
         <View style={styles.headerView}>
                <View style={styles.headerContent}>
                  <View style={styles.userInfo}>
                    <View style={styles.imageWrapper}>
                      <Image
                        style={styles.userImage}
                        source={require("../../asstets/images/manImage.png")}
                      />
                    </View>
                    <View style={styles.userText}>
                      <Text style={styles.welcomeText}>Hello, Welcome 🎉</Text>
                      <Text style={styles.userName}>NAYAN Moudekar</Text>
                    </View>
                  </View>
                  <Svg.BellIcon />
                </View>
              </View>
      <Text style={styles.header}>Reminder</Text>

      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={renderReminderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add reminder</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height:'100%',

    // flex: 1,
    backgroundColor: "#F2F3F5",
  },
  header: {
    fontSize:theme.fontSizes.size_20,
    fontWeight: "600",
    marginVertical: 16,
    marginLeft: 16,
    color:theme.lightColor.blackColor
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 80, 
  },
  
    reminderCard: {
    // flexDirection: "row",
    // alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
     padding:15,
     marginVertical:10,
    //  backgroundColor:"red"
  },
   headerView: {
    height: 105,
    backgroundColor: "#592951",
    paddingHorizontal:theme.horizontalSpacing.space_30,
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
   marginLeft:theme.horizontalSpacing.space_10
  },
  welcomeText: {
    color: theme.lightColor.whiteColor,
  },
  userName: {
    color: theme.lightColor.whiteColor,
    fontSize: theme.fontSizes.size_24,
  },
  date: {
    fontSize:theme.fontSizes.size_20,
    fontWeight: "bold",
    color:theme.lightColor.blackColor,
    marginRight: 16,
  },
  reminderContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    width:150,
    marginTop:theme.verticalSpacing.space_10
  },
  description: {
    fontSize:theme.fontSizes.size_14,
    color:theme.lightColor.blackColor,
    // marginTop: 4,
    width:theme.horizontalSpacing.space_170
  },
  arrow: {
    fontSize: 24,
    color: "#5D3FD3",

  },
  addButton: {
    backgroundColor:theme.lightColor.brownColor,
    paddingVertical: 14,
    borderRadius: 12,
    position: "absolute",
    bottom:theme.verticalSpacing.space_100,
    alignSelf: "center",
    width: "90%",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default ReminderListScreen;
