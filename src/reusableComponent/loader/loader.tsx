import React from "react";
import { StyleSheet, View, ActivityIndicator, Text, Modal } from "react-native";

const Loader = ({ isLoading, message, backgroundColor = "rgba(0, 0, 0, 0.1)", color = "#592951" }) => {
  return (
    <Modal
      visible={isLoading}
      transparent={true}
      animationType="none"
      onRequestClose={() => {}} // Optional: Prevents closing on back button press for Android
    >
      <View style={[styles.loaderContainer, { backgroundColor }]}>
        <ActivityIndicator size="large" color={color} />
        {message && <Text style={styles.loaderText}>{message}</Text>}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1, // Fills the entire screen
    justifyContent: "center", // Centers content vertically
    alignItems: "center", // Centers content horizontally
  },
  loaderText: {
    marginTop: 10,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Loader;
