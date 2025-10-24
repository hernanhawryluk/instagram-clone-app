import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
  Platform,
} from "react-native";
import SignupForm from "../components/signup/SignupForm";
import Footer from "../components/signup/Footer";
import { Image } from "expo-image";
import { SIZES } from "../constants";
import AvoidKeyboardView from "../components/shared/AvoidKeyboardView";
import { SafeAreaView } from "react-native-safe-area-context";

const Signup = ({ navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
        <AvoidKeyboardView
          type={Platform.OS === "ios" ? "padding" : "height"}
          start={0}
          end={220}
          style={{ flex: 1 }}
        >
          <View style={styles.mainContainer}>
            <View style={{ height: 56 }} />
            <View>
              <Animated.View style={styles.logoContainer}>
                <Image
                  source={require("../../assets/images/header-logo.png")}
                  style={styles.logo}
                />
              </Animated.View>

              <SignupForm navigation={navigation} />
            </View>
          </View>
        </AvoidKeyboardView>
        <Footer navigation={navigation} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
    alignContent: "space-between",
    paddingTop: 0,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
    marginTop: -SIZES.Width * 0.15,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    height: Platform.OS === "android" ? 70 : 60,
    width: 200,
    contentFit: "cover",
  },
});
