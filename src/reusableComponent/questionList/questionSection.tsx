import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import QuestionCard from "../categoryList/questionComponent";
import { useGetcompilanceQuestionsQuery } from "../../redux/apiSlice/complianceApiSlice";
import { useGetEligibilityQuestionsQuery } from "../../redux/apiSlice/eligibilityApiSlice";
const QuestionSection = ({
  selectedCategory,
  handleOptionSelect,
  handlePrevious,
  handleNext,
  checkerType='compliance',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const {
    isLoading: isLoadingEligibilityQuestions,
    isError: isErrorEligibilityQuestions,
    data: eligibilityQuestions,
  }= useGetEligibilityQuestionsQuery({
    category: selectedCategory?._id
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
    return questions.slice(currentIndex, currentIndex + 3);
  };

console.log('questions##',getQuestionsToDisplay())

  const handlePreviousLocal = () => {
    if (currentIndex - 3 >= 0) {
      setCurrentIndex((prevIndex) => prevIndex - 3);
      handlePrevious?.();
    }
  };

  const handleNextLocal = () => {
    if (currentIndex + 3 < questions.length) {
      setCurrentIndex((prevIndex) => prevIndex + 3);
      handleNext?.();
    }
  };

  return (
    <View>
        {checkerType==='compliance' ?
      <Text style={styles.header}>Sponsor License Compliance Checker</Text>
      :      <Text style={styles.header}>Sponsor License Eligibilty Checker</Text>
        }
      <Text style={styles.selectedCategoryText}>
        Selected Category (Q&A): {selectedCategory ? selectedCategory?.name : "None"}
      </Text>

      {getQuestionsToDisplay().map((questionData) => (
        <QuestionCard
          key={questionData?.id}
          question={questionData?.questions?.questionText}
          options={questionData?.questions?.answerOptions}
          onSelect={(selectedOption) => handleOptionSelect(selectedOption, questionData.id)}
          currentIndex={questionData?.id}
          totalQuestions={questions.length}
        />
      ))}

      <View style={styles.navigationButtons}>
        <TouchableOpacity style={styles.buttonStyle} onPress={handlePreviousLocal}>
          <Text style={{ color: "white" }}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress={handleNextLocal}>
          <Text style={{ color: "white" }}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    backgroundColor: "#592951", // Example brown color
    borderRadius: 10,
    marginHorizontal: 20,
  },
});

export default QuestionSection;
