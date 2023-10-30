import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";
import { Feather } from "@expo/vector-icons";
import useHandleSeenMessage from "../../hooks/useHandleSeenMessage";

const RenderUser = ({ navigation, user, currentUser, handleCamera }) => {
  const { handleSeenMessage } = useHandleSeenMessage();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          if (user.status === "unseen" || user.status === "added") {
            handleSeenMessage(user, currentUser);
          }
          navigation.navigate("Chating", { user });
        }}
        style={styles.rowContainer}
      >
        <FastImage
          source={{ uri: user.profile_picture }}
          style={styles.image}
        />
        {user.status === "unseen" ? (
          <View style={styles.userContainer}>
            <Text style={styles.username}>{user.name}</Text>
            <Text style={styles.statusBold}>New message</Text>
          </View>
        ) : user.status === "seen" ? (
          <View style={styles.userContainer}>
            <Text style={styles.username}>{user.name}</Text>
            <Text style={styles.status}>{user.username}</Text>
          </View>
        ) : user.status === "added" ? (
          <View style={styles.userContainer}>
            <Text style={styles.username}>{user.name}</Text>
            <Text style={styles.statusBold}>Just added</Text>
          </View>
        ) : (
          <View style={styles.userContainer}>
            <Text style={styles.username}>{user.name}</Text>
            <Text style={styles.status}>{user.username}</Text>
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleCamera()}>
        <Feather name="camera" size={22} color={"#fff"} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default RenderUser;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginTop: 15,
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "#000",
  },
  userContainer: {
    justifyContent: "center",
    marginLeft: 10,
  },
  username: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  status: {
    color: "#999",
    fontSize: 14,
    fontWeight: "400",
  },
  statusBold: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  icon: {
    marginRight: 10,
  },
});
