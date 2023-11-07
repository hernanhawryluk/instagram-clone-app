import { StyleSheet, View } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";
import { SIZES } from "../../../constants";
import FastImage from "react-native-fast-image";
import { GestureDetector } from "react-native-gesture-handler";
import useLikeAnimation from "../../../utils/useLikeAnimation";
import { Ionicons } from "@expo/vector-icons";

const PostImage = ({ post, currentUser }) => {
  const { handleDoubleTap, animatedStyles } = useLikeAnimation(
    post,
    currentUser
  );

  return (
    <GestureDetector gesture={handleDoubleTap}>
      <View>
        <FastImage source={{ uri: post.imageUrl }} style={styles.postImage} />
        <Animated.View style={[styles.likeContainer, animatedStyles]}>
          <Ionicons name="heart" size={110} color="#f33" />
        </Animated.View>
      </View>
    </GestureDetector>
  );
};

export default PostImage;

const styles = StyleSheet.create({
  postImage: {
    marginTop: 6,
    marginBottom: 11,
    height: SIZES.Width * 1.1,
    width: SIZES.Width,
    resizeMode: "cover",
  },
  likeContainer: {
    position: "absolute",
    top: SIZES.Width * 0.35,
    left: SIZES.Width * 0.35,
    opacity: 0,
  },
});
