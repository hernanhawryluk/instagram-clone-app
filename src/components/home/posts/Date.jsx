import { StyleSheet, Text, View } from "react-native";
import useTimeAgo from "../../../utils/useTimeAgo";

const Date = ({ post }) => {
  const { timeAgoLong } = useTimeAgo();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {post.createdAt && timeAgoLong(post.createdAt.seconds)}
      </Text>
    </View>
  );
};

export default Date;

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginHorizontal: 16,
    marginBottom: 2,
  },
  text: {
    color: "#888",
    fontSize: 11,
    fontWeight: "400",
  },
});
