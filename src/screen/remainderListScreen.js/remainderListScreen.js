import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { theme } from "../../utils";
import * as Svg from '../../assets/images/svg'
import Header from "../../reusableComponent/header/header";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import { getLoginResponse } from "../../redux/stateSelector/authStateSelector";
import { useSelector } from "react-redux";
import { useDeleteRemainderApiMutation, useGetAllReminderApiQuery } from "../../redux/apiSlice/reminderApiSlice";
import moment from "moment";
import Loader from "../../reusableComponent/loader/loader";

const ReminderListScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  const response = useSelector(getLoginResponse);
  const userId = response?.data?.id;

  const {
    data: getAllReminderApiData,
    isLoading: isgetAllReminderApiDataiLoading,
    error: getAllReminderApiDataError,
    refetch: refetchAllReminderApiData,
  } = useGetAllReminderApiQuery(userId);

  const [deleteReminder] = useDeleteRemainderApiMutation();

  const handleDelete = async (id) => {
    setLoadingId(id);
    try {
      await deleteReminder({ id }).unwrap();
      refetchAllReminderApiData();
    } catch (error) {
      console.error(error?.data?.message || "Error deleting reminder.");
    } finally {
      setLoadingId(null);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetchAllReminderApiData();
    setRefreshing(false);
  };

  useEffect(() => {
    refetchAllReminderApiData();
  }, []);

  if (isgetAllReminderApiDataiLoading) {
    return <Loader />;
  }

  if (getAllReminderApiDataError) {
    return <Text style={styles.errorText}>Loading....</Text>;
  }

  const renderReminderItem = ({ item }) => (
    <View style={styles.reminderCard}>
    
        <View style={styles.reminderContent}>
          <View style={styles.reminderHeader}>
            <Text style={styles.employeeName}>{item?.employeeName}</Text>
            <Text style={styles.date}>{moment(item?.date).format("DD-MMM-YYYY")}</Text>
          </View>
          <Text style={styles.reminderName}>{item?.reminderName}</Text>
          <Text style={styles.title}>{item?.reminderFor}</Text>
          <View style={styles.actionContainer}>
            <Text style={styles.description}>{item?.description}</Text>

            <TouchableOpacity 
             onPress={()=>navigation.navigate(MainRoutes.UPDATE_REMINDER_SCREEN,{ remainderdata: item })}
             
             style={{flexDirection:"row",alignItems:"center",paddingVertical:5,paddingHorizontal:10,borderRadius:10,marginRight:5}}>
            <Text style={{fontSize:theme.fontSizes.size_16,fontWeight:"500",}}>Edit</Text>
          <View style={{marginLeft:5}}>
            <Svg.Edit
            
            />
            </View>
         </TouchableOpacity>


            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item?._id)}>
              {loadingId === item?._id ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                <>
                 
                   <View >
                  <Svg.DeleteIcon 
                  color="black"
                  />
                  </View>
                  
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
     
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.header}>Reminder</Text>
      {getAllReminderApiData?.data?.length > 0 ? (
        <FlatList
          style={styles.flatList}
          data={getAllReminderApiData?.data}
          keyExtractor={(item) => item.id}
          renderItem={renderReminderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      ) : (
        <Text style={styles.noDataText}>No reminders found.</Text>
      )}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate(MainRoutes.SET_REMAINDER_SCREEN)}>
        <Svg.PlusIcon />
        <Text style={styles.addButtonText}>Add reminder</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
     height: '100%', 
     backgroundColor: "#F2F3F5"
     },
  header: { 
    fontSize: theme.fontSizes.size_20, 
    fontWeight: "600", 
    marginVertical: theme.verticalSpacing.space_20, 
    marginLeft: theme.horizontalSpacing.space_20, 
    color: theme.lightColor.blackColor 
  },
  listContent: { 
    paddingHorizontal:theme.horizontalSpacing.space_16 
  },
  flatList: { 
    marginBottom: theme.verticalSpacing.space_156 
  },
  reminderCard: { 
    backgroundColor: "#FFFFFF", 
    borderRadius: 12, 
    padding: theme.horizontalSpacing.space_14, marginVertical: 5 
  },
  reminderContent: { 
    width: theme.horizontalSpacing.space_374 
  },
  reminderHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingRight: theme.horizontalSpacing.space_30 
  },
  employeeName: { 
    fontWeight: '600',
     fontSize: theme.fontSizes.size_20 
    },
  date: { 
    fontSize: theme.fontSizes.size_20, 
    fontWeight: '600'
   },
  reminderName: { 
    fontSize: theme.fontSizes.size_16, 
    fontWeight: '500', marginVertical: 5 
  },
  title: { 
    fontSize: theme.fontSizes.size_14,
     fontWeight: "700", 
     color: "#000", 
     width:theme.horizontalSpacing.space_130,
    //  backgroundColor:"red"
    },
  description: { 
    fontSize: theme.fontSizes.size_16, 
    color: theme.lightColor.blackColor, 
    fontWeight: "700",
     marginTop:5,
     width:theme.horizontalSpacing.space_230, 
    },
  actionContainer: { 
    flexDirection: "row",
     justifyContent: "space-between", 
     alignItems: "center", 
     borderRadius: 8 
    },
  deleteButton: 
  { 
    //  backgroundColor:theme.lightColor.brownColor, 
    borderRadius:theme.horizontalSpacing.space_10, 
    alignItems:"center", 
    paddingHorizontal:theme.horizontalSpacing.space_10, 
    paddingVertical:5,
    justifyContent:"center",
    marginRight:theme.horizontalSpacing.space_30
  },
  deleteText:{ 
    fontSize: theme.fontSizes.size_16, color: "white", 
    fontWeight: "600", 
  },
  addButton:
   { 
    backgroundColor: theme.lightColor.brownColor, 
    height: theme.verticalSpacing.space_50, 
    borderRadius:theme.horizontalSpacing.space_12,
     position: "absolute",
      bottom: theme.verticalSpacing.space_100, 
      alignSelf: "center", 
      width: "90%", 
      alignItems: "center", 
      flexDirection: "row", 
      justifyContent: 'center'
     },
  addButtonText: { 
    fontSize: theme.fontSizes.size_16,
     fontWeight: "500", 
     color: "#FFFFFF",
      marginLeft: 5 
    },
  errorText: { 
    width: '100%', 
    height: '100%', 
    alignSelf: "center", 
    textAlign: 'center'
  },
  noDataText: { 
    textAlign: "center", 
    alignSelf: 'center' 
  },
});

export default ReminderListScreen;