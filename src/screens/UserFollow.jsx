import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Animated,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import TitleBar from "../components/shared/TitleBar";
import SearchBar from "../components/shared/SearchBar";
import Follow from "../components/user/Follow";
import useFetchFollowers from "../hooks/useFetchFollowers";
import useFetchFollowing from "../hooks/useFetchFollowing";
import useTabSlideAnimation from "../utils/useTabSlideAnimation";
import { useUserContext } from "../contexts/UserContext";
import { SIZES } from "../constants";

const UserFollow = ({ navigation, route }) => {
  const { user } = route.params || {};
  const { currentUser } = useUserContext();

  const [onSearch, setOnSearch] = useState(false);
  const [resetSearchBar, setResetSearchBar] = useState(0);
  const [filteredFollowers, setFilteredFollowers] = useState({});
  const [filteredFollowing, setFilteredFollowing] = useState({});

  const { followers } = useFetchFollowers({ user: user });
  const { following } = useFetchFollowing({ user: user });
  const { handleTabChange, translation, activeButton } = useTabSlideAnimation();

  const childPropChange = (searchKey) => {
    searchKey !== "" ? setOnSearch(true) : setOnSearch(false);
    if (activeButton === 0) {
      if (followers.length > 0) {
        const filteredData = followers.filter(
          (follower) =>
            follower.username.includes(searchKey) ||
            follower.name.toLowerCase().includes(searchKey) ||
            follower.email.includes(searchKey)
        );
        setFilteredFollowers(filteredData);
      }
    } else {
      if (following.length > 0) {
        const filteredData = following.filter(
          (follow) =>
            follow.username.includes(searchKey) ||
            follow.name.toLowerCase().includes(searchKey) ||
            follow.email.includes(searchKey)
        );
        setFilteredFollowing(filteredData);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} disabled>
      <SafeAreaView style={styles.container}>
        <TitleBar navigation={navigation} name={user.username} />
        <View style={styles.rowContainer}>
          <TouchableOpacity>
            <Text
              onPress={() => {
                setResetSearchBar(resetSearchBar + 1);
                handleTabChange(0);
              }}
              style={styles.textTitle}
            >
              {user.followers.length > 0
                ? user.followers.length + "  Followers"
                : "Followers"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              onPress={() => {
                setResetSearchBar(resetSearchBar + 1);
                handleTabChange(1);
              }}
              style={styles.textTitle}
            >
              {user.following.length > 0
                ? user.following.length + "  Following"
                : "Following"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lineContainer}>
          <View
            style={
              activeButton === 0 ? styles.highlightedOn : styles.highlightedOff
            }
          />
          <View
            style={
              activeButton === 1 ? styles.highlightedOn : styles.highlightedOff
            }
          />
        </View>

        <Animated.View
          style={[
            styles.flatListContainer,
            { transform: [{ translateX: translation }] },
          ]}
        >
          <FlatList
            ListHeaderComponent={
              <SearchBar
                onPropChange={childPropChange}
                resetSearchBar={resetSearchBar}
              />
            }
            style={{ width: SIZES.Width }}
            data={onSearch ? filteredFollowers : followers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Follow user={item} currentUser={currentUser} />
            )}
          />

          <FlatList
            ListHeaderComponent={
              <SearchBar
                onPropChange={childPropChange}
                resetSearchBar={resetSearchBar}
              />
            }
            style={{ width: SIZES.Width }}
            data={onSearch ? filteredFollowing : following}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Follow user={item} currentUser={currentUser} />
            )}
          />
        </Animated.View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default UserFollow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-around",

    marginTop: 10,
  },
  textTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  lineContainer: {
    flexDirection: "row",
    marginTop: 14,
  },
  highlightedOff: {
    flex: 1,
    backgroundColor: "#222",
    height: 1,
  },
  highlightedOn: {
    flex: 1,
    backgroundColor: "#ccc",
    height: 1,
  },
  flatListContainer: {
    flex: 1,
    flexDirection: "row",
    width: "200%",
  },
  requestsText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 15,
    marginHorizontal: 20,
  },
});
