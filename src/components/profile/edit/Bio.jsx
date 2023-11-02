import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Divider } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { useUserContext } from "../../../contexts/UserContext";
import firebase from "firebase/compat";

const Bio = ({ navigation }) => {
  const { currentUser } = useUserContext();
  const [counter, setCounter] = useState(150);
  const [loader, setLoader] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [values, setValues] = useState(currentUser.bio);

  useEffect(() => {
    values === currentUser.bio ? setIsValid(false) : setIsValid(true);
    setCounter(150 - values.length);
  }, [values]);

  const handleSubmitBio = async (values) => {
    if (!loader) {
      setLoader(true);
      try {
        await firebase
          .firestore()
          .collection("users")
          .doc(currentUser.email)
          .update({
            bio: values,
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
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={24} color={"#fff"} />
        </TouchableOpacity>
        <Text style={styles.textTitle}>Bio</Text>
        {loader ? (
          <ActivityIndicator />
        ) : (
          <TouchableOpacity onPress={() => isValid && handleSubmitBio(values)}>
            <Text
              style={[styles.doneBtn, { color: isValid ? "#09f" : "#333" }]}
            >
              Done
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <Divider width={0.5} color="#222" />
      <View style={styles.inputContainer}>
        <View style={styles.rowContainer}>
          <TextInput
            value={values}
            onFocus={() => setCounter(150 - values.length)}
            onChangeText={(text) => setValues(text)}
            autoCapitalize="none"
            autoCorrect={true}
            style={styles.textInput}
            maxLength={255}
            multiline
            autoFocus
          />
        </View>
      </View>
      <Divider width={0.5} color="#222" />

      <View style={styles.counterContainer}>
        <Text style={[styles.counter, counter < 0 && { color: "#f00" }]}>
          {counter}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Bio;

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
    marginHorizontal: 14,
    height: 50,
  },
  textTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 4,
  },
  doneBtn: {
    fontSize: 17,
    fontWeight: "600",
  },
  inputContainer: {
    marginHorizontal: 20,
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
    fontSize: 18,
    minHeight: 30,
    minWidth: "90%",
    marginTop: 10,
    marginBottom: 6,
  },
  counterContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: 20,
    marginBottom: 20,
  },
  counter: {
    color: "#999",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 20,
  },
});
