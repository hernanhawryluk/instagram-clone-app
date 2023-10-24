import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import { useState } from "react";

const Caption = ({ post }) => {
  const [showLongCaption, setShowLongCaption] = useState(false);

  return (
    <View style={styles.caption}>
      {post.caption.length <= 0 ? null : post.caption.length < 82 ? (
        <Text style={styles.captionUser}>
          {post.username.toLowerCase() + " "}
          <Text style={styles.captionText}>{post.caption}</Text>
        </Text>
      ) : (
        <TouchableWithoutFeedback
          onPress={() => setShowLongCaption(!showLongCaption)}
        >
          <Text style={styles.captionUser}>
            {post.username.toLowerCase() + " "}

            {showLongCaption ? (
              <Text style={styles.captionText}>{post.caption}</Text>
            ) : (
              <Text style={styles.captionText}>
                {post.caption.slice(0, 74)}
                <Text style={styles.captionMore}>...more</Text>
              </Text>
            )}
          </Text>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

export default Caption;

const styles = StyleSheet.create({
  caption: {
    marginTop: 8,
    marginHorizontal: 12,
    flexDirection: "row",
  },
  captionUser: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  captionText: {
    flex: 1,
    color: "#fff",
    fontWeight: "400",
    fontSize: 14,
    marginLeft: 4,
  },
  captionMore: {
    color: "#aaa",
    fontSize: 14,
  },
});
