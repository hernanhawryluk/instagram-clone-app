import {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withDelay,
} from "react-native-reanimated";

const useShowHiddenModal = () => {
  const translateY = useSharedValue(0);
  const showHiddenModal = () => {
    translateY.value = withSequence(
      withTiming(-150, {
        duration: 500,
        easing: Easing.inOut(Easing.quad),
      }),
      withDelay(3000, withTiming(0)),
      withTiming(0, {
        duration: 500,
        easing: Easing.inOut(Easing.quad),
      })
    );
  };

  const animatedModalStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return {
    showHiddenModal,
    animatedModalStyle
  }
}

export default useShowHiddenModal;