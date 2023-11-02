import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import useHandleFollow from "../../hooks/useHandleFollow";
import RemoveFollower from "./RemoveFollower";
import FastImage from "react-native-fast-image";
import { LinearGradient } from "expo-linear-gradient";
import useCheckStoriesSeen from "../../hooks/useCheckStoriesSeen";
import { SIZES } from "../../constants";

const Followers = ({ user, currentUser, navigation }) => {
  const { checkStoriesSeen } = useCheckStoriesSeen();
  const { handleFollow } = useHandleFollow({ user });
  const [modalVisible, setModalVisible] = useState(false);

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleViewProfile = () => {
    navigation.navigate("UserDetail", {
      email: user.email,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => handleViewProfile()}>
        <View style={styles.rowContainer}>
          {checkStoriesSeen(user.username, currentUser.email) ? (
            <LinearGradient
              start={[0.9, 0.45]}
              end={[0.07, 1.03]}
              colors={["#ff00ff", "#ff4400", "#ffff00"]}
              style={styles.rainbowBorder}
            >
              <FastImage
                source={{ uri: user.profile_picture }}
                style={styles.image}
              />
            </LinearGradient>
          ) : (
            <FastImage
              source={{ uri: user.profile_picture }}
              style={styles.nonRainbowImage}
            />
          )}

          <View style={styles.userContainer}>
            <View style={styles.rowContainer}>
              {currentUser.following.includes(user.email) ? (
                <Text numberOfLines={1} style={styles.username}>
                  {user.username}
                </Text>
              ) : currentUser.following_request.includes(user.email) ? (
                <View style={{ flexDirection: "row" }}>
                  <Text numberOfLines={1} style={styles.username}>
                    {user.username}
                  </Text>
                  <TouchableOpacity onPress={() => handleFollow(user.email)}>
                    <Text style={styles.buttonTextRequested}> • Requested</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{ flexDirection: "row" }}>
                  <Text numberOfLines={1} style={styles.username}>
                    {user.username}
                  </Text>
                  <TouchableOpacity onPress={() => handleFollow(user.email)}>
                    <Text style={styles.buttonTextFollow}> • Follow</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <Text style={styles.name}>{user.name}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <TouchableOpacity onPress={() => handleModal()}>
        <View style={styles.button}>
          <Text style={styles.removeText}>Remove</Text>
        </View>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <RemoveFollower user={user} handleModal={handleModal} />
      </Modal>
    </View>
  );
};

export default Followers;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 12,
    marginTop: 15,
  },
  rowContainer: {
    flexDirection: "row",
  },
  rainbowBorder: {
    borderRadius: 100,
    height: 64,
    width: 64,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#000",
  },
  nonRainbowImage: {
    height: 64,
    width: 64,
    borderWidth: 3,
    borderColor: "#000",
    borderRadius: 100,
  },
  userContainer: {
    justifyContent: "center",
  },
  username: {
    marginLeft: 12,
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    maxWidth: SIZES.Width * 0.29,
  },
  name: {
    marginTop: 2,
    marginLeft: 12,
    color: "#999",
    fontSize: 13,
    fontWeight: "400",
    width: SIZES.Width * 0.45,
    marginBottom: 4,
  },
  button: {
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    height: 36,
    width: 90,
    borderRadius: 10,
  },
  buttonTextFollow: {
    color: "#08f",
    fontWeight: "700",
    fontSize: 13,
    marginBottom: -3.5,
  },
  buttonTextRequested: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
    marginBottom: -3.5,
  },
  removeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
    marginBottom: 4,
  },
});
