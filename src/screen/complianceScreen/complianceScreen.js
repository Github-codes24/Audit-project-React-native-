import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import { theme } from "../../utils";
import * as Svg from "../../assets/images/svg";
import CategorySelector from "../../reusableComponent/categoryList/categoryList";
import QuestionSection from "../../reusableComponent/questionList/questionSection";
import { useCalculateCompilanceScoreMutation } from "../../redux/apiSlice/complianceApiSlice";
import Loader from "../../reusableComponent/loader/loader";
import ComplianceResult from "../../reusableComponent/result/complianceResult";
import Header from "../../reusableComponent/header/header";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCompliance,
  setComplianceResult,
  setComplianceTestGiven,
} from "../../redux/stateSlice/complianceStateSlice";
import { getLoginResponse } from "../../redux/stateSelector";
import {
  getComplianceResult,
  getIsComplianceTestGiven,
} from "../../redux/stateSelector/complinceStateSelector";
import { useIsFocused } from "@react-navigation/native";

const ComplianceScreen = () => {
  const response = useSelector(getLoginResponse);
  const userId = response?.data?.id;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [step, setStep] = useState("category");
  const [selectedCategory, setSelectedCategory] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const isComplaincetestGiven = useSelector(getIsComplianceTestGiven);
  const result = useSelector(getComplianceResult);
  const score = result?.scorePercentage;

  const scorePercentage =
    score === 10 ? 0 : score === 90 ? 100 : score;

  const displayScore =
    score === 10
      ? 10
      : score === 90
      ? 90
      : score % 1 === 0
      ? score
      : Number(score)?.toFixed(2);

  const [
    calculateCompilanceScore,
    {
      isLoading: isLoadingCalculateCompilanceScore,
      isError: isErrorCalculateCompilanceScore,
      isSuccess: isSuccessCalculateCompilanceScore,
      data: calculateCompilanceScoreData,
    },
  ] = useCalculateCompilanceScoreMutation();

  useEffect(() => {
    if (isSuccessCalculateCompilanceScore) {
      setStep("result");
      dispatch(setComplianceTestGiven(true));
      dispatch(setComplianceResult(calculateCompilanceScoreData));
    }
  }, [isSuccessCalculateCompilanceScore]);

  useEffect(() => {
    if (isComplaincetestGiven) {
      setStep("result");
    }
  }, [isComplaincetestGiven, isFocused]);

  const handleOptionSelect = (selectedOption, questionId) => {
    console.log(
      `Selected Option for Question ${questionId}:`,
      selectedOption
    );
  };

  const handleTakeTest = () => {
    setStep("question");
  };

  const handleSelect = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };

  const handlePrevious = (stepFlag) => {
    if (stepFlag) {
      setStep("category");
    }
  };

  const handleNext = () => {
    // Future implementation
  };

  const onSubmit = (payload) => {
    const newPayload = {
      userId: userId,
      ...payload,
    };
    calculateCompilanceScore(newPayload);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <View style={styles.main}>
      <Header />

      {isLoadingCalculateCompilanceScore && (
        <Loader isLoading={isLoadingCalculateCompilanceScore} />
      )}

      {step === "category" && (
        <CategorySelector
          handleSelect={handleSelect}
          onTakeTest={handleTakeTest}
          checkerType="compliance"
        />
      )}

      {step === "question" && (
        <ScrollView>
          <QuestionSection
            selectedCategory={selectedCategory}
            handleOptionSelect={handleOptionSelect}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            onSubmit={onSubmit}
          />
        </ScrollView>
      )}

      {step === "result" && (
        <ComplianceResult
          scorePercentage={scorePercentage}
          displayScore={displayScore}
          onPressRetakeExam={() => {
            dispatch(resetCompliance())
            setStep("category");
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#F2F3F5",
  },
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: theme.horizontalSpacing.space_110,
    height: theme.verticalSpacing.space_50,
    backgroundColor: theme.lightColor.brownColor,
    borderRadius: 10,
    marginHorizontal: 19,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
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
    marginLeft: theme.horizontalSpacing.space_10,
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
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});

export default ComplianceScreen;
