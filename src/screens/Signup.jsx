import {
  StyleSheet,
  View,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import SignupForm from "../components/signup/SignupForm";
import Footer from "../components/signup/Footer";
import { MaterialIcons } from "@expo/vector-icons";
import FastImage from "react-native-fast-image";
import { SIZES } from "../constants";

const Signup = ({ navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <View style={styles.goBackIcon}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios" size={30} color={"#fff"} />
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.mainContainer}>
            <View>
              <Animated.View style={styles.logoContainer}>
                <FastImage
                  source={require("../../assets/images/header-logo.png")}
                  style={styles.logo}
                />
              </Animated.View>

              <SignupForm navigation={navigation} />
            </View>
          </View>
        </KeyboardAvoidingView>
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: -SIZES.Width * 0.15,
  },
  goBackIcon: {
    margin: 20,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    height: 70,
    width: 200,
    resizeMode: "cover",
  },
});
