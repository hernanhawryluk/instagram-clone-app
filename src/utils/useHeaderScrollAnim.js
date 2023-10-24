import { Animated } from "react-native";

const useHeaderScrollAnim = (headerHeight) => {
  const scrollY = new Animated.Value(0);
  const offsetAnim = new Animated.Value(0);

  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: "clamp",
      }),
      offsetAnim
    ),
    0,
    headerHeight
  );

  const headerTranslate = clampedScroll.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [-3, -headerHeight],
    extrapolate: "clamp",
  });

  const headerOpacity = clampedScroll.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return { headerTranslate, headerOpacity, scrollY };
};

export default useHeaderScrollAnim;