import { useCallback, useRef } from 'react';
import { Animated, Easing } from 'react-native';

const slideOnKeyboard = (from, to) => {
  const animValue = useRef(new Animated.Value(0)).current;

  const forceSlideAnimation = (set) => {
    set ? playAnimation(0, 1, true) : playAnimation(1, 0, false);
  }

  const playAnimation = useCallback((start, end) => {
    animValue.setValue(start);
    Animated.timing(animValue, {
      toValue: end,
      duration: 250,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [animValue]);
  
  const slideAnimation = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [to, from],
  });

  return { slideAnimation, forceSlideAnimation };
}

export default slideOnKeyboard;