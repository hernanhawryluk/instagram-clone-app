import { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const AvoidKeyboardView = ({ children, start, end, type, style }) => {
  const [keyboard, setKeyboard] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboard(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboard(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    if (type === "height")
      return {
        height: withTiming(keyboard ? end : start),
      };
    else {
      return {
        paddingBottom: withTiming(keyboard ? end : start),
      };
    }
  });

  return (
    <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
  );
};

export default AvoidKeyboardView;
