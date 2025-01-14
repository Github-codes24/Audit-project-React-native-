import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { theme } from "../../utils";
import * as Svg from "../../asstets/images/svg";
import CustomButton from "../../reusableComponent/button/button";
import CategorySelector from "../../reusableComponent/categoryList/categoryList";
import QuestionCard from "../../reusableComponent/categoryList/questionComponent";
import { ScrollView } from "react-native-gesture-handler";

const questions = [
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
];

const ComplianceScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [step, setStep] = useState('category');
 
 
  const [categories, setCategories] = useState([
    { id: 1, name: "General", isSelected: false },
    { id: 2, name: "Food", isSelected: false },
    { id: 3, name: "Health", isSelected: false },
    { id: 4, name: "Sports", isSelected: false },
  ]);

  const handleOptionSelect = (selectedOption, questionId) => {
  console.log(
    `Selected Option for Question ${questionId}:`,
    selectedOption
  );
};

  const handleTakeTest = () => {
    setStep('question');
  };

  const handleSelect = (id) => {
    setCategories((prev) =>
      prev.map((category) => ({
        ...category,
        isSelected: category.id === id,
      }))
    );
  };

  const getQuestionsToDisplay = () => {
    return questions.slice(currentIndex, currentIndex + 3);
  };

  const handlePrevious = () => {
    if (currentIndex - 3 >= 0) {
      setCurrentIndex((prevIndex) => prevIndex - 3);
    }
  };

  const handleNext = () => {
    if (currentIndex + 3 < questions.length) {
      setCurrentIndex((prevIndex) => prevIndex + 3);
    }
  };

  // Find the selected category
  const selectedCategory = categories.find((category) => category.isSelected);

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
     
      {step==='category' && (
        <CategorySelector
          categoryList={categories}
          handleSelect={handleSelect}
          onTakeTest={handleTakeTest}
        />
      )
      }
   
   {step==='question' &&
        <> 
          <Text style={styles.header}>Sponsor License Compliance Checker</Text>
          <Text style={styles.selectedCategoryText}>
            Selected Category (Q&A): {selectedCategory ? selectedCategory.name : "None"}
          </Text>
         
          {getQuestionsToDisplay().map((questionData, index) => (
            <QuestionCard
              key={questionData.id}
              question={questionData.question}
              options={questions[currentIndex].options}
              onSelect={(selectedOption) => handleOptionSelect(selectedOption, questionData.id)}
              currentIndex={questionData.id}
              totalQuestions={questions.length}

            />
          ))}
        
          <View style={styles.navigationButtons}>
            <TouchableOpacity style={styles.buttonStyle}
            onPress={handlePrevious}
            >
                <Text style={{color:'white'}}>{'Previous'}</Text>
            </TouchableOpacity>
            {/* <CustomButton title="Previous" onPress={handlePrevious} /> */}
               <TouchableOpacity style={styles.buttonStyle}
               onPress={handleNext}
               >
                <Text style={{color:'white'}}>{'Next'}</Text>
            </TouchableOpacity>
          </View>
        </>

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
