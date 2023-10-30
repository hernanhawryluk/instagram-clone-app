import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import TitleBar from "../components/shared/TitleBar";
import SearchBar from "../components/shared/SearchBar";
import useFetchLikes from "../hooks/useFetchLikes";
import { Divider } from "react-native-elements";
import LikedBy from "../components/likes/LikedBy";
import { useUserContext } from "../contexts/UserContext";

const Likes = ({ navigation, route }) => {
  const { likesByEmail } = route.params;
  const { currentUser } = useUserContext();
  const { likesByUsers, loader } = useFetchLikes({ likesByEmail });

  const [onSearch, setOnSearch] = useState(false);
  const [filteredLikes, setFilteredLikes] = useState({});

  const childPropChange = (searchKey) => {
    if (likesByUsers.length > 0) {
      setOnSearch(true);
      const filteredData = likesByUsers.filter(
        (userLike) =>
          userLike.username.includes(searchKey) ||
          userLike.name.toLowerCase().includes(searchKey) ||
          userLike.email.includes(searchKey)
      );
      setFilteredLikes(filteredData);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TitleBar navigation={navigation} name="Likes" activity={loader} />
      <View style={styles.divider} />
      <FlatList
        ListHeaderComponent={<SearchBar onPropChange={childPropChange} />}
        data={onSearch === true ? filteredLikes : likesByUsers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <LikedBy
            navigation={navigation}
            user={item}
            currentUser={currentUser}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Likes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  divider: {
    height: 0.5,
    backgroundColor: "#222",
    marginBottom: 8,
  },
});
