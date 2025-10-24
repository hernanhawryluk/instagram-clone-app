import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import BottomSheetComments from "../bottomSheets/BottomSheetComments";
import useSharePost from "../../../hooks/useSharePost";
import useSavePost from "../../../hooks/useSavePost";
import useHandleLike from "../../../hooks/useHandleLike";
import LikesBottomSheet from "../../shared/bottomSheets/LikesBottomSheet";

const Footer = ({ post, currentUser, navigation }) => {
  const { handlePostLike } = useHandleLike();
  const { sharePost } = useSharePost();
  const { savePost } = useSavePost();
  const bottomSheetRef = useRef(null);
  const LikesBottomSheetRef = useRef(null);

  const handleViewComments = () => {
    bottomSheetRef.current.present();
  };

  const handleViewLikes = () => {
    LikesBottomSheetRef.current.present();
  };

  return (
    <View style={styles.footerIconsContainer}>
      <View style={styles.footerIcons}>
        <View style={styles.rowIconContainer}>
          <TouchableOpacity onPress={() => handlePostLike(post, currentUser)}>
            {post?.likes_by_users?.includes(currentUser?.email) ? (
              <MaterialCommunityIcons
                name="cards-heart"
                size={28}
                color={"#f33"}
                style={styles.heartIcon}
              />
            ) : (
              <MaterialCommunityIcons
                name="cards-heart-outline"
                size={28}
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
          <TouchableOpacity onPress={handleViewComments}>
            <Ionicons
              name="chatbubble-outline"
              size={25}
              color={"#fff"}
              style={styles.chatIcon}
            />
            <Ionicons
              name="chatbubble-outline"
              size={25}
              color={"#fff"}
              style={[{ position: "absolute", left: 1 }, styles.chatIcon]}
            />
          </TouchableOpacity>
          {post?.comments?.length > 1 && (
            <TouchableOpacity onPress={handleViewComments}>
              <Text style={styles.quantyText}>{post?.comments?.length}</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={() => sharePost(post)}>
          <Feather
            name="send"
            size={25}
            color={"#fff"}
            style={styles.sendIcon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => savePost(post, currentUser)}>
        {currentUser?.saved_posts &&
        currentUser.saved_posts.includes(post.id) ? (
          <Ionicons
            name="bookmark"
            size={25}
            color={"#fff"}
            style={styles.bookmarkIcon}
          />
        ) : (
          <Feather
            name="bookmark"
            size={26}
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
    marginTop: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 12,
    marginBottom: 4,
  },
  footerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
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
  heartIcon: {
    transform: [{ scaleX: 1.05 }, { scaleY: 1.05 }],
  },
  sendIcon: {
    transform: [{ rotate: "21deg" }, { scaleX: 0.95 }, { scaleY: 1.05 }],
    marginTop: -2,
  },
  chatIcon: {
    transform: [{ scaleX: -1 }, { scaleY: 1 }],
  },
  bookmarkIcon: {
    transform: [{ scaleX: 1.15 }, { scaleY: 1.1 }],
  },
  headerIcons: {
    marginRight: 15,
  },
});
