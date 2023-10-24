import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import React from "react";
import { View } from "react-native";
import SIZES from "../../../constants/SIZES";

const SkeletonDefaultPosts = () => {
  return (
    <View>
      <SkeletonPlaceholder
        backgroundColor={"#333"}
        highlightColor={"#666"}
        speed={1600}
        borderRadius={1}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: SIZES.Width * 0.335,
              height: SIZES.Width * 0.335,
              margin: 1,
              opacity: 0.3,
            }}
          />
          <View
            style={{
              width: SIZES.Width * 0.335,
              height: SIZES.Width * 0.335,
              margin: 1,
              opacity: 0.3,
            }}
          />
          <View
            style={{
              width: SIZES.Width * 0.335,
              height: SIZES.Width * 0.335,
              margin: 1,
              opacity: 0.3,
            }}
          />
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};
export default SkeletonDefaultPosts;
