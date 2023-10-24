import { StyleSheet, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import useSharePost from "../../hooks/useSharePost";
import useSavePost from "../../hooks/useSavePost";
import useHandleLike from "../../hooks/useHandleLike";

const Footer = ({
  handleLike,
  post,
  currentUser,
  bottomSheetRef,
  setBottomSheetIndex,
  sharedIndex,
}) => {
  const { handlePostLike } = useHandleLike();
  const { sharePost } = useSharePost();
  const { savePost } = useSavePost();

  const handleCommentsSection = () => {
    setBottomSheetIndex(sharedIndex);
    bottomSheetRef.current.snapToIndex(0);
  };

  const handleSharePost = () => {
    sharePost(post);
  };

  const handleSavePost = () => {
    savePost(post, currentUser);
  };

  return (
    <View style={styles.footerIconsContainer}>
      <View style={styles.footerIcons}>
        <TouchableOpacity onPress={() => handlePostLike(post, currentUser)}>
          {post.likes_by_users.includes(currentUser.email) ? (
            <MaterialCommunityIcons
              name="cards-heart"
              size={27}
              color={"#f00"}
            />
          ) : (
            <MaterialCommunityIcons
              name="cards-heart-outline"
              size={27}
              color={"#fff"}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCommentsSection()}>
          <MaterialCommunityIcons
            name="chat-outline"
            size={27}
            color={"#fff"}
            style={styles.headerChatIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSharePost()}>
          <Feather
            name="send"
            size={24}
            color={"#fff"}
            style={styles.headerSendIcon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => handleSavePost()}>
        {currentUser.saved_posts.includes(post.id) ? (
          <Ionicons
            name="bookmark"
            size={24}
            color={"#fff"}
            style={styles.headerDots}
          />
        ) : (
          <Feather
            name="bookmark"
            size={24}
            color={"#fff"}
            styles={styles.headerDots}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footerIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 12,
  },
  footerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },
  headerSendIcon: {
    transform: [{ rotate: "20deg" }],
    marginTop: -2,
  },
  headerChatIcon: {
    transform: [{ scaleX: -1 }],
  },
  headerIcons: {
    marginRight: 15,
  },
});
