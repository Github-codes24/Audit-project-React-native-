import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import QuestionCard from "../categoryList/questionComponent";
import { useGetcompilanceQuestionsQuery,useCalculateCompilanceScoreMutation } from "../../redux/apiSlice/complianceApiSlice";
import { useGetEligibilityQuestionsQuery } from "../../redux/apiSlice/eligibilityApiSlice";
import Loader from "../loader/loader";
import { ScrollView } from "react-native-gesture-handler";
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

  console.log('selectedAnswers@@',selectedAnswers)

  const {
    isLoading: isLoadingComplianceQuestions,
    isError: isErrorComplianceQuestions,
    data: complianceQuestions,
  }= useGetcompilanceQuestionsQuery({
    category: selectedCategory?.data?.name,
   },{
    skip: checkerType === 'eligibility'
  })


console.log('complianceQuestions',complianceQuestions)



  const [
    calculateCompilanceScore,
    {
      isLoading: isLoadingCalculateCompilanceScore,
      isError: isErrorCalculateCompilanceScore, 
      isSuccess: isSuccessCalculateCompilanceScore
    }
  ]= useCalculateCompilanceScoreMutation()
 
const questions = checkerType === 'compliance' ? complianceQuestions?.data : eligibilityQuestions?.data;
  const getQuestionsToDisplay = () => {
    return questions?.slice(currentIndex, currentIndex + 3);
  };


  const handlePreviousLocal = () => {
    if (currentIndex - 3 >= 0) {
      setCurrentIndex((prevIndex) => prevIndex - 3);
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
    if (currentIndex + 3 < questions?.length) {
      setCurrentIndex((prevIndex) => prevIndex + 3);
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
    <View>
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
          questionNumber={currentIndex + index + 1} // Add this line
          totalQuestions={questions?.length} // Add this line
          
        />
      ))}

      <View style={styles.navigationButtons}>
        <TouchableOpacity style={styles.buttonStyle} onPress={handlePreviousLocal}>
          <Text style={{ color: "white" }}>Previous</Text>
        </TouchableOpacity>
        {currentIndex + 3 >= questions?.length ? (
        <TouchableOpacity style={styles.buttonStyle} onPress={handleSubmit}>
          <Text style={{ color: "white" }}>Submit</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.buttonStyle} onPress={handleNextLocal}>
          <Text style={{ color: "white" }}>Next</Text>
        </TouchableOpacity>
      )}
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
  },
  selectedCategoryText: {
    fontSize: 18,
    margin: 10,
    fontWeight: "600",
  },
  navigationButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
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
