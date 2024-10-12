import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";

const RenderProfile = ({ navigation, user }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: user.profile_picture }} style={styles.image} />
      <Text style={styles.username}>{user.name}</Text>
      <Text style={styles.name}>{user.username} - Instagram</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("UserDetail", { email: user.email })}
        style={styles.buttonContainer}
      >
        <Text style={styles.button}>View profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RenderProfile;

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  username: {
    marginTop: 14,
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  name: {
    marginTop: 2,
    color: "#ccc",
    fontSize: 12,
  },
  buttonContainer: {
    marginTop: 14,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#333",
  },
  button: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
});
