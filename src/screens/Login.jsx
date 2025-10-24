import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";
import LoginForm from "../components/login/LoginForm";
import Footer from "../components/login/Footer";
import { Image } from "expo-image";
import AvoidKeyboardView from "../components/shared/AvoidKeyboardView";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = ({ navigation }) => {
  const [messageModalVisible, setMessageModalVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMessageModalVisible(true);
    }, 500);
    setTimeout(() => {
      setMessageModalVisible(false);
    }, 3500);
  }, []);

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
            <View>
              <Animated.View style={styles.logoContainer}>
                <Image
                  source={require("../../assets/images/header-logo.png")}
                  style={styles.logo}
                />
              </Animated.View>

              <LoginForm navigation={navigation} />
            </View>
          </View>
        </AvoidKeyboardView>
        <Footer navigation={navigation} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignContent: "space-between",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
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
