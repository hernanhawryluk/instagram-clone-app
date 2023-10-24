import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import React from "react";
import { View, StyleSheet } from "react-native";
import SIZES from "../../../constants/SIZES";

const PostsSkeleton = () => {
  return (
    <View>
      <SkeletonPlaceholder
        backgroundColor={"#333"}
        highlightColor={"#666"}
        speed={1500}
        borderRadius={15}
      >
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.profileImage} />
            <View style={styles.username} />
            <View style={styles.threeDots} />
          </View>
          <View style={styles.image} />
          <View style={styles.iconContainer}>
            <View style={styles.rowContainer}>
              <View style={styles.icon} />
              <View style={styles.icon} />
              <View style={styles.icon} />
            </View>
            <View style={styles.icon} />
          </View>
          <View style={styles.textContainer} />
          <View style={styles.divider} />
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export default PostsSkeleton;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    opacity: 0.3,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginBottom: 10,
  },
  profileImage: {
    borderRadius: 100,
    height: 41,
    width: 41,
  },
  username: {
    height: 20,
    width: SIZES.Width * 0.68,
  },
  threeDots: {
    height: 20,
    width: SIZES.Width * 0.1,
  },
  image: {
    height: SIZES.Width,
    width: SIZES.Width - 18,
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  icon: {
    height: 30,
    width: 30,
  },
  textContainer: {
    marginBottom: 15,
    height: 24,
    width: SIZES.Width - 31,
  },
  divider: {
    height: 1,
    width: SIZES.Width,
    marginBottom: 15,
  },
});
