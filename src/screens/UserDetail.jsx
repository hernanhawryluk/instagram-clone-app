import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import StoryHightlights from "../components/user/StoryHighlights";
import firebase from "firebase/compat";
import { useUserContext } from "../contexts/UserContext";
import BottomSheetOptions from "../components/user/bottomSheets/BottomSheetOptions";
import CopyClipboardModal from "../components/shared/modals/CopyClipboardModal";

const User = ({ route, navigation }) => {
  const { email } = route.params || {};
  const [user, setUser] = useState({});
  const { currentUser } = useUserContext();
  const bottomSheetRefOptions = useRef(null);
  const [copyModalVisible, setCopyModalVisible] = useState(false);

  useEffect(() => {
    try {
      const unsubscribe = firebase
        .firestore()
        .collection("users")
        .doc(email)
        .onSnapshot((snapshot) => {
          setUser(snapshot.data());
        });

      return () => unsubscribe;
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={24} color={"#fff"} />
        </TouchableOpacity>
        <Text style={styles.textTitle}>{user.username}</Text>
        {user.username ? (
          <TouchableOpacity
            onPress={() => bottomSheetRefOptions.current.present()}
          >
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={24}
              color={"#fff"}
              style={{ marginTop: 2 }}
            />
          </TouchableOpacity>
        ) : (
          <ActivityIndicator />
        )}
      </View>

      <StoryHightlights navigation={navigation} user={user} />

      <CopyClipboardModal copyModalVisible={copyModalVisible} />

      <BottomSheetOptions
        bottomSheetRef={bottomSheetRefOptions}
        user={user}
        currentUser={currentUser}
        navigation={navigation}
        setCopyModalVisible={setCopyModalVisible}
      />
    </SafeAreaView>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  textTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    // marginBottom: 4,
  },
});
