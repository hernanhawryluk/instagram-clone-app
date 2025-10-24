import { View } from "react-native";
import SIZES from "../../../constants/SIZES";

const SkeletonSearching = () => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          opacity: 0.3,
          marginHorizontal: 15,
          marginBottom: 15,
          gap: 5,
        }}
      >
        <View
          style={{
            width: 54,
            height: 54,
            borderRadius: 100,
          }}
        />
        <View style={{ justifyContent: "center", gap: 10 }}>
          <View
            style={{
              width: SIZES.Width * 0.65,
              height: 16,
              borderRadius: 15,
            }}
          />
          <View
            style={{
              width: SIZES.Width * 0.45,
              height: 16,
              borderRadius: 15,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default SkeletonSearching;
