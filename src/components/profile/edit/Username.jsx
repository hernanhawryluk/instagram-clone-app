import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState, useEffect } from "react";
import { Divider } from "react-native-elements";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { useUserContext } from "../../../contexts/UserContext";
import Animated from "react-native-reanimated";
import useShowHiddenModal from "../../../utils/useShowHiddenModal";
import useShakeAnimation from "../../../utils/useShakeAnimation";
import { db } from "../../../services/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";

const Username = ({ navigation }) => {
  const { currentUser } = useUserContext();
  const [loader, setLoader] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [values, setValues] = useState(currentUser?.username);
  const [modalText, setModalText] = useState("");
  const { showHiddenModal, animatedModalStyle } = useShowHiddenModal();
  const { startShakeAnimation, animatedShakeStyle, shaking } =
    useShakeAnimation();

  useEffect(() => {
    values === currentUser.username || values === ""
      ? setIsValid(false)
      : setIsValid(true);
  }, [values]);

  handleSubmitUsername = async (newUsername) => {
    setLoader(true);

    if (/^\d+$/.test(newUsername)) {
      setModalText("Your username cannot contain only numbers.");
      showHiddenModal();
      setLoader(false);
      return;
    }

    newUsername = newUsername.toLowerCase();

    try {
      const userQuery = query(
        collection(db, "users"),
        where("username", "==", newUsername)
      );

      const userSnapshot = await getDocs(userQuery);

      const userAvailable = userSnapshot.empty;

      if (userAvailable) {
        const batch = writeBatch(db);

        await updateDoc(doc(db, "users", currentUser.email), {
          username: newUsername,
        });

        const postsSnapshot = await getDocs(
          collection(db, "users", currentUser.email, "posts")
        );

        postsSnapshot.docs.forEach((document) => {
          batch.update(document.ref, { username: newUsername });
        });

        const storiesSnapshot = await getDocs(
          collection(db, "users", currentUser.email, "stories")
        );

        storiesSnapshot.docs.forEach((document) => {
          batch.update(document.ref, { username: newUsername });
        });

        const reelsSnapshot = await getDocs(
          collection(db, "users", currentUser.email, "reels")
        );

        reelsSnapshot.docs.forEach((document) => {
          batch.update(document.ref, { username: newUsername });
        });

        await batch.commit();

        navigation.goBack();
      } else {
        setModalText("A user with that username already exists.");
        showHiddenModal();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoiding}
      >
        <View>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back-ios" size={24} color={"#fff"} />
            </TouchableOpacity>
            <Text style={styles.textTitle}>Username</Text>
            {loader ? (
              <ActivityIndicator style={styles.activityIndicator} />
            ) : (
              <TouchableOpacity
                onPress={() => isValid && handleSubmitUsername(values)}
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
            <Text style={styles.textName}>Username</Text>
            <Animated.View style={[styles.rowContainer, animatedShakeStyle]}>
              <TextInput
                value={values}
                onChangeText={(text) => {
                  if (/[^a-zA-Z0-9 _]/.test(text)) {
                    startShakeAnimation();
                  }
                  text = text.replace(/ /g, "_");
                  text = text.replace(/[^a-zA-Z0-9_]/g, "");
                  setValues(text);
                }}
                maxLength={30}
                selectionColor={shaking ? "#f00" : null}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.textInput}
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
                  color={"#bbb"}
                  style={styles.cancelIcon}
                />
              </TouchableOpacity>
            </Animated.View>
          </View>
          <Divider width={0.5} color="#222" />
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              In most cases, you'll be able to change your username back to{" "}
              <Text style={{ fontWeight: "600" }}>{currentUser.username}</Text>{" "}
              for another 14 days.
            </Text>
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Animated.View style={[styles.modalContainer, animatedModalStyle]}>
            <MaterialIcons name="info-outline" size={30} color="#fff" />
            <Text style={styles.modalText}>{modalText}</Text>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Username;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    paddingTop: 0,
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
    fontWeight: "700",
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
    fontWeight: "500",
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
  errorContainer: {
    marginHorizontal: 20,
  },
  textError: {
    color: "#a00",
    fontSize: 16,
  },
  infoContainer: {
    marginHorizontal: 20,
  },
  infoText: {
    fontSize: 14,
    color: "#aaa",
    marginVertical: 20,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0)",
  },
  keyboardAvoiding: {
    flex: 1,
  },
  modalContainer: {
    bottom: -130,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#333",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  modalText: {
    color: "#fff",
    fontSize: 15,
  },
});
