import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator,ScrollView, RefreshControl } from "react-native";
import { theme } from "../../utils";
import * as Svg from "../../assets/images/svg";
import CustomButton from "../../reusableComponent/button/button";
import CategorySelector from "../../reusableComponent/categoryList/categoryList";
import QuestionCard from "../../reusableComponent/categoryList/questionComponent";

import QuestionSection from "../../reusableComponent/questionList/questionSection";
import { useCalculateCompilanceScoreMutation } from "../../redux/apiSlice/complianceApiSlice";
import Loader from "../../reusableComponent/loader/loader";
import ComplianceResult from "../../reusableComponent/result/complianceResult";
import Header from "../../reusableComponent/header/header";
import { getLoginResponse } from "../../redux/stateSelector";
import { useSelector } from "react-redux";

const ComplianceScreen = () => {
const response=useSelector(getLoginResponse)
   
const userId=response?.data?.id

console.log('userId90798786',userId)

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [step, setStep] = useState('category');
 const [selectedCategory, setSelectedCategory] = useState();
   const [refreshing, setRefreshing] = useState(false);

 console.log('selectedCategory',selectedCategory)

  const actualScore = calculateCompilanceScoreData?.scorePercentage;

let displayScore;
if (actualScore === 10) {
  displayScore = 0;
} else if (actualScore === 90) {
  displayScore = 100;
} else if (actualScore % 1 === 0) {
  displayScore = actualScore;
} else {
  displayScore = actualScore?.toFixed(2);
}


 const [
  calculateCompilanceScore,
  {
    isLoading: isLoadingCalculateCompilanceScore,
    isError: isErrorCalculateCompilanceScore, 
    isSuccess: isSuccessCalculateCompilanceScore,
    data: calculateCompilanceScoreData,
  }
]= useCalculateCompilanceScoreMutation()


useEffect(() => {
  if (isSuccessCalculateCompilanceScore) {
    setStep('result');
  }
}, [isSuccessCalculateCompilanceScore]);


  const handleOptionSelect = (selectedOption, questionId) => {
  console.log(
    `Selected Option for Question ${questionId}:`,
    selectedOption
  );
};

  const handleTakeTest = () => {
    setStep('question');
  };

  const handleSelect = (selectedCategory) => {
    setSelectedCategory(selectedCategory)
  
  };


  const handlePrevious = (stepFlag) => {
   if(stepFlag){
  setStep('category');
}
    
  };

  const handleNext = () => {
    // setStep('result')
  };

  const onSubmit = (payload) => { 
    const newPayload={
      userId:userId,
      ...payload 
    }
    calculateCompilanceScore(newPayload)
  }

const onRefresh = () => {
    setRefreshing(true);
    // Simulate an API call or data fetch
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };



  return (
    <View style={styles.main}>
   <Header/>

          {/* Loader */}
          {isLoadingCalculateCompilanceScore && (
       <Loader isLoading={isLoadingCalculateCompilanceScore} />
      )}
     
      {step==='category' && (
        // <ScrollView style={{}}
        // >
         
        <CategorySelector
          handleSelect={handleSelect}
          onTakeTest={handleTakeTest}
          checkerType="compliance"
        />
       
      //  </ScrollView>
      )
      }
   
   {step==='question' &&
   <ScrollView>
   <QuestionSection
        selectedCategory={selectedCategory}
        handleOptionSelect={handleOptionSelect}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        onSubmit={onSubmit}
      />
</ScrollView>
}

{
  step === 'result' && (  
    <ComplianceResult
      scorePercentage={
        calculateCompilanceScoreData?.scorePercentage === 10
          ? 0   
          : calculateCompilanceScoreData?.scorePercentage === 90
            ? 100  
            : calculateCompilanceScoreData?.scorePercentage
      }
      displayScore={
        calculateCompilanceScoreData?.scorePercentage === 10
          ? 10
          : calculateCompilanceScoreData?.scorePercentage === 90
            ? 90
            : calculateCompilanceScoreData?.scorePercentage % 1 === 0
              ? calculateCompilanceScoreData?.scorePercentage
              : calculateCompilanceScoreData?.scorePercentage?.toFixed(2)
      }
      onPressRetakeExam={() => setStep('category')} 
    />
  )
}



      
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#F2F3F5",
  },
  buttonStyle:{
 alignItems:"center",
justifyContent:"center",
width:theme.horizontalSpacing.space_110,
height:theme.verticalSpacing.space_50, 
backgroundColor:theme.lightColor.brownColor ,
borderRadius:10,
marginHorizontal:19
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
    
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
   marginLeft:theme.horizontalSpacing.space_10
  },
  welcomeText: {
    color: theme.lightColor.whiteColor,
  },
  userName: {
    color: theme.lightColor.whiteColor,
    fontSize: theme.fontSizes.size_24,
  },
  selectedCategoryText: {
    fontSize: 18,
    margin: 10,
    fontWeight: "600",
  },
  navigationButtons: {
    flexDirection: "row",
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
  },
});

export default ComplianceScreen;
