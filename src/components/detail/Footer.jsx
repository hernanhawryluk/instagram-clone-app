import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";
import useSharePost from "../../hooks/useSharePost";
import useSavePost from "../../hooks/useSavePost";
import useHandleLike from "../../hooks/useHandleLike";
import LikesBottomSheet from "../shared/bottomSheets/LikesBottomSheet";
import { useRef } from "react";

const Footer = ({
  post,
  currentUser,
  bottomSheetRef,
  setBottomSheetIndex,
  sharedIndex,
  navigation,
}) => {
  const { handlePostLike } = useHandleLike();
  const { sharePost } = useSharePost();
  const { savePost } = useSavePost();
  const LikesBottomSheetRef = useRef(null);

  const handleViewLikes = () => {
    LikesBottomSheetRef.current.present();
  };

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
        <View style={styles.rowIconContainer}>
          <TouchableOpacity onPress={() => handlePostLike(post, currentUser)}>
            {post?.likes_by_users.includes(currentUser?.email) ? (
              <MaterialCommunityIcons
                name="cards-heart"
                size={27}
                color={"#f00"}
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
          {post?.likes_by_users?.length > 1 && (
            <TouchableOpacity onPress={handleViewLikes}>
              <Text style={styles.quantyText}>
                {post?.likes_by_users?.length}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.rowIconContainer}>
          <TouchableOpacity onPress={handleCommentsSection}>
            <MaterialCommunityIcons
              name="chat-outline"
              size={27}
              color={"#fff"}
              style={styles.chatIcon}
            />
          </TouchableOpacity>
          {post?.comments?.length > 1 && (
            <TouchableOpacity onPress={handleCommentsSection}>
              <Text style={styles.quantyText}>{post?.comments?.length}</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={handleSharePost}>
          <Feather
            name="send"
            size={24}
            color={"#fff"}
            style={styles.sendIcon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleSavePost}>
        {currentUser?.saved_posts &&
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
      <LikesBottomSheet
        likesByEmail={post?.likes_by_users}
        bottomSheetRef={LikesBottomSheetRef}
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
  rowIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  quantyText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
