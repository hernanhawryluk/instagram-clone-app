import { View } from "react-native";
import SIZES from "../../constants/SIZES";

const Skeleton = () => {
  return (
    <View>
      <View
        style={{
          height: SIZES.Height * 0.9,
          width: SIZES.Width,
          opacity: 0.3,
        }}
      ></View>
    </View>
  );
};
export default Skeleton;
