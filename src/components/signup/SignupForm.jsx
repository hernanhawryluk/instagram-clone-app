import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";
import firebase from "firebase/compat";
import { getTimeZone } from "react-native-localize";

const SignupForm = ({ navigation }) => {
  const [userOnFocus, setUserOnFocus] = useState(false);
  const [emailOnFocus, setEmailOnFocus] = useState(false);
  const [emailToValidate, SetEmailToValidate] = useState(false);
  const [userToValidate, setUserToValidate] = useState(false);
  const [obsecureText, setObsecureText] = useState(true);
  const [passwordToValidate, SetPasswordToValidate] = useState(false);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const timeZone = getTimeZone().split("/");
    setCountry(timeZone[1]);
  }, []);

  const LoginFormSchema = Yup.object().shape({
    username: Yup.string()
      .required()
      .min(6, "Username has to have al least 8 characters"),
    email: Yup.string()
      .required()
      .min(6, "A valid phone number, username or email address is required"),
    password: Yup.string()
      .required()
      .min(6, "Your password has to have at least 6 characters"),
  });

  const getRandomProfilePicture = async () => {
    const response = await fetch("https://randomuser.me/api");
    const data = await response.json();
    return data.results[0].picture.large;
  };

  const onSignup = async (email, password, username) => {
    try {
      const userCredentials = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      await firebase
        .firestore()
        .collection("users")
        .doc(userCredentials.user.email)
        .set({
          owner_uid: userCredentials.user.uid,
          username: username,
          email: userCredentials.user.email,
          profile_picture: await getRandomProfilePicture(),
          name: "",
          bio: "",
          link: "",
          gender: ["Prefer not to say", ""],
          followers: [],
          following: [],
          followers_request: [],
          following_request: [],
          saved_posts: [],
          close_friends: [],
          favorite_users: [],
          muted_users: [],
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          country: country,
        });

      console.log(
        "🔥 Firebase User Created Successful ✅",
        userCredentials.user.email
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={(values) => {
          onSignup(values.email, values.password, values.username);
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <View>
            <View
              style={[
                styles.inputField,
                {
                  paddingVertical: 16,
                  borderColor:
                    emailToValidate && !Validator.validate(values.email)
                      ? "#f00"
                      : "#444",
                },
              ]}
            >
              <TextInput
                style={styles.inputText}
                placeholderTextColor={"#bbb"}
                placeholder="Phone number, username or email"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="emailAddress"
                onChangeText={handleChange("email")}
                onBlur={() => {
                  handleBlur("email");
                  setEmailOnFocus(false);
                  values.email.length > 0
                    ? SetEmailToValidate(true)
                    : SetEmailToValidate(false);
                }}
                onFocus={() => setEmailOnFocus(true)}
                value={values.email}
              />
              <TouchableOpacity onPress={() => handleChange("email")("")}>
                <Octicons
                  name={emailOnFocus ? "x-circle-fill" : ""}
                  size={15}
                  color={"#555"}
                />
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.inputField,
                {
                  paddingVertical: 16,
                  borderColor:
                    userToValidate && values.username.length < 6
                      ? "#f00"
                      : "#444",
                },
              ]}
            >
              <TextInput
                style={styles.inputText}
                placeholderTextColor={"#bbb"}
                placeholder="Username"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="emailAddress"
                onChangeText={handleChange("username")}
                onBlur={() => {
                  handleBlur("username");
                  setUserOnFocus(false);
                  values.username.length > 0
                    ? setUserToValidate(true)
                    : setUserToValidate(false);
                }}
                onFocus={() => setUserOnFocus(true)}
                value={values.username}
              />
              <TouchableOpacity onPress={() => handleChange("username")("")}>
                <Octicons
                  name={userOnFocus ? "x-circle-fill" : ""}
                  size={15}
                  color={"#555"}
                />
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    passwordToValidate && values.password.length < 5
                      ? "#f00"
                      : "#444",
                },
              ]}
            >
              <TextInput
                style={styles.inputText}
                placeholderTextColor={"#bbb"}
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={obsecureText}
                textContentType="password"
                onChangeText={handleChange("password")}
                onBlur={() => {
                  handleBlur("password");
                  values.password.length > 0
                    ? SetPasswordToValidate(true)
                    : SetPasswordToValidate(false);
                }}
                value={values.password}
              />
              <TouchableOpacity onPress={() => setObsecureText(!obsecureText)}>
                <MaterialCommunityIcons
                  name={obsecureText ? "eye-off" : "eye"}
                  size={24}
                  color={obsecureText ? "#fff" : "#37e"}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.forgotContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleSubmit} disabled={!isValid}>
              <View style={styles.btnContainer(isValid)}>
                <Text style={styles.btnText}>Sign up</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignupForm;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  inputField: {
    marginTop: 14,
    backgroundColor: "#111",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
    paddingLeft: 15,
    paddingRight: 25,
    marginHorizontal: 20,
    height: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    width: "95%",
  },
  forgotContainer: {
    alignItems: "flex-end",
    marginTop: 20,
    marginRight: 20,
  },
  forgotText: {
    color: "#1af",
    fontWeight: "700",
  },
  loginBtn: {
    backgroundColor: "#1af",
    color: "#fff",
  },
  btnContainer: (isValid) => ({
    marginTop: 35,
    alignItems: "center",
    backgroundColor: "#07f",
    opacity: isValid ? 1 : 0.6,
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 10,
  }),
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
});
