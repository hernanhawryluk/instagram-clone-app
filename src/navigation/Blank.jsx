import { StyleSheet, View } from "react-native";
import React from "react";

const Blank = () => {
  return <View style={styles.container}></View>;
};

export default Blank;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
