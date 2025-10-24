import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { useState } from "react";
import useHandleFollow from "../../hooks/useHandleFollow";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import useCheckStoriesSeen from "../../hooks/useCheckStoriesSeen";
import Unfollow from "../follow/Unfollow";
import { SIZES } from "../../constants";

const Follow = ({ user, currentUser, navigation }) => {
  const { checkStoriesSeen } = useCheckStoriesSeen();
  const { handleFollow } = useHandleFollow({ user });
  const [modalVisible, setModalVisible] = useState(false);

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleViewProfile = () => {
    if (currentUser.email === user.email) {
      navigation.navigate("Profile");
    } else {
      navigation.replace("UserDetail", {
        email: user.email,
      });
    }
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
              <Image
                source={{ uri: user.profile_picture }}
                style={styles.image}
              />
            </LinearGradient>
          ) : (
            <Image
              source={{ uri: user.profile_picture }}
              style={styles.nonRainbowImage}
            />
          )}
          <View style={styles.userContainer}>
            <View style={styles.rowContainer}>
              <Text numberOfLines={1} style={styles.username}>
                {user.username}
              </Text>
            </View>
            <Text numberOfLines={1} style={styles.name}>
              {user.name}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

      {user.username ===
      currentUser.username ? null : currentUser.following.includes(
          user.email
        ) ? (
        <TouchableOpacity onPress={() => handleModal()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Following</Text>
          </View>
        </TouchableOpacity>
      ) : currentUser.following_request.includes(user.email) ? (
        <TouchableOpacity onPress={() => handleFollow()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Requested</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => handleFollow()}>
          <View style={styles.blueButton}>
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

export default Follow;

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
  },
  username: {
    marginLeft: 12,
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    width: SIZES.Width * 0.5,
  },
  name: {
    marginTop: 3,
    marginLeft: 12,
    color: "#999",
    fontSize: 13,
    fontWeight: "400",
    width: SIZES.Width * 0.5,
    marginBottom: 4,
  },
  button: {
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    height: Platform.OS === "android" ? 32 : 30,
    width: 94,
    borderRadius: 10,
  },
  blueButton: {
    backgroundColor: "#08f",
    justifyContent: "center",
    alignItems: "center",
    height: Platform.OS === "android" ? 32 : 30,
    width: 90,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
    marginBottom: Platform.OS === "android" ? 4 : 0,
  },
});
