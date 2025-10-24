import { StyleSheet } from "react-native";
import AuthNavigation from "./src/navigation/AuthNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useState } from "react";
import { Image } from "expo-image";
import SIZES from "./src/constants/SIZES";
import Animated, { FadeOut } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const onLayoutRootView = useCallback(() => {
    SplashScreen.hide();
    new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
      setAppIsReady(true);
    });
  }, [appIsReady]);

  return (
    <GestureHandlerRootView
      style={styles.container}
      onLayout={onLayoutRootView}
    >
      {!appIsReady && (
        <Animated.View
          exiting={FadeOut.duration(1500)}
          style={styles.splashContainer}
        >
          <Image
            source={require("./assets/splash.png")}
            style={styles.splashImage}
          />
        </Animated.View>
      )}
      <AuthNavigation />
      <StatusBar hidden backgroundColor={"#000000"} />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  splashContainer: {
    height: SIZES.Height,
    width: SIZES.Width,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 1,
  },
  splashImage: {
    height: 600,
    width: 600,
    contentFit: "contain",
  },
});
