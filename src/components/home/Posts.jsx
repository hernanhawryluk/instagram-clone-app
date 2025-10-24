import { View } from "react-native";
import Header from "./posts/Header";
import PostImage from "./posts/PostImage";
import Footer from "./posts/Footer";
import Caption from "./posts/Caption";
import Date from "./posts/Date";

const Posts = ({ navigation, post, currentUser, key }) => {
  return (
    <View key={key} style={{ marginTop: 10 }}>
      <Header navigation={navigation} post={post} currentUser={currentUser} />
      <PostImage post={post} currentUser={currentUser} />
      <Footer post={post} currentUser={currentUser} navigation={navigation} />
      <Caption post={post} />
      <Date post={post} />
    </View>
  );
};

export default Posts;
