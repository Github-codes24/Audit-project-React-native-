import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Svg from '../../asstets/images/svg'
import { theme } from "../../utils";
const QuestionCard = ({
  question,
  options, // options can be just ["Yes", "No"]
  currentIndex,
  totalQuestions,
  onSelect,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.question}>{question}</Text>

      <View style={styles.optionsContainer}>
        {/* Yes Option */}
        <View style={{flexDirection:'row',borderWidth:.3,width:theme.horizontalSpacing.space_110,height:40,justifyContent:"center",alignItems:"center",borderRadius:15}}>
          <Text style={styles.optionText}>Yes</Text>
        <TouchableOpacity
          style={[
            styles.circleOption,
            selectedOption === "Yes" && styles.selectedOption, 
          ]}
          onPress={() => handleOptionSelect("Yes")}
        >
          {selectedOption === "Yes" && (
           <Svg.CheckIcon/>
          )}
        </TouchableOpacity>
      </View>

        {/* No Option */}
        <View style={{flexDirection:'row',borderWidth:.3,width:theme.horizontalSpacing.space_110,height:40,justifyContent:"center",alignItems:"center",borderRadius:15,margin:10}}>
            <Text style={styles.optionText}>No</Text>
        <TouchableOpacity
          style={[
            styles.circleOption,
            selectedOption === "No" && styles.selectedOption, 
          ]}
          onPress={() => handleOptionSelect("No")}
        >
          
          {selectedOption === "No" && (
            <Svg.CheckIcon/>
            
          )}
        </TouchableOpacity>
      </View>
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
    // elevation: 3,
    marginHorizontal: 10,
    // borderWidth:.3
  },
  question: {
    fontSize: 16,
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    // justifyContent: "space-evenly", // Space out the options evenly
    marginBottom: 15,
    alignItems:"center"
    
  },
  circleOption: {
    width:25,
    height:25,
    borderRadius: 50, // Make it a circle
    borderWidth: 2,
    borderColor: "#ccc", // Default border color
    justifyContent: "center",
    alignItems: "center",
    marginLeft:20
  },
  selectedOption: {
    borderColor: "#5c225b", // Change border color when selected
  },
  selectedCircle: {
    width: 20,
    height: 20,
    borderRadius: 50, 
    backgroundColor: "#5c225b", 
  },
  optionText: {
fontSize:theme.fontSizes.size_16,
   
  },
});

export default QuestionCard;
