import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Svg from '../../asstets/images/svg';
import { theme } from "../../utils";

const QuestionCard = ({
  question,
  options = ["Yes", "No"], // Default options
  selectedOption, // Controlled prop for the selected option
  onSelect, // Callback when an option is selected
  questionNumber,
  totalQuestions,
}) => {
  return (
    <View style={styles.card}>

      
      <View style={{  flexDirection: 'row', padding: 10,width:theme.horizontalSpacing.space_285 }}>
  <Text style={{ flexShrink: 1, marginRight: 10,fontSize:theme.fontSizes.size_16,fontWeight:'500' }}>{question}</Text>
  <Text style={{ flexShrink: 1,fontSize:theme.fontSizes.size_16,fontWeight:'500'  }}>{`${questionNumber}/${totalQuestions}`}</Text>
</View>
     <View style={styles.optionsContainer}>
        {options.map((option) => (
          <View
            key={option}
            style={{
              flexDirection: "row",
              borderWidth: 0.3,
              width: theme.horizontalSpacing.space_110,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 15,
              margin: 10,
            }}
          >
            <Text style={styles.optionText}>{option}</Text>
            <TouchableOpacity
              style={[
                styles.circleOption,
                selectedOption === option && styles.selectedOption,
              ]}
              onPress={() => onSelect(option)}
            >
              {selectedOption === option && <Svg.CheckIcon />}
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginHorizontal: 10,
  },
  questionNumber: {
    fontSize: 16,
    
  },
  question: {
    fontSize: 16,
    marginBottom: 8,
  },
  optionsContainer: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "center",
  },
  circleOption: {
    width: 25,
    height: 25,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
  },
  selectedOption: {
    borderColor: "#5c225b",
  },
  optionText: {
    fontSize: theme.fontSizes.size_16,
  },
});

export default QuestionCard;
