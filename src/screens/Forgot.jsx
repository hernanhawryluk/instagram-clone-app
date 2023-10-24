import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  SafeAreaView,
  Platform,
  StatusBar,
  TextInput,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import useIsEmail from "../utils/useIsEmail";
import useResetPassword from "../hooks/useResetPassword";

const Forgot = ({ navigation }) => {
  const { value, setValue, resetPassword } = useResetPassword();
  const { isEmail } = useIsEmail();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.mainContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="ios-lock-closed-outline" size={60} color="#fff" />
          </View>
          <Text style={styles.titleText}>Trouble logging in?</Text>
          <Text style={styles.normalText}>
            Enter your email and we'll send you a link to get back into your
            account.
          </Text>
          <View style={styles.rowContainer}></View>

          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholderTextColor={"#bbb"}
              placeholder="Email"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
              onChangeText={(text) => setValue(text)}
              value={value}
            />
          </View>
          <TouchableOpacity
            onPress={() => resetPassword()}
            style={[
              styles.buttonWrapper,
              { opacity: isEmail(value) ? 1 : 0.6 },
            ]}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <View style={styles.footerContainer}>
          <View style={styles.fulDivider}></View>
          <TouchableOpacity
            style={styles.footerTextContainer}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.footerText}>Back to log in</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Forgot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    Platform: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  iconContainer: {
    borderWidth: 3,
    borderColor: "#fff",
    borderRadius: 100,
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  titleText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  normalText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "400",
    textAlign: "center",
    marginVertical: 15,
  },
  rowContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  selectionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  divider: {
    width: "80%",
    height: 1,
    backgroundColor: "#fff",
  },
  textInputWrapper: {
    marginTop: 15,
    backgroundColor: "#111",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
    paddingLeft: 15,
    paddingRight: 15,
    width: "100%",
    height: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    width: "95%",
  },
  buttonWrapper: {
    marginTop: 15,
    alignItems: "center",
    backgroundColor: "#07f",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 70,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
  footerContainer: {
    height: 75,
    width: "100%",
  },
  fulDivider: {
    width: "100%",
    height: 0.5,
    backgroundColor: "#222",
  },
  footerTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  footerText: {
    marginVertical: 10,
    color: "#0af",
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
  },
});
