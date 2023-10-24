import { useCallback, useEffect, useRef } from 'react';
import { Keyboard, Animated, Easing } from 'react-native';

const useDodgeKeyboard = (from, to) => {
  const animValue = useRef(new Animated.Value(0)).current;
  const keyboardVisible = useRef(false);

  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener("keyboardWillShow", () => {
      !keyboardVisible.current && playAnimation(0, 1, true);
    }, []);

    const keyboardDidHide = Keyboard.addListener("keyboardWillHide", () => {
        keyboardVisible.current && playAnimation(1, 0, false);
    });

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);

  const playAnimation = useCallback((start, end, set) => {
    keyboardVisible.current = set;
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

  return { slideAnimation, animValue };
}

export default useDodgeKeyboard;