import { View } from "react-native";
import React from "react";
import { Divider } from "react-native-elements";
import Header from "./posts/Header";
import PostImage from "./posts/PostImage";
import Footer from "./posts/Footer";
import Likes from "./posts/Likes";
import Caption from "./posts/Caption";
import Comments from "./posts/Comments";
import Date from "./posts/Date";

const Posts = ({ navigation, post, currentUser, key }) => {
  return (
    <View key={key} style={{ marginTop: 10 }}>
      <Divider width={0.7} color="#222" />
      <Header navigation={navigation} post={post} currentUser={currentUser} />
      <PostImage post={post} currentUser={currentUser} />
      <Footer post={post} currentUser={currentUser} />
      <Likes post={post} navigation={navigation} />
      <Caption post={post} />
      <Comments post={post} currentUser={currentUser} />
      <Date post={post} />
    </View>
  );
};

export default Posts;
