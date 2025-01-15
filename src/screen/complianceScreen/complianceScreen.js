import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { theme } from "../../utils";
import * as Svg from "../../asstets/images/svg";
import CustomButton from "../../reusableComponent/button/button";
import CategorySelector from "../../reusableComponent/categoryList/categoryList";
import QuestionCard from "../../reusableComponent/categoryList/questionComponent";
import { ScrollView } from "react-native-gesture-handler";
import QuestionSection from "../../reusableComponent/questionList/questionSection";
import { useCalculateCompilanceScoreMutation } from "../../redux/apiSlice/complianceApiSlice";
import Loader from "../../reusableComponent/loader/loader";
import ComplianceResult from "../../reusableComponent/result/complianceResult";
const ComplianceScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [step, setStep] = useState('category');
 const [selectedCategory, setSelectedCategory] = useState();


 const [
  calculateCompilanceScore,
  {
    isLoading: isLoadingCalculateCompilanceScore,
    isError: isErrorCalculateCompilanceScore, 
    isSuccess: isSuccessCalculateCompilanceScore
  }
]= useCalculateCompilanceScoreMutation()

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
    
    calculateCompilanceScore(payload)
    setStep('result');
  }



  return (
    <View style={styles.main}>
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

          {/* Loader */}
          {isLoadingCalculateCompilanceScore && (
       <Loader isLoading={isLoadingCalculateCompilanceScore} />
      )}
     
      {step==='category' && (
        <CategorySelector
          handleSelect={handleSelect}
          onTakeTest={handleTakeTest}
          checkerType="compliance"
        />
      )
      }
   
   {step==='question' &&
   <QuestionSection
        selectedCategory={selectedCategory}
        handleOptionSelect={handleOptionSelect}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        onSubmit={onSubmit}
      />

}

{
  step === 'result' && (  
    <ComplianceResult
    scorePercentage={60}
    onPressRetakeExam={()=>setStep('category')} 
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

export default ComplianceScreen;
