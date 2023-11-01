import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import FastImage from "react-native-fast-image";
import useHandleFollow from "../../hooks/useHandleFollow";
import { LinearGradient } from "expo-linear-gradient";
import useCheckStoriesSeen from "../../hooks/useCheckStoriesSeen";
import Unfollow from "../follow/Unfollow";
import { SIZES } from "../../constants";

const LikedBy = ({ navigation, user, currentUser }) => {
  const { checkStoriesSeen } = useCheckStoriesSeen();
  const { handleFollow } = useHandleFollow();

  const [modalVisible, setModalVisible] = useState(false);

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleUserProfile = () => {
    if (currentUser.email === user.email) {
      navigation.navigate("Profile");
    } else {
      navigation.navigate("UserDetail", {
        email: user.email,
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleUserProfile()}
        style={styles.rowContainer}
      >
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
          <Text numberOfLines={1} style={styles.username}>
            {user.username}
          </Text>
          <Text numberOfLines={1} style={styles.name}>
            {user.name}
          </Text>
        </View>
      </TouchableOpacity>
      {currentUser.email === user.email ? null : currentUser.following.includes(
          user.email
        ) ? (
        <TouchableOpacity onPress={() => handleModal()}>
          <View style={styles.buttonGrey}>
            <Text style={styles.buttonText}>Following</Text>
          </View>
        </TouchableOpacity>
      ) : currentUser.following_request.includes(user.email) ? (
        <TouchableOpacity onPress={() => handleFollow(user.email)}>
          <View style={styles.buttonGrey}>
            <Text style={styles.buttonText}>Requested</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => handleFollow(user.email)}>
          <View style={styles.buttonBlue}>
            <Text style={styles.buttonText}>Follow</Text>
          </View>
        </TouchableOpacity>
      )}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <Unfollow user={user} handleModal={handleModal} />
      </Modal>
    </View>
  );
};

export default LikedBy;

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
    borderWidth: 4,
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
    marginLeft: 15,
  },
  username: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 17,
  },
  name: {
    color: "#fff",
    fontSize: 16,
    width: SIZES.Width * 0.35,
    marginBottom: 4,
  },
  buttonBlue: {
    backgroundColor: "#18f",
    justifyContent: "center",
    alignItems: "center",
    height: 38,
    width: 100,
    borderRadius: 10,
  },
  buttonGrey: {
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    height: 38,
    width: 110,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 4,
  },
});
