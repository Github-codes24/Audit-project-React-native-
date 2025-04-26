import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity,ScrollView } from "react-native";
import { theme } from "../../utils";
import CategorySelector from "../../reusableComponent/categoryList/categoryList";

import QuestionSection from "../../reusableComponent/questionList/questionSection";
import EligibityResult from "../../reusableComponent/result/eligibilityResult";
import Header from "../../reusableComponent/header/header";
import { useCalculateEligibilityScoreMutation } from "../../redux/apiSlice/eligibilityApiSlice";
import { useSelector } from "react-redux";
import { getLoginResponse } from "../../redux/stateSelector";

const EligibilityScreen = () => {
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [step, setStep] = useState('category');
  const [selectedCategory, setSelectedCategory] = useState();



const response=useSelector(getLoginResponse)
   
const userId=response?.data?.id

console.log('userId90798786',userId)




  const [
 calculateEligibilityScore,
  {
    isLoading: isLoadingCalculateCompilanceScore,
    isError: isErrorCalculateCompilanceScore, 
    isSuccess: isSuccessCalculateCompilanceScore,
    data: calculateCompilanceScoreData,
  }
]= useCalculateEligibilityScoreMutation()



console.log('calculateCompilanceScoreData354365',calculateCompilanceScoreData)

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
  };

const onSubmit = (payload) => {
const newPayload={
    userId:userId,
    ...payload
}
    calculateEligibilityScore(newPayload)
    setStep('result');
  }

  return (
    <View style={styles.main}>
      <Header/>
      {step==='category' && ( 
   
         
        <CategorySelector
          handleSelect={handleSelect}
          onTakeTest={handleTakeTest}
          checkerType="eligibility"
        />  
       
       
      )
      }
   
   {step==='question' &&
   <ScrollView style={{marginBottom:theme.verticalSpacing.space_100}}>
   <QuestionSection
        selectedCategory={selectedCategory}
        handleOptionSelect={handleOptionSelect}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        checkerType="eligibility"
        onSubmit={onSubmit}
      />
      </ScrollView>

}

{
  step==='result' && <EligibityResult
  isEligible={calculateCompilanceScoreData?.isEligible?.toLowerCase() ==='eligible'}
  eligibilityImage={calculateCompilanceScoreData?.eligibilityImage}
   eligibleText1={calculateCompilanceScoreData?.eligibleText1}
  eligibleText2={calculateCompilanceScoreData?.eligibleText2}
  onPressRetakeExam={()=>{ 
    setStep('category')
  }}
  />
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
marginHorizontal:20
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

export default EligibilityScreen;
