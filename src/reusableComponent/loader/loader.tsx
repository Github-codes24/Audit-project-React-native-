import React from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";

const Loader = ({ isLoading, message, backgroundColor = "rgba(0, 0, 0, 0.5)", color = "#592951" }) => {
  if (!isLoading) return null;

  return (
    <View style={[styles.loaderContainer, { backgroundColor }]}>
      <ActivityIndicator size="large" color={color} />
      {message && <Text style={styles.loaderText}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  loaderText: {
    marginTop: 10,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Loader;
