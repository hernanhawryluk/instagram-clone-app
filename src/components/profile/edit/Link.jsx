import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Text,
  ActivityIndicator,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Divider } from "react-native-elements";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { useUserContext } from "../../../contexts/UserContext";
import firebase from "firebase/compat";
import useIsURL from "../../../utils/useIsURL";

const Link = ({ navigation }) => {
  const { currentUser } = useUserContext();
  const [loader, setLoader] = useState(false);
  const [values, setValues] = useState(currentUser.link);
  const [isValid, setIsValid] = useState(false);
  const { isURL } = useIsURL();

  useEffect(() => {
    if (isURL(values) || values === "") {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [values]);

  const handleSubmitLink = async (values) => {
    if (!loader) {
      setLoader(true);
      try {
        await firebase
          .firestore()
          .collection("users")
          .doc(currentUser.email)
          .update({
            link: values,
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
      <View>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios" size={24} color={"#fff"} />
          </TouchableOpacity>
          <Text style={styles.textTitle}>Link</Text>
          {loader ? (
            <ActivityIndicator />
          ) : (
            <TouchableOpacity
              onPress={() => isValid && handleSubmitLink(values)}
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
        <View style={styles.inputContainer}>
          <Text style={styles.textName}>URL</Text>
          <View style={styles.rowContainer}>
            <TextInput
              value={values}
              placeholder="http://example.com"
              onChangeText={(text) => setValues(text)}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.textInput}
              maxLength={255}
              autoFocus
            />
            <TouchableOpacity onPress={() => setValues("")}>
              <Octicons
                name="x-circle-fill"
                size={15}
                color={"#999"}
                style={styles.cancelIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Divider width={0.5} color="#222" />
      </View>
    </SafeAreaView>
  );
};

export default Link;

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
    marginVertical: 15,
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
  inputContainer: {
    marginHorizontal: 20,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  textName: {
    color: "#999",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 20,
  },
  textInput: {
    color: "#fff",
    fontSize: 17,
    minHeight: 30,
    minWidth: "90%",
    marginTop: 10,
    marginBottom: 6,
  },
  cancelIcon: {
    paddingTop: 18,
  },
});
