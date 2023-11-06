import { StyleSheet, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import BottomSheetComments from "../bottomSheets/BottomSheetComments";
import useSharePost from "../../../hooks/useSharePost";
import useSavePost from "../../../hooks/useSavePost";
import useHandleLike from "../../../hooks/useHandleLike";

const Footer = ({ post, currentUser, navigation }) => {
  const { handlePostLike } = useHandleLike();
  const { sharePost } = useSharePost();
  const { savePost } = useSavePost();
  const bottomSheetRef = useRef(null);

  const handleViewComments = () => {
    bottomSheetRef.current.present();
  };

  return (
    <View style={styles.footerIconsContainer}>
      <View style={styles.footerIcons}>
        <TouchableOpacity onPress={() => handlePostLike(post, currentUser)}>
          {post.likes_by_users.includes(currentUser.email) ? (
            <MaterialCommunityIcons
              name="cards-heart"
              size={27}
              color={"#f33"}
              style={styles.heartIcon}
            />
          ) : (
            <MaterialCommunityIcons
              name="cards-heart-outline"
              size={27}
              color={"#fff"}
              style={styles.heartIcon}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleViewComments();
          }}
        >
          <MaterialCommunityIcons
            name="chat-outline"
            size={27}
            color={"#fff"}
            style={styles.chatIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sharePost(post)}>
          <Feather
            name="send"
            size={24}
            color={"#fff"}
            style={styles.sendIcon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => savePost(post, currentUser)}>
        {currentUser.saved_posts &&
        currentUser.saved_posts.includes(post.id) ? (
          <Ionicons
            name="bookmark"
            size={24}
            color={"#fff"}
            style={styles.bookmarkIcon}
          />
        ) : (
          <Feather
            name="bookmark"
            size={24}
            color={"#fff"}
            style={styles.bookmarkIcon}
          />
        )}
      </TouchableOpacity>
      <BottomSheetComments
        bottomSheetRef={bottomSheetRef}
        currentUser={currentUser}
        post={post}
        navigation={navigation}
      />
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
  heartIcon: {
    transform: [{ scaleX: 1.05 }, { scaleY: 1.05 }],
  },
  sendIcon: {
    transform: [{ rotate: "20deg" }, { scaleX: 0.95 }, { scaleY: 1.05 }],
    marginTop: -2,
  },
  chatIcon: {
    transform: [{ scaleX: -1 }, { scaleY: 1.15 }],
  },
  bookmarkIcon: {
    transform: [{ scaleX: 1.15 }, { scaleY: 1.1 }],
  },
  headerIcons: {
    marginRight: 15,
  },
});
