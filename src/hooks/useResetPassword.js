import { useState } from 'react'
import { Alert } from "react-native";
import firebase from "firebase/compat";

const useResetPassword = () => {
    const [value, setValue] = useState("");
    const resetPassword = async () => {
        try {
        await firebase.auth().sendPasswordResetEmail(value);
        Alert.alert(
            "Password Recovery Email Sent",
            "Please check your email for instructions on how to reset your password."
        );
        navigation.navigate("Login");
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
        }
    };

    return {
        value,
        setValue,
        resetPassword,
    }
}

export default useResetPassword