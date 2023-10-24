import { Animated } from 'react-native'
import { useState, useRef } from 'react'
import { SIZES } from "../constants";

const useTabSlideAnimation = () => {
    const translation = useRef(new Animated.Value(0)).current;
    const [activeButton, setActiveButton] = useState(0);
    
    const handleTabChange = (button) => {
        const newWidth = button * SIZES.Width * -1;
        Animated.timing(translation, {
            toValue: newWidth,
            duration: 400,
            useNativeDriver: true,
        }).start();
        setActiveButton(button);
    };

    return {
        handleTabChange,
        activeButton,
        translation
    }
}

export default useTabSlideAnimation