import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useUserContext } from "../../contexts/UserContext";
import useHandleRequests from "../../hooks/useHandleRequests";
import FastImage from "react-native-fast-image";
import { SIZES } from "../../constants";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const Requests = ({ user, navigation }) => {
  const { currentUser } = useUserContext();
  const { handleRequests } = useHandleRequests({ currentUser, user });

  const handleViewProfile = () => {
    navigation.navigate("UserDetail", {
      email: user.email,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => handleViewProfile()}>
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
      </TouchableWithoutFeedback>

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
    width: SIZES.Width * 0.34,
    marginLeft: 15,
  },
  username: {
    color: "#fff",
    fontWeight: "700",
    width: "95%",
    fontSize: 14,
  },
  name: {
    color: "#999",
    fontSize: 14,
    fontWeight: "400",
    width: "95%",
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 4,
  },
  button: {
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    height: 34,
    width: 90,
    borderRadius: 10,
  },
  blueButton: {
    backgroundColor: "#07f",
    justifyContent: "center",
    alignItems: "center",
    height: 34,
    width: 90,
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
