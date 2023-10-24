import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Divider } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { useUserContext } from "../../../contexts/UserContext";
import firebase from "firebase/compat";

const Gender = ({ navigation }) => {
  const { currentUser } = useUserContext();
  const [loader, setLoader] = useState(false);
  const [values, setValues] = useState(currentUser.gender);
  const [isValid, setIsValid] = useState(false);

  genderOptions = ["Male", "Female", "Custom", "Prefer not to say"];

  useEffect(() => {
    if (values[0] === "Custom" && values[1] === "") {
      setIsValid(false);
    } else if (
      values[0] === currentUser.gender[0] &&
      values[1] === currentUser.gender[1]
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [values]);

  const handleSubmitGender = async (values) => {
    if (!loader) {
      setLoader(true);
      try {
        await firebase
          .firestore()
          .collection("users")
          .doc(currentUser.email)
          .update({
            gender: [values[0], values[1]],
          });
        navigation.goBack();
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios" size={24} color={"#fff"} />
          </TouchableOpacity>
          <Text style={styles.textTitle}>Gender</Text>
          {loader ? (
            <ActivityIndicator />
          ) : (
            <TouchableOpacity
              onPress={() => isValid && handleSubmitGender(values)}
            >
              <Text
                style={[styles.doneBtn, { color: isValid ? "#09f" : "#333" }]}
              >
                Done
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <Divider width={0.5} color="#222" />
        <View>
          <Text style={styles.textInfo}>
            This won't be part of your public profile
          </Text>
        </View>
        <View style={styles.inputContainer}>
          {genderOptions.map((option, index) =>
            option === "Custom" ? (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => setValues([option, values[1]])}
                  style={styles.optionContainer}
                >
                  <Text style={styles.optionText}>{option}</Text>
                  <View style={styles.radioBtn}>
                    {values[0] === option && (
                      <View
                        style={[
                          styles.roundBtnInterior,
                          values[0] === option && {
                            backgroundColor: "#09f",
                          },
                        ]}
                      >
                        <View style={styles.roundBtnDot}></View>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
                {values[0] === "Custom" && (
                  <View style={styles.rowContainer} key={index}>
                    <TextInput
                      key={option}
                      value={values[1]}
                      placeholder="Custom"
                      placeholderTextColor={"#777"}
                      onChangeText={(text) => setValues([values[0], text])}
                      autoCapitalize="sentences"
                      autoCorrect={true}
                      style={styles.textInput}
                      maxLength={16}
                      multiline
                      autoFocus
                    />
                  </View>
                )}
              </View>
            ) : (
              <TouchableOpacity
                key={index}
                onPress={() => setValues([option, ""])}
                style={styles.optionContainer}
              >
                <Text style={styles.optionText}>{option}</Text>
                <View style={styles.radioBtn}>
                  {values[0] === option && (
                    <View
                      style={[
                        styles.roundBtnInterior,
                        values[0] === option && {
                          backgroundColor: "#09f",
                        },
                      ]}
                    >
                      <View style={styles.roundBtnDot}></View>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            )
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Gender;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 12,
  },
  textTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  doneBtn: {
    fontSize: 17,
    fontWeight: "600",
  },
  textInfo: {
    color: "#999",
    fontSize: 14,
    fontWeight: "400",
    marginTop: 24,
    marginBottom: 12,
    marginHorizontal: 20,
  },
  inputContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 10,
    marginRight: 20,
  },
  textInput: {
    color: "#fff",
    fontSize: 17,
    minHeight: 30,
    minWidth: "90%",
    marginBottom: 25,
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 26,
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
    color: "#fff",
  },
  radioBtn: {
    borderRadius: 100,
    borderColor: "#888",
    borderWidth: 1,
    height: 24,
    width: 24,
  },
  roundBtnInterior: {
    height: 24,
    width: 24,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  roundBtnDot: {
    backgroundColor: "#fff",
    borderRadius: 100,
    height: 8,
    width: 8,
  },
});
