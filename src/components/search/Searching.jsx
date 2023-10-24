import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import FastImage from "react-native-fast-image";
import { Ionicons } from "@expo/vector-icons";
import SkeletonSearching from "./Skeletons/SkeletonSearching";

const Searching = ({ navigation, searchResult, currentUser }) => {
  const [visibleUsers, setVisibleUsers] = useState(searchResult);

  useEffect(() => {
    setVisibleUsers(searchResult);
  }, [searchResult]);

  const handleCloseUser = (key) => {
    const updatedUsers = visibleUsers.filter((item) => item.id !== key);
    setVisibleUsers(updatedUsers);
  };

  return (
    <View style={styles.container}>
      <View style={styles.divider} />
      <ScrollView>
        {visibleUsers.length > 0 ? (
          visibleUsers.map((item, index) => (
            <View style={styles.rowContainer} key={index}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("UserDetail", {
                    email: item.email,
                  });
                }}
                style={styles.userContainer}
              >
                <FastImage
                  source={{ uri: item.profile_picture }}
                  style={styles.image}
                />
                <View style={styles.columnContainer}>
                  <Text style={styles.user}>{item.username}</Text>
                  <Text style={styles.name}>
                    {item.name}
                    {item.followers.includes(currentUser.email) &&
                      " • Following"}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleCloseUser(item.id)}>
                <Ionicons
                  name="close"
                  size={20}
                  color={"#999"}
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View>
            {Array(9)
              .fill(<SkeletonSearching />)
              .map((skeleton, index) => (
                <View key={index}>{skeleton}</View>
              ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Searching;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
  },
  divider: {
    height: 0.7,
    width: "100%",
    backgroundColor: "#333",
    marginTop: 10,
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userContainer: {
    marginHorizontal: 15,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    minWidth: "75%",
  },
  image: {
    width: 44,
    height: 44,
    borderRadius: 100,
  },
  columnContainer: {
    marginLeft: 20,
    gap: 5,
  },
  user: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  name: {
    color: "#aaa",
    fontSize: 12,
  },
  closeIcon: {
    marginRight: 15,
    paddingBottom: 20,
  },
});
