import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { theme } from "../../utils";
import * as Svg from '../../asstets/images/svg'

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const CustomModal = ({
  visible,
  onClose,
  title,
  titleTextStyle = {},
  descriptionTextStyle = {},
  description,
  buttons,
  size = "50%",
}) => {
  const sizePercentage = {
    "25%": SCREEN_HEIGHT * 0.25,
    "50%": SCREEN_HEIGHT * 0.5,
    "75%": SCREEN_HEIGHT * 0.75,
    "80%": SCREEN_HEIGHT * 0.8,
    "100%": SCREEN_HEIGHT,
  };

  const modalHeight = sizePercentage[size] || sizePercentage["50%"];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={styles.overlay}>
        <View style={[styles.bottomSheetContainer, { maxHeight: modalHeight }]}>
          {/* Title */}
          <Text style={[styles.title, titleTextStyle]}>{title}</Text>

          {/* Description */}
          {description.length > 150 ? (
            <ScrollView
              style={styles.descriptionContainer}
              showsVerticalScrollIndicator={false}
            >
              <Text style={[styles.description, descriptionTextStyle]}>
                {description}
              </Text>
            </ScrollView>
          ) : (
            <View style={styles.descriptionWrapper}>
              <Text style={styles.description}>{description}</Text>
            </View>
          )}

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  button.type === "primary"
                    ? styles.primaryButton
                    : styles.secondaryButton,
                  button.type === "text" ? { borderWidth: 0 } : {},
                  { flexDirection: "row", alignItems: "center" }, // Flex to align text and icon
                ]}
                onPress={() => {
                  button.onPress();
                  if (onClose) onClose();
                }}
              >
                <Text
                  style={[
                    styles.buttonText,
                    button.type === "primary"
                      ? styles.primaryButtonText
                      : styles.secondaryButtonText,
                  ]}
                >
                  {button.label}
                </Text>
                {button.label.toLowerCase().includes("cookies") && (
                  <View style={{marginLeft:5}}>
                  <Svg.Arrow style={styles.arrowIcon} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  bottomSheetContainer: {
    backgroundColor: theme.lightColor.brownColor,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    width: "100%",
    paddingBottom: theme.verticalSpacing.space_40,
  },
  title: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: theme.fontSizes.size_24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 15,
  },
  descriptionContainer: {
    flexGrow: 1,
    marginBottom: 20,
  },
  descriptionWrapper: {
    marginBottom: 20,
  },
  description: {
    fontSize: theme.fontSizes.size_16,
    color: "#E8E8E8",
    lineHeight: 24,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "column",
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    width: "100%", // Ensure the button spans the full width
  },
  primaryButton: {
    backgroundColor: "#FFFFFF",
  },
  primaryButtonText: {
    color: "#4A235A",
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  secondaryButtonText: {
    color: "#FFFFFF",
  },
  arrowIcon: {
    marginLeft: 10, 
  },
});

export default CustomModal;
