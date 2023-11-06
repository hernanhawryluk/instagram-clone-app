import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SIZES } from "../../../constants";
import FastImage from "react-native-fast-image";
import useTimeAgo from "../../../utils/useTimeAgo";
import useHandleCommentLike from "../../../hooks/useHandleCommentLike";
import useHandleCommentDelete from "../../../hooks/useHandleCommentDelete";

const Comments = ({
  comment,
  index,
  comments,
  userId,
  postId,
  currentUser,
  navigation,
  bottomSheetRef,
}) => {
  const { timeAgo } = useTimeAgo();
  const { handleCommentLike } = useHandleCommentLike();
  const { handleCommentDelete } = useHandleCommentDelete();
  const [deleteStatus, setDeleteStatus] = useState(false);
  const timerRef = useRef(null);

  const likes = () => {
    const likeQuantity = comment.likes_by_users.split(",").length - 1;
    switch (likeQuantity) {
      case 0:
        return "";
      case 1:
        return likeQuantity + " like";
      default:
        return likeQuantity + " likes";
    }
  };

  const deleteCountDown = () => {
    setDeleteStatus(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      clearTimeout(timerRef.current);
      setDeleteStatus(false);
      handleCommentDelete(index, comments, userId, postId);
    }, 5000);
  };

  const cancelCountDown = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setDeleteStatus(false);
  };

  return (
    <View style={styles.mainContainer} key={index}>
      <View style={styles.rowContainer}>
        <TouchableOpacity>
          <FastImage
            source={{ uri: comment.profile_picture }}
            style={styles.profilePicture}
          />
        </TouchableOpacity>

        <View style={styles.columnContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.username}>{comment.username}</Text>
            <Text style={styles.createdAt}>
              {timeAgo(comment.createdAt.seconds)}
            </Text>
          </View>
          <View style={styles.commentContainer}>
            <Text style={styles.comment}>{comment.comment}</Text>
          </View>

          {comment.likes_by_users.split(",").length - 1 > 0 && (
            <TouchableOpacity
              onPress={() => {
                bottomSheetRef.current.close();
                navigation.navigate("Likes", {
                  likesByEmail: comment.likes_by_users,
                });
              }}
            >
              <Text style={styles.likes}>{likes()}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {comment.username !== currentUser.username ? (
        <TouchableOpacity
          onPress={() =>
            handleCommentLike(
              comment,
              index,
              comments,
              userId,
              postId,
              currentUser
            )
          }
        >
          <Ionicons
            name={
              comment.likes_by_users.includes(currentUser.email)
                ? "heart"
                : "heart-outline"
            }
            size={17}
            color={
              comment.likes_by_users.includes(currentUser.email)
                ? "#c11"
                : "#fff"
            }
            style={styles.heartIcon}
          />
        </TouchableOpacity>
      ) : deleteStatus ? (
        <TouchableOpacity onPress={() => cancelCountDown()}>
          <Text style={styles.undoText}>Undo</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => deleteCountDown()}>
          <Ionicons
            name={"trash-outline"}
            size={17}
            color={"#c11"}
            style={styles.heartIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 15,
  },
  profilePicture: {
    height: 40,
    width: 40,
    borderRadius: 50,
    marginRight: 12,
  },
  columnContainer: {},
  rowContainer: {
    flexDirection: "row",
  },
  username: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },
  createdAt: {
    color: "#bbb",
    fontSize: 15,
    marginLeft: 5,
  },
  commentContainer: {
    maxWidth: SIZES.Width * 0.72,
  },
  comment: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  likes: {
    color: "#bbb",
    fontWeight: "600",
    marginBottom: 10,
  },
  heartIcon: {
    marginTop: 12,
    marginRight: 10,
  },
  undoText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 14,
    marginTop: 12,
  },
});
