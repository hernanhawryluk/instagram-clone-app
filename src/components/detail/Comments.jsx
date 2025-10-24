import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Image } from "expo-image";

const Comments = ({
  post,
  currentUser,
  bottomSheetRef,
  bottomSheetRefComment,
  setBottomSheetIndex,
  sharedIndex,
}) => {
  const handleShowComments = () => {
    setBottomSheetIndex(sharedIndex);
    bottomSheetRef.current.snapToIndex(0);
  };

  const handleWriteComment = () => {
    setBottomSheetIndex(sharedIndex);
    if (Platform.OS === "ios") {
      bottomSheetRefComment.current.snapToIndex(0);
    } else {
      bottomSheetRef.current.snapToIndex(0);
    }
  };

  return (
    <View>
      {post.comments.length <= 0 ? (
        <TouchableOpacity
          onPress={() => {
            handleWriteComment();
          }}
        >
          <View style={styles.container}>
            <Image
              source={{ uri: currentUser?.profile_picture }}
              style={styles.image}
            />
            <Text style={styles.text}>Add a comment...</Text>
          </View>
        </TouchableOpacity>
      ) : post.comments.length > 1 ? (
        <TouchableOpacity
          onPress={() => {
            handleShowComments();
          }}
        >
          <View style={styles.container}>
            <Text style={styles.text}>
              View all {post.comments.length} comments
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            handleShowComments();
          }}
        >
          <View style={styles.container}>
            <Text style={styles.text}>View 1 comment</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  container: {
    marginTop: 9,
    marginHorizontal: 12,
    marginBottom: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  text: {
    color: "#aaa",
    fontSize: 14,
    fontWeight: "400",
  },
  image: {
    width: 26,
    height: 26,
    borderRadius: 100,
  },
});
