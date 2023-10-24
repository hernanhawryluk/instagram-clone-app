import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import React from "react";
import { View, StyleSheet } from "react-native";
import SIZES from "../../../constants/SIZES";

const StoriesSkeleton = () => {
  return (
    <View>
      <SkeletonPlaceholder
        backgroundColor={"#333"}
        highlightColor={"#666"}
        speed={1500}
        borderRadius={15}
      >
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
      </SkeletonPlaceholder>
    </View>
  );
};
export default StoriesSkeleton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginTop: 4,
    marginHorizontal: 6,
    opacity: 0.3,
    marginBottom: 20,
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
    width: 83,
    height: 83,
    borderRadius: 100,
  },
  text: {
    height: 12,
    width: 70,
    borderRadius: 15,
  },
});
