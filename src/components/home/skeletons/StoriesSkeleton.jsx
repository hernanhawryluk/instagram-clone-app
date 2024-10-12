import React from "react";
import { View, StyleSheet } from "react-native";

const StoriesSkeleton = () => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <View style={styles.image} />
          <View style={styles.text} />
        </View>
        <View style={styles.verticalContainer}>
          <View style={styles.image} />
          <View style={styles.text} />
        </View>
        <View style={styles.verticalContainer}>
          <View style={styles.image} />
          <View style={styles.text} />
        </View>
        <View style={styles.verticalContainer}>
          <View style={styles.image} />
          <View style={styles.text} />
        </View>
        <View style={styles.verticalContainer}>
          <View style={styles.image} />
          <View style={styles.text} />
        </View>
        <View style={styles.verticalContainer}>
          <View style={styles.image} />
          <View style={styles.text} />
        </View>
        <View style={styles.verticalContainer}>
          <View style={styles.image} />
          <View style={styles.text} />
        </View>
        <View style={styles.verticalContainer}>
          <View style={styles.image} />
          <View style={styles.text} />
        </View>
      </View>
    </View>
  );
};
export default StoriesSkeleton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginTop: 11,
    marginHorizontal: 6,
    opacity: 0.3,
  },
  rowContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  verticalContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 100,
  },
  text: {
    height: 12,
    width: 70,
    borderRadius: 15,
  },
});
