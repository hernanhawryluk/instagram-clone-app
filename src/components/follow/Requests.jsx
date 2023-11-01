import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useUserContext } from "../../contexts/UserContext";
import useHandleRequests from "../../hooks/useHandleRequests";
import FastImage from "react-native-fast-image";
import { SIZES } from "../../constants";

const Requests = ({ user }) => {
  const { currentUser } = useUserContext();
  const { handleRequests } = useHandleRequests({ currentUser, user });

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <FastImage
          source={{ uri: user.profile_picture }}
          style={styles.image}
        />
        <View style={styles.userContainer}>
          <Text numberOfLines={1} style={styles.username}>
            {user.username}
          </Text>
          <Text numberOfLines={1} style={styles.name}>
            {user.name}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handleRequests(true)}>
          <View style={styles.blueButton}>
            <Text style={styles.removeText}>Accept</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleRequests(false)}>
          <View style={styles.button}>
            <Text style={styles.removeText}>Remove</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Requests;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginTop: 15,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    marginLeft: 3,
    height: 53,
    width: 53,
    borderRadius: 100,
  },
  userContainer: {
    justifyContent: "center",
    marginLeft: 15,
  },
  username: {
    color: "#fff",
    fontWeight: "700",
    width: SIZES.Width * 0.4,
    fontSize: 14,
  },
  name: {
    color: "#999",
    fontSize: 14,
    fontWeight: "400",
    width: SIZES.Width * 0.4,
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    height: 36,
    width: 70,
    borderRadius: 10,
  },
  blueButton: {
    backgroundColor: "#07f",
    justifyContent: "center",
    alignItems: "center",
    height: 36,
    width: 70,
    borderRadius: 10,
  },
  buttonText: {
    color: "#08f",
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 4,
  },
  removeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 4,
  },
});
