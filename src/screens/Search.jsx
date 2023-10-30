import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SIZES } from "../constants";
import { useUserContext } from "../contexts/UserContext";
import useSlideOnKeyboard from "../utils/useSlideOnKeyboard";
import useHeaderScrollAnim from "../utils/useHeaderScrollAnim";
import useFadeInOutAnim from "../utils/useFadeInOutAnim";
import DefaultPosts from "../components/search/DefaultPosts";
import useFindUsers from "../hooks/useFindUsers";
import Searching from "../components/search/Searching";

const Search = ({ navigation }) => {
  const { currentUser } = useUserContext();
  const { headerTranslate, headerOpacity, scrollY } = useHeaderScrollAnim(43);
  const [searchKey, setSearchKey] = useState("");
  const { beginSearch, users, searchResult } = useFindUsers({
    currentUser,
    searchKey,
  });

  const [focusedBar, setFocusedBar] = useState(false);
  const [inputWidth, setInputWidth] = useState(SIZES.Width / 0.9);
  const [searching, setSearching] = useState(false);
  const { fadeEffect } = useFadeInOutAnim({ focusedBar });

  const { slideAnimation, forceSlideAnimation } = useSlideOnKeyboard(
    SIZES.Width * 0.75,
    SIZES.Width * 0.92
  );

  const handleFocus = () => {
    beginSearch();
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

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <Animated.View
          style={[
            styles.header(70), // 43 to 60
            {
              transform: [{ translateY: headerTranslate }],
            },
          ]}
        >
          <View style={styles.searchBar}>
            <Animated.View
              style={[
                styles.searchWrapper,
                { width: slideAnimation },
                { opacity: headerOpacity },
              ]}
            >
              <Ionicons
                name="search"
                size={20}
                color={"#999"}
                style={styles.searchIcon}
              />

              <TextInput
                value={searchKey}
                onChangeText={setSearchKey}
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
        </Animated.View>
        <View style={styles.result}>
          <DefaultPosts navigation={navigation} handleScroll={handleScroll} />

          {searching && (
            <Animated.View
              style={[
                styles.searchingContainer,
                {
                  opacity: fadeEffect,
                },
              ]}
            >
              <Searching
                navigation={navigation}
                searchResult={searchKey.length > 0 ? searchResult : users}
                currentUser={currentUser}
              />
            </Animated.View>
          )}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: (ContainerHeight) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 35,
    height: ContainerHeight,
    zIndex: 1,
    backgroundColor: "#000",
  }),
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 23,
  },
  searchWrapper: {
    marginLeft: SIZES.Width * 0.03,
    backgroundColor: "#252525",
    height: 38,
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
    marginLeft: 5,
  },
  cancelBtn: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
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
