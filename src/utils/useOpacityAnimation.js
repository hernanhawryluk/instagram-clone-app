import {
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    Extrapolate,
  } from "react-native-reanimated";
  import {useRef, useEffect} from "react";

const useOpacityAnimation = () => {
    const scrollY = useSharedValue(0);
    const flatListRef = useRef(null);

    useEffect(() => {
        const scrollListener = (event) => {
        const { contentOffset } = event.nativeEvent;
        scrollY.value = contentOffset.y;
        };

        const flatList = flatListRef.current;
    }, [scrollY]);

    const animatedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scrollY.value, [0, 900], [1, 0], Extrapolate.CLAMP);

        return {
        opacity,
        };
    });

    return {
        scrollY, 
        flatListRef,
        animatedStyle
    }
}

export default useOpacityAnimation