import { StyleSheet, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import BottomSheetComments from "../bottomSheets/BottomSheetComments";
import useSharePost from "../../../hooks/useSharePost";
import useSavePost from "../../../hooks/useSavePost";
import useHandleLike from "../../../hooks/useHandleLike";

const Footer = ({ post, currentUser }) => {
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
            />
          ) : (
            <MaterialCommunityIcons
              name="cards-heart-outline"
              size={27}
              color={"#fff"}
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
            style={styles.headerChatIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sharePost(post)}>
          <Feather
            name="send"
            size={24}
            color={"#fff"}
            style={styles.headerSendIcon}
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
            styles={styles.headerDots}
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
      <BottomSheetComments
        bottomSheetRef={bottomSheetRef}
        currentUser={currentUser}
        post={post}
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
