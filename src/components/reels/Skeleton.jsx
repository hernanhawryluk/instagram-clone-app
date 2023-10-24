import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import React from "react";
import { View } from "react-native";
import SIZES from "../../constants/SIZES";

const Skeleton = () => {
  return (
    <View>
      <SkeletonPlaceholder
        backgroundColor={"#333"}
        highlightColor={"#666"}
        speed={1600}
        borderRadius={15}
      >
        <View
          style={{
            height: SIZES.Height * 0.9,
            width: SIZES.Width,
            opacity: 0.3,
          }}
        ></View>
      </SkeletonPlaceholder>
    </View>
  );
};
export default Skeleton;
