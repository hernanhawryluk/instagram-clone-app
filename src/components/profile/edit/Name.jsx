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
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { useUserContext } from "../../../contexts/UserContext";
import firebase from "firebase/compat";

const Name = ({ navigation }) => {
  const { currentUser } = useUserContext();
  const [loader, setLoader] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [values, setValues] = useState(currentUser.name);

  useEffect(() => {
    values === currentUser.name ? setIsValid(false) : setIsValid(true);
  }, [values]);

  const handleSubmitName = async (values) => {
    if (!loader) {
      setLoader(true);
      try {
        await firebase
          .firestore()
          .collection("users")
          .doc(currentUser.email)
          .update({
            name: values,
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
          <Text style={styles.textTitle}>Name</Text>
          {loader ? (
            <ActivityIndicator style={styles.activityIndicator} />
          ) : (
            <TouchableOpacity
              onPress={() => isValid && handleSubmitName(values)}
            >
              <Text
                style={[styles.doneBtn, { color: isValid ? "#09f" : "#333" }]}
              >
                Done
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <Divider width={0.5} color="#333" />
        <View style={styles.inputContainer}>
          <Text style={styles.textName}>Name</Text>
          <View style={styles.rowContainer}>
            <TextInput
              value={values}
              onChangeText={(text) => setValues(text)}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.textInput}
              maxLength={30}
              autoFocus
            />
            <TouchableOpacity
              onPress={() => {
                setValues("");
              }}
            >
              <Octicons
                name="x-circle-fill"
                size={15}
                color={"#999"}
                style={styles.cancelIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Divider width={0.5} color="#333" />

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Help people discover your account by using the name you're known by:
            either your full name, nickname or business name.
          </Text>
          <Text style={styles.infoText}>
            You can only change your name twice within 14 days.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Name;

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
    height: 50,
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
  activityIndicator: {
    marginRight: 5,
  },
  inputContainer: {
    marginHorizontal: 20,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  textName: {
    color: "#999",
    fontSize: 14,
    fontWeight: "400",
    marginTop: 6,
  },
  textInput: {
    color: "#fff",
    fontSize: 16,
    minHeight: 20,
    minWidth: "90%",
    marginTop: 4,
  },
  cancelIcon: {
    paddingTop: 8,
  },
  infoContainer: {
    marginHorizontal: 20,
  },
  infoText: {
    marginTop: 12,
    fontSize: 14,
    color: "#aaa",
    marginBottom: 2,
  },
});
