import { useState } from "react";
import { Alert } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/firebase";

const useResetPassword = ({ navigation }) => {
  const [value, setValue] = useState("");
  const [loader, setLoader] = useState(false);

  const resetPassword = async () => {
    if (loader) return;

    setLoader(true);
    try {
      await sendPasswordResetEmail(auth, value);
      Alert.alert(
        "Password Recovery Email Sent",
        "Please check your email for instructions on how to reset your password."
      );
      navigation.goBack();
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        Alert.alert(
          "Email Not Found",
          "There is no email record corresponding to this identifier."
        );
      } else {
        console.log(error);
        Alert.alert("Error", "An error occurred. Please try again later.");
      }
    } finally {
      setLoader(false);
    }
  };

  return {
    value,
    loader,
    setValue,
    resetPassword,
  };
};

export default useResetPassword;
