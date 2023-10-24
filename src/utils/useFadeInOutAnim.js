import { Animated } from "react-native";
import { useRef, useEffect } from "react"

const useFadeInOutAnim = ({focusedBar}) => {
    const fadeEffect = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (focusedBar) {
        Animated.timing(fadeEffect, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start();
        } else {
        Animated.timing(fadeEffect, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
        }).start();
        }
    }, [focusedBar]);

    return {
        fadeEffect,
    };
};

export default useFadeInOutAnim;