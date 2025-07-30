import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

const Loader = ({ isLoading, message, color = "#592951" }) => {
  if (!isLoading) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color={color} />
        {message && <Text style={styles.text}>{message}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    pointerEvents: "none", 
    zIndex: 999,
  },
  content: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Loader;
