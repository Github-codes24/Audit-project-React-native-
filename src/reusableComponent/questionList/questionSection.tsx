import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import QuestionCard from "../categoryList/questionComponent";
import { useGetcompilanceQuestionsQuery, useCalculateCompilanceScoreMutation } from "../../redux/apiSlice/complianceApiSlice";
import { useGetEligibilityQuestionsQuery } from "../../redux/apiSlice/eligibilityApiSlice";
import Loader from "../loader/loader";
import { theme } from "../../utils";

const QuestionSection = ({
  selectedCategory,
  handlePrevious,
  handleNext,
  checkerType = 'compliance',
  onSubmit
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
   const [errorType, setErrorType] = useState(null);
  const {
    isLoading: isLoadingEligibilityQuestions,
    isError: isErrorEligibilityQuestions,
    data: eligibilityQuestions,
  } = useGetEligibilityQuestionsQuery({
    category: selectedCategory?.name,
  }, {
    skip: checkerType === 'compliance'
  });

  const {
    isLoading: isLoadingComplianceQuestions,
    isError: isErrorComplianceQuestions,
    data: complianceQuestions,
  } = useGetcompilanceQuestionsQuery({
    category: selectedCategory?.name,
  }, {
    skip: checkerType === 'eligibility'
  });

  const questions = checkerType === 'compliance' ? complianceQuestions?.data : eligibilityQuestions?.data;
  const getQuestionsToDisplay = () => {
    return questions?.slice(currentIndex, currentIndex + 2);
  };

  const handlePreviousLocal = () => {
    if (currentIndex - 2 >= 0) {
      setCurrentIndex((prevIndex) => prevIndex - 2);
      handlePrevious?.(false);
    } else {
      handlePrevious?.(true);
    }
    setErrorMessage('');
  };

  const handleOptionSelect = (selectedOption, questionId) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
    setErrorMessage('');
  };

  const handleNextLocal = () => {
    const currentQuestions = getQuestionsToDisplay();
    const allAnswered = currentQuestions?.every(q => selectedAnswers[q?._id] !== undefined);

    if (!allAnswered) {
      setErrorMessage('Please answer all questions before proceeding.');
     
      return;
    }

    if (currentIndex + 2 < questions?.length) {
      setCurrentIndex((prevIndex) => prevIndex + 2);
      handleNext?.();
      setErrorMessage('');
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
  const currentQuestions = getQuestionsToDisplay();

  if (!currentQuestions || currentQuestions.length === 0) {
    setErrorMessage('No questions found for this category.');
     setErrorType('noQuestions');
    return;
  }

  const allAnswered = currentQuestions.every(q => selectedAnswers[q._id] !== undefined);

  if (!allAnswered) {
    setErrorMessage('Please answer all questions before submitting.');
     setErrorType('incomplete');
   
    return;
  }
setErrorMessage('');
setErrorType(null);
  const payload = createPayload(selectedCategory, selectedAnswers);
  onSubmit?.(payload);
};


  return (
    <ScrollView style={{ marginBottom: theme.verticalSpacing.space_100 }}>
      <View>
        <Loader isLoading={isLoadingComplianceQuestions || isLoadingEligibilityQuestions} />
        <Text style={styles.header}>{
          checkerType === 'compliance'
            ? 'Check Your Sponsor Licence Compliance Score'
            : 'Check Your Eligibility For Sponsor Licence'
        }</Text>

        {getQuestionsToDisplay()?.map((questionData, index) => (
          <QuestionCard
            key={questionData?._id}
            question={questionData?.questions?.questionText}
            options={questionData?.questions?.answerOptions}
            selectedOption={selectedAnswers[questionData?._id]}
            onSelect={(selectedOption) => handleOptionSelect(selectedOption, questionData?._id)}
            questionNumber={currentIndex + index + 1}
            totalQuestions={questions?.length}
          />
        ))}
          
{errorMessage !== '' && (
  <View style={[
    styles.errorBox,
    errorType === 'noQuestions' ? styles.errorBoxCritical : styles.errorBoxWarning
  ]}>
    <Text style={styles.errorText}>{errorMessage}</Text>
  </View>
)}
        <View style={styles.navigationButtons}>
          {currentIndex + 2 >= questions?.length ? (
            <View style={styles.navigationButtons}>
              <TouchableOpacity style={{ backgroundColor: "white", borderWidth: 0.3, width: theme.horizontalSpacing.space_110, height: theme.verticalSpacing.space_50, alignItems: "center", justifyContent: 'center', borderRadius: 10 }} onPress={handlePreviousLocal}>
                <Text style={{ color: theme.lightColor.brownColor, fontWeight: '500', fontSize: theme.fontSizes.size_16 }}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.buttonStyle, { width: theme.horizontalSpacing.space_374, marginTop: 20 }]} onPress={handleSubmit}>
                <Text style={{ color: "white", fontWeight: '500', fontSize: theme.fontSizes.size_16 }}>Submit</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={[styles.navigationButtons, { flexDirection: "row" }]}> 
              <TouchableOpacity style={styles.buttonStyle} onPress={handlePreviousLocal}>
                <Text style={{ color: "white", fontWeight: '500', fontSize: theme.fontSizes.size_16 }}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonStyle} onPress={handleNextLocal}>
                <Text style={{ color: "white", fontWeight: '500', fontSize: theme.fontSizes.size_16 }}>Next</Text>
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
    fontSize: theme.fontSizes.size_18,
    fontWeight: "700",
    marginTop: theme.verticalSpacing.space_20,
    marginLeft: theme.horizontalSpacing.space_20
  },
  errorText: {
    color: 'red',
    fontSize: theme.fontSizes.size_14,
    marginLeft: theme.horizontalSpacing.space_20,
    marginBottom: theme.verticalSpacing.space_10,
  },
  navigationButtons: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.verticalSpacing.space_20,
  },
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: theme.horizontalSpacing.space_173,
    height: theme.verticalSpacing.space_50,
    backgroundColor: "#592951",
    borderRadius: 10,
    marginHorizontal: theme.horizontalSpacing.space_12
  },
  errorBox: {
  padding: 10,
  borderRadius: 8,
  marginTop: 12,
  marginBottom: 8,
},

errorBoxCritical: {
   alignItems:"center"
  
 
},

errorBoxWarning: {
 
  
 
},



});

export default QuestionSection;