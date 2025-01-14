import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import QuestionCard from "../categoryList/questionComponent";

const QuestionSection = ({
  selectedCategory,
  handleOptionSelect,
  handlePrevious,
  handleNext,
}) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Simulate fetching questions (Replace with actual API call later)
  useEffect(() => {
    const fetchQuestions = async () => {
      // Simulating an API response
      const fetchedQuestions = [
        {
          id: 1,
          question: "What is the compliance audit?",
          options: ["Yes", "No"],
        },
        {
          id: 2,
          question: "Is the process automated?",
          options: ["Yes", "No"],
        },
        {
          id: 3,
          question: "Does it meet compliance standards?",
          options: ["Yes", "No"],
        },
        {
          id: 4,
          question: "Are policies regularly reviewed?",
          options: ["Yes", "No"],
        },
        {
          id: 5,
          question: "Is the training program updated?",
          options: ["Yes", "No"],
        },
      ];
      setQuestions(fetchedQuestions);
    };

    fetchQuestions();
  }, []);

  const getQuestionsToDisplay = () => {
    return questions.slice(currentIndex, currentIndex + 3);
  };

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
      <Text style={styles.header}>Sponsor License Compliance Checker</Text>
      <Text style={styles.selectedCategoryText}>
        Selected Category (Q&A): {selectedCategory ? selectedCategory?.name : "None"}
      </Text>

      {getQuestionsToDisplay().map((questionData) => (
        <QuestionCard
          key={questionData?.id}
          question={questionData?.question}
          options={questionData.options}
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
