import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";
import useCheckStoriesSeen from "../../hooks/useCheckStoriesSeen";
import { LinearGradient } from "expo-linear-gradient";

const Interaction = ({ navigation, item, currentUser, text }) => {
  const { checkStoriesSeen } = useCheckStoriesSeen();

  const handleUserProfile = () => {
    navigation.navigate("UserDetail", {
      email: item.comments[item.comments.length - 1].email,
    });
  };

  const handleCheckPost = () => {
    navigation.navigate("Detail", { item: item });
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={() => handleUserProfile()}>
          {text === "commented" &&
          checkStoriesSeen(item.username, currentUser.email) ? (
            <LinearGradient
              start={[0.9, 0.45]}
              end={[0.07, 1.03]}
              colors={["#ff00ff", "#ff4400", "#ffff00"]}
              style={styles.rainbowBorder}
            >
              <FastImage
                source={{
                  uri:
                    text === "commented"
                      ? item.comments[item.comments.length - 1].profile_picture
                      : item.new_likes[1],
                }}
                style={styles.image}
              />
            </LinearGradient>
          ) : (
            <FastImage
              source={{
                uri:
                  text === "commented"
                    ? item.comments[item.comments.length - 1].profile_picture
                    : item.new_likes[1],
              }}
              style={styles.nonRainbowImage}
            />
          )}
        </TouchableOpacity>
        <View style={styles.userContainer}>
          <TouchableOpacity onPress={() => handleUserProfile()}>
            <Text style={styles.username}>
              {text === "commented"
                ? item.comments[item.comments.length - 1].username
                : item.new_likes[0]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCheckPost()}>
            <Text style={styles.name}>
              {text === "commented"
                ? "Commented your post."
                : "Liked your post."}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handleCheckPost()}>
          <FastImage source={{ uri: item.imageUrl }} style={styles.postImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Interaction;

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
    height: 58,
    width: 58,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 56,
    width: 56,
    borderRadius: 100,
    borderWidth: 2.5,
    borderColor: "#000",
  },
  nonRainbowImage: {
    height: 58,
    width: 58,
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
    fontSize: 14,
  },
  name: {
    color: "#ddd",
    fontSize: 13,
    fontWeight: "400",
  },
  postImage: {
    height: 60,
    width: 60,
    marginRight: 2,
  },
});
