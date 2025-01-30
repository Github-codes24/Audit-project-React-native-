import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity,ScrollView } from "react-native";
import QuestionCard from "../categoryList/questionComponent";
import { useGetcompilanceQuestionsQuery,useCalculateCompilanceScoreMutation } from "../../redux/apiSlice/complianceApiSlice";
import { useGetEligibilityQuestionsQuery } from "../../redux/apiSlice/eligibilityApiSlice";
import Loader from "../loader/loader";

import { theme } from "../../utils";

const QuestionSection = ({
  selectedCategory,
  handlePrevious,
  handleNext,
  checkerType='compliance',
  onSubmit
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const {
    isLoading: isLoadingEligibilityQuestions,
    isError: isErrorEligibilityQuestions,
    data: eligibilityQuestions,
  }= useGetEligibilityQuestionsQuery({
    category: selectedCategory?.name,
  },{
    skip: checkerType === 'compliance'
  })


  const {
    isLoading: isLoadingComplianceQuestions,
    isError: isErrorComplianceQuestions,
    data: complianceQuestions,
  }= useGetcompilanceQuestionsQuery({
    category: selectedCategory?.name,
   },{
    skip: checkerType === 'eligibility'
  })
 
const questions = checkerType === 'compliance' ? complianceQuestions?.data : eligibilityQuestions?.data;
  const getQuestionsToDisplay = () => {
    return questions?.slice(currentIndex, currentIndex + 2);
  };

  const handlePreviousLocal = () => {
    if (currentIndex - 2 >= 0) {
      setCurrentIndex((prevIndex) => prevIndex - 2);
      handlePrevious?.(false);
    }
    else{
      handlePrevious?.(true);
    } 
  };

  const handleOptionSelect = (selectedOption, questionId) => {
    console.log(
      "Selected Option:",
      selectedOption,
      "Question ID:",
      questionId
    )
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleNextLocal = () => {
    if (currentIndex + 2 < questions?.length) {
      setCurrentIndex((prevIndex) => prevIndex + 2);
      handleNext?.();
    }
  };

  const createPayload = (selectedCategory, selectedAnswers) => {
    const questionsAndAnswers = Object.entries(selectedAnswers).map(
      ([questionId, answer]) => ({
        questionId,
        answer,
      })
    );
      return {
      category: selectedCategory?.name,
      questionsAndAnswers,
    };
  };

  const handleSubmit = () => {
    const payload = createPayload(selectedCategory, selectedAnswers);
    onSubmit?.(payload);
  };

  return (
    <ScrollView style={{marginBottom:theme.verticalSpacing.space_100}}>
    <View style={{}}>
        <Loader
        isLoading={isLoadingComplianceQuestions||isLoadingEligibilityQuestions}/>
        {checkerType==='compliance' ?
      <Text style={styles.header}>Sponsor License Compliance Checker</Text>
      :      <Text style={styles.header}>Sponsor License Eligibilty Checker</Text>
        }
      <Text style={styles.selectedCategoryText}>
        Q&A:
      </Text>

      {getQuestionsToDisplay()?.map((questionData,index) => (
        <QuestionCard
          key={questionData?.id}
          question={questionData?.questions?.questionText}
          options={questionData?.questions?.answerOptions}
          selectedOption={selectedAnswers[questionData?._id]}
          onSelect={(selectedOption) => handleOptionSelect(selectedOption, questionData?._id)}
          questionNumber={currentIndex + index + 1} 
          totalQuestions={questions?.length}
          
        />
      ))}

      <View style={styles.navigationButtons}>
        
       {currentIndex + 2 >= questions?.length ? (
        // When "Submit" button appears, move "Previous" button to top
        <View style={styles.navigationButtons}>
          <TouchableOpacity style={{backgroundColor:"white",borderWidth:.3,width:theme.horizontalSpacing.space_110,height:50,alignItems:"center",justifyContent:'center',borderRadius:10}} onPress={handlePreviousLocal}>
            <Text style={{alignSelf:'center',textAlign:"center", color:theme.lightColor.brownColor,fontWeight:'500',fontSize:15  }}>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.buttonStyle,{width:theme.horizontalSpacing.space_374,marginTop:20}]} onPress={handleSubmit}>
            <Text style={{ color: "white",fontWeight:'500',fontSize:15  }}>Submit</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Normal Previous/Next button layout
        <View style={[styles.navigationButtons,{flexDirection:"row"}]}>
          <TouchableOpacity style={styles.buttonStyle} onPress={handlePreviousLocal}>
            <Text style={{ color: "white",fontWeight:'500',fontSize:15  }}>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonStyle} onPress={handleNextLocal}>
            <Text style={{ color: "white",fontWeight:'500',fontSize:15  }}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize:theme.fontSizes.size_18,
    fontWeight: "700",
    marginTop:10,
    marginLeft:10
  },
  selectedCategoryText: {
    fontSize:16,
    margin:10,
    marginHorizontal:15,
    fontWeight: "400",

  },
  navigationButtons: {
   
    alignItems: "center",
    justifyContent: "center",
    marginTop:theme.verticalSpacing.space_50,
  },
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: 110,
    height: 50,
    backgroundColor: "#592951", 
    borderRadius: 10,
    marginHorizontal: 20,
  },
});

export default QuestionSection;
