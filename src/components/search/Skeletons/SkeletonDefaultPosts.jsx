import React from "react";
import { View } from "react-native";
import SIZES from "../../../constants/SIZES";

const SkeletonDefaultPosts = () => {
  return (
    <View>
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
    </View>
  );
};
export default SkeletonDefaultPosts;
