import { useState } from 'react';
import {
    Easing,
    withTiming,
    useAnimatedStyle,
    withRepeat,
    withSequence,
    useSharedValue
  } from "react-native-reanimated";

const useShakeAnimation = () => {
    const [shaking, setShaking] = useState(false);
    const translateX = useSharedValue(0);

    const ANGLE = 2;
    const TIME = 80;
    const EASING = Easing.elastic(1);
  
    const startShakeAnimation = () => {
      setShaking(true);
      translateX.value = withSequence(
        withTiming(-ANGLE, { duration: TIME / 3, easing: EASING }),
        withRepeat(
          withTiming(ANGLE, {
            duration: TIME,
            easing: EASING,
          }),
          7,
          true
        ),
        withTiming(0, { duration: TIME / 2, easing: EASING })
      );
      setTimeout(() => {
        setShaking(false);
      }, 800);
    };
  
    const animatedShakeStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: translateX.value }],
      };
    });

    return {
      startShakeAnimation,
      animatedShakeStyle, 
      shaking
    }
}

export default useShakeAnimation