import React,{useEffect,useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,

} from "react-native";
import { theme } from "../../utils";
import * as Svg from '../../asstets/images/svg'
import Header from "../../reusableComponent/header/header";
import { MainRoutes } from "../../navigation/routeAndParamsList";
import { getLoginResponse } from "../../redux/stateSelector/authStateSelector";
import { useSelector } from "react-redux";
import { useGetAllReminderApiQuery } from "../../redux/apiSlice/reminderApiSlice";
import moment from "moment";
import Loader from "../../reusableComponent/loader/loader";


const ReminderListScreen = ({navigation}) => {
   const [refreshing, setRefreshing] = useState(false);

const response=useSelector(getLoginResponse)
 
 const userId=response?.data?.id
 console.log('userId787685695876',userId)
const {
  data: getAllReminderApiData,
  isLoading: isgetAllReminderApiDataiLoading,
  isSuccess:isgetAllReminderApiDataSuccess,
  error: getAllReminderApiDataError,
  refetch: refetchAllReminderApiData,
} = useGetAllReminderApiQuery(userId);


const onRefresh = async () => {
    setRefreshing(true); 
    refetchAllReminderApiData();
    setRefreshing(false); 
  };


 useEffect(() => {
    refetchAllReminderApiData()
  }, [getAllReminderApiData]);

  if (isgetAllReminderApiDataiLoading) {
    return <Loader/>
  }

  if (getAllReminderApiDataError) {
    return <Text style={{width:'100%',height:'100%',alignSelf:"center",textAlign:'center'}}>Loading....</Text>;
  }

  console.log('getAllReminderApiData',getAllReminderApiData)

  const renderReminderItem = ({ item }) => (
    <View style={styles.reminderCard}>
        <View style={{flexDirection:"row",justifyContent:'space-between',alignItems:"center"}}>
    {/* <Svg.Arrow/>    */}
       </View>
        <TouchableOpacity
        onPress={()=>navigation.navigate(MainRoutes.UPDATE_REMINDER_SCREEN,{remainderdata:item})}
        >
      <View style={styles.reminderContent}>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingRight:theme.horizontalSpacing.space_30}}>
        <Text style={{fontWeight:'600',fontSize:theme.fontSizes.size_20,}}>{item?.employeeName}</Text>
       <Text style={{fontSize: theme.fontSizes.size_20, fontWeight: '600'}}> 
        {moment(item?.date).format("DD-MMM-YYYY")} 
       </Text>        
      
       </View>
        <Text style={{fontSize:theme.fontSizes.size_16,fontWeight:'500',marginVertical:5}}>{item?.reminderName}</Text>
          <View style={{flexDirection:'row',justifyContent:'space-between',width:theme.horizontalSpacing.space_374}}>
        <Text style={styles.title}>{item?.reminderFor}</Text>
        
        <Text style={styles.description}>{item?.description}</Text>
      
        </View>
   
      </View>
       </TouchableOpacity>
    </View>
  );

  return (
    
    <View style={styles.container}>
         <Header/>
         
      <Text style={styles.header}>Reminder</Text>
      {getAllReminderApiData?.data?.length > 0 ? (
      <FlatList
      style={{marginBottom:theme.verticalSpacing.space_156}}
        data={getAllReminderApiData?.data}
        keyExtractor={(item) => item.id}
        renderItem={renderReminderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
       refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      />
       ) : (
        <Text style={{textAlign:"center",alignSelf:'center'}}>No reminders found.</Text>
      )}
      <TouchableOpacity style={styles.addButton}
      onPress={()=>navigation.navigate(
        MainRoutes.SET_REMAINDER_SCREEN 
      )}
      >
        <Svg.PlusIcon/>
        <Text style={styles.addButtonText}>Add reminder</Text>
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
    marginVertical: 10,
    marginLeft:theme.horizontalSpacing.space_20,
    color:theme.lightColor.blackColor
  },
  listContent: {
    paddingHorizontal: 16,
    // paddingBottom: 80, 
  },
  
    reminderCard: {
    // flexDirection: "row",
    // alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
     padding:theme.horizontalSpacing.space_14,
     marginVertical:5
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
    marginTop:theme.verticalSpacing.space_20,
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
    
  },
  reminderContent: {
  width:theme.horizontalSpacing.space_374
  },
  title: {
    fontSize:theme.fontSizes.size_14,
    fontWeight: "bold",
    color: "#000",
    // backgroundColor:"red",
    width:130
    // width:150,
    // marginTop:theme.verticalSpacing.space_10
  },
  description: {
    fontSize:theme.fontSizes.size_14,
    color:theme.lightColor.blackColor,
    fontWeight:"600",
   paddingHorizontal:theme.horizontalSpacing.space_30,
    alignSelf:'flex-end',
    // backgroundColor:"red",
    width:theme.horizontalSpacing.space_222
  },
  arrow: {
    fontSize:theme.fontSizes.size_24,
    color: "#5D3FD3",

  },
  addButton: {
    backgroundColor:theme.lightColor.brownColor,
    height:theme.verticalSpacing.space_50,
    // paddingVertical: 14,
    borderRadius: 12,
    position: "absolute",
    bottom:theme.verticalSpacing.space_100,
    alignSelf: "center",
    width: "90%",
    alignItems: "center",
    flexDirection:"row",
    justifyContent:'center'
  },
  addButtonText: {
    // textAlign:'center',
    fontSize:theme.fontSizes.size_16,
    fontWeight: "500",
    color: "#FFFFFF",
    marginLeft:5
  },
});

export default ReminderListScreen;
