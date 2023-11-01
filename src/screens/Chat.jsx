import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Platform,
  SafeAreaView,
  FlatList,
  TextInput,
  Keyboard,
  Animated,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useUserContext } from "../contexts/UserContext";
import RenderUser from "../components/chat/RenderUser";
import useFindUsers from "../hooks/useFindUsers";
import { SIZES } from "../constants";
import useSlideOnKeyboard from "../utils/useSlideOnKeyboard";
import useFetchContactList from "../hooks/useFetchContactList";
import firebase from "firebase/compat";
import MessageModal, {
  handleFeatureNotImplemented,
} from "../components/shared/modals/MessageModal";

const Chat = ({ navigation }) => {
  const [searchKey, setSearchKey] = useState("");
  const { currentUser } = useUserContext();
  const { chatUsers } = useFetchContactList();
  const { beginSearch, users, searchResult } = useFindUsers({
    currentUser,
    searchKey,
  });
  const { slideAnimation, forceSlideAnimation } = useSlideOnKeyboard(
    SIZES.Width * 0.75,
    SIZES.Width * 0.9
  );

  const [inputWidth, setInputWidth] = useState(SIZES.Width / 0.9);
  const [focusedBar, setFocusedBar] = useState(false);
  const [searching, setSearching] = useState(false);
  const [messageModalVisible, setMessageModalVisible] = useState(false);

  useEffect(() => {
    beginSearch();

    if (currentUser.chat_notification > 0) {
      try {
        firebase.firestore().collection("users").doc(currentUser.email).update({
          chat_notification: 0,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const handleFocus = () => {
    forceSlideAnimation(true);
    clearTimeout();
    setFocusedBar(true);
    setSearching(true);
    setInputWidth(SIZES.Width * 0.7);
  };

  const handleCancel = () => {
    forceSlideAnimation(false);
    setFocusedBar(false);
    setSearching(false);
    Keyboard.dismiss();
    setInputWidth(SIZES.Width * 0.8);
  };

  const handleCamera = () => {
    handleFeatureNotImplemented(setMessageModalVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.rowContainer}
        >
          <MaterialIcons name="arrow-back-ios" size={26} color={"#fff"} />
          <Text style={styles.textTitle}>{currentUser.username}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Animated.View
          style={[styles.searchWrapper, { width: slideAnimation }]}
        >
          <Ionicons
            name="search"
            size={20}
            color={"#999"}
            style={styles.searchIcon}
          />

          <TextInput
            value={searchKey}
            onChangeText={(text) => setSearchKey(text)}
            maxLength={30}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Search"
            placeholderTextColor={"#999"}
            style={[styles.searchInput, { width: inputWidth }]}
            enterKeyHint="search"
            onFocus={() => handleFocus()}
          />
        </Animated.View>
        {focusedBar && (
          <TouchableOpacity onPress={() => handleCancel()}>
            <Text style={styles.cancelBtn}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.result}>
        {searching ? (
          <View>
            <Text style={styles.subtitle}>
              {searchKey.length > 0 ? "Search result:" : "Suggested"}
            </Text>
            <FlatList
              data={searchKey.length > 0 ? searchResult : users}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <RenderUser navigation={navigation} user={item} />
              )}
              initialNumToRender={20}
            />
          </View>
        ) : (
          <View>
            <Text style={styles.subtitle}>Messages</Text>
            <FlatList
              data={chatUsers}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <RenderUser
                  navigation={navigation}
                  user={item}
                  currentUser={currentUser}
                  handleCamera={handleCamera}
                />
              )}
              initialNumToRender={20}
            />
          </View>
        )}
      </View>
      <MessageModal
        messageModalVisible={messageModalVisible}
        message={"This feature is not yet implemented."}
      />
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 45,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 9,
  },
  textTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 6,
    transform: [{ scaleY: 1.1 }],
  },
  subtitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
    marginTop: 14,
    marginLeft: 15,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchWrapper: {
    marginTop: 10,
    marginLeft: SIZES.Width * 0.04,
    backgroundColor: "#252525",
    height: 42,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    marginLeft: 8,
  },
  searchInput: {
    color: "#fff",
    height: "100%",
    fontSize: 16,
    marginBottom: 3,
    flex: 1,
    marginLeft: 5,
  },
  cancelBtn: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 15,
    marginLeft: 15,
  },
  result: {
    flex: 1,
  },
  searchingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
  },
});
