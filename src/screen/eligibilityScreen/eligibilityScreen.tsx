import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { theme } from "../../utils";
import * as Svg from "../../asstets/images/svg";
import CustomButton from "../../reusableComponent/button/button";
import CategorySelector from "../../reusableComponent/categoryList/categoryList";
import QuestionCard from "../../reusableComponent/categoryList/questionComponent";
import { ScrollView } from "react-native-gesture-handler";
import QuestionSection from "../../reusableComponent/questionList/questionSection";
import EligibityResult from "../../reusableComponent/result/eligibilityResult";
import Header from "../../reusableComponent/header/header";
import { useCalculateCompilanceScoreMutation } from "../../redux/apiSlice/complianceApiSlice";
import { useCalculateEligibilityScoreMutation } from "../../redux/apiSlice/eligibilityApiSlice";

const EligibilityScreen = () => {
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [step, setStep] = useState('category');
  const [selectedCategory, setSelectedCategory] = useState();

  const [
 calculateEligibilityScore,
  {
    isLoading: isLoadingCalculateCompilanceScore,
    isError: isErrorCalculateCompilanceScore, 
    isSuccess: isSuccessCalculateCompilanceScore,
    data: calculateCompilanceScoreData,
  }
]= useCalculateEligibilityScoreMutation()


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
    calculateEligibilityScore(payload)
    setStep('result');
  }

  return (
    <View style={styles.main}>
      <Header/>
     
      {step==='category' && ( 
        <ScrollView style={{marginBottom:theme.verticalSpacing.space_100}}>
        <CategorySelector
          handleSelect={handleSelect}
          onTakeTest={handleTakeTest}
          checkerType="eligibility"
        />  
        </ScrollView>
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
